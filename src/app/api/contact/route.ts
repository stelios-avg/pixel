import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    from: '"Site Contact" <no-reply@pixel-studio.design>',
    to: 'infopixelcy@gmail.com',
    subject: `New message from ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
  });

  return NextResponse.json({ ok: true });
}
