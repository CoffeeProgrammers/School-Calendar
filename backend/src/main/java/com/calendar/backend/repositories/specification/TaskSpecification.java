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

public class TaskSpecification {
    public static Specification<Task> filterTasks(Map<String, Object> filters) {
        return (Root<Task> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            if (filters == null || filters.isEmpty()) {
                return null;
            }
            List<Predicate> predicates = new ArrayList<>();

            if (filters.containsKey("name")) {
                String name = (String) filters.get("name");
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
            }

            if (filters.containsKey("deadline")) {
                LocalDateTime deadline = LocalDateTime.parse(filters.get("deadline").toString());
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("deadline"), deadline));
            }

            if (filters.containsKey("is_done") && filters.containsKey("user_id")) {
                boolean isDone = Boolean.parseBoolean(filters.get("is_done").toString());
                Long userId = Long.parseLong(filters.get("user_id").toString());

                Join<Task, TaskAssignment> assignmentJoin = root.join("taskAssignments", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(assignmentJoin.get("isDone"), isDone));
                predicates.add(criteriaBuilder.equal(assignmentJoin.get("user").get("id"), userId));
            }

            if (filters.containsKey("is_past")) {
                boolean isPast = Boolean.parseBoolean(filters.get("is_past").toString());
                if (isPast) {
                    predicates.add(criteriaBuilder.lessThan(root.get("deadline"), LocalDateTime.now(ZoneId.of("Europe/Kiev"))));
                } else {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("deadline"), LocalDateTime.now(ZoneId.of("Europe/Kiev"))));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Task> assignedToUser(Long userId) {
        return (root, query, cb) -> {
            query.distinct(true);

            Join<Task, TaskAssignment> assignmentJoin = root.join("taskAssignments");

            return cb.equal(assignmentJoin.get("user").get("id"), userId);
        };
    }


    public static Specification<Task> orderByIsDoneAndDeadline(Long userId) {
        return (root, query, cb) -> {
            if (Task.class.equals(query.getResultType())) {
                Join<Task, TaskAssignment> assignmentJoin = root.join("taskAssignments");

                query.orderBy(
                        cb.asc(cb.selectCase()
                                .when(cb.equal(assignmentJoin.get("user").get("id"), userId), assignmentJoin.get("isDone"))
                                .otherwise(true)),
                        cb.asc(root.get("deadline"))
                );
            }
            return null;
        };
    }


    public static Specification<Task> hasCreator(Long userId) {
        return (root, query, cb) ->
                cb.equal(root.get("creator").get("id"), userId);
    }

    public static Specification<Task> DeadlineToday() {
        LocalDate today = LocalDate.now(ZoneId.of("Europe/Kiev"));
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59);

        return (root, query, cb) ->
                cb.between(root.get("deadline"), startOfDay, endOfDay);
    }

}
