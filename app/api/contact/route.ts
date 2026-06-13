import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'contact@swapnonil.me',
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `[swapnonil.me] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}