import { Button } from "@/components/ui/button";
import { SignedIn, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Homepage = () => {
  const { userId } = auth()
  if(userId) redirect('/events')
  return (
    <div className="container mx-auto text-center">
      <h1 className="text-3xl mb-4">Homepage</h1>
      <div className="flex gap-2 justify-center">
        <Button asChild>
          <SignInButton />
        </Button>
        <Button asChild>
          <SignUpButton />
        </Button>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Homepage;
