import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">KTerm</h1>
      <p className="text-xl text-muted-foreground">The Unfair Advantage to Kalshi Markets</p>
      <Button asChild className='ring-offset-background hover:ring-primary/90 transition-all duration-300 hover:ring-2 hover:ring-offset-2'>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
