package com.calendar.backend.repositories.specification;

import com.calendar.backend.models.User;
import jakarta.persistence.criteria.*;
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
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")),
                        "%" + filters.get("lastName").toString().toLowerCase() + "%"));
            }

            if (filters.containsKey("email")) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("email")),
                        "%" + filters.get("email").toString().toLowerCase() + "%"));
            }

            if (filters.containsKey("role")) {
                predicates.add(criteriaBuilder.equal(root.get("role"), filters.get("role").toString()));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<User> hasEvent(Long eventId) {
        return (root, query, cb) ->
                cb.equal(root.join("events").get("id"), eventId);
    }

    public static Specification<User> doesNotHaveEvent(Long eventId) {
        return (root, query, cb) -> {
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<User> subRoot = subquery.from(User.class);
            Join<Object, Object> join = subRoot.join("events");
            subquery.select(subRoot.get("id"))
                    .where(
                            cb.equal(subRoot.get("id"), root.get("id")),
                            cb.equal(join.get("id"), eventId)
                    );

            return cb.not(cb.exists(subquery));
        };
    }

}
