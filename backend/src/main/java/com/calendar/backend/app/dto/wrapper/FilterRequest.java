package com.calendar.backend.app.dto.wrapper;

import lombok.Data;

import java.util.Map;

@Data
public class FilterRequest {
    private Map<String, Object> filters;
}
