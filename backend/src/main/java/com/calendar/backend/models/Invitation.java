package com.calendar.backend.models;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "invitations")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User receiver;
    @ManyToOne
    private User sender;
    @ManyToOne
    private Event event;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String warning;
    private LocalDateTime time;

    public Invitation(User receiver, User sender, Event event,
                      String description, String warning) {
        this.receiver = receiver;
        this.sender = sender;
        this.event = event;
        this.description = description;
        this.warning = warning;
        this.time = LocalDateTime.now();
    }
}
