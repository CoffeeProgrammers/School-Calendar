package com.calendar.backend.repositories;

import com.calendar.backend.models.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {
    Page<Task> findAllByEvent_Id(Long eventId, Pageable pageable);
    List<Task> findAllByEvent_Id(Long eventId);
    Page<Task> findAllByCreator_IdAndEventIsEmpty(long creator_id, Pageable pageable);
    @Query(value =
            "SELECT count(t.id)" +
            "FROM tasks t inner join task_assignments ta on t.id=ta.task_id " +
            "WHERE ta.user_id = :userId"
    , nativeQuery = true)
    Long countAllByUserId(long userId);
    @Query(value =
            "SELECT count(t.id)" +
                    "FROM tasks t inner join task_assignments ta on t.id=ta.task_id " +
                    "WHERE ta.user_id = :userId AND ta.is_done = true"
            , nativeQuery = true)
    Long countAllByUserIdAndDone(long userId);
}
