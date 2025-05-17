package com.calendar.backend.repositories;

import com.calendar.backend.models.TaskAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskAssignmentRepository extends JpaRepository<TaskAssignment, Long> {
    Optional<TaskAssignment> findByTask_IdAndUser_Id(Long taskId, Long userId);
    void deleteAllByTask_Id(Long taskId);
    void deleteByTask_IdAndUser_Id(Long taskId, Long userId);
}
