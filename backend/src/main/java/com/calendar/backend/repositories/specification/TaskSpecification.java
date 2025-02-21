package com.calendar.backend.repositories.specification;

import com.calendar.backend.models.Task;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TaskSpecification {
    public static Specification<Task> filterTasks(Map<String, Object> filters) {
        return (Root<Task> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filters.containsKey("name")) {
                String name = (String) filters.get("name");
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
            }
            if (filters.containsKey("deadline")) {
                LocalDateTime deadline = (LocalDateTime) filters.get("deadline");
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("deadline"), deadline));
            }
            if (filters.containsKey("is_done")) {
                Boolean isDone = (Boolean) filters.get("is_done");
                predicates.add(criteriaBuilder.equal(root.get("event").get("isDone"), isDone));
            }
            if (filters.containsKey("is_past")) {
                Boolean isPast = (Boolean) filters.get("is_past");
                if (isPast) {
                    predicates.add(criteriaBuilder.lessThan(root.get("deadline"), LocalDateTime.now()));
                } else {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("deadline"), LocalDateTime.now()));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
