package com.calendar.backend.auth.controllers;

import com.calendar.backend.auth.config.JwtUtils;
import com.calendar.backend.auth.dto.AuthResponse;
import com.calendar.backend.auth.dto.LogInRequest;
import com.calendar.backend.auth.services.impl.RefreshTokenServiceImpl;
import com.calendar.backend.dto.wrapper.StringRequest;
import com.calendar.backend.models.User;
import com.calendar.backend.services.inter.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final RefreshTokenServiceImpl refreshTokenService;
    private final UserService userService;
    private final JwtUtils jwtUtils;


    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/checks")
    public boolean checkEmail(@RequestBody StringRequest requestEmail) {
        userService.loadUserByUsername(requestEmail.getText());
        return true;
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid LogInRequest loginRequest) {
        log.info("Login user {}", loginRequest);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));
        User user = (User) authentication.getPrincipal();

        String username =user.getUsername();

        refreshTokenService.deleteAllByUsername(username);
        String token = refreshTokenService.createRefreshToken(username);

        Map<String, Object> claims = new HashMap<>();
        claims.put("token", token);

        String jwtToken = jwtUtils.generateTokenFromUsername(username, claims);

        return new AuthResponse(user.getId(), username, jwtToken,
                user.getRole().getAuthority());
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/logout")
    public void logout(Authentication authentication) {
        log.info("Logout user {}", authentication);
        refreshTokenService.deleteAllByUsername(userService.findUserByAuth(authentication).getUsername());
    }
}
