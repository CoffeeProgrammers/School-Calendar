package com.calendar.backend.auth.repositories;

import com.calendar.backend.auth.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    void deleteAllByUsername(String username);
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUsername(String token);
}
