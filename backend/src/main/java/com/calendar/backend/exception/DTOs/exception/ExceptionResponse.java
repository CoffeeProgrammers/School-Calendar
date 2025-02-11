package com.calendar.backend.exception.DTOs.exception;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class ExceptionResponse {
    private List<String> messages;

    public ExceptionResponse(String message) {
       this.messages = List.of(message);
    }

    public ExceptionResponse(List<String> messages) {
        this.messages = messages;
    }

}
