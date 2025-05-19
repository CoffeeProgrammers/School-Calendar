package com.calendar.backend.repositories.specification;

import com.calendar.backend.models.Task;
import org.springframework.data.jpa.domain.Specification;

public class TaskSpecification {

    public static Specification<Task> assignedToUser(Long userId) {
        return (root, query, cb) ->
                cb.equal(root.join("taskAssignments").get("user").get("id"), userId);
    }

    public static Specification<Task> hasCreator(Long userId) {
        return (root, query, cb) ->
                cb.equal(root.get("creator").get("id"), userId);
    }
}
