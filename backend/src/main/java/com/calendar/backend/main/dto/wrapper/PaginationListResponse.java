package com.calendar.backend.main.dto.wrapper;

import lombok.Data;

import java.util.List;

@Data
public class PaginationListResponse<T> {
    private Long total_pages;
    private List<T> content;
}
