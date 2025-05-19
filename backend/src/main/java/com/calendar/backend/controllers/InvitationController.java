package com.calendar.backend.controllers;

import com.calendar.backend.dto.invitation.InvitationRequest;
import com.calendar.backend.dto.invitation.InvitationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.InvitationService;
import com.calendar.backend.services.inter.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/invitations")
@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;
    private final UserService userService;


    @PreAuthorize("@userSecurity.checkCreatorOfEvent(#auth, #eventId)")
    @PostMapping("/create/events/{event_id}/receivers/{receiver_id}")
    @ResponseStatus(HttpStatus.CREATED)
    public InvitationResponse createInvitation(
            @PathVariable(value = "event_id") Long eventId,
            @PathVariable(value = "receiver_id") Long receiverId,
            @Valid @RequestBody InvitationRequest request,
            Authentication auth) {
        log.info("Controller: Create invitation for event with id: {} to user with id: {}", eventId, receiverId);
        return invitationService.create(request, auth, eventId, receiverId);
    }

    @PreAuthorize("@userSecurity.checkCreatorOfInvitation(#auth, #id)")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public InvitationResponse updateInvitation(
            @PathVariable Long id,
            @RequestBody InvitationRequest request,
            Authentication auth) {
        log.info("Controller: Update invitation with id: {}", id);
        return invitationService.update(id, request);
    }

    @PreAuthorize("@userSecurity.checkCreatorOfInvitation(#auth, #id)")
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInvitation(@PathVariable Long id, Authentication auth) {
        log.info("Controller: Delete invitation with id: {}", id);
        invitationService.delete(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<InvitationResponse> getAllInvitations(
            @RequestParam int page,
            @RequestParam int size,
            Authentication auth) {
        log.info("Controller: Get all invitations for user with id: {}", userService.findUserByAuth(auth).getId());
        return invitationService.findAllByReceiverId(auth, page, size);
    }

    @GetMapping("/getMySent")
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<InvitationResponse> getMySentInvitations(
            @RequestParam int page,
            @RequestParam int size,
            Authentication auth) {
        log.info("Controller: Get all sent invitations by my user");
        return invitationService.findAllBySenderId(auth, page, size);
    }

    @PreAuthorize("@userSecurity.checkReceiverOfInvitation(#auth, #id)")
    @PostMapping("/accept/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void acceptInvitation(@PathVariable Long id, Authentication auth) {
        log.info("Controller: Accept invitation with id: {}", id);
        invitationService.acceptInvitation(id);
    }

    @PreAuthorize("@userSecurity.checkReceiverOfInvitation(#auth, #id)")
    @PostMapping("/reject/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void rejectInvitation(@PathVariable Long id, Authentication auth) {
        log.info("Controller: Reject invitation with id: {}", id);
        invitationService.rejectInvitation(id);
    }
}