package com.calendar.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
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
    @OneToMany(mappedBy = "task")
    private Set<TaskAssignment> taskAssignments;

    public Task(User creator, String name, String content, LocalDateTime deadline) {
        this.creator = creator;
        this.name = name;
        this.content = content;
        this.deadline = deadline;
    }
}
