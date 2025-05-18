package com.calendar.backend.repositories;

import com.calendar.backend.models.Invitation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Page<Invitation> findAllByReceiver_Id(Long userId, Pageable pageable);
    Page<Invitation> findAllBySender_Id(Long userId, Pageable pageable);
    List<Invitation> findAllBySender_Id(Long userId);
    boolean existsByReceiver_IdAndEvent_Id(Long userId, Long eventId);
    boolean existsByReceiver_IdAndEvent_StartDateLessThanAndEvent_EndDateGreaterThan(
            Long userId, LocalDateTime endDate, LocalDateTime startDate);
}
