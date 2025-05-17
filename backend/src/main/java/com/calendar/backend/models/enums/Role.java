package com.calendar.backend.models.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    TEACHER, STUDENT, PARENT, CHIEF_TEACHER;

    @Override
    public String getAuthority() {
        return this.name();
    }

    public int getLevel() {
        return ordinal();
    }
}
