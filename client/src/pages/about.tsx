import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe, 
  Download,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  Brain,
  Database,
  Server,
  Shield
} from "lucide-react";

const skills = [
  { name: "Python", level: 95 },
  { name: "SQL", level: 92 },
  { name: "JavaScript", level: 88 },
  { name: "AI & Machine Learning", level: 90 },
  { name: "Cloud Architecture", level: 85 },
  { name: "PeopleSoft HCM", level: 92 },
];

const coreSkills = [
  { category: "Programming", items: ["Python", "SQL", "Java", "C++", "PHP", "HTML5", "CSS", "JavaScript"], icon: Code },
  { category: "AI & Cloud", items: ["AI Governance", "Risk Monitoring", "ML Model Deployment", "API Development", "Cloud Architecture", "Automation Workflows"], icon: Brain },
  { category: "Databases", items: ["Oracle", "SQL Server", "Data Modeling", "Enterprise-Scale Data Workflows"], icon: Database },
  { category: "Enterprise Systems", items: ["PeopleSoft HCM", "Payroll Compliance", "MFA & AD Integrations", "Governance Automation"], icon: Server },
  { category: "Tools & Platforms", items: ["Git", "Linux/Unix", "MacOS", "Windows Server", "Docker", "Kubernetes", "Agile/Scrum"], icon: Shield },
];

const experience = [
  {
    title: "PeopleSoft Developer",
    company: "City of Fort Worth",
    period: "Mar 2024 – Present",
    highlights: [
      "Lead developer across PeopleSoft HCM (payroll, HR, time & labor), optimizing Application Engine programs and SQL objects",
      "Modernized payroll processes, cutting run time by 42% while improving accuracy and reliability",
      "Integrated MFA and Active Directory sync to strengthen system security",
      "Delivered key enterprise projects: State of Texas DWC-003 Injury Wage Statement automation, AD Sync Snapshot to PDI & Preferred Name PDI to AD integration",
    ],
  },
  {
    title: "Full-Stack & AI Engineer",
    company: "RMLuthor.us",
    period: "Jan 2020 – Present",
    highlights: [
      "Designed and deployed AI-driven applications including personal assistants, automation protocols, and secure enterprise integrations",
      "Built and maintain Kieran, a personal AI ecosystem running locally on a Mac mini since 2022",
      "Architected RMLuthor.us, a full-stack AI-integrated platform with custom APIs and chat integrations",
      "Converted ML models into functional APIs for real-world applications, addressing governance and compliance",
    ],
  },
  {
    title: "Operations Store Manager",
    company: "Burlington",
    period: "Nov 2022 – Mar 2024",
    highlights: [
      "Directed operations in a $6M+ revenue environment, leading staffing, compliance, and reporting",
      "Improved workflows and accuracy by 25%, developing cross-functional leadership skills",
    ],
  },
];

const certifications = [
  "Oracle AI Vector Search Certified Professional",
  "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
  "Oracle Cloud Infrastructure 2023 Foundations Associate",
  "Google Analytics Certified",
  "Microsoft Excel (Advanced)",
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h1 className="font-heading text-2xl lg:text-3xl mb-2">
                    I'm <span className="text-primary" style={{ textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}>Risa Luthor</span> and{" "}
                    <span className="text-primary" style={{ textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}>Full-Stack & AI Engineer</span>
                  </h1>
                </div>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Full-Stack & AI Engineer with a proven record of modernizing enterprise systems, automating compliance workflows, 
                  and developing AI-driven applications. Experienced in AI governance, risk assessment, and compliance automation 
                  with hands-on work in machine learning model integration, API development, and cloud-ready deployments. 
                  Builder of RMLuthor.us, a custom AI-driven platform, and Kieran, a personal AI assistant ecosystem architected 
                  on a Mac mini since 2022. Skilled at bridging enterprise technologies like PeopleSoft, SQL, and Active Directory 
                  with modern AI, automation, and cloud architectures.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm"><span className="text-muted-foreground">City:</span> Denton, TX</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm"><span className="text-muted-foreground">Website:</span> RMLuthor.us</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="text-sm"><span className="text-muted-foreground">Degree:</span> M.S. Computer Science (Expected Jan 2026)</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-sm"><span className="text-muted-foreground">Email:</span> risa.luthor@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm"><span className="text-muted-foreground">Phone:</span> 214-897-0041</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="text-sm"><span className="text-muted-foreground">Freelance:</span> Available</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.linkedin.com/in/risaluthor" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/10"
                      data-testid="link-linkedin"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                  <a 
                    href="https://github.com/RisaLuthor" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/10"
                      data-testid="link-github"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </a>
                  <Button
                    className="bg-primary text-primary-foreground"
                    style={{ boxShadow: "0 0 15px hsl(187 100% 50% / 0.3)" }}
                    data-testid="button-hire-me"
                  >
                    Hire me!
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-lg font-semibold mb-4">Technical Proficiency</h3>
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-muted/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-8 text-center"
              style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}
            >
              Core Technical Skills
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreSkills.map((skillGroup) => (
                <Card 
                  key={skillGroup.category} 
                  className="bg-card/80 border-primary/20 hover-elevate"
                  style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.05)" }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-md flex items-center justify-center"
                        style={{ background: "hsl(187 100% 50% / 0.1)", border: "1px solid hsl(187 100% 50% / 0.3)" }}
                      >
                        <skillGroup.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold">{skillGroup.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item) => (
                        <Badge 
                          key={item} 
                          variant="outline" 
                          className="border-border/50 text-muted-foreground text-xs"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 
                  className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-8"
                  style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}
                >
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <Card 
                      key={index} 
                      className="bg-card/80 border-primary/20"
                      style={{ borderLeft: "3px solid hsl(187 100% 50%)" }}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h3 className="font-heading font-semibold text-primary">{job.title}</h3>
                          <Badge variant="outline" className="border-primary/50 text-xs">
                            {job.period}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{job.company}</p>
                        <ul className="space-y-2">
                          {job.highlights.map((highlight, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 
                  className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-8"
                  style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}
                >
                  Education & Certifications
                </h2>
                
                <Card 
                  className="bg-card/80 border-primary/20 mb-6"
                  style={{ borderLeft: "3px solid hsl(187 100% 50%)" }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: "hsl(187 100% 50% / 0.1)", border: "1px solid hsl(187 100% 50% / 0.3)" }}
                      >
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-primary">Master of Science in Computer Science</h3>
                        <p className="text-sm text-muted-foreground mb-1">Colorado Technical University</p>
                        <p className="text-xs text-muted-foreground">Software Engineering, Cybersecurity, Data Science, AI Engineering</p>
                        <Badge variant="outline" className="border-primary/50 text-xs mt-2">
                          Expected Jan 2026
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="bg-card/80 border-primary/20 mb-6"
                  style={{ borderLeft: "3px solid hsl(187 100% 50%)" }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: "hsl(187 100% 50% / 0.1)", border: "1px solid hsl(187 100% 50% / 0.3)" }}
                      >
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-primary">Bachelor of Science</h3>
                        <p className="text-sm text-muted-foreground">Colorado Technical University</p>
                        <p className="text-xs text-muted-foreground">Software Engineering</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Certifications
                </h3>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-md bg-muted/20 border border-border/30"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span
                className="font-display text-lg font-bold tracking-wider text-primary"
                style={{ textShadow: "0 0 10px hsl(187 100% 50%)" }}
              >
                RMLuthor.us
              </span>
              <p className="text-sm text-muted-foreground">
                The Luthor.Tech AI Ecosystem Core
              </p>
              <p className="text-sm text-muted-foreground">
                Luthor.Tech 2025
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
