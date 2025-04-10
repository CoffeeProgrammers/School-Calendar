package com.calendar.backend.repositories;

import com.calendar.backend.models.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {
    Page<Task> findAllByEvent_Id(Long eventId, Pageable pageable);
    List<Task> findAllByEvent_Id(Long eventId);
    @Query(value = """
        SELECT t.* 
        FROM tasks t
        JOIN task_assignments ta ON t.id = ta.task_id
        WHERE ta.user_id = :userId
        """, nativeQuery = true)
    Page<Task> findAllByUserId(@Param("userId") Long userId, Specification<Task> taskSpecification,
                                 Pageable pageable);

    Page<Task> findAllByCreator_IdAndEventIsEmpty(long creatorId, Pageable pageable);
}
