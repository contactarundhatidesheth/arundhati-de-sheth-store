import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'timeline', 'Timeline  (Website) (1).pdf');
    const buffer = fs.readFileSync(pdfPath);
    
    let count = 0;
    let start = -1;
    let sizes = [];

    // Simple JPEG extractor
    for (let i = 0; i < buffer.length - 2; i++) {
      if (buffer[i] === 0xFF && buffer[i+1] === 0xD8 && buffer[i+2] === 0xFF) {
        start = i;
      } else if (start !== -1 && buffer[i] === 0xFF && buffer[i+1] === 0xD9) {
        const end = i + 2;
        const imgBuffer = buffer.slice(start, end);
        if (imgBuffer.length > 50000) { // Only images > 50KB
          count++;
          const outPath = path.join(process.cwd(), 'public', 'timeline', `extracted-${count}.jpg`);
          fs.writeFileSync(outPath, imgBuffer);
          sizes.push(imgBuffer.length);
        }
        start = -1;
      }
    }
    
    return NextResponse.json({ success: true, count, sizes });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
