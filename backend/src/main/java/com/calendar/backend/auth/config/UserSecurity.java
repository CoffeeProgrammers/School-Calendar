package com.calendar.backend.auth.config;

import com.calendar.backend.main.services.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component("userSecurity")
@RequiredArgsConstructor
public class UserSecurity {

    private final UserServiceImpl userService;

    private boolean checkUser(Authentication authentication, long userId) {
        UserDetails user = (UserDetails) authentication.getPrincipal();
        String authenticatedUserEmail = user.getUsername();
        String ownEmail = userService.findById(userId).getEmail();
        return authenticatedUserEmail.equals(ownEmail);
    }
}
