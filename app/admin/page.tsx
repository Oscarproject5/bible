'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Video,
  Quote,
  Users,
  FileText,
  Calendar,
  Save,
  LogOut,
  Download,
  Upload,
  CheckCircle,
  Home,
  RotateCcw,
  Image as ImageIcon,
  X,
  Plus
} from 'lucide-react';

interface ImageData {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface SiteData {
  videoUrl: string;
  videoTitle: string;
  videoDescription: string;
  quote: {
    text: string;
    reference: string;
  };
  whatWeDo: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  formFields: {
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    submitButton: string;
    successTitle: string;
    successMessage: string;
  };
  schedule: {
    day: string;
    time: string;
  };
  heroTitle: string;
  heroDescription: string;
  images: ImageData[];
}

const defaultSiteData: SiteData = {
  videoUrl: '',
  videoTitle: 'Welcome Video',
  videoDescription: 'Watch the welcome message from Pastor Juan',
  quote: {
    text: 'For where two or three gather in my name, there am I with them',
    reference: 'Matthew 18:20'
  },
  whatWeDo: [
    { icon: 'book', title: 'Deep Study', description: 'Verse-by-verse analysis' },
    { icon: 'users', title: 'Small Groups', description: 'Intimate and personal discussion' },
    { icon: 'heart', title: 'Prayer Time', description: 'Community intercession' },
    { icon: 'chat', title: 'Fellowship', description: 'Coffee and conversation' }
  ],
  formFields: {
    nameLabel: 'Full Name',
    emailLabel: 'Email Address',
    phoneLabel: 'Phone Number',
    submitButton: 'Confirm Registration',
    successTitle: 'Registration Successful!',
    successMessage: 'We look forward to seeing you this Thursday at 7 PM'
  },
  schedule: {
    day: 'Thursday',
    time: '7:00 PM'
  },
  heroTitle: 'Join Our Weekly Bible Study',
  heroDescription: 'Discover the beauty of Scripture in community. Every Thursday at 7 PM, we gather to explore God\'s Word in a welcoming and supportive environment.',
  images: []
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('bibleStudySiteData');
    if (savedData) {
      setSiteData(JSON.parse(savedData));
    }

    // Check if already authenticated
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
  };

  const saveData = async () => {
    try {
      // Save to localStorage
      localStorage.setItem('bibleStudySiteData', JSON.stringify(siteData));

      // Save to API route (we'll create this next)
      const response = await fetch('/api/admin/site-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(siteData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      // Still show success if localStorage save worked
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(siteData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'site-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target?.result as string);
          setSiteData(importedData);
          saveData();
        } catch (error) {
          alert('Error importing file');
        }
      };
      reader.readAsText(file);
    }
  };

  const updateVideoData = (field: keyof Pick<SiteData, 'videoUrl' | 'videoTitle' | 'videoDescription'>, value: string) => {
    setSiteData({ ...siteData, [field]: value });
  };

