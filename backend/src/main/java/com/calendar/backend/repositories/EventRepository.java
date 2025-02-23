package com.calendar.backend.repositories;

import com.calendar.backend.models.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {
    @Query(value = "SELECT e.* FROM events e " +
            "JOIN users_events ue ON e.id = ue.event_id " +
            "WHERE ue.user_id = :userId",
            nativeQuery = true)
    Page<Event> findAllByUserId(Long userId, Specification<Event> eventSpecification, Pageable pageable);

    @Query(value = "SELECT e.* FROM events e " +
            "JOIN users_events ue ON e.id = ue.event_id " +
            "WHERE ue.user_id = :userId " +
            "AND e.start_date >= :startDate " +
            "AND e.end_date <= :endDate",
            nativeQuery = true)
    Page<Event> findAllByUserIdAndDateRange(Long userId, LocalDateTime startDate,
                                            LocalDateTime endDate, Pageable pageable);
}
