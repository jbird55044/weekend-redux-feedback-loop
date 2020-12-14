-- Database should be prime_feedback
CREATE DATABASE "prime_feedback";

-- Switch to "prime_feedback" before making:
-- Table to store the feedback
CREATE TABLE "feedback" (
  "id" serial primary key,
  "feeling" INT not null,
  "understanding" INT not null,
  "support" INT not null,
  "comments" text,
  "flagged" boolean default false,
  "date" date not null default CURRENT_DATE
); 

-- Sample feedback item
INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
VALUES (4, 4, 5, 'Doing Great!');
INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
VALUES (4, 4, 5, 'Doing Great!');
INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
VALUES (2, 3, 4, 'Doing Well!');
INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
VALUES (3, 3, 2, 'Doing OK!');
INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
VALUES (1, 1, 1, 'Got out of bed');
INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
VALUES (1, 3, 1, 'Not so hot Today');
