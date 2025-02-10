package com.calendar.backend.main.dto.wrapper;

import lombok.Data;

import java.util.Map;

@Data
public class FilterRequest {
    private Map<String, Object> filters;
}
