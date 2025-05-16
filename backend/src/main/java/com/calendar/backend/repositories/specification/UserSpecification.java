package com.calendar.backend.repositories.specification;

import com.calendar.backend.models.Invitation;
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
                Long roleId = Long.valueOf(filters.get("role").toString());
                predicates.add(criteriaBuilder.equal(root.get("role"), roleId));
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
            if(query != null) {
                Subquery<Long> eventSubquery = query.subquery(Long.class);
                Root<User> eventRoot = eventSubquery.from(User.class);
                Join<Object, Object> eventJoin = eventRoot.join("events");
                eventSubquery.select(eventRoot.get("id"))
                        .where(
                                cb.equal(eventRoot.get("id"), root.get("id")),
                                cb.equal(eventJoin.get("id"), eventId)
                        );

                Subquery<Long> invitationSubquery = query.subquery(Long.class);
                Root<Invitation> invitationRoot = invitationSubquery.from(Invitation.class);
                invitationSubquery.select(invitationRoot.get("receiver").get("id"))
                        .where(
                                cb.equal(invitationRoot.get("receiver").get("id"), root.get("id")),
                                cb.equal(invitationRoot.get("event").get("id"), eventId)
                        );

                return cb.and(
                        cb.not(cb.exists(eventSubquery)),
                        cb.not(cb.exists(invitationSubquery))
                );
            }else{
                return cb.and();
            }
        };
    }

}
