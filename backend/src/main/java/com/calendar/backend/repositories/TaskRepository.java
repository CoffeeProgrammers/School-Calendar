package com.calendar.backend.repositories;

import com.calendar.backend.models.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {
    Page<Task> findAllByEvent_Id(Long eventId, Pageable pageable);
    List<Task> findAllByEvent_Id(Long eventId);
    Page<Task> findAllByCreator_IdAndEventIsEmpty(long creator_id, Pageable pageable);
}
