import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // 1. Читаем JSON-тело
    const { captureResponse } = await req.json();

    if (!captureResponse) {
      return NextResponse.json(
        { ok: false, message: 'Токен капчи не передан' },
        { status: 400 },
      );
    }

    // 2. Готовим form-urlencoded тело
    const body = new URLSearchParams({
      secret: process.env.NEXT_PUBLIC_CAPTCHA_SECRET_KEY,
      response: captureResponse,
    }).toString();

    // 3. Проверяем капчу
    const googleRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,                           // строка "secret=...&response=..."
      cache: 'no-store',              // опционально, чтобы Next.js не кешировал
    });

    const verify = await googleRes.json();

    if (!verify.success) {
      return NextResponse.json(
        { ok: false, message: 'Неверная капча', errors: verify['error-codes'] },
        { status: 400 },
      );
    }

    // 4. Всё ок
    return NextResponse.json({ ok: true, message: 'Капча пройдена' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: 'Произошла ошибка' },
      { status: 500 },
    );
  }
}

