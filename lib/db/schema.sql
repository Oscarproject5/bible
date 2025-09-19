-- Database schema for Bible Study App
-- This file creates the tables needed for storing site data

-- Main site configuration table
CREATE TABLE IF NOT EXISTS site_config (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Images table for gallery
CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  image_id VARCHAR(255) UNIQUE NOT NULL,
  url TEXT NOT NULL,
  alt VARCHAR(500),
  caption VARCHAR(500),
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Form submissions table (for future use)
CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_config_key ON site_config(key);
CREATE INDEX IF NOT EXISTS idx_images_position ON images(position);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);