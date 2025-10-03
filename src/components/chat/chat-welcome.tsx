import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Pilcrow } from "lucide-react";

export default function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">
          Create, explore, be inspired
        </h1>
        <p className="mt-2 text-muted-foreground">
          Welcome to Abel AI. Start a conversation or explore some suggestions.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        <Card className="hover:bg-card/80 cursor-pointer transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              AI Text Writer
            </CardTitle>
            <Pilcrow className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Draft an email or generate blog post ideas.
            </p>
          </CardContent>
        </Card>
        <Card className="hover:bg-card/80 cursor-pointer transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              AI Image Generator
            </CardTitle>
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Create a unique image from a text prompt.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
