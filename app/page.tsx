"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteData } from "@/lib/hooks/useSiteData";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const { siteData, loading } = useSiteData();

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

  useEffect(() => {
    // Simple intro - just wait and slide open
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Por favor ingresa un correo válido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El número de teléfono es requerido";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Por favor ingresa un número válido";
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
    <>
      {/* Simple Curtain Opening Effect */}
      <div className={`fixed inset-0 z-50 bg-black transition-transform duration-1000 ease-in-out ${!showIntro ? 'translate-x-full' : 'translate-x-0'}`}></div>

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
        <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block overflow-hidden">
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
          <div className="text-center mb-8 md:mb-12 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-slide-in-right">
              {siteData.heroTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up">
              {siteData.heroDescription}
            </p>
          </div>

          {/* YouTube Video - Center */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              {siteData.videoUrl ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={siteData.videoUrl}
                  title={siteData.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">{siteData.videoTitle}</p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Only - What We Do Section with Black Background */}
          <div className="block md:hidden">
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 mx-2">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Lo Que Hacemos
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">Lectura Bíblica</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">Discusión Grupal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">Círculo de Oración</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">Compañerismo</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">Aplicación Práctica</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">Comida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      {siteData.images && siteData.images.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
              <p className="text-lg text-gray-600">Moments from our Bible study gatherings</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {siteData.images.map((image, index) => (
                <div key={image.id || index} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={image.url}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Form Section */}
      <section className="relative py-16 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Floating Bible Verse - Mobile and Desktop */}
        <div className="block lg:hidden px-4 mb-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-blue-100/50 max-w-lg mx-auto">
            <p className="text-primary font-serif text-base italic leading-relaxed">
              "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso.
              El amor nunca deja de ser."
            </p>
            <p className="text-muted-foreground text-sm mt-3 font-semibold">- 1 Corintios 13:4,8</p>
          </div>
        </div>

        {/* Floating Bible Verse - Desktop Left Side */}
        <div className="hidden lg:block xl:block">
          <div className="floating-verse top-48" style={{ animationDelay: '1s', maxWidth: '350px' }}>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-blue-100/50">
              <p className="text-primary font-serif text-lg italic leading-relaxed">
                "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso.
                No se comporta con rudeza, no es egoísta, no se enoja fácilmente, no guarda rencor.
                El amor no se deleita en la maldad, sino que se regocija con la verdad.
                Todo lo disculpa, todo lo cree, todo lo espera, todo lo soporta.
                El amor nunca deja de ser."
              </p>
              <p className="text-muted-foreground text-sm mt-4 font-semibold">- 1 Corintios 13:4-8</p>
            </div>
          </div>
        </div>


        {/* Activities List - Desktop Right Side */}
        <div className="hidden lg:block absolute right-8 top-32 w-80">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-amber-100/50 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Lo Que Hacemos
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Lectura Bíblica</h4>
                  <p className="text-sm text-muted-foreground">Profundizamos en pasajes bíblicos con interpretación guiada</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Discusión Grupal</h4>
                  <p className="text-sm text-muted-foreground">Compartimos ideas y aprendemos de diferentes perspectivas</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Círculo de Oración</h4>
                  <p className="text-sm text-muted-foreground">Elevamos oraciones juntos como comunidad</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Tiempo de Compañerismo</h4>
                  <p className="text-sm text-muted-foreground">Construimos amistades duraderas con café y bocadillos</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Aplicación Práctica</h4>
                  <p className="text-sm text-muted-foreground">Formas prácticas de vivir la palabra de Dios diariamente</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">Comida y Refrigerios</h4>
                  <p className="text-sm text-muted-foreground">Golosinas caseras y bebidas para compartir juntos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-xl lg:pt-16 relative z-10">
          {/* Inspiring Message */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              "{siteData.quote.text}"
            </h2>
            <p className="text-muted-foreground text-lg">- {siteData.quote.reference}</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-8 bg-gradient-to-b from-blue-50 to-transparent">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <CardTitle className="text-3xl font-bold text-primary">
                Regístrate para el Estudio Bíblico
              </CardTitle>
              <CardDescription className="text-base mt-2 max-w-md mx-auto">
                Únete a nuestra comunidad de creyentes mientras exploramos juntos la palabra de Dios en un ambiente cálido y acogedor
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
                    {siteData.formFields.successTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {siteData.formFields.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{siteData.formFields.nameLabel} *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={`Ingresa tu ${siteData.formFields.nameLabel.toLowerCase()}`}
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{siteData.formFields.emailLabel} *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu.correo@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{siteData.formFields.phoneLabel} *</Label>
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
                      Al registrarte, recibirás recordatorios semanales y materiales de estudio
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
                          Enviando...
                        </span>
                      ) : (
                        siteData.formFields.submitButton
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Additional Info with Icons */}
          <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
              <svg className="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold text-primary">Reuniones Semanales</p>
              <p className="text-sm text-muted-foreground mt-1">Todos los {siteData.schedule.day} a las {siteData.schedule.time}</p>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
              <svg className="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="font-semibold text-primary">Todos Bienvenidos</p>
              <p className="text-sm text-muted-foreground mt-1">Abierto a todas las edades y orígenes</p>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
              <svg className="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold text-primary">Contáctanos</p>
              <a href="mailto:info@estudiobiblico.com" className="text-sm text-primary underline hover:text-primary/80">
                info@estudiobiblico.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}