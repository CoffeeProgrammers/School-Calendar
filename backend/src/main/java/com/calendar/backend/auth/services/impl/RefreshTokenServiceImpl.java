package com.calendar.backend.auth.services.impl;

import com.calendar.backend.auth.models.RefreshToken;
import com.calendar.backend.auth.repositories.RefreshTokenRepository;
import com.calendar.backend.auth.services.inter.RefreshTokenService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${RT_TIME}")
    private Long refreshTokenExpirationMs;

    private final RefreshTokenRepository repository;

    public RefreshTokenServiceImpl(RefreshTokenRepository repository) {
        this.repository = repository;
    }

    public String createRefreshToken(String username) {
        log.info("create refresh token for user: {}", username);
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
        log.info("try to find refresh token by token: {}", token);
        return repository.findByToken(token);
    }

    @Transactional
    public void deleteAllByUsername(String username) {
        log.info("delete all refresh tokens for user: {}", username);
        repository.deleteAllByUsername(username);
    }

    public Optional<RefreshToken> findByUsername(String username) {
        log.info("try to find refresh token by username: {}", username);
        return repository.findByUsername(username);
    }
}