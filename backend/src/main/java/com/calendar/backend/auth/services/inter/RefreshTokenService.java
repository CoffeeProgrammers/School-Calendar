package com.calendar.backend.auth.services.inter;

import com.calendar.backend.auth.models.RefreshToken;

import java.util.Optional;

public interface RefreshTokenService {
    String createRefreshToken(String username);
    Optional<RefreshToken> findByToken(String token);
    void deleteAllByUsername(String username);
}
