package com.calendar.backend.dto;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TaskDtoTests {

    @Test
    void testTaskFullResponse() {
        TaskFullResponse response1 = new TaskFullResponse();
        response1.setId(1L);
        response1.setName("Task Name");
        response1.setContent("Task Content");
        response1.setDeadline("2024-01-01T10:00:00");
        response1.setDone(true);

        TaskFullResponse response2 = new TaskFullResponse();
        response2.setId(response1.getId());
        response2.setName(response1.getName());
        response2.setContent(response1.getContent());
        response2.setDeadline(response1.getDeadline());
        response2.setDone(response1.isDone());

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    void testTaskListResponse() {
        TaskListResponse response1 = new TaskListResponse();
        response1.setId(1L);
        response1.setName("Task Name");
        response1.setDeadline("2024-01-01");

        TaskListResponse response2 = new TaskListResponse();
        response2.setId(response1.getId());
        response2.setName(response1.getName());
        response2.setDeadline(response1.getDeadline());

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    void testTaskRequest() {
        TaskRequest request1 = new TaskRequest();
        request1.setName("Task");
        request1.setContent("Task Content");
        request1.setDeadline("2024-01-01T10:00:00");

        TaskRequest request2 = new TaskRequest();
        request2.setName(request1.getName());
        request2.setContent(request1.getContent());
        request2.setDeadline(request1.getDeadline());

        assertEquals(request1, request2);
        assertEquals(request1.toString(), request2.toString());
        assertEquals(request1.hashCode(), request2.hashCode());
    }
}
