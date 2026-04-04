import { NextResponse } from 'next/server';

// Vercel 서버리스 환경에서는 파일 시스템 쓰기가 불가하므로
// 메모리 기반 임시 저장소를 사용합니다.
// 실제 프로덕션에서는 Supabase 등의 외부 DB로 교체하세요.
let inquiries: Record<string, unknown>[] = [];

export async function GET() {
  return NextResponse.json(inquiries);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    inquiries.unshift(newInquiry);

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
