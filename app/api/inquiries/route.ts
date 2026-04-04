import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'inquiries.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const inquiries = JSON.parse(data);
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    let inquiries = [];
    try {
      const data = await fs.readFile(dataFilePath, 'utf8');
      inquiries = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet, it's fine
    }

    const newInquiry = {
      id: Date.now(),
      name: body.name,
      company: body.company || "-",
      email: body.email,
      phone: body.phone || "-",
      type: body.type,
      message: body.message,
      date: new Date().toISOString().split('T')[0],
      status: "대기중"
    };

    // Ensure data directory exists
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    
    inquiries.unshift(newInquiry); // Insert at the beginning so newest appears first
    await fs.writeFile(dataFilePath, JSON.stringify(inquiries, null, 2));

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
