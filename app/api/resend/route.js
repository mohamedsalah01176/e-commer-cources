
import { EmailTemplate } from '../../_componaten/email-template/email-template.tsx';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['m48162698@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName:"Mohamed salah",
                              call:"we will call with you",info:"to know any information call 01155953141"}),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