  const convertToEmbedUrl = (url: string): string => {
    // Convert YouTube URLs to embed format
    let embedUrl = url;

    // Handle youtube.com/watch?v= URLs
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }
    // Handle youtu.be/ URLs
    else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return embedUrl;
  };

  const handleVideoUrlBlur = () => {
    const convertedUrl = convertToEmbedUrl(siteData.videoUrl);
    if (convertedUrl !== siteData.videoUrl) {
      setSiteData({ ...siteData, videoUrl: convertedUrl });
    }
  };

  const updateQuote = (field: keyof SiteData['quote'], value: string) => {
    setSiteData({
      ...siteData,
      quote: { ...siteData.quote, [field]: value }
    });
  };

  const updateWhatWeDo = (index: number, field: keyof SiteData['whatWeDo'][0], value: string) => {
    const newWhatWeDo = [...siteData.whatWeDo];
    newWhatWeDo[index] = { ...newWhatWeDo[index], [field]: value };
    setSiteData({ ...siteData, whatWeDo: newWhatWeDo });
  };

  const updateFormField = (field: keyof SiteData['formFields'], value: string) => {
    setSiteData({
      ...siteData,
      formFields: { ...siteData.formFields, [field]: value }
    });
  };

  const updateSchedule = (field: keyof SiteData['schedule'], value: string) => {
    setSiteData({
      ...siteData,
      schedule: { ...siteData.schedule, [field]: value }
    });
  };

  const updateHero = (field: 'heroTitle' | 'heroDescription', value: string) => {
    setSiteData({ ...siteData, [field]: value });
  };

  const resetVideoSection = () => {
    setSiteData({
      ...siteData,
      videoUrl: defaultSiteData.videoUrl,
      videoTitle: defaultSiteData.videoTitle,
      videoDescription: defaultSiteData.videoDescription
    });
  };

  const resetHeroSection = () => {
    setSiteData({
      ...siteData,
      heroTitle: defaultSiteData.heroTitle,
      heroDescription: defaultSiteData.heroDescription
    });
  };

  const resetQuoteSection = () => {
    setSiteData({
      ...siteData,
      quote: defaultSiteData.quote
    });
  };

  const resetWhatWeDoSection = () => {
    setSiteData({
      ...siteData,
      whatWeDo: defaultSiteData.whatWeDo
    });
  };

  const resetFormSection = () => {
    setSiteData({
      ...siteData,
      formFields: defaultSiteData.formFields
    });
  };

  const resetScheduleSection = () => {
    setSiteData({
      ...siteData,
      schedule: defaultSiteData.schedule
    });
  };

  const resetImagesSection = () => {
    setSiteData({
      ...siteData,
      images: []
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if we already have 8 images
    if (siteData.images.length >= 8) {
      alert('Maximum of 8 images allowed');
      return;
    }

    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newImage: ImageData = {
        id: Date.now().toString(),
        url: base64String,
        alt: file.name,
        caption: ''
      };
      setSiteData({
        ...siteData,
        images: [...siteData.images, newImage]
      });
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  const removeImage = (id: string) => {
    setSiteData({
      ...siteData,
      images: siteData.images.filter(img => img.id !== id)
    });
  };

  const updateImageAlt = (id: string, alt: string) => {
    setSiteData({
      ...siteData,
      images: siteData.images.map(img =>
        img.id === id ? { ...img, alt } : img
      )
    });
  };

  const updateImageCaption = (id: string, caption: string) => {
    setSiteData({
      ...siteData,
      images: siteData.images.map(img =>
        img.id === id ? { ...img, caption } : img
      )
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Panel</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <p className="text-xs text-gray-500 text-center mt-4">
              Default password: admin123
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Changes saved successfully!
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Admin Panel</CardTitle>
                <CardDescription>Manage your website content</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportData}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Label htmlFor="import-file" className="cursor-pointer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => document.getElementById('import-file')?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    Import
                  </Button>
                  <input
                    id="import-file"
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                  />
                </Label>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="video" className="space-y-6">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                <TabsTrigger value="video" className="gap-2">
                  <Video className="w-4 h-4" />
                  <span className="hidden sm:inline">Video</span>
                </TabsTrigger>
                <TabsTrigger value="hero" className="gap-2">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Main</span>
                </TabsTrigger>
                <TabsTrigger value="quote" className="gap-2">
                  <Quote className="w-4 h-4" />
                  <span className="hidden sm:inline">Quote</span>
                </TabsTrigger>
                <TabsTrigger value="whatwedo" className="gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">What We Do</span>
                </TabsTrigger>
                <TabsTrigger value="form" className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Form</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Schedule</span>
                </TabsTrigger>
                <TabsTrigger value="images" className="gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Images</span>
                </TabsTrigger>
              </TabsList>

              {/* Video Tab */}
              <TabsContent value="video" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Video Configuration</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetVideoSection}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL (YouTube/Vimeo)</Label>
                    <Input
                      id="videoUrl"
                      value={siteData.videoUrl}
                      onChange={(e) => updateVideoData('videoUrl', e.target.value)}
                      onBlur={handleVideoUrlBlur}
                      placeholder="Paste YouTube link: https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-converts YouTube links to embed format when you click away
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videoTitle">Video Title</Label>
                    <Input
                      id="videoTitle"
                      value={siteData.videoTitle}
                      onChange={(e) => updateVideoData('videoTitle', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videoDescription">Video Description</Label>
                    <Textarea
                      id="videoDescription"
                      value={siteData.videoDescription}
                      onChange={(e) => updateVideoData('videoDescription', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Hero Section Tab */}
              <TabsContent value="hero" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Main Section</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetHeroSection}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroTitle">Main Title</Label>
                    <Input
                      id="heroTitle"
                      value={siteData.heroTitle}
                      onChange={(e) => updateHero('heroTitle', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroDescription">Main Description</Label>
                    <Textarea
                      id="heroDescription"
                      value={siteData.heroDescription}
                      onChange={(e) => updateHero('heroDescription', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Quote Tab */}
              <TabsContent value="quote" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Bible Quote</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetQuoteSection}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quoteText">Quote Text</Label>
                    <Textarea
                      id="quoteText"
                      value={siteData.quote.text}
                      onChange={(e) => updateQuote('text', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quoteReference">Reference</Label>
                    <Input
                      id="quoteReference"
                      value={siteData.quote.reference}
                      onChange={(e) => updateQuote('reference', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* What We Do Tab */}
              <TabsContent value="whatwedo" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">"What We Do" Section</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetWhatWeDoSection}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                </div>
                <div className="grid gap-4">
                  {siteData.whatWeDo.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-base">Item {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={item.title}
                            onChange={(e) => updateWhatWeDo(index, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input
                            value={item.description}
                            onChange={(e) => updateWhatWeDo(index, 'description', e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Form Tab */}
              <TabsContent value="form" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Form Configuration</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFormSection}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name Label</Label>
                      <Input
                        value={siteData.formFields.nameLabel}
                        onChange={(e) => updateFormField('nameLabel', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Label</Label>
                      <Input
                        value={siteData.formFields.emailLabel}
                        onChange={(e) => updateFormField('emailLabel', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Label</Label>
                      <Input
                        value={siteData.formFields.phoneLabel}
                        onChange={(e) => updateFormField('phoneLabel', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input
                        value={siteData.formFields.submitButton}
                        onChange={(e) => updateFormField('submitButton', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Success Title</Label>
                      <Input
                        value={siteData.formFields.successTitle}
                        onChange={(e) => updateFormField('successTitle', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Success Message</Label>
                      <Input
                        value={siteData.formFields.successMessage}
                        onChange={(e) => updateFormField('successMessage', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Schedule</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetScheduleSection}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduleDay">Day</Label>
                    <Input
                      id="scheduleDay"
                      value={siteData.schedule.day}
                      onChange={(e) => updateSchedule('day', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduleTime">Time</Label>
                    <Input
                      id="scheduleTime"
                      value={siteData.schedule.time}
                      onChange={(e) => updateSchedule('time', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Images Tab */}
              <TabsContent value="images" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Image Gallery ({siteData.images.length}/8)</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetImagesSection}
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear All
                    </Button>
                    {siteData.images.length < 8 && (
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <Button
                          variant="default"
                          size="sm"
                          className="gap-2"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Plus className="w-4 h-4" />
                          Add Image
                        </Button>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </Label>
                    )}
                  </div>
                </div>

                <div className="grid gap-4">
                  {siteData.images.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600 mb-2">No images uploaded yet</p>
                      <p className="text-sm text-gray-500">You can add up to 8 images</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {siteData.images.map((image) => (
                        <Card key={image.id} className="overflow-hidden">
                          <div className="relative h-48 bg-gray-100">
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => removeImage(image.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <CardContent className="p-4 space-y-3">
                            <div className="space-y-2">
                              <Label>Alt Text</Label>
                              <Input
                                value={image.alt}
                                onChange={(e) => updateImageAlt(image.id, e.target.value)}
                                placeholder="Describe the image"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Caption (Optional)</Label>
                              <Input
                                value={image.caption || ''}
                                onChange={(e) => updateImageCaption(image.id, e.target.value)}
                                placeholder="Add a caption"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {siteData.images.length > 0 && siteData.images.length < 8 && (
                  <p className="text-sm text-gray-500 text-center">
                    You can add {8 - siteData.images.length} more image{8 - siteData.images.length !== 1 ? 's' : ''}
                  </p>
                )}
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <Button onClick={saveData} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Link */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Preview</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Changes will be reflected on the main page after saving
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  View Main Page
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}