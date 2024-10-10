"use server"
import { eventSchema } from "@/schema/events"
import "use-server"
import { z } from "zod"
import db from "../drizzle"
import { EventTable } from "../schema"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const createEvent = async (unsafeData: z.infer<typeof eventSchema>): Promise<{error: boolean} | undefined> => {
    const { userId } = auth()
    const { success, data, } = eventSchema.safeParse(unsafeData)
    if (!success || userId === null) {
        return { error: true}
    }
    await db.insert(EventTable).values({
        ...data,
        clerkUserId: userId
    })
    redirect('/events')
}

export const updateEvent = async(id: string, unsafeData: z.infer<typeof eventSchema>) => {
    const { userId } = auth()
    const { success, data } = eventSchema.safeParse(unsafeData)
    if (!success || userId === null) return { error: true }
    
    const { rowCount } = await db.update(EventTable).set({
        ...data
    }).where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)))

    if (rowCount === 0) {
        return { error: true}
    }

    revalidatePath('/events')
    redirect('/events')
}

export const deleteEvent = async (eventId: string) => {
    const { userId } = auth()
    if(userId === null) return { error: true}
    const { rowCount } = await db.delete(EventTable).where(and(eq(EventTable.id, eventId), eq(EventTable.clerkUserId, userId)))
    if (rowCount === 0) return { error: true }
    revalidatePath('/events')
    redirect('/events')
}