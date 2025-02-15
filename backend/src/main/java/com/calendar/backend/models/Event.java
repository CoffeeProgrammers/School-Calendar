package com.calendar.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private User creator;
    private String name;
    @Enumerated(EnumType.STRING)
    private EventType type;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String content;
    private boolean isContentAvailableAnytime;
    @Enumerated(EnumType.STRING)
    private MeetingType meetingType;
    private String place;

    public Event(User creator, String name, String type, LocalDateTime startDate,
                 LocalDateTime endDate, String content, boolean isContentAvailableAnytime,
                 String meetingType, String place) {
        this.creator = creator;
        this.name = name;
        this.type = EventType.valueOf(type);
        this.startDate = startDate;
        this.endDate = endDate;
        this.content = content;
        this.isContentAvailableAnytime = isContentAvailableAnytime;
        this.meetingType = MeetingType.valueOf(meetingType);
        this.place = place;
    }
}
