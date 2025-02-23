package com.calendar.backend.dto.wrapper;

import lombok.Data;

import java.util.List;

@Data
public class PaginationListResponse<T> {
    private Integer totalPages;
    private List<T> content;
}
