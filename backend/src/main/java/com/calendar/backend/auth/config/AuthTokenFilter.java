package com.calendar.backend.auth.config;

import com.calendar.backend.auth.models.RefreshToken;
import com.calendar.backend.auth.services.impl.RefreshTokenServiceImpl;
import com.calendar.backend.services.impl.UserServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;


@Slf4j
@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final UserServiceImpl userDetailsService;
    private final RefreshTokenServiceImpl refreshTokenService;

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
            if (hasAuthorizationBearer(request)) {
                String token = getAccessToken(request);

                if (!jwtUtils.validateToken(token)) {
                    log.warn("Invalid JWT token");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    setHeaders(response);
                    return;
                }

                String username = jwtUtils.getSubject(token);

                if (jwtUtils.isTokenExpired(token)) {
                    log.warn("Access token expired, refreshing...");

                    RefreshToken refreshToken = refreshTokenService.findByUsername(username);
                    if (refreshToken == null || jwtUtils.isRefreshTokenExpired(refreshToken)) {
                        log.warn("Refresh token is expired or missing");
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        setHeaders(response);
                        return;
                    }

                    String newAccessToken = jwtUtils.refreshAccessToken(username);
                    response.setHeader("Authorization", "Bearer " + newAccessToken);
                    response.setStatus(498);
                    setHeaders(response);

                    ObjectMapper mapper = new ObjectMapper();
                    Map<String, String> json = new HashMap<>();
                    json.put("jwt", newAccessToken);

                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");

                    PrintWriter out = response.getWriter();
                    out.print(mapper.writeValueAsString(json));
                    out.flush();


                    refreshTokenService.deleteAllByUsername(username);
                    refreshTokenService.createRefreshToken(username);
                    return;
                } else {
                    setAuthenticationContext(token, request);
                }
            }
        } catch (Exception e) {
            log.error("An error occurred during JWT token processing", e);
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