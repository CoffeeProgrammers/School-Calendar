package com.calendar.backend.main.models;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    TEACHER, STUDENT, PARENT;

    @Override
    public String getAuthority() {
        return this.name();
    }
}
