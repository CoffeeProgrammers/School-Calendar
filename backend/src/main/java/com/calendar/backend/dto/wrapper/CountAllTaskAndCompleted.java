package com.calendar.backend.dto.wrapper;

import lombok.Data;

@Data
public class CountAllTaskAndCompleted {
    private Long countAll;
    private Long countCompleted;
}
