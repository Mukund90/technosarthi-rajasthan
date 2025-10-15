import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, LinkIcon, Phone, Mail, Building2, BookOpen, TrendingUp, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CollegeDetail = () => {
  const { id } = useParams();
  const [college, setCollege] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchCollegeDetails();
    }
  }, [id]);

  const fetchCollegeDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .select(`
          *,
          courses (*,
            cutoffs (*)
          ),
          placements (*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setCollege(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load college details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12 text-center">
          <p className="text-muted-foreground">College not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <Card className="p-8 mb-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {college.location}, {college.district}
                </div>
                {college.established_year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Established: {college.established_year}
                  </div>
                )}
              </div>
              <Badge variant="secondary">{college.college_type}</Badge>
            </div>
          </div>

          {college.description && (
            <p className="text-muted-foreground mb-6">{college.description}</p>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {college.affiliation && (
              <div>
                <p className="text-sm font-medium mb-1">Affiliation</p>
                <p className="text-sm text-muted-foreground">{college.affiliation}</p>
              </div>
            )}
            {college.website && (
              <div>
                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                  <LinkIcon className="h-3 w-3" />
                  Website
                </p>
                <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  {college.website}
                </a>
              </div>
            )}
            {college.phone && (
              <div>
                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  Phone
                </p>
                <p className="text-sm text-muted-foreground">{college.phone}</p>
              </div>
            )}
            {college.email && (
              <div>
                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  Email
                </p>
                <p className="text-sm text-muted-foreground">{college.email}</p>
              </div>
            )}
          </div>

          {college.facilities && college.facilities.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Facilities</p>
              <div className="flex flex-wrap gap-2">
                {college.facilities.map((facility: string, idx: number) => (
                  <Badge key={idx} variant="outline">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="placements">
              <TrendingUp className="h-4 w-4 mr-2" />
              Placements
            </TabsTrigger>
            <TabsTrigger value="cutoffs">
              <IndianRupee className="h-4 w-4 mr-2" />
              Cutoffs & Fees
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-6">
            {college.courses && college.courses.length > 0 ? (
              <div className="grid gap-4">
                {college.courses.map((course: any) => (
                  <Card key={course.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{course.course_name}</h3>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                          <span>{course.course_type}</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <Badge>₹{course.fees_per_year.toLocaleString()}/year</Badge>
                    </div>
                    {course.description && (
                      <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                    )}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Total Seats:</span> {course.total_seats}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No courses available</p>
            )}
          </TabsContent>

          <TabsContent value="placements" className="mt-6">
            {college.placements && college.placements.length > 0 ? (
              <div className="grid gap-4">
                {college.placements.map((placement: any) => (
                  <Card key={placement.id} className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Year {placement.year}</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Placement Rate</p>
                        <p className="text-2xl font-bold text-primary">
                          {((placement.students_placed / placement.total_students) * 100).toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {placement.students_placed} out of {placement.total_students}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Highest Package</p>
                        <p className="text-2xl font-bold text-secondary">
                          ₹{placement.highest_package} LPA
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Average Package</p>
                        <p className="text-2xl font-bold">₹{placement.average_package} LPA</p>
                      </div>
                    </div>
                    {placement.top_recruiters && placement.top_recruiters.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Top Recruiters</p>
                        <div className="flex flex-wrap gap-2">
                          {placement.top_recruiters.map((recruiter: string, idx: number) => (
                            <Badge key={idx} variant="outline">{recruiter}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No placement data available</p>
            )}
          </TabsContent>

          <TabsContent value="cutoffs" className="mt-6">
            {college.courses && college.courses.some((c: any) => c.cutoffs?.length > 0) ? (
              <div className="grid gap-4">
                {college.courses.map((course: any) => (
                  course.cutoffs && course.cutoffs.length > 0 && (
                    <Card key={course.id} className="p-6">
                      <h3 className="font-semibold text-lg mb-4">{course.course_name}</h3>
                      <div className="space-y-3">
                        {course.cutoffs.map((cutoff: any) => (
                          <div key={cutoff.id} className="border-l-4 border-primary pl-4">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium">Year {cutoff.year}</p>
                                <Badge variant="secondary" className="mt-1">{cutoff.category}</Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Opening Rank</p>
                                <p className="font-semibold">{cutoff.opening_rank}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Closing Rank</p>
                                <p className="font-semibold">{cutoff.closing_rank}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No cutoff data available</p>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CollegeDetail;