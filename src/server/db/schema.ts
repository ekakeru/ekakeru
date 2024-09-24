import { createId } from "@/server/lib/id";
import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ekakeru_${name}`);

export const platformEnum = pgEnum("platform", [
  "eplus.jp",
  "pia.jp",
  "l-tike.com",
]);

export type EventMetadata = {
  eventStartsAt: string;
  description: string;
  location: string;
  externalUrl: string;
};

export const events = createTable("events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId("evt")),
  createdById: text("createdById")
    .references(() => users.id, { onDelete: "no action" })
    .notNull(),
  name: text("name").notNull(),
  metadata: jsonb("metadata").$type<EventMetadata>().notNull(),
});

export type TimeRange = {
  start: string;
  end: string;
};

export type EventEnrollmentRoundMetadata = {
  externalUrl: string;
  milestones: {
    enrollment: TimeRange;
    resultPublicationAt: string;
    payment: TimeRange;
  };
};

export const eventEnrollmentRounds = createTable("event_enrollment_rounds", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId("erd")),
  createdById: text("createdById")
    .references(() => users.id, { onDelete: "no action" })
    .notNull(),
  eventId: text("eventId")
    .references(() => events.id, { onDelete: "no action" })
    .notNull(),
  platform: platformEnum("platform").notNull(),
  name: text("name").notNull(),

  metadata: jsonb("metadata").$type<EventEnrollmentRoundMetadata>().notNull(),
});

export const submissions = createTable("submissions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId("sub")),
  createdById: text("createdById")
    .references(() => users.id, { onDelete: "no action" })
    .notNull(),
  enrollmentRoundId: text("enrollmentRoundId")
    .references(() => eventEnrollmentRounds.id, { onDelete: "no action" })
    .notNull(),

  /**
   * The trustworthiness of the submission. Calculated based on
   * the trustworthyPostures and the payload. The higher the
   * trustworthiness, the more likely the submission is to be
   * accepted.
   *
   * Currently trustworthiness is a number between 0 and 100.
   */
  trustworthiness: integer("trustworthiness").notNull(),
  trustworthyPostures: jsonb("trustworthyPostures").notNull(),
  payload: jsonb("payload").notNull(),
});

// --- NextAuth.js tables ---

export const users = createTable("users", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId("usr")),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "accounts",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "sessions",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
