package com.calendar.backend.repositories.specification;

import com.calendar.backend.models.Task;
import com.calendar.backend.models.TaskAssignment;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TaskAssignmentsSpecification {
    public static Specification<TaskAssignment> filterTaskAssignments(Map<String, Object> filters) {
        return (Root<TaskAssignment> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            if (filters == null || filters.isEmpty()) {
                return null;
            }
            List<Predicate> predicates = new ArrayList<>();

            Join<TaskAssignment, Task> taskJoin = root.join("task", JoinType.INNER);

            if (filters.containsKey("name")) {
                String name = (String) filters.get("name");
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(taskJoin.get("name")), "%" + name.toLowerCase() + "%"));
            }

            if (filters.containsKey("deadline")) {
                LocalDateTime deadline = LocalDateTime.parse(filters.get("deadline").toString());
                predicates.add(criteriaBuilder.lessThanOrEqualTo(taskJoin.get("deadline"), deadline));
            }

            if (filters.containsKey("is_done") && filters.containsKey("user_id")) {
                boolean isDone = Boolean.parseBoolean(filters.get("is_done").toString());
                predicates.add(criteriaBuilder.equal(root.get("isDone"), isDone));
            }

            if (filters.containsKey("is_past")) {
                boolean isPast = Boolean.parseBoolean(filters.get("is_past").toString());
                if (isPast) {
                    predicates.add(criteriaBuilder.lessThan(taskJoin.get("deadline"),
                            LocalDateTime.now(ZoneId.of("Europe/Kiev"))));
                } else {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(taskJoin.get("deadline"),
                            LocalDateTime.now(ZoneId.of("Europe/Kiev"))));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<TaskAssignment> assignedToUser(Long userId) {
        return (root, query, cb) ->
                cb.equal(root.get("user").get("id"), userId);
    }

    public static Specification<TaskAssignment> hasCreator(Long userId) {
        return (root, query, cb) ->
                cb.equal(root.join("task").get("creator").get("id"), userId);
    }

    public static Specification<TaskAssignment> hasEvent(Long eventId) {
        return (root, query, cb) ->
                cb.equal(root.join("task").join("events").get("id"), eventId);
    }

    public static  Specification<TaskAssignment> hasNullEventAndMeIsCreator(long userId) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.isNull(root.join("task").join("events")));
            predicates.add(cb.equal(root.join("task").get("creator").get("id"), userId));

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<TaskAssignment> DeadlineToday() {
        LocalDate today = LocalDate.now(ZoneId.of("Europe/Kiev"));
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59);

        return (root, query, cb) ->
                cb.between(root.join("task").get("deadline"), startOfDay, endOfDay);
    }
}