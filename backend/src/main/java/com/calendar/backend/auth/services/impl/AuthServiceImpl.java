package com.calendar.backend.auth.services.impl;

import com.calendar.backend.auth.config.JwtUtils;
import com.calendar.backend.auth.services.inter.AuthService;
import com.calendar.backend.auth.services.inter.RefreshTokenService;
import com.calendar.backend.main.models.User;
import com.calendar.backend.main.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.security.SecureRandom;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {
    private RefreshTokenService refreshTokenService;
    private UserService userService;
    private final JwtUtils jwtUtils;

    @Override
    public User getAuth(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return userService.findByEmail(user.getEmail());
    }

    @Override
    public User handleOAuthLogin(Authentication authentication) throws LoginException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");
        String password = IntStream.range(0, 15)
                .mapToObj(i -> "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=<>?/".charAt(new SecureRandom().nextInt(72)) + "")
                .collect(Collectors.joining());

        User user;

        try {
            user = userService.findByEmail(email);
        }catch (EntityNotFoundException ex){
            throw new LoginException("You don`t have such account with this email");
        }

        refreshTokenService.deleteAllByUsername(user.getUsername());
        refreshTokenService.createRefreshToken(user.getUsername());
        return user;
    }
}
