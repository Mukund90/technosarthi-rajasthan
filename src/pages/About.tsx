import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Target, Users, Award, GraduationCap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About TechnoSarthi
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Your intelligent guide to technical education in Rajasthan
          </p>

          <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              TechnoSarthi is an AI-powered student assistance platform developed by the Department of 
              Technical Education, Government of Rajasthan. Our mission is to make technical education 
              accessible and transparent by providing students with instant, accurate information about 
              colleges, courses, admissions, and career opportunities.
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Card className="p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Comprehensive Information</h3>
              <p className="text-sm text-muted-foreground">
                Access detailed information about all technical colleges, courses, cutoffs, 
                fees, and placement records in one place.
              </p>
            </Card>

            <Card className="p-6">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Assistance</h3>
              <p className="text-sm text-muted-foreground">
                Get instant answers to your queries through our intelligent chatbot trained 
                on authentic government data.
              </p>
            </Card>

            <Card className="p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Official & Verified</h3>
              <p className="text-sm text-muted-foreground">
                All information is sourced directly from the Department of Technical Education, 
                ensuring accuracy and reliability.
              </p>
            </Card>

            <Card className="p-6">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Student-Centric</h3>
              <p className="text-sm text-muted-foreground">
                Designed with students in mind, making the college selection and admission 
                process simple and informed.
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20">
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <p className="text-muted-foreground mb-4">
              Explore our comprehensive college directory or chat with our AI assistant to find 
              the perfect technical education path for your future.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/colleges" className="text-primary hover:underline font-medium">
                Browse Colleges →
              </a>
              <a href="/chatbot" className="text-secondary hover:underline font-medium">
                Ask AI Assistant →
              </a>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;