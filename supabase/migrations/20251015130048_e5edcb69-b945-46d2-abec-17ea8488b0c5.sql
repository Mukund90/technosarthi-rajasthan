-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for college types
CREATE TYPE college_type AS ENUM ('Engineering', 'Polytechnic', 'ITI', 'Management');

-- Create enum for course types
CREATE TYPE course_type AS ENUM ('B.Tech', 'M.Tech', 'Diploma', 'ITI', 'MBA', 'MCA');

-- Create colleges table
CREATE TABLE public.colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  district TEXT NOT NULL,
  college_type college_type NOT NULL,
  established_year INTEGER,
  affiliation TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  description TEXT,
  facilities TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  course_type course_type NOT NULL,
  duration TEXT NOT NULL,
  total_seats INTEGER NOT NULL,
  fees_per_year INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cutoffs table
CREATE TABLE public.cutoffs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  category TEXT NOT NULL, -- General, OBC, SC, ST, EWS
  opening_rank INTEGER,
  closing_rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create placements table
CREATE TABLE public.placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  total_students INTEGER,
  students_placed INTEGER,
  highest_package DECIMAL(10, 2),
  average_package DECIMAL(10, 2),
  median_package DECIMAL(10, 2),
  top_recruiters TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat messages table for AI chatbot
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cutoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for colleges" ON public.colleges FOR SELECT USING (true);
CREATE POLICY "Public read access for courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read access for cutoffs" ON public.cutoffs FOR SELECT USING (true);
CREATE POLICY "Public read access for placements" ON public.placements FOR SELECT USING (true);
CREATE POLICY "Public read access for chat_messages" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Public insert access for chat_messages" ON public.chat_messages FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_colleges_updated_at BEFORE UPDATE ON public.colleges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cutoffs_updated_at BEFORE UPDATE ON public.cutoffs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_placements_updated_at BEFORE UPDATE ON public.placements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for demonstration
INSERT INTO public.colleges (name, location, district, college_type, established_year, affiliation, website, description, facilities) VALUES
('Malaviya National Institute of Technology Jaipur', 'JLN Marg, Jaipur', 'Jaipur', 'Engineering', 1963, 'NIT, AICTE', 'www.mnit.ac.in', 'Premier engineering institute with excellent research facilities', ARRAY['Library', 'Hostel', 'Sports Complex', 'Computer Labs', 'Research Centers']),
('Government Engineering College Ajmer', 'Ajmer-Pushkar Road', 'Ajmer', 'Engineering', 1997, 'RTU Kota, AICTE', 'www.ecajmer.ac.in', 'Leading government engineering college in Ajmer region', ARRAY['Library', 'Hostel', 'Sports Ground', 'Workshops', 'Computer Center']),
('Rajasthan Technical University', 'Kota', 'Kota', 'Engineering', 2006, 'UGC, AICTE', 'www.rtu.ac.in', 'State technical university offering various engineering programs', ARRAY['Central Library', 'Research Labs', 'Auditorium', 'Sports Facilities']);

INSERT INTO public.courses (college_id, course_name, course_type, duration, total_seats, fees_per_year, description) 
SELECT id, 'Computer Science and Engineering', 'B.Tech', '4 Years', 120, 85000, 'Comprehensive computer science program with modern curriculum'
FROM public.colleges WHERE name = 'Malaviya National Institute of Technology Jaipur';

INSERT INTO public.courses (college_id, course_name, course_type, duration, total_seats, fees_per_year, description)
SELECT id, 'Mechanical Engineering', 'B.Tech', '4 Years', 90, 75000, 'Excellence in mechanical engineering education'
FROM public.colleges WHERE name = 'Government Engineering College Ajmer';