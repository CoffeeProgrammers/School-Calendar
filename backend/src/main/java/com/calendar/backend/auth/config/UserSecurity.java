package com.calendar.backend.auth.config;

import com.calendar.backend.services.inter.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicBoolean;

@Slf4j
@Component("userSecurity")
@RequiredArgsConstructor
public class UserSecurity {

    private final UserService userService;
    private final EventService eventService;
    private final CommentService commentService;
    private final TaskService taskService;
    private final InvitationService invitationService;

    private boolean checkUser(Authentication authentication, String username) {
        log.info("preAuth: Checking user {}", username);
        UserDetails user = (UserDetails) authentication.getPrincipal();
        String authenticatedUserEmail = user.getUsername();
        return authenticatedUserEmail.equals(username);
    }

    public boolean checkCreatorOfEvent(Authentication authentication, long eventId) {
        log.info("preAuth: Checking creator of event {}", eventId);
        return this.checkUser(authentication,
                eventService.findByIdForServices(eventId).getCreator().getEmail());
    }

    public boolean checkCreatorOfComment(Authentication authentication, long commentId) {
        log.info("preAuth: Checking creator of comment {}", commentId);
        return this.checkUser(authentication,
                commentService.findByIdForServices(commentId).getCreator().getEmail());
    }

    public boolean checkCreatorOfTask(Authentication authentication, long taskId) {
        log.info("preAuth: Checking creator of task {}", taskId);
        return this.checkUser(authentication,
                taskService.findByIdForServices(taskId).getCreator().getEmail());
    }

    public boolean checkCreatorOfInvitation(Authentication authentication, long invitationId) {
        log.info("preAuth: Checking creator of invitation {}", invitationId);
        return this.checkUser(authentication,
                invitationService.findById(invitationId).getSender().getEmail());
    }

    public boolean checkReceiverOfInvitation(Authentication authentication, long invitationId) {
        log.info("preAuth: Checking receiver of invitation {}", invitationId);
        return this.checkUser(authentication,
                invitationService.findById(invitationId).getReceiver().getEmail());
    }

    public boolean checkUserInPart(Authentication authentication, long eventId) {
        log.info("preAuth: Checking user in participations {}", eventId);
        AtomicBoolean isUserInPart = new AtomicBoolean(false);
        eventService.findByIdForServices(eventId).getUsers().forEach(user -> {
            if (this.checkUser(authentication, user.getEmail())) {
                isUserInPart.set(true);
            }
        });
        return isUserInPart.get();
    }
}
