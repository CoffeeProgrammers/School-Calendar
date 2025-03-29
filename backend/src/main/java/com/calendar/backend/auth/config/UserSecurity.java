package com.calendar.backend.auth.config;

import com.calendar.backend.services.inter.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component("userSecurity")
@RequiredArgsConstructor
public class UserSecurity {

    private final UserService userService;
    private final EventService eventService;
    private final CommentService commentService;
    private final TaskService taskService;
    private final InvitationService invitationService;

    private boolean checkUser(Authentication authentication, String username) {
        UserDetails user = (UserDetails) authentication.getPrincipal();
        String authenticatedUserEmail = user.getUsername();
        return authenticatedUserEmail.equals(username);
    }

    public boolean checkCreatorOfEvent(Authentication authentication, long eventId) {
        return this.checkUser(authentication,
                eventService.findByIdForServices(eventId).getCreator().getEmail());
    }

    public boolean checkCreatorOfComment(Authentication authentication, long commentId) {
        return this.checkUser(authentication,
                commentService.findByIdForService(commentId).getCreator().getEmail());
    }

    public boolean checkCreatorOfTask(Authentication authentication, long taskId) {
        return this.checkUser(authentication,
                taskService.findByIdForServices(taskId).getCreator().getEmail());
    }

    public boolean checkCreatorOfInvitation(Authentication authentication, long invitationId) {
        return this.checkUser(authentication,
                invitationService.findById(invitationId).getSender().getEmail());
    }

    public boolean checkReceiverOfInvitation(Authentication authentication, long invitationId) {
        return this.checkUser(authentication,
                invitationService.findById(invitationId).getReceiver().getEmail());
    }
}
