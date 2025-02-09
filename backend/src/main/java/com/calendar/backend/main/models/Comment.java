package com.calendar.backend.main.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne
    private User creator;
    @OneToOne
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
