package com.calendar.backend.repositories;

import com.calendar.backend.models.Event;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {
    @Query(value = "SELECT e.* FROM events e " +
            "JOIN users_events ue ON e.id = ue.event_id " +
            "WHERE ue.user_id = :userId " +
            "AND e.start_date >= :startDate " +
            "AND e.end_date <= :endDate",
            nativeQuery = true)
    List<Event> findAllByUserIdAndDateRange(Long userId, LocalDateTime startDate,
                                            LocalDateTime endDate, Sort sort);

    @Query(value =
            "SELECT count(e.id)" +
                    "FROM events e INNER JOIN users_events ue ON e.id=ue.event_id " +
                    "WHERE ue.user_id = :userId " +
                    "AND e.end_date <= :now", nativeQuery = true)
    Long countAllByUserAndPast(long userId, LocalDateTime now);

    @Query(value = "SELECT e.name FROM events e " +
            "JOIN users_events ue ON e.id = ue.event_id " +
            "WHERE ue.user_id = :userId " +
            "AND e.start_date >= :startDate " +
            "AND e.end_date <= :endDate",
            nativeQuery = true)
    List<String> existWarningInvitation(long userId, LocalDateTime start, LocalDateTime end);
}
