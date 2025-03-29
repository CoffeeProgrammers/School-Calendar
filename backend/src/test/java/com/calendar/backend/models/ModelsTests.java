package com.calendar.backend.models;


import com.calendar.backend.TestUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ModelsTests {
    User user;
    Event event;

    @BeforeEach
    void setUp() {
        user = TestUtil.createUser("TEACHER");
        event = TestUtil.createEvent("Meeting", LocalDateTime.MIN, LocalDateTime.MAX, "TEACHERS_MEETING", "ONLINE", user);
    }

    @Test
    void testComment() {
        // given
        Comment comment1 = new Comment(user, event, "ABC");
        Comment comment2 = new Comment(comment1.getCreator(), comment1.getEvent(), comment1.getText());
        comment2.setDate(comment1.getDate());
        assertEquals(comment1, comment2);
        assertEquals(comment1.toString(), comment2.toString());
        assertEquals(comment1.hashCode(), comment2.hashCode());
    }

    @Test
    void testUser() {
        User user1 = TestUtil.createUser("TEACHER");
        User user2 = new User(user1.getEmail(), user1.getPassword(), user1.getFirstName(), user1.getLastName(), user1.getRole().name(), user1.getBirthday());
        user2.setToken(user1.getToken());
        user2.setDescription(user1.getDescription());

        assertEquals(user1, user2);
        assertEquals(user1.toString(), user2.toString());
        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    void testEvent() {
        // given
        Event event1 = TestUtil.createEvent("Event1", LocalDateTime.MIN, LocalDateTime.MAX, "TEACHERS_MEETING", "ONLINE", user);
        Event event2 = new Event(event1.getCreator(), event1.getName(), event1.getType().toString(), event1.getStartDate(), event1.getEndDate(), event1.getContent(), event1.isContentAvailableAnytime(), event1.getMeetingType().toString(), event1.getPlace());
        event2.addUser(event1.getUsers().get(0));
        assertEquals(event1, event2);
        assertEquals(event1.toString(), event2.toString());
        assertEquals(event1.hashCode(), event2.hashCode());
        assertEquals(1, event2.getUsers().size());
        event2.deleteUser(event1.getUsers().get(0));
        assertEquals(0, event2.getUsers().size());
    }

    @Test
    void testInvitation() {
        Invitation inv1 = new Invitation(user, user, event, "Description", "Warning");
        Invitation inv2 = new Invitation(inv1.getReceiver(), inv1.getSender(), inv1.getEvent(), inv1.getDescription(), inv1.getWarning());

        assertEquals(inv1, inv2);
        assertEquals(inv1.toString(), inv2.toString());
        assertEquals(inv1.hashCode(), inv2.hashCode());
    }

    @Test
    void testNotification() {
        Notification notif1 = new Notification(List.of(user), "Content");
        Notification notif2 = new Notification(notif1.getUsers(), notif1.getContent());
        notif2.setTime(notif1.getTime());
        assertEquals(notif1, notif2);
        assertEquals(notif1.toString(), notif2.toString());
        assertEquals(notif1.hashCode(), notif2.hashCode());
    }

    @Test
    void testTask() {
        Task task1 = new Task(user, "Task Name", "Task Content", LocalDateTime.now());
        Task task2 = new Task(task1.getCreator(), task1.getName(), task1.getContent(), task1.getDeadline());

        assertEquals(task1, task2);
        assertEquals(task1.toString(), task2.toString());
        assertEquals(task1.hashCode(), task2.hashCode());
    }

    @Test
    void testTaskAssignment() {
        Task task = new Task(user, "Task", "Task Content", LocalDateTime.now());
        TaskAssignment assign1 = new TaskAssignment(task, user);
        TaskAssignment assign2 = new TaskAssignment(assign1.getTask(), assign1.getUser());

        assertEquals(assign1, assign2);
        assertEquals(assign1.toString(), assign2.toString());
        assertEquals(assign1.hashCode(), assign2.hashCode());
    }
}
