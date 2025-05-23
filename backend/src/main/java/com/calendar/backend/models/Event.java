package com.calendar.backend.models;

import com.calendar.backend.models.enums.EventType;
import com.calendar.backend.models.enums.MeetingType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private User creator;
    private String name;
    private EventType type;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    @Column(columnDefinition = "TEXT")
    private String content;
    private boolean isContentAvailableAnytime;
    private MeetingType meetingType;
    private String place;

    @ManyToMany
    @JoinTable(
            name = "users_events",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users = new ArrayList<>();

    @OneToMany
    private List<Comment> comments = new ArrayList<>();

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

    public void addUser(User user) {
        users.add(user);
    }

    public void deleteUser(User user) {
        users.remove(user);
    }
}
