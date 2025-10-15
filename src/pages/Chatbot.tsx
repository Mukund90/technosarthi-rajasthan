import Navbar from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Student Assistant
            </h1>
            <p className="text-muted-foreground">
              Get instant answers about colleges, courses, cutoffs, placements, and fees
            </p>
          </div>
          
          <Card className="mb-6 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="font-semibold mb-3">You can ask me about:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                College information and locations
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Available courses and programs
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Admission cutoff ranks
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Placement statistics
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Course fees and duration
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                College facilities
              </li>
            </ul>
          </Card>

          <ChatInterface />
        </div>
      </main>
    </div>
  );
};

export default Chatbot;