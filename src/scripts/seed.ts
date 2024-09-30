import { env } from "@/env";
import { eventEnrollmentRounds, events, submissions } from "@/server/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const main = async () => {
  const db = drizzle(postgres(env.DATABASE_URL));
  console.log("Seed start");

  const userId = "usr_01j8hfkz08m9wrrjfehxqtk0xm";
  const insertedEvents = await db
    .insert(events)
    .values([
      {
        name: "MyGO!!!!! 6th LIVE「見つけた景色、たずさえて」",
        createdById: userId,
        metadata: {
          eventStartsAt: "2024-07-27T18:00:00+09:00",
          description: "MyGO!!!!! 6th LIVE「見つけた景色、たずさえて」",
          location: "武蔵野の森総合スポーツプラザ",
          externalUrl: "https://bang-dream.com/events/mygo_6th",
        },
      },
    ])
    .returning({ insertedId: events.id });
  const insertedEventId = insertedEvents[0]?.insertedId;
  if (!insertedEventId) throw new Error("Failed to insert event");

  const insertedEventRounds = await db
    .insert(eventEnrollmentRounds)
    .values([
      {
        createdById: userId,
        eventId: insertedEventId,
        platform: "eplus.jp",
        name: "最速先行抽選申込",
        metadata: {
          milestones: {
            payment: {
              end: "2024-05-13T23:59:59+09:00",
              start: "2024-05-10T10:00:00+09:00",
            },
            enrollment: {
              end: "2024-05-06T23:59:59+09:00",
              start: "2024-04-17T10:00:00+09:00",
            },
            resultPublicationAt: "2024-05-10T10:00:00+09:00",
          },
          externalUrl: "https://eplus.jp/2024serial/mygo_6th",
        },
      },
      {
        createdById: userId,
        eventId: insertedEventId,
        platform: "eplus.jp",
        name: "プレイガイド先行",
        metadata: {
          milestones: {
            payment: {
              end: "2024-06-03T23:59:59+09:00",
              start: "2024-05-30T10:00:00+09:00",
            },
            enrollment: {
              end: "2024-05-27T23:59:59+09:00",
              start: "2024-05-16T12:00:00+09:00",
            },
            resultPublicationAt: "2024-05-30T10:00:00+09:00",
          },
          externalUrl: "https://eplus.jp/2024serial/mygo_6th",
        },
      },
    ])
    .returning({ insertedId: eventEnrollmentRounds.id });
  const insertedLastRoundId =
    insertedEventRounds[insertedEventRounds.length - 1]?.insertedId;
  if (!insertedLastRoundId) throw new Error("Failed to insert last round");

  await db.insert(submissions).values([
    {
      createdById: userId,
      enrollmentRoundId: insertedLastRoundId,
      trustworthyPostures: {
        "navigator.vendor": "Chrome",
        "navigator.timezone.offset": -540,
        "navigator.language": "ja",
        "ip.geolocation.country": "Japan",
        "ip.is_residential": true,
        "captcha.cf_turnstile": true,
        "historical.accumulated_submissions": 2,
      },
      payload: {
        "platformAccountHistory.enrollmentRoundsTotal": 24,
        "platformAccountHistory.completedPaymentsTotal": 21,
        "round.enrollments": 20,
        "round.outcome.type": "S",
        "round.outcome.amount": 2,
      },
      trustworthiness: 100,
    },
  ]);
  console.log("Seed done");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
