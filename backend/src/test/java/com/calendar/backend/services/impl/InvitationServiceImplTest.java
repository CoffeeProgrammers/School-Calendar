package com.calendar.backend.services.impl;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.invitation.InvitationRequest;
import com.calendar.backend.dto.invitation.InvitationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.InvitationMapper;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.Invitation;
import com.calendar.backend.models.Notification;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.InvitationRepository;
import com.calendar.backend.services.inter.EventService;
import com.calendar.backend.services.inter.NotificationService;
import com.calendar.backend.services.inter.TaskAssignmentService;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InvitationServiceImplTest {

    @Mock
    private InvitationRepository invitationRepository;
    @Mock
    private InvitationMapper invitationMapper;
    @Mock
    private NotificationService notificationService;
    @Mock
    private UserService userService;
    @Mock
    private EventService eventService;
    @Mock
    private TaskAssignmentService taskAssignmentService;

    @InjectMocks
    private InvitationServiceImpl invitationService;

    private User sender;
    private User receiver;
    private Event event;
    private Invitation invitation;

    @BeforeEach
    void setUp() {
        sender = TestUtil.createUser("TEACHER");
        receiver = TestUtil.createUser("STUDENT");
        event = TestUtil.createEvent("Sample Event");
        invitation = new Invitation();
        invitation.setSender(sender);
        invitation.setReceiver(receiver);
        invitation.setEvent(event);
    }

    @Test
    void create_success() {
        InvitationRequest invitationRequest = new InvitationRequest();
        invitationRequest.setDescription("Test Invitation");

        when(userService.findUserByAuth(any(Authentication.class))).thenReturn(sender);
        when(userService.findByIdForServices(anyLong())).thenReturn(receiver);
        when(eventService.findByIdForServices(anyLong())).thenReturn(event);
        when(invitationRepository.save(any(Invitation.class))).thenReturn(invitation);
        when(invitationMapper.fromInvitationToInvitationResponse(any(Invitation.class)))
                .thenReturn(new InvitationResponse());
        when(invitationMapper.fromInvitationRequestToInvitation(invitationRequest)).thenReturn(invitation);

        InvitationResponse result = invitationService.create(invitationRequest, mock(Authentication.class), 1L, 2L);

        assertNotNull(result);
        verify(invitationRepository).save(any(Invitation.class));
    }

    @Test
    void create_warning() {
        InvitationRequest invitationRequest = new InvitationRequest();
        invitationRequest.setDescription("Test Invitation");

        EventListResponse eventListResponse = new EventListResponse();
        eventListResponse.setName("Event2");
        when(userService.findUserByAuth(any(Authentication.class))).thenReturn(sender);
        when(userService.findByIdForServices(anyLong())).thenReturn(receiver);
        when(eventService.findByIdForServices(anyLong())).thenReturn(event);
        when(eventService.findAllByUserIdForCalendar(2L, event.getStartDate(), event.getEndDate())).thenReturn(List.of(eventListResponse));
        when(invitationRepository.save(any(Invitation.class))).thenReturn(invitation);
        when(invitationMapper.fromInvitationToInvitationResponse(any(Invitation.class)))
                .thenReturn(new InvitationResponse());
        when(invitationMapper.fromInvitationRequestToInvitation(invitationRequest)).thenReturn(invitation);

        InvitationResponse result = invitationService.create(invitationRequest, mock(Authentication.class), 1L, 2L);

        assertNotNull(result);
        verify(invitationRepository).save(any(Invitation.class));
    }

    @Test
    void update_success() {
        InvitationRequest invitationRequest = new InvitationRequest();
        invitationRequest.setDescription("Updated Description");

        when(invitationRepository.findById(anyLong())).thenReturn(Optional.of(invitation));
        when(invitationMapper.fromInvitationToInvitationResponse(any(Invitation.class)))
                .thenReturn(new InvitationResponse());

        InvitationResponse result = invitationService.update(1L, invitationRequest);

        assertEquals("Updated Description", invitation.getDescription());
        assertNotNull(result);
    }

    @Test
    void delete_success() {
        doNothing().when(invitationRepository).deleteById(anyLong());

        invitationService.delete(1L);

        verify(invitationRepository).deleteById(1L);
    }

    @Test
    void findById_success() {
        when(invitationRepository.findById(anyLong())).thenReturn(Optional.of(invitation));
        when(invitationMapper.fromInvitationToInvitationResponse(any(Invitation.class)))
                .thenReturn(new InvitationResponse());

        InvitationResponse result = invitationService.findById(1L);

        assertNotNull(result);
    }

    @Test
    void findById_notFound() {
        when(invitationRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> invitationService.findById(1L));
    }

    @Test
    void acceptInvitation_success() {
        when(invitationRepository.findById(anyLong())).thenReturn(Optional.of(invitation));
        doNothing().when(taskAssignmentService).assignTasksForNewUserFromEvent(anyLong(), anyLong());
        doNothing().when(notificationService).create(any(Notification.class));
        doNothing().when(invitationRepository).deleteById(anyLong());

        invitationService.acceptInvitation(1L);

        verify(taskAssignmentService).assignTasksForNewUserFromEvent(anyLong(), anyLong());
        verify(notificationService).create(any(Notification.class));
        verify(invitationRepository).deleteById(anyLong());
    }

    @Test
    void rejectInvitation_success() {
        when(invitationRepository.findById(anyLong())).thenReturn(Optional.of(invitation));
        doNothing().when(notificationService).create(any(Notification.class));
        doNothing().when(invitationRepository).deleteById(anyLong());

        invitationService.rejectInvitation(1L);

        verify(notificationService).create(any(Notification.class));
        verify(invitationRepository).deleteById(anyLong());
    }

    @Test
    void findAllBySenderId_success() {
        Authentication auth = mock(Authentication.class);
        sender.setId(1L);

        InvitationResponse response = new InvitationResponse();
        Page<Invitation> page = new PageImpl<>(List.of(invitation));

        when(userService.findUserByAuth(auth)).thenReturn(sender);
        when(invitationRepository.findAllBySender_Id(eq(1L), any())).thenReturn(page);
        when(invitationMapper.fromInvitationToInvitationResponse(any(Invitation.class))).thenReturn(response);

        PaginationListResponse<InvitationResponse> result = invitationService.findAllBySenderId(auth, 0, 10);

        assertEquals(1, result.getContent().size());
        assertEquals(1, result.getTotalPages());
    }

    @Test
    void findAllByReceiverId_success() {
        receiver.setId(2L);

        InvitationResponse response = new InvitationResponse();
        Page<Invitation> page = new PageImpl<>(List.of(invitation));

        when(invitationRepository.findAllByReceiver_Id(eq(2L), any())).thenReturn(page);
        when(invitationMapper.fromInvitationToInvitationResponse(any(Invitation.class))).thenReturn(response);

        PaginationListResponse<InvitationResponse> result = invitationService.findAllByRecieverId(2L, 0, 10);

        assertEquals(1, result.getContent().size());
        assertEquals(1, result.getTotalPages());
    }

}
