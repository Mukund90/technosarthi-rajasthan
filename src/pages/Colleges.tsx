import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Link as LinkIcon, Building2, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface College {
  id: string;
  name: string;
  location: string;
  district: string;
  college_type: string;
  established_year: number;
  affiliation: string;
  website: string;
  phone: string;
  email: string;
  description: string;
  facilities: string[];
  image_url: string;
}

const Colleges = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .order('name');

      if (error) throw error;
      setColleges(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load colleges",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.college_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Technical Colleges in Rajasthan
          </h1>
          <p className="text-muted-foreground">
            Explore government technical education institutions across Rajasthan
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by college name, district, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading colleges...</p>
          </div>
        ) : filteredColleges.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No colleges found</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredColleges.map((college) => (
              <Link key={college.id} to={`/college/${college.id}`}>
                <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {college.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        {college.district}
                      </div>
                    </div>
                  </div>

                  <Badge variant="secondary" className="mb-4">
                    {college.college_type}
                  </Badge>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {college.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    {college.established_year && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Established: {college.established_year}
                      </div>
                    )}
                    {college.affiliation && (
                      <div className="text-muted-foreground">
                        <strong>Affiliated:</strong> {college.affiliation}
                      </div>
                    )}
                  </div>

                  {college.facilities && college.facilities.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1">
                        {college.facilities.slice(0, 3).map((facility, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {college.facilities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{college.facilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <Button className="w-full mt-4" variant="outline">
                    View Details
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Colleges;