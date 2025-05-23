package com.calendar.backend.repositories;

import com.calendar.backend.models.TaskAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface TaskAssignmentRepository extends JpaRepository<TaskAssignment, Long>, JpaSpecificationExecutor<TaskAssignment> {

    Optional<TaskAssignment> findByTask_IdAndUser_Id(Long taskId, Long userId);

    void deleteByTask_IdAndUser_Id(Long taskId, Long userId);

    void deleteAllByTask_Id(Long taskId);

    void deleteAllByUser_Id(Long userId);
}
