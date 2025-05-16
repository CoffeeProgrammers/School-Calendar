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
    boolean existsByReceiver_IdAndEvent_Id(Long userId, Long eventId);
    List<Invitation> findAllByReceiver_IdAndEvent_StartDateAfterAndEvent_EndDateBefore
            (long receiver_id, LocalDateTime event_startDate, LocalDateTime event_endDate);
}
