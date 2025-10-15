import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, Building2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import emblem from "@/assets/emblem.png";

const Navbar = () => {
  const NavLinks = () => (
    <>
      <Link to="/colleges">
        <Button variant="ghost" className="gap-2">
          <Building2 className="h-4 w-4" />
          Colleges
        </Button>
      </Link>
      <Link to="/chatbot">
        <Button variant="ghost" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          AI Assistant
        </Button>
      </Link>
      <Link to="/about">
        <Button variant="ghost" className="gap-2">
          <BookOpen className="h-4 w-4" />
          About
        </Button>
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={emblem} alt="Rajasthan Govt" className="h-10 w-10" />
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-foreground">TechnoSarthi</h1>
            <p className="text-xs text-muted-foreground">Dept. of Technical Education, Rajasthan</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavLinks />
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;