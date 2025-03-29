package com.calendar.backend.repositories;

import com.calendar.backend.models.Invitation;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import static com.calendar.backend.TestUtil.createInvitation;
import static com.calendar.backend.TestUtil.createUser;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class InvitationRepositoryTest {

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private UserRepository userRepository;

    private User user1;
    private User user2;
    private Invitation invitation1;
    private Invitation invitation2;

    @BeforeEach
    public void beforeEach() {
        user1 = userRepository.save(createUser("TEACHER"));
        user2 = userRepository.save(createUser("STUDENT"));

        invitation1 = invitationRepository.save(createInvitation("Invitation1", user1, user2));
        invitation2 = invitationRepository.save(createInvitation("Invitation2", user2, user1));
    }

    @Test
    public void findAllByReceiverId_success() {
        // given
        Long userId = user1.getId();
        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = invitationRepository.findAllByReceiver_Id(userId, pageable);

        // then
        assertThat(result.getTotalElements()).isGreaterThan(0);
        assertThat(result.getContent()).hasSizeGreaterThanOrEqualTo(1);
    }

    @Test
    public void findAllByReceiverId_notFound() {
        // given
        Long userId = -1L;
        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = invitationRepository.findAllByReceiver_Id(userId, pageable);

        // then
        assertThat(result.getTotalElements()).isEqualTo(0);
        assertThat(result.getContent()).isEmpty();
    }

    @Test
    public void findAllBySenderId_success() {
        // given
        Long userId = user1.getId();
        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = invitationRepository.findAllBySender_Id(userId, pageable);

        // then
        assertThat(result.getTotalElements()).isGreaterThan(0);
        assertThat(result.getContent()).hasSizeGreaterThanOrEqualTo(1);
    }

    @Test
    public void findAllBySenderId_notFound() {
        // given
        Long userId = -1L;
        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = invitationRepository.findAllBySender_Id(userId, pageable);

        // then
        assertThat(result.getTotalElements()).isEqualTo(0);
        assertThat(result.getContent()).isEmpty();
    }
}
