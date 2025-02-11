package com.calendar.backend.auth.services.inter;

import com.calendar.backend.models.User;
import org.springframework.security.core.Authentication;

import javax.security.auth.login.LoginException;

public interface AuthService {
    User getAuth(Authentication auth);
    User handleOAuthLogin(Authentication authentication) throws LoginException;
}
