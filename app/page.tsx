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
      <section className="pb-16 lg:pb-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 max-w-xl pt-16">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-primary">
                Register for Bible Study
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Fill out the form below to join our weekly sessions
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

                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Bible Study meets every Wednesday at 7:00 PM
            </p>
            <p className="text-muted-foreground mt-2">
              Questions? Email us at{" "}
              <a href="mailto:info@biblestudy.com" className="text-primary underline">
                info@biblestudy.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}