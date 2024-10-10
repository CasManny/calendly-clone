import { EventTable } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn, formatEventDescription } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import CopyEventButton from "./CopyEventButton";

type Props = {
  event: typeof EventTable.$inferSelect;
};
const EventCard = ({ event }: Props) => {
  return (
    <Card className={cn("flex flex-col", !event.isActive && 'border-secondary/50')}>
      <CardHeader className={cn(!event.isActive && 'opacity-50')}>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription>
          {formatEventDescription(event.durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {event.description != null && (
        <CardContent className={cn(!event.isActive && 'opacity-50')}>{event.description}</CardContent>
      )}
      <CardFooter className="flex justify-end gap-2 mt-auto">
        {event.isActive && (
          <CopyEventButton
            variant={"outline"}
            eventId={event.id}
            clerkUserId={event.clerkUserId}
          />
        )}
        <Button>
          <Link href={`/events/${event.id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
