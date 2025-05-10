package com.calendar.backend.services.impl;

import com.calendar.backend.dto.event.EventListResponse;
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
    private final UserService userServices;
    private final EventService eventService;
    private final TaskAssignmentService taskAssignmentService;

    @Override
    public InvitationResponse create(InvitationRequest invitationRequest, Authentication authentication,
                                     long eventId, long receiverId) {
        log.info("Saving new invitation {}", invitationRequest);
        Invitation invitation = invitationMapper.fromInvitationRequestToInvitation(invitationRequest);
        Event event = eventService.findByIdForServices(eventId);
        invitation.setEvent(event);
        invitation.setSender(userServices.findUserByAuth(authentication));
        invitation.setReceiver(userServices.findByIdForServices(receiverId));
        invitation.setTime(LocalDateTime.now(ZoneId.of("Europe/Kiev")));
        List<EventListResponse> events = eventService.findAllByUserIdForCalendar(receiverId,
                event.getStartDate(), event.getEndDate());
        if(!events.isEmpty()){
            StringBuilder text = new StringBuilder();
            for(EventListResponse eventResponse : events){
                text.append(eventResponse.getName()).append(" ");
            }
            invitation.setWarning("You have already invited to events on this time" + text.toString());
        }
        return invitationMapper.fromInvitationToInvitationResponse(invitationRepository.save(invitation));
    }

    @Override
    public InvitationResponse update(long invitationId, InvitationRequest invitationRequest) {
        log.info("Updating invitation with id {}", invitationId);
        Invitation invitation = findInvitationById(invitationId);
        invitation.setDescription(invitationRequest.getDescription());
        return invitationMapper.fromInvitationToInvitationResponse(invitation);
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting invitation with id {}", id);
        invitationRepository.deleteById(id);
    }

    @Override
    public InvitationResponse findById(Long id) {
        log.info("Finding for controller invitation with id {}", id);
        return invitationMapper.fromInvitationToInvitationResponse(findInvitationById(id));
    }

    @Override
    public PaginationListResponse<InvitationResponse> findAllBySenderId(Authentication authentication, int page, int size) {
        log.info("Finding all invitations from auth user with id");
        Page<Invitation> invitations = invitationRepository.findAllBySender_Id
                (userServices.findUserByAuth(authentication).getId(),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "time")));
        PaginationListResponse<InvitationResponse> response = new PaginationListResponse<>();
        response.setTotalPages(invitations.getTotalPages());
        response.setContent(invitations.getContent().stream().map(
                invitationMapper::fromInvitationToInvitationResponse).toList());
        return response;
    }

    @Override
    public PaginationListResponse<InvitationResponse> findAllByRecieverId(long userId, int page, int size) {
        log.info("Finding all invitations for user with id {}", userId);
        Page<Invitation> invitations = invitationRepository.findAllByReceiver_Id(userId,
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "time")));
        PaginationListResponse<InvitationResponse> response = new PaginationListResponse<>();
        response.setTotalPages(invitations.getTotalPages());
        response.setContent(invitations.getContent().stream().map(
                invitationMapper::fromInvitationToInvitationResponse).toList());
        return response;
    }

    @Override
    public void acceptInvitation(Long id) {
        log.info("Accepting invitation with id {}", id);
        Invitation invitation = findInvitationById(id);
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
        log.info("Rejecting invitation with id {}", id);
        Invitation invitation = findInvitationById(id);
        User receiver = invitation.getReceiver();
        notificationServices.create(new Notification(List.of(invitation.getSender()),
                "User " + receiver.getFirstName() + " " +
                        receiver.getLastName() + " reject your invitation"));
        invitationRepository.deleteById(id);
    }

    private Invitation findInvitationById(Long id) {
        log.info("Finding private invitation with id {}", id);
        return invitationRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Invitation not found"));
    }
}
