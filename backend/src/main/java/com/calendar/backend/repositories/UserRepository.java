package com.calendar.backend.repositories;

import com.calendar.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @Query(value = "SELECT users.* FROM users users " +
            "JOIN users_events ue ON users.id = ue.user_id " +
            "WHERE ue.event_id = :eventId",
            nativeQuery = true)
    List<User> findAllByEventId(Long eventId);
}