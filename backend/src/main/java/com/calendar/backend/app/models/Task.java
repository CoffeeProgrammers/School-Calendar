package com.calendar.backend.app.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Event event;
    @ManyToOne
    private User creator;
    private String name;
    private String content;
    private LocalDateTime deadline;

    public Task(User creator, String name, String content, LocalDateTime deadline) {
        this.creator = creator;
        this.name = name;
        this.content = content;
        this.deadline = deadline;
    }
}
