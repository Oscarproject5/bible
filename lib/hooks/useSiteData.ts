import { useState, useEffect } from 'react';

export interface SiteData {
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
  images: Array<{
    id: string;
    url: string;
    alt: string;
    caption?: string;
  }>;
}

const defaultSiteData: SiteData = {
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  videoTitle: 'Video de bienvenida',
  videoDescription: 'Mira el mensaje de bienvenida del Pastor Juan',
  quote: {
    text: 'Donde dos o tres se reúnen en mi nombre, allí estoy yo',
    reference: 'Mateo 18:20'
  },
  whatWeDo: [
    { icon: 'book', title: 'Estudio Profundo', description: 'Análisis versículo por versículo' },
    { icon: 'users', title: 'Grupos Pequeños', description: 'Discusión íntima y personal' },
    { icon: 'heart', title: 'Tiempo de Oración', description: 'Intercesión comunitaria' },
    { icon: 'chat', title: 'Compañerismo', description: 'Café y conversación' }
  ],
  formFields: {
    nameLabel: 'Nombre Completo',
    emailLabel: 'Correo Electrónico',
    phoneLabel: 'Número de Teléfono',
    submitButton: 'Confirmar Registro',
    successTitle: '¡Registro Exitoso!',
    successMessage: 'Te esperamos este jueves a las 7 PM'
  },
  schedule: {
    day: 'Jueves',
    time: '7:00 PM'
  },
  heroTitle: 'Únete a Nuestro Estudio Bíblico Semanal',
  heroDescription: 'Descubre la belleza de las Escrituras en comunidad. Cada jueves a las 7 PM, nos reunimos para explorar la Palabra de Dios en un ambiente acogedor y de apoyo.',
  images: []
};

export function useSiteData() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First check localStorage
    const localData = localStorage.getItem('bibleStudySiteData');
    if (localData) {
      try {
        setSiteData(JSON.parse(localData));
      } catch (error) {
        console.error('Error parsing local data:', error);
      }
    }

    // Then try to fetch from API
    fetch('/api/admin/site-data')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setSiteData(data);
        }
      })
      .catch(error => {
        console.error('Error fetching site data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { siteData, loading };
}