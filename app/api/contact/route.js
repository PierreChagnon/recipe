import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { name, email, subject, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Recipes <onboarding@resend.dev>',
            to: ['pc.chagnon@gmail.com', 'edgar.dubourg@gmail.com'],
            subject: subject,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        if (error) {
            return new Response(JSON.stringify({ error }), { status: 500 });
        }

        return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}
