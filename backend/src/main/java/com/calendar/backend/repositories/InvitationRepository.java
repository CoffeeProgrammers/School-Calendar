package com.calendar.backend.repositories;

import com.calendar.backend.models.Invitation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Page<Invitation> findAllByReceiver_Id(Long userId, Pageable pageable);
}
