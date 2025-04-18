package com.calendar.backend.repositories.specification;

import com.calendar.backend.models.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserSpecification {
    public static Specification<User> filterUsers(Map<String, Object> filters) {
        return (Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            if (filters == null || filters.isEmpty()) {
                return null;
            }

            List<Predicate> predicates = new ArrayList<>();
            if (filters.containsKey("firstName")) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")),
                        "%" + filters.get("firstName").toString().toLowerCase() + "%"));
            }

            if (filters.containsKey("lastName")) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("lastname")),
                        "%" + filters.get("lastName").toString().toLowerCase() + "%"));
            }

            if (filters.containsKey("role")) {
                predicates.add(criteriaBuilder.equal(root.get("role"), filters.get("role").toString()));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
