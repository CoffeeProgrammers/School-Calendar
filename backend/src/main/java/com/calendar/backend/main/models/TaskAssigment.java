package com.calendar.backend.main.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
public class TaskAssigment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne
    private Task task;
    @OneToOne
    private User user;
    private boolean isDone = false;
    public TaskAssigment(Task task, User user) {
        this.task = task;
        this.user = user;
    }
}
