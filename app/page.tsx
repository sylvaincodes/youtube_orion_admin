import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className={cn("text-red-900", "uppercase")}>
      <Button 
      variant="destructive"
      size="sm"
      >Happy new year</Button>
    </div>
  );
}
