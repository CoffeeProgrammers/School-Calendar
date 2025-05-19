package com.calendar.backend.auth.services.inter;

import com.calendar.backend.auth.models.RefreshToken;

import java.util.Optional;

public interface RefreshTokenService {
    String createRefreshToken(String username);
    void deleteAllByUsername(String username);
    Optional<RefreshToken> findByUsername(String username);
}
