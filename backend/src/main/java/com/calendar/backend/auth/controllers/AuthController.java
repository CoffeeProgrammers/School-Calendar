package com.calendar.backend.auth.controllers;

import com.calendar.backend.auth.DTOs.auth.AuthResponse;
import com.calendar.backend.auth.DTOs.auth.LogInRequest;
import com.calendar.backend.auth.DTOs.string.RequestString;
import com.calendar.backend.auth.config.JwtUtils;
import com.calendar.backend.auth.services.impl.RefreshTokenServiceImpl;
import com.calendar.backend.auth.services.inter.AuthService;
import com.calendar.backend.DTOs.user.UserFullResponse;
import com.calendar.backend.mappers.UserMapper;
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

import javax.security.auth.login.LoginException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenServiceImpl refreshTokenService;
    private final JwtUtils jwtUtils;
    private final UserMapper userMapper;
    private final AuthService authService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/checksEmail")
    public boolean checkEmail(@RequestBody RequestString requestEmail) {
        return userService.existsByEmail(requestEmail.getValue());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/getAuth")
    public UserFullResponse getAuth(Authentication authentication) {
        return userMapper.fromUserToUserResponse(authService.getAuth(authentication));
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid LogInRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));
        User user = (User) authentication.getPrincipal();

        Map<String, Object> claims = new HashMap<>();
        claims.put("token", user.getToken());
        claims.put("name", user.getFirstName() + " " + user.getLastName());

        String jwtToken = jwtUtils.generateTokenFromUsername(user.getUsername(), claims);
        refreshTokenService.deleteAllByUsername(user.getUsername());
        refreshTokenService.createRefreshToken(user.getUsername());

        return new AuthResponse(user.getId(), user.getUsername(), jwtToken,
                user.getRole().getAuthority());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/oauth-success")
    public AuthResponse handleOAuthLogin(Authentication authentication) throws LoginException {
        log.info("try to work oauth-success");

        User user = authService.handleOAuthLogin(authentication);

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getFirstName() + " " + user.getLastName());

        String jwtToken = jwtUtils.generateTokenFromUsername(user.getEmail(), claims);

        return new AuthResponse(user.getId(), user.getEmail(), jwtToken,
                user.getRole().getAuthority());
    }
}
