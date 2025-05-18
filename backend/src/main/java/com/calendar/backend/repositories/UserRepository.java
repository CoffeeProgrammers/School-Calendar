package com.calendar.backend.repositories;

import com.calendar.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
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

    @Query(value = "SELECT u.* " +
            "FROM users u " +
            "INNER JOIN users_events eu ON u.id = eu.user_id " +
            "INNER JOIN events e ON e.id = eu.event_id " +
            "WHERE e.end_date <= :now " +
            "GROUP BY u.id " +
            "ORDER BY COUNT(e.id) DESC " +
            "LIMIT 5", nativeQuery = true)
    List<User> findTop5UsersByUpcomingEvents(LocalDateTime now);
}