package com.calendar.backend.repositories.specification;

import com.calendar.backend.models.Event;
import com.calendar.backend.models.enums.EventType;
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
        return (Root<Event> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            if (filters == null || filters.isEmpty()) {
                return null;
            }

            List<Predicate> predicates = new ArrayList<>();

            if (filters.containsKey("search")) {
                String search = "%" + filters.get("search").toString().toLowerCase() + "%";
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), search));
            }

            if (filters.containsKey("startDate")) {
                LocalDateTime startDate = LocalDateTime.parse(filters.get("startDate").toString());
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("startDate"), startDate));
            }

            if (filters.containsKey("endDate")) {
                LocalDateTime endDate = LocalDateTime.parse(filters.get("endDate").toString());
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("endDate"), endDate));
            }

            if (filters.containsKey("typeOfEvent")) {
                EventType eventType = EventType.valueOf((String) filters.get("typeOfEvent"));
                predicates.add(criteriaBuilder.equal(root.get("type"), eventType));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Event> hasUser(Long userId) {
        return (root, query, cb) -> cb.equal(root.join("users").get("id"), userId);
    }
}
