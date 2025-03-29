package com.calendar.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private User creator;
    @ManyToOne
    private Event event;
    private String text;
    private LocalDateTime date;

    public Comment(User creator, Event event, String text) {
        this.creator = creator;
        this.event = event;
        this.text = text;
        this.date = LocalDateTime.now();
    }
}
