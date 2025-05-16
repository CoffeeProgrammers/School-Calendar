ALTER TABLE "events" ALTER COLUMN "content" TYPE varchar(1000);
ALTER TABLE "invitations" ALTER COLUMN "description" TYPE varchar(1000);
ALTER TABLE "users" ALTER COLUMN "description" TYPE varchar(1000);
ALTER TABLE "comments" ALTER COLUMN "text" TYPE varchar(1000);
ALTER TABLE "tasks" ALTER COLUMN "content" TYPE varchar(1000);
ALTER TABLE "notifications" ALTER COLUMN "content" TYPE varchar(1000);
