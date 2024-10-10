import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { EventTable, ScheduleTable } from "./schema";
import { redirect } from "next/navigation";

// EVENTS QUERIES

export const getAllEvents = cache(async () => {
    const { userId, redirectToSignIn } = auth()
    if (!userId) return redirectToSignIn()
    
    
    const events = await db.query.EventTable.findMany({
        where: eq(EventTable.clerkUserId, userId),
        orderBy: (EventTable, {desc }) => [desc(EventTable.createdAt)]
    })

    return events
})

export const getAParticularEvent = cache(async (eventId: string) => {
    const { userId, redirectToSignIn } = auth()
    if (userId === null) return redirectToSignIn() 
    const event = await db.query.EventTable.findFirst({
        where: and(eq(EventTable.clerkUserId, userId), eq(EventTable.id, eventId))
    })
    return event
})

// SCHEDULE QUERIES
export const getSchedule = cache(async () => {
    const { userId, redirectToSignIn } = auth()
    if(userId == null) return redirectToSignIn()
    const schedule = await db.query.ScheduleTable.findFirst({
        where: eq(ScheduleTable.clerkUserId, userId),
        with: {
            availabilities: true
        }
    })

    return schedule
})