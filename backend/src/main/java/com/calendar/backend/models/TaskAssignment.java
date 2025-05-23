package com.calendar.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "task_assignments")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class TaskAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Task task;
    @ManyToOne
    private User user;
    private boolean isDone = false;
    public TaskAssignment(Task task, User user) {
        this.task = task;
        this.user = user;
    }
}
