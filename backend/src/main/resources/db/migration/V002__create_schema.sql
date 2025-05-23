CREATE TABLE "events"
(
    "id"                           BIGINT generated by default as identity NOT NULL,
    "creator_id"                   BIGINT                                  NOT NULL,
    "name"                         VARCHAR(255)                            NOT NULL,
    "type"                         BIGINT,
    "start_date"                   TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "end_date"                     TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "content"                      varchar(255),
    "is_content_available_anytime" BOOLEAN                                 NOT NULL,
    "place"                        VARCHAR(255)                            NOT NULL,
    "meeting_type"                 SMALLINT                                NOT NULL
);
ALTER TABLE
    "events"
    ADD PRIMARY KEY ("id");
---------------------------------------------------------------
CREATE TABLE "invitations"
(
    "id"          BIGINT generated by default as identity NOT NULL,
    "receiver_id" BIGINT                                  NOT NULL,
    "sender_id"   BIGINT                                  NOT NULL,
    "event_id"    BIGINT                                  NOT NULL,
    "description" varchar(255),
    "warning"     VARCHAR(255),
    "time"        TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "invitations"
    ADD PRIMARY KEY ("id");
---------------------------------------------------------------
CREATE TABLE "users"
(
    "id"          BIGINT generated by default as identity NOT NULL,
    "email"       VARCHAR(255)                            NOT NULL UNIQUE,
    "password"    VARCHAR(255)                            NOT NULL,
    "role"        BIGINT                                  NOT NULL,
    "first_name"  VARCHAR(255)                            NOT NULL,
    "last_name"   VARCHAR(255)                            NOT NULL,
    "description" varchar(255),
    "birthday"    TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "users"
    ADD PRIMARY KEY ("id");
---------------------------------------------------------------
CREATE TABLE "users_events"
(
    "user_id"  BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL
);
---------------------------------------------------------------
CREATE TABLE "comments"
(
    "id"         BIGINT generated by default as identity NOT NULL,
    "creator_id" BIGINT                                  NOT NULL,
    "event_id"   BIGINT                                  NOT NULL,
    "text"       varchar(255)                            NOT NULL,
    "date"       TIMESTAMP                               NOT NULL
);
ALTER TABLE
    "comments"
    ADD PRIMARY KEY ("id");
---------------------------------------------------------------
CREATE TABLE "tasks"
(
    "id"         BIGINT generated by default as identity NOT NULL,
    "creator_id" BIGINT                                  NOT NULL,
    "event_id"   BIGINT,
    "name"       VARCHAR(255)                            NOT NULL,
    "content"    varchar(255),
    "deadline"   TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "tasks"
    ADD PRIMARY KEY ("id");
---------------------------------------------------------------
CREATE TABLE "task_assignments"
(
    "id"      BIGINT generated by default as identity NOT NULL,
    "user_id" BIGINT                                  NOT NULL,
    "task_id" BIGINT                                  NOT NULL,
    "is_done" BOOLEAN                                 NOT NULL
);
ALTER TABLE
    "task_assignments"
    ADD PRIMARY KEY ("id");
---------------------------------------------------------------
CREATE TABLE "notifications"
(
    "id"      BIGINT generated by default as identity NOT NULL,
    "content" varchar(255)                            NOT NULL,
    "time"    TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "notifications"
    ADD PRIMARY KEY ("id");
---------------------------------------------------------------
CREATE TABLE "users_notifications"
(
    "user_id"         BIGINT NOT NULL,
    "notification_id" BIGINT NOT NULL
);
---------------------------------------------------------------
ALTER TABLE
    "users_notifications"
    ADD CONSTRAINT "users_notifications_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE
    "events"
    ADD CONSTRAINT "events_creator_id_foreign" FOREIGN KEY ("creator_id") REFERENCES "users" ("id");
ALTER TABLE
    "invitations"
    ADD CONSTRAINT "invitations_sender_id_foreign" FOREIGN KEY ("sender_id") REFERENCES "users" ("id");
ALTER TABLE
    "task_assignments"
    ADD CONSTRAINT "task_assignments_task_id_foreign" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id");
ALTER TABLE
    "tasks"
    ADD CONSTRAINT "tasks_event_id_foreign" FOREIGN KEY ("event_id") REFERENCES "events" ("id");
ALTER TABLE
    "tasks"
    ADD CONSTRAINT "tasks_creator_id_foreign" FOREIGN KEY ("creator_id") REFERENCES "users" ("id");
ALTER TABLE
    "invitations"
    ADD CONSTRAINT "invitations_receiver_id_foreign" FOREIGN KEY ("receiver_id") REFERENCES "users" ("id");
ALTER TABLE
    "invitations"
    ADD CONSTRAINT "invitations_event_id_foreign" FOREIGN KEY ("event_id") REFERENCES "events" ("id");
ALTER TABLE
    "comments"
    ADD CONSTRAINT "comments_event_id_foreign" FOREIGN KEY ("event_id") REFERENCES "events" ("id");
ALTER TABLE
    "users_events"
    ADD CONSTRAINT "users_events_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE
    "users_events"
    ADD CONSTRAINT "users_events_event_id_foreign" FOREIGN KEY ("event_id") REFERENCES "events" ("id");
ALTER TABLE
    "comments"
    ADD CONSTRAINT "comments_creator_id_foreign" FOREIGN KEY ("creator_id") REFERENCES "users" ("id");
ALTER TABLE
    "task_assignments"
    ADD CONSTRAINT "task_assignments_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE
    "users_notifications"
    ADD CONSTRAINT "users_notifications_notification_id_foreign" FOREIGN KEY ("notification_id") REFERENCES "notifications" ("id");