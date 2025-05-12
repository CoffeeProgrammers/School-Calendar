package com.calendar.backend.auth.services.impl;

import com.calendar.backend.auth.models.RefreshToken;
import com.calendar.backend.auth.repositories.RefreshTokenRepository;
import com.calendar.backend.auth.services.inter.RefreshTokenService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${RT_TIME}")
    private Long refreshTokenExpirationMs;

    private final RefreshTokenRepository repository;

    public RefreshTokenServiceImpl(RefreshTokenRepository repository) {
        this.repository = repository;
    }

    public String createRefreshToken(String username) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expirationTime = LocalDateTime.now().plusNanos(refreshTokenExpirationMs * 1_000_000);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(token);
        refreshToken.setUsername(username);
        refreshToken.setExpirationTimestamp(expirationTime);

        repository.save(refreshToken);
        return token;
    }

    public Optional<RefreshToken> findByToken(String token) {
        return repository.findByToken(token);
    }

    @Transactional
    public void deleteAllByUsername(String username) {
        repository.deleteAllByUsername(username);
    }

    public Optional<RefreshToken> findByUsername(String username) {
        return repository.findByUsername(username);
    }
}