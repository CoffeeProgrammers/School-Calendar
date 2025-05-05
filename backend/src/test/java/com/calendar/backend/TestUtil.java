package com.calendar.backend;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.mappers.UserMapper;
import com.calendar.backend.models.*;
import org.instancio.Instancio;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;

public class TestUtil {
    private static final UserMapper USER_MAPPER = Mappers.getMapper(UserMapper.class);

    public static User createUser(String role) {
        UserCreateRequest userCreateRequest = Instancio.create(UserCreateRequest.class);
        userCreateRequest.setRole(role);
        userCreateRequest.setBirthday(String.valueOf(LocalDateTime.of(2000, 1, 1, 0, 0)));
        return USER_MAPPER.fromUserRequestToUser(userCreateRequest);
    }

    public static Event createEvent(String name) {
        Event event = new Event();
        event.setName(name);
        return event;
    }

    public static Event createEvent(String name, LocalDateTime startDate, LocalDateTime endDate, String type, String meetingType, User... users) {
        Event event = createEvent(name, users);
        event.setStartDate(startDate);
        event.setEndDate(endDate);
        event.setMeetingType(MeetingType.valueOf(meetingType));
        event.setType(EventType.valueOf(type));
        return event;
    }

    public static Event createEvent(String name, User... users) {
        Event event = createEvent(name);
        event.setUsers(new ArrayList<>(Arrays.asList(users)));
        return event;
    }

//    public static Comment createComment(String text, LocalDateTime date, User creator, Event event) {
//        Comment comment = new Comment();
//        comment.setText(text);
//        comment.setDate(date);
//        comment.setCreator(creator);
//        comment.setEvent(event);
//        return comment;
//    }

    public static Task createTask(String content, Event event) {
        Task task = createTask(content);
        task.setEvent(event);
        return task;
    }


    public static Task createTask(String content) {
        Task task = new Task();
        task.setContent(content);
        return task;
    }

    public static Notification createNotification(String content, User... users) {
        Notification notification = new Notification();
        notification.setContent(content);
        notification.setUsers(Arrays.asList(users));
        return notification;
    }

    public static Invitation createInvitation(String description, User sender, User receiver) {
        Invitation invitation = new Invitation();
        invitation.setDescription(description);
        invitation.setSender(sender);
        invitation.setReceiver(receiver);
        return invitation;
    }

    public static TaskAssignment assignTaskToUser(Task task, User user) {
        TaskAssignment taskAssignment = new TaskAssignment();
        taskAssignment.setTask(task);
        taskAssignment.setUser(user);
        return taskAssignment;
    }
}
