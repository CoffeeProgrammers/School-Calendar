package com.calendar.backend.auth.config;

import com.calendar.backend.auth.models.RefreshToken;
import com.calendar.backend.auth.services.impl.RefreshTokenServiceImpl;
import com.calendar.backend.services.impl.UserServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;


@Slf4j
@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private final RefreshTokenServiceImpl refreshTokenService;
    private final UserServiceImpl userDetailsService;
    private final JwtUtils jwtUtils;

    public AuthTokenFilter(JwtUtils jwtUtils, UserServiceImpl userDetailsService,
                           RefreshTokenServiceImpl refreshTokenService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
        this.refreshTokenService = refreshTokenService;
    }


    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            log.info("Auth: Processing request");
            if (hasAuthorizationBearer(request)) {
                log.info("Auth: Processing JWT token");
                String token = getAccessToken(request);

                if (!jwtUtils.validateToken(token)) {
                    log.error("Auth: Invalid JWT token");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    setHeaders(response);
                    return;
                }

                log.info("Auth: Valid JWT token");
                String username = jwtUtils.getSubject(token);

                if (jwtUtils.isTokenExpired(token)) {
                    log.warn("Auth: Access token expired, refreshing...");

                    Optional<RefreshToken> refreshToken = refreshTokenService.findByUsername(username);

                    if (refreshToken.isEmpty() || jwtUtils.isRefreshTokenExpired(refreshToken.get())) {
                        log.error("Auth: Refresh token is expired or missing");
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        setHeaders(response);
                        return;
                    }

                    log.info("Auth: Refresh token is valid, refreshing access token");

                    String newAccessToken = jwtUtils.refreshAccessToken(username, refreshToken.get().getToken());
                    response.setStatus(498);
                    setHeaders(response);

                    response.setHeader("Set-Cookie", "accessToken=" + newAccessToken + ";Path=/;");
                    response.setCharacterEncoding("UTF-8");

                    return;
                } else {
                    log.info("Auth: Access token is valid and doesn`t expire");
                    setAuthenticationContext(token, request);
                }
            }
        } catch (Exception e) {
            log.error("Auth: An error occurred during JWT token processing", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        filterChain.doFilter(request, response);
    }

    private void setHeaders(HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Methods", "*");
    }

    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        return header.substring(7);
    }

    private boolean hasAuthorizationBearer(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        return !ObjectUtils.isEmpty(header) && header.startsWith("Bearer ");
    }

    private void setAuthenticationContext(String token, HttpServletRequest request) {
        UserDetails userDetails = getUserDetails(token);
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    private UserDetails getUserDetails(String token) {
        String jwtSubject = jwtUtils.getSubject(token);
        return userDetailsService.loadUserByUsername(jwtSubject);
    }
}