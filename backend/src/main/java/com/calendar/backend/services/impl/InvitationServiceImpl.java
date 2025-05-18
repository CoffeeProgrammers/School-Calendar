package com.calendar.backend.services.impl;

import com.calendar.backend.dto.invitation.InvitationRequest;
import com.calendar.backend.dto.invitation.InvitationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.InvitationMapper;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.Invitation;
import com.calendar.backend.models.Notification;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.InvitationRepository;
import com.calendar.backend.services.inter.*;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class InvitationServiceImpl implements InvitationService {
    private final InvitationRepository invitationRepository;
    private final InvitationMapper invitationMapper;
    private final NotificationService notificationServices;
    private final UserService userService;
    private final EventService eventService;
    private final TaskAssignmentService taskAssignmentService;

    @Override
    public InvitationResponse create(InvitationRequest invitationRequest, Authentication authentication,
                                     long eventId, long receiverId) {
        log.info("Service: Saving new invitation {}", invitationRequest);

        if(invitationRepository.existsByReceiver_IdAndEvent_Id(receiverId, eventId)){
            log.error("Service: Invitation already exists");
            throw new EntityExistsException("Invitation already exists");
        }

        Invitation invitation = invitationMapper.fromInvitationRequestToInvitation(invitationRequest);
        Event event = eventService.findByIdForServices(eventId);
        invitation.setEvent(event);
        invitation.setSender(userService.findUserByAuth(authentication));
        invitation.setReceiver(userService.findByIdForServices(receiverId));
        invitation.setTime(LocalDateTime.now(ZoneId.of("Europe/Kiev")));

        return invitationMapper.fromInvitationToInvitationResponse(invitationRepository.save(invitation));
    }

    @Override
    public InvitationResponse update(long invitationId, InvitationRequest invitationRequest) {
        log.info("Service: Updating invitation with id {}", invitationId);
        Invitation invitation = findByIdForServices(invitationId);
        invitation.setDescription(invitationRequest.getDescription());
        return invitationMapper.fromInvitationToInvitationResponse(invitationRepository.save(invitation));
    }

    @Override
    public void delete(Long id) {
        log.info("Service: Deleting invitation with id {}", id);
        invitationRepository.deleteById(id);
    }

    @Override
    public InvitationResponse findById(Long id) {
        log.info("Service: Finding for controller invitation with id {}", id);
        return invitationMapper.fromInvitationToInvitationResponse(findByIdForServices(id));
    }

    @Override
    public PaginationListResponse<InvitationResponse> findAllBySenderId(Authentication authentication, int page, int size) {
        log.info("Service: Finding all invitations sent by my user");
        Page<Invitation> invitations = invitationRepository.findAllBySender_Id
                (userService.findUserByAuth(authentication).getId(),
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time")));
        PaginationListResponse<InvitationResponse> response = new PaginationListResponse<>();
        response.setTotalPages(invitations.getTotalPages());
        response.setContent(invitations.getContent().stream().map(
                invitationMapper::fromInvitationToInvitationResponse).toList());
        return response;
    }

    @Override
    public PaginationListResponse<InvitationResponse> findAllByRecieverId(Authentication authentication, int page, int size) {
        log.info("Service: Finding all invitations for my user");
        Page<Invitation> invitations = invitationRepository.findAllByReceiver_Id(
                userService.findUserByAuth(authentication).getId(),
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time")));
        PaginationListResponse<InvitationResponse> response = new PaginationListResponse<>();
        response.setTotalPages(invitations.getTotalPages());
        response.setContent(checkAndAddWarning(invitations.getContent().stream().map(
                invitationMapper::fromInvitationToInvitationResponse).toList()));
        return response;
    }

    private List<InvitationResponse> checkAndAddWarning(List<InvitationResponse> response) {
        log.info("Service: Checking invitations for warnings");

        for (InvitationResponse invitationResponse : response) {
            long userId = invitationResponse.getReceiver().getId();
            LocalDateTime start = LocalDateTime.parse(invitationResponse.getEvent().getStartDate());
            LocalDateTime end = LocalDateTime.parse(invitationResponse.getEvent().getEndDate());

            StringBuilder warningMessage = new StringBuilder();
            log.debug("Checking invitation for userId={} from {} to {}", userId, start, end);

            if (invitationRepository.existsByReceiver_IdAndEvent_StartDateLessThanAndEvent_EndDateGreaterThan(userId, start, end)) {
                warningMessage.append("You already have an invitation to events at this time. ");
                log.debug("Repository check triggered warning for userId={}", userId);
            }

            List<String> warnings = eventService.findForInvitationCheck(userId, start, end);
            if (!warnings.isEmpty()) {
                log.debug("EventService returned {} conflicts for userId={}", warnings.size(), userId);
                warningMessage.append("Conflicting events: ");
                warningMessage.append(String.join(", ", warnings));
                warningMessage.append(".");
            }

            if (!warningMessage.isEmpty()) {
                String finalWarning = warningMessage.toString().trim();
                invitationResponse.setWarning(finalWarning);
                log.info("Added warning for userId={}: {}", userId, finalWarning);
            } else {
                log.info("No warning for userId={} from {} to {}", userId, start, end);
            }
        }

        return response;
    }



    @Override
    public void acceptInvitation(Long id) {
        log.info("Service: Accepting invitation with id {}", id);
        Invitation invitation = findByIdForServices(id);
        User receiver = invitation.getReceiver();
        Event event = invitation.getEvent();
        event.addUser(receiver);
        taskAssignmentService.assignTasksForNewUserFromEvent(event.getId(), receiver.getId());
        notificationServices.create(new Notification(List.of(invitation.getSender()),
                "User " + receiver.getFirstName() + " " +
                        receiver.getLastName() + " accepted your invitation"));
        invitationRepository.deleteById(id);
    }

    @Override
    public void rejectInvitation(Long id) {
        log.info("Service: Rejecting invitation with id {}", id);
        Invitation invitation = findByIdForServices(id);
        User receiver = invitation.getReceiver();
        notificationServices.create(new Notification(List.of(invitation.getSender()),
                "User " + receiver.getFirstName() + " " +
                        receiver.getLastName() + " reject your invitation"));
        invitationRepository.deleteById(id);
    }

    @Override
    public void changeCreatorToDeletedUser(long userId) {
        log.info("Service: Changing creator to deleted user with id {}", userId);
        List<Invitation> invitationsFromDeletedUser = invitationRepository.findAllBySender_Id(userId);
        User deleted = userService.findByEmail("!deleted-user!@deleted.com");
        for(Invitation invitation : invitationsFromDeletedUser) {
            invitation.setSender(deleted);
        }
        invitationRepository.saveAll(invitationsFromDeletedUser);
    }


    private Invitation findByIdForServices(Long id) {
        log.info("Service: Finding private invitation with id {}", id);
        return invitationRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Invitation not found"));
    }
}
