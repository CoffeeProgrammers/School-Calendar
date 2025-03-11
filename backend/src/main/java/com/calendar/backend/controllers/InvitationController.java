package com.calendar.backend.controllers;

import com.calendar.backend.dto.invitation.InvitationRequest;
import com.calendar.backend.dto.invitation.InvitationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.InvitationService;
import com.calendar.backend.services.inter.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events/{event_id}/invitations")
@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;
    private final UserService userService;

    @PostMapping("/create/receivers/{receiver_id}")
    @ResponseStatus(HttpStatus.CREATED)
    public InvitationResponse createInvitation(
            @PathVariable Long event_id,
            @PathVariable Long receiver_id,
            @RequestBody InvitationRequest request,
            Authentication auth) {
        return invitationService.create(request, auth, event_id, receiver_id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public InvitationResponse updateInvitation(
            @PathVariable Long id,
            @RequestBody InvitationRequest request) {
        return invitationService.update(id, request);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInvitation(@PathVariable Long id) {
        invitationService.delete(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<InvitationResponse> getAllInvitations(
            @RequestParam int page,
            @RequestParam int size,
            Authentication auth) {
        return invitationService.findAllByRecieverId(
                userService.findUserByAuth(auth).getId(),
                page,
                size
        );
    }

    @PostMapping("/accept/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void acceptInvitation(@PathVariable Long id) {
        invitationService.acceptInvitation(id);
    }

    @PostMapping("/reject/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void rejectInvitation(@PathVariable Long id) {
        invitationService.rejectInvitation(id);
    }

}

