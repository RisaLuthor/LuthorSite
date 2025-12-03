import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider mb-4"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-contact-title"
            >
              Contact
            </h1>
            <p className="text-muted-foreground font-heading tracking-wide max-w-2xl mx-auto" data-testid="text-contact-subtitle">
              Get in touch with the Luthor.Tech team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card
                className="bg-card/50 backdrop-blur-xl border-primary/20"
                style={{
                  boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)",
                }}
              >
                <CardHeader>
                  <CardTitle className="font-heading text-xl tracking-wide" style={{ color: "hsl(187 100% 70%)" }}>
                    Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  className="bg-muted/30 border-border/50 focus:border-primary/50"
                                  data-testid="input-contact-name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  className="bg-muted/30 border-border/50 focus:border-primary/50"
                                  data-testid="input-contact-email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What's this about?"
                                className="bg-muted/30 border-border/50 focus:border-primary/50"
                                data-testid="input-contact-subject"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Your message..."
                                className="min-h-32 bg-muted/30 border-border/50 focus:border-primary/50 resize-none"
                                data-testid="input-contact-message"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full sm:w-auto"
                        style={{
                          boxShadow: "0 0 15px hsl(187 100% 50% / 0.3)",
                        }}
                        data-testid="button-contact-submit"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card
                className="bg-card/50 backdrop-blur-xl border-primary/20"
                style={{
                  boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background: "hsl(187 100% 50% / 0.1)",
                        border: "1px solid hsl(187 100% 50% / 0.3)",
                      }}
                    >
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm" data-testid="text-contact-email">
                        contact@luthor.tech
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="bg-card/50 backdrop-blur-xl border-primary/20"
                style={{
                  boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background: "hsl(187 100% 50% / 0.1)",
                        border: "1px solid hsl(187 100% 50% / 0.3)",
                      }}
                    >
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground text-sm" data-testid="text-contact-location">
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="bg-card/50 backdrop-blur-xl border-primary/20"
                style={{
                  boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background: "hsl(187 100% 50% / 0.1)",
                        border: "1px solid hsl(187 100% 50% / 0.3)",
                      }}
                    >
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">Response Time</h3>
                      <p className="text-muted-foreground text-sm" data-testid="text-contact-response">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
