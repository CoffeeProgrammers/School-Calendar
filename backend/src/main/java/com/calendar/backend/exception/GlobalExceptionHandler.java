package com.calendar.backend.exception;

import com.calendar.backend.dto.exception.ExceptionResponse;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.security.auth.message.AuthException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.security.auth.login.LoginException;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponse handleValidationError(MethodArgumentNotValidException e) {
        log.error("Exception: handleValidationError: {}", e.getMessage());
        return new ExceptionResponse(
                e.getBindingResult().getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .sorted()
                        .collect(Collectors.toList()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleEntityNotFoundException(RuntimeException e) {
        log.error("Exception: handleEntityNotFoundException: {}", e.getMessage());
        return new ExceptionResponse(e.getMessage());
    }

    @ExceptionHandler(LoginException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleLoginException(RuntimeException e) {
        log.error("Exception: handleLoginException: {}", e.getMessage());
        return new ExceptionResponse(e.getMessage());
    }

    @ExceptionHandler({
            EntityExistsException.class,
            UnsupportedOperationException.class,
            BadCredentialsException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponse handleBadRequestExceptions(RuntimeException e) {
        log.error("Exception: handleBadRequestExceptions: {}", e.getMessage());
        return new ExceptionResponse(e.getMessage());
    }

    @ExceptionHandler(AuthException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ExceptionResponse handleAuthException(AuthException e) {
        log.error("Exception: handleAuthException: {}", e.getMessage());
        return new ExceptionResponse(e.getMessage());
    }
}
