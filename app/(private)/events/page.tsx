import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/db/queries";
import { CalendarPlus, CalendarRange } from "lucide-react";
import Link from "next/link";

const EventsHome = async () => {
  const eventsData = getAllEvents();
  const [events] = await Promise.all([eventsData]);
  return (
    <>
      <div className="flex gap-4 items-baseline">
        <h1 className="text-3xl lg:text-4xl x:text-5xl font-semibold mb-6">
          Events
        </h1>
        <Button asChild>
          <Link href="/events/new">
            <CalendarPlus className="mr-4 size-6" /> New Evet
          </Link>
        </Button>
      </div>
      {events.length > 0 ? (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill, minmax(400px, 1fr))]">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CalendarRange className="size-16 mx-auto" />
          <p>
            You do not have any events yet. Create your first event to get
            started
          </p>
          <Button asChild size={"lg"}>
            <Link href="/events/new">
              <CalendarPlus className="mr-4 size-6" /> New Evet
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default EventsHome;
