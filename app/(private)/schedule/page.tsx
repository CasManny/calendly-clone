import { ScheduleForm } from "@/components/forms/ScheduleForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchedule } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";

const SchedulePage = async () => {
  const { userId, redirectToSignIn } = auth();
  if (userId === null) return redirectToSignIn();
  const scheduleData = getSchedule();
  const [schedule] = await Promise.all([scheduleData]);
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule} />
      </CardContent>
    </Card>
  );
};

export default SchedulePage;
