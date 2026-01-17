-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('freelancer', 'client', 'admin');

-- Create enum for project status
CREATE TYPE public.project_status AS ENUM ('draft', 'open', 'in_progress', 'completed', 'cancelled');

-- Create enum for work history status
CREATE TYPE public.work_status AS ENUM ('pending', 'submitted', 'verified', 'rejected');

-- Create user_roles table (secure role storage)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'freelancer',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    hourly_rate DECIMAL(10, 2),
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table (master list of skills)
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create freelancer_skills junction table
CREATE TABLE public.freelancer_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5) DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, skill_id)
);

-- Create projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    budget DECIMAL(10, 2),
    deadline TIMESTAMP WITH TIME ZONE,
    complexity INTEGER CHECK (complexity >= 1 AND complexity <= 5) DEFAULT 3,
    status project_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_skills junction table
CREATE TABLE public.project_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (project_id, skill_id)
);

-- Create project_assignments table (assigns freelancers to projects)
CREATE TABLE public.project_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    freelancer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    status TEXT DEFAULT 'active',
    UNIQUE (project_id, freelancer_id)
);

-- Create work_history table
CREATE TABLE public.work_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    freelancer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    submission_notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    verified_at TIMESTAMP WITH TIME ZONE,
    delivered_on_time BOOLEAN,
    quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
    status work_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create credibility_scores table
CREATE TABLE public.credibility_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    overall_score DECIMAL(5, 2) NOT NULL DEFAULT 0,
    delivery_score DECIMAL(5, 2) NOT NULL DEFAULT 0,
    quality_score DECIMAL(5, 2) NOT NULL DEFAULT 0,
    consistency_score DECIMAL(5, 2) NOT NULL DEFAULT 0,
    skill_match_score DECIMAL(5, 2) NOT NULL DEFAULT 0,
    total_projects INTEGER NOT NULL DEFAULT 0,
    on_time_deliveries INTEGER NOT NULL DEFAULT 0,
    last_calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credibility_scores ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user's primary role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = _user_id LIMIT 1
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert roles"
ON public.user_roles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for skills (public read)
CREATE POLICY "Skills are viewable by everyone"
ON public.skills FOR SELECT
USING (true);

CREATE POLICY "Admins can manage skills"
ON public.skills FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for freelancer_skills
CREATE POLICY "Freelancer skills are viewable by everyone"
ON public.freelancer_skills FOR SELECT
USING (true);

CREATE POLICY "Freelancers can manage their own skills"
ON public.freelancer_skills FOR ALL
USING (auth.uid() = user_id);

-- RLS Policies for projects
CREATE POLICY "Clients can view their own projects"
ON public.projects FOR SELECT
USING (auth.uid() = client_id);

CREATE POLICY "Freelancers can view assigned projects"
ON public.projects FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.project_assignments 
    WHERE project_id = id AND freelancer_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view open projects"
ON public.projects FOR SELECT
USING (status = 'open');

CREATE POLICY "Clients can create projects"
ON public.projects FOR INSERT
WITH CHECK (auth.uid() = client_id AND public.has_role(auth.uid(), 'client'));

CREATE POLICY "Clients can update their own projects"
ON public.projects FOR UPDATE
USING (auth.uid() = client_id);

CREATE POLICY "Clients can delete their draft projects"
ON public.projects FOR DELETE
USING (auth.uid() = client_id AND status = 'draft');

-- RLS Policies for project_skills
CREATE POLICY "Project skills are viewable with project"
ON public.project_skills FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE id = project_id AND (client_id = auth.uid() OR status = 'open')
  )
);

CREATE POLICY "Clients can manage project skills for their projects"
ON public.project_skills FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE id = project_id AND client_id = auth.uid()
  )
);

-- RLS Policies for project_assignments
CREATE POLICY "View assignments for own projects or as freelancer"
ON public.project_assignments FOR SELECT
USING (
  freelancer_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE id = project_id AND client_id = auth.uid()
  )
);

CREATE POLICY "Clients can assign freelancers to their projects"
ON public.project_assignments FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE id = project_id AND client_id = auth.uid()
  )
);

CREATE POLICY "Clients can remove assignments from their projects"
ON public.project_assignments FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE id = project_id AND client_id = auth.uid()
  )
);

-- RLS Policies for work_history
CREATE POLICY "Freelancers can view their own work history"
ON public.work_history FOR SELECT
USING (freelancer_id = auth.uid());

CREATE POLICY "Clients can view work history for their projects"
ON public.work_history FOR SELECT
USING (client_id = auth.uid());

CREATE POLICY "Freelancers can submit work"
ON public.work_history FOR INSERT
WITH CHECK (freelancer_id = auth.uid());

CREATE POLICY "Freelancers can update pending submissions"
ON public.work_history FOR UPDATE
USING (freelancer_id = auth.uid() AND status = 'pending');

CREATE POLICY "Clients can verify/reject submissions"
ON public.work_history FOR UPDATE
USING (client_id = auth.uid() AND status = 'submitted');

-- RLS Policies for credibility_scores
CREATE POLICY "Users can view their own credibility score"
ON public.credibility_scores FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Anyone can view freelancer credibility scores"
ON public.credibility_scores FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = credibility_scores.user_id AND role = 'freelancer'
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_work_history_updated_at
BEFORE UPDATE ON public.work_history
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_credibility_scores_updated_at
BEFORE UPDATE ON public.credibility_scores
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  
  -- Insert role (default to freelancer, check metadata for role)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id, 
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'freelancer')
  );
  
  -- Initialize credibility score for freelancers
  IF COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'freelancer') = 'freelancer' THEN
    INSERT INTO public.credibility_scores (user_id, overall_score)
    VALUES (NEW.id, 50);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some default skills
INSERT INTO public.skills (name, category) VALUES
  ('React', 'Frontend'),
  ('TypeScript', 'Programming'),
  ('Node.js', 'Backend'),
  ('Python', 'Programming'),
  ('PostgreSQL', 'Database'),
  ('AWS', 'Cloud'),
  ('Docker', 'DevOps'),
  ('UI/UX Design', 'Design'),
  ('GraphQL', 'API'),
  ('Next.js', 'Framework'),
  ('Vue.js', 'Frontend'),
  ('MongoDB', 'Database'),
  ('Figma', 'Design'),
  ('Tailwind CSS', 'Frontend'),
  ('Java', 'Programming'),
  ('Spring Boot', 'Framework'),
  ('Machine Learning', 'AI'),
  ('Data Analysis', 'Analytics'),
  ('Mobile Development', 'Mobile'),
  ('Blockchain', 'Web3');