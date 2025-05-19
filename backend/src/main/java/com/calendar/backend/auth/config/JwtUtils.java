package com.calendar.backend.auth.config;

import com.calendar.backend.auth.models.RefreshToken;
import com.calendar.backend.auth.services.inter.RefreshTokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtUtils {

    @Value("${SECRET}")
    private String jwtSecret;

    @Value("${JWT_TIME}")
    private long jwtExpirationMs;

    private final RefreshTokenService refreshTokenService;

    public JwtUtils(RefreshTokenService refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }

    private static final String ISSUER = "com.todo.app";
    private static final String AUDIENCE = "todo-users";


    public String generateTokenFromUsername(String username, Map<String, Object> claims) {
        log.info("Auth: generate token for user: {}", username);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuer(ISSUER)
                .setAudience(AUDIENCE)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS256, getSignInKey())
                .compact();
    }

    public boolean isTokenExpired(String token) {
        try {
            return parseClaims(token).getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }

    public boolean isRefreshTokenExpired(RefreshToken token) {
        return token.getExpirationTimestamp().isBefore(LocalDateTime.now());
    }

    public String refreshAccessToken(String username, String token) {
        log.info("Auth: try to refresh access token(jwt) for user: {}", username);
        Map<String, Object> claims = new HashMap<>();
        claims.put("token", token);
        return generateTokenFromUsername(username, claims);
    }

    private Claims parseClaims(String token) {
        log.info("Auth: try to parse claims from token");
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getSignInKey())
                    .parseClaimsJws(token)
                    .getBody();

            if (!ISSUER.equals(claims.getIssuer()) || !AUDIENCE.equals(claims.getAudience())) {
                log.error("Auth: Invalid issuer or audience");
                throw new IllegalArgumentException("Invalid token claims");
            }

            return claims;
        } catch (ExpiredJwtException e) {
            log.warn("Auth: Token has expired: {}", e.getMessage());
            return e.getClaims();
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid token", e);
        }
    }

    private Key getSignInKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = parseClaims(token);

            if (!ISSUER.equals(claims.getIssuer())) {
                log.error("Auth: Invalid issuer: {}", claims.getIssuer());
                return false;
            }
            if (!AUDIENCE.equals(claims.getAudience())) {
                log.error("Auth: Invalid audience: {}", claims.getAudience());
                return false;
            }

            String username = this.getSubject(token);

            Map<String, Object> claimsToCheck = new HashMap<>();
            claimsToCheck.put("token", refreshTokenService.findByUsername(username).orElseThrow(() ->
                    new EntityNotFoundException("Can`t find refresh token to validate jwt")).getToken());

            for (Map.Entry<String, Object> entry : claimsToCheck.entrySet()) {
                String key = entry.getKey();
                Object expectedValue = entry.getValue();
                Object actualValue = claims.get(key);

                if (actualValue == null || !actualValue.equals(expectedValue)) {
                    log.error("Auth: Claim mismatch: key = {}, expected = {}, actual = {}",
                            key, expectedValue, actualValue);
                    return false;
                }
            }

            return true;
        } catch (Exception e) {
            log.error("Auth: Token validation failed: {}", e.getMessage());
            return false;
        }
    }
}