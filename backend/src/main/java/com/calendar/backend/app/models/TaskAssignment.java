package com.calendar.backend.app.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "task_assignments")
@Getter
@Setter
@NoArgsConstructor
public class TaskAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne
    private Task task;
    @OneToOne
    private User user;
    private boolean isDone = false;
    public TaskAssignment(Task task, User user) {
        this.task = task;
        this.user = user;
    }
}
