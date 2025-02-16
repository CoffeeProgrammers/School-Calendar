package com.calendar.backend.repositories.specification;

import com.calendar.backend.models.Event;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class EventSpecification {
    public static Specification<Event> filterEvents(Map<String, Object> filters) {
        return (Root<Event> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filters.containsKey("search")) {
                String search = "%" + filters.get("search").toString().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get("name")), search));
            }

            if (filters.containsKey("startDate")) {
                LocalDateTime startDate = LocalDateTime.parse(filters.get("startDate").toString());
                predicates.add(cb.greaterThanOrEqualTo(root.get("startDate"), startDate));
            }

            if (filters.containsKey("endDate")) {
                LocalDateTime endDate = LocalDateTime.parse(filters.get("endDate").toString());
                predicates.add(cb.lessThanOrEqualTo(root.get("endDate"), endDate));
            }

            if (filters.containsKey("isPast")) {
                boolean isPast = Boolean.parseBoolean(filters.get("isPast").toString());
                if (isPast) {
                    predicates.add(cb.lessThan(root.get("endDate"), LocalDateTime.now()));
                } else {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("startDate"), LocalDateTime.now()));
                }
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
