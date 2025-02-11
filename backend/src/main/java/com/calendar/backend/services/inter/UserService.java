package com.calendar.backend.services.inter;

import com.calendar.backend.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    void save(User user);
    User findById(long id);
    User findByEmail(String email);
    boolean existsByEmail(String email);
}
