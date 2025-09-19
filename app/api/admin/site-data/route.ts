import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'site-data.json');

export async function GET() {
  try {
    // Ensure the data directory exists
    const dataDir = path.dirname(dataFilePath);
    await fs.mkdir(dataDir, { recursive: true });

    // Try to read the file
    try {
      const data = await fs.readFile(dataFilePath, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (error) {
      // File doesn't exist, return default data
      return NextResponse.json({});
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Ensure the data directory exists
    const dataDir = path.dirname(dataFilePath);
    await fs.mkdir(dataDir, { recursive: true });

    // Write the data to file
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}