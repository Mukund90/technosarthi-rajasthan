import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { MessageCircle, Building2, BookOpen, TrendingUp, ArrowRight, Award, Users, Target } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(var(--primary), 0.95) 0%, rgba(var(--secondary), 0.85) 100%), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Gateway to Technical Education in Rajasthan
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover colleges, explore courses, check cutoffs, and get AI-powered guidance for your technical education journey
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/chatbot">
                <Button size="lg" variant="secondary" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Ask AI Assistant
                </Button>
              </Link>
              <Link to="/colleges">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Browse Colleges
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Everything You Need to Know
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Access comprehensive information about technical colleges, courses, and career opportunities
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 hover:shadow-lg transition-all group border-2 border-transparent hover:border-primary/20">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">College Directory</h3>
              <p className="text-sm text-muted-foreground">
                Browse comprehensive profiles of all government technical colleges in Rajasthan
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all group border-2 border-transparent hover:border-secondary/20">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Course Information</h3>
              <p className="text-sm text-muted-foreground">
                Detailed information about courses, duration, fees, and seat availability
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all group border-2 border-transparent hover:border-primary/20">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Cutoff & Rankings</h3>
              <p className="text-sm text-muted-foreground">
                Check previous year cutoffs and admission ranks for various categories
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all group border-2 border-transparent hover:border-accent/20">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Placement Records</h3>
              <p className="text-sm text-muted-foreground">
                View placement statistics, top recruiters, and package details
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container">
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary to-secondary text-white border-0">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-8 w-8" />
                <h2 className="text-3xl md:text-4xl font-bold">Meet Your AI Assistant</h2>
              </div>
              <p className="text-lg mb-6 text-white/90">
                Get instant answers about colleges, courses, admissions, and placements. Our AI assistant 
                is trained on official government data to provide accurate and helpful information.
              </p>
              <Link to="/chatbot">
                <Button size="lg" variant="secondary" className="gap-2">
                  Start Chatting Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Technical Colleges</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">10,000+</div>
              <p className="text-muted-foreground">Students Enrolled</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">100+</div>
              <p className="text-muted-foreground">Course Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 Department of Technical Education, Government of Rajasthan</p>
          <p className="mt-2">Official AI-Powered Student Assistance Portal</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
