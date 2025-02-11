package com.calendar.backend.auth.config;

import com.calendar.backend.auth.models.RefreshToken;
import com.calendar.backend.app.models.User;
import com.calendar.backend.app.services.impl.UserServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
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

    private final UserServiceImpl userService;

    public JwtUtils(UserServiceImpl userService) {
        this.userService = userService;
    }

    private static final String ISSUER = "com.todo.app";
    private static final String AUDIENCE = "todo-users";

    public String generateTokenFromUsername(String username, Map<String, Object> claims) {
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

    public String refreshAccessToken(String currentToken, String username) {
        Claims claims = parseClaims(currentToken);
        if (isTokenExpired(currentToken)) {
            return generateTokenFromUsername(username, claims);
        }
        return currentToken;
    }

    private Claims parseClaims(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getSignInKey())
                    .parseClaimsJws(token)
                    .getBody();

            if (!ISSUER.equals(claims.getIssuer()) || !AUDIENCE.equals(claims.getAudience())) {
                throw new IllegalArgumentException("Invalid token claims");
            }

            return claims;
        } catch (ExpiredJwtException e) {
            System.out.println("Token has expired: " + e.getMessage());
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

            // Validate standard claims
            if (!ISSUER.equals(claims.getIssuer())) {
                System.out.println("Invalid issuer: " + claims.getIssuer());
                return false;
            }
            if (!AUDIENCE.equals(claims.getAudience())) {
                System.out.println("Invalid audience: " + claims.getAudience());
                return false;
            }

            // Extract user details
            String username = this.getSubject(token);
            User user = userService.findByEmail(username);

            // Prepare expected claims
            Map<String, Object> claimsToCheck = new HashMap<>();
            claimsToCheck.put("token", user.getToken());
            claimsToCheck.put("name", user.getFirstName() + " " + user.getLastName());

            // Validate claims in token
            for (Map.Entry<String, Object> entry : claimsToCheck.entrySet()) {
                String key = entry.getKey();
                Object expectedValue = entry.getValue();
                Object actualValue = claims.get(key);

                if (actualValue == null || !actualValue.equals(expectedValue)) {
                    System.out.println("Claim mismatch: key = " + key + ", expected = "
                            + expectedValue + ", actual = " + actualValue);
                    return false;
                }
            }

            return true; // All validations passed
        } catch (Exception e) {
            System.out.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }
}