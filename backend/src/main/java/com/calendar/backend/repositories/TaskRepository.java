package com.calendar.backend.repositories;

import com.calendar.backend.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

    List<Task> findAllByEvent_Id(Long eventId);

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
