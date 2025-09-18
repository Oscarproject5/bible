"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitSuccess(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "" });
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bible-study-hero.jpg"
            alt="Bible study background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>

        {/* Falling Images Overlay - Only in hero section */}
        <div className="absolute inset-0 z-20 pointer-events-none hidden xl:block overflow-hidden">
          {/* Left side images - 2 images */}
          <div
            className="snowfall-image h-32 w-40 rounded-lg overflow-hidden shadow-2xl opacity-80"
            style={{ animationDelay: '1.5s', left: '5%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=400"
              alt="Open Bible with cross"
              fill
              className="object-cover"
            />
          </div>

          <div
            className="snowfall-image h-36 w-44 rounded-lg overflow-hidden shadow-2xl opacity-80"
            style={{ animationDelay: '11.5s', left: '12%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1516559828984-fb3b99548b21?q=80&w=400"
              alt="Bible study group"
              fill
              className="object-cover"
            />
          </div>

          {/* Right side images - 2 images */}
          <div
            className="snowfall-image h-32 w-40 rounded-lg overflow-hidden shadow-2xl opacity-80"
            style={{ animationDelay: '6.5s', right: '5%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1609234656388-0ff363383899?q=80&w=400"
              alt="People praying together"
              fill
              className="object-cover"
            />
          </div>

          <div
            className="snowfall-image h-36 w-44 rounded-lg overflow-hidden shadow-2xl opacity-80"
            style={{ animationDelay: '16.5s', right: '12%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400"
              alt="Group worship"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Title and Description */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-slide-in-right">
              Join Our Weekly Bible Study
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up">
              Discover the transformative power of God's Word as we gather together every week
              to study, pray, and grow in faith. All are welcome to join our loving community.
            </p>
          </div>

          {/* YouTube Video - Center */}
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Bible Study Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative pb-16 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Floating Bible Verse - Left Side */}
        <div className="hidden xl:block">
          <div className="floating-verse top-32" style={{ animationDelay: '1s', maxWidth: '350px' }}>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-blue-100/50">
              <p className="text-primary font-serif text-lg italic leading-relaxed">
                "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.
                It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.
                Love does not delight in evil but rejoices with the truth.
                It always protects, always trusts, always hopes, always perseveres.
                Love never fails."
              </p>
              <p className="text-muted-foreground text-sm mt-4 font-semibold">- 1 Corinthians 13:4-8</p>
            </div>
          </div>
        </div>

        {/* Activities List - Right Side */}
        <div className="hidden xl:block absolute right-8 top-32 w-80">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-amber-100/50 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              What We Do
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Scripture Reading</h4>
                  <p className="text-sm text-muted-foreground">Deep dive into biblical passages with guided interpretation</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Group Discussion</h4>
                  <p className="text-sm text-muted-foreground">Share insights and learn from different perspectives</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Prayer Circle</h4>
                  <p className="text-sm text-muted-foreground">Lift up prayers together as a community</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Fellowship Time</h4>
                  <p className="text-sm text-muted-foreground">Build lasting friendships over coffee and snacks</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Life Application</h4>
                  <p className="text-sm text-muted-foreground">Practical ways to live out God's word daily</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Food & Refreshments</h4>
                  <p className="text-sm text-muted-foreground">Homemade treats and beverages to share together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-xl pt-16 relative z-10">
          {/* Inspiring Message */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              "For where two or three are gathered in my name, there am I among them."
            </h2>
            <p className="text-muted-foreground text-lg">- Matthew 18:20</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-8 bg-gradient-to-b from-blue-50 to-transparent">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <CardTitle className="text-3xl font-bold text-primary">
                Register for Bible Study
              </CardTitle>
              <CardDescription className="text-base mt-2 max-w-md mx-auto">
                Join our community of believers as we explore God's word together in a warm, welcoming environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <svg
                      className="w-16 h-16 text-green-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Registration Successful!
                  </h3>
                  <p className="text-muted-foreground">
                    We'll contact you soon with more details about our Bible study sessions.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      By registering, you'll receive weekly reminders and study materials
                    </p>
                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold text-lg py-6 transition-all hover:shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Registration"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Additional Info with Icons */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
              <svg className="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold text-primary">Weekly Meetings</p>
              <p className="text-sm text-muted-foreground mt-1">Every Wednesday at 7:00 PM</p>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
              <svg className="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="font-semibold text-primary">All Welcome</p>
              <p className="text-sm text-muted-foreground mt-1">Open to all ages and backgrounds</p>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
              <svg className="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold text-primary">Contact Us</p>
              <a href="mailto:info@biblestudy.com" className="text-sm text-primary underline hover:text-primary/80">
                info@biblestudy.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}