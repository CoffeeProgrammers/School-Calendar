package com.calendar.backend.mappers;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.models.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskFullResponse fromTaskToTaskResponse(Task task);

    TaskListResponse fromTaskToTaskListResponse(Task task);

    Task fromTaskRequestToTask(TaskRequest taskRequest);
}
