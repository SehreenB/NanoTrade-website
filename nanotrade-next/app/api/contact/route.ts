import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        // When SMTP is not configured (e.g. local dev), log and return success
        if (!process.env.SMTP_PASSWORD) {
            console.log('[Contact API] Dev mode - no SMTP_PASSWORD set. Submission:', { name, email });
            return NextResponse.json({ message: 'Success! Your request has been received.' }, { status: 200 });
        }

        // Configure the transporter with standard SMTP settings.
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com', // Defaults to Gmail
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER || 'seerondev@gmail.com',
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER || 'seerondev@gmail.com',
            to: 'seerondev@gmail.com', // Specifically requested by user
            subject: `New Alpha Access Request: ${name}`,
            text: `You have a new FPGA Simulation Alpha Request.\n\nName: ${name}\nEmail: ${email}\n\nTime: ${new Date().toISOString()}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5CF6;">New Alpha Access Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">Submitted at: ${new Date().toISOString()}</p>
        </div>
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Success! Your request has been sent.' }, { status: 200 });

    } catch (error: any) {
        console.error('Mail Send Error:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Ensure SMTP variables (like SMTP_PASSWORD) are set in .env.local' },
            { status: 500 }
        );
    }
}
