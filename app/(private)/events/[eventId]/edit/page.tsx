import EventForm from "@/components/forms/EventForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAParticularEvent } from "@/db/queries"
import { auth } from "@clerk/nextjs/server"

type Props = {
  params: { eventId: string}
}

const EventEditPage = async ({params}: Props) => {
  const { userId, redirectToSignIn } = auth()
  if (!userId) return redirectToSignIn()
  const eventData = getAParticularEvent(params.eventId)
  const [event] = await Promise.all([eventData])
  console.log(event)
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm event={event} />
      </CardContent>
    </Card>
  )
}

export default EventEditPage