import { sql } from '@vercel/postgres';

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

export async function getSiteData(): Promise<SiteData> {
  try {
    // Get all site config except images
    const { rows: configRows } = await sql`
      SELECT key, value FROM site_config
    `;

    // Get images separately
    const { rows: imageRows } = await sql`
      SELECT image_id as id, url, alt, caption
      FROM images
      ORDER BY position ASC
    `;

    // If no data exists, return defaults
    if (configRows.length === 0) {
      return defaultSiteData;
    }

    // Build site data from database
    const siteData = { ...defaultSiteData };

    configRows.forEach(row => {
      try {
        if (row.key === 'quote' || row.key === 'whatWeDo' || row.key === 'formFields' || row.key === 'schedule') {
          (siteData as any)[row.key] = JSON.parse(row.value);
        } else if (row.key in siteData) {
          (siteData as any)[row.key] = row.value;
        }
      } catch (e) {
        console.error(`Error parsing ${row.key}:`, e);
      }
    });

    // Add images
    siteData.images = imageRows.map(img => ({
      id: img.id,
      url: img.url,
      alt: img.alt || '',
      caption: img.caption || undefined
    }));

    return siteData;
  } catch (error) {
    console.error('Error fetching site data:', error);
    return defaultSiteData;
  }
}

export async function saveSiteData(data: SiteData): Promise<void> {
  try {
    // Start a transaction
    await sql`BEGIN`;

    // Save each config item
    const configItems = [
      { key: 'videoUrl', value: data.videoUrl },
      { key: 'videoTitle', value: data.videoTitle },
      { key: 'videoDescription', value: data.videoDescription },
      { key: 'heroTitle', value: data.heroTitle },
      { key: 'heroDescription', value: data.heroDescription },
      { key: 'quote', value: JSON.stringify(data.quote) },
      { key: 'whatWeDo', value: JSON.stringify(data.whatWeDo) },
      { key: 'formFields', value: JSON.stringify(data.formFields) },
      { key: 'schedule', value: JSON.stringify(data.schedule) }
    ];

    // Upsert each config item
    for (const item of configItems) {
      await sql`
        INSERT INTO site_config (key, value, updated_at)
        VALUES (${item.key}, ${item.value}, CURRENT_TIMESTAMP)
        ON CONFLICT (key)
        DO UPDATE SET value = ${item.value}, updated_at = CURRENT_TIMESTAMP
      `;
    }

    // Clear existing images
    await sql`DELETE FROM images`;

    // Insert new images
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        const img = data.images[i];
        await sql`
          INSERT INTO images (image_id, url, alt, caption, position)
          VALUES (${img.id}, ${img.url}, ${img.alt}, ${img.caption || null}, ${i})
        `;
      }
    }

    // Commit transaction
    await sql`COMMIT`;
  } catch (error) {
    // Rollback on error
    await sql`ROLLBACK`;
    console.error('Error saving site data:', error);
    throw error;
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    // Create tables if they don't exist
    await sql`
      CREATE TABLE IF NOT EXISTS site_config (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        image_id VARCHAR(255) UNIQUE NOT NULL,
        url TEXT NOT NULL,
        alt VARCHAR(500),
        caption VARCHAR(500),
        position INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_site_config_key ON site_config(key)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_images_position ON images(position)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email)`;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}