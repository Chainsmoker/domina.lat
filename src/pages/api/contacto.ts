import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // --- VALIDACIÓN SERVER-SIDE ---
    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Por favor ingresa tu nombre completo (mínimo 2 caracteres).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Por favor ingresa un correo electrónico válido.';
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      errors.subject = 'Por favor ingresa un asunto válido.';
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres.';
    }

    if (Object.keys(errors).length > 0) {
      return new Response(
        JSON.stringify({ success: false, errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
    let fromEmail = import.meta.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'Domina Contacto <noreply@updates.domina.lat>';
    let toEmail = import.meta.env.RESEND_TO_EMAIL || process.env.RESEND_TO_EMAIL || 'alejandroplasenciadev@gmail.com';

    try {
      const cfWorkers = await import('cloudflare:workers').catch(() => null);
      if (cfWorkers?.env) {
        if (cfWorkers.env.RESEND_API_KEY) apiKey = cfWorkers.env.RESEND_API_KEY as string;
        if (cfWorkers.env.RESEND_FROM_EMAIL) fromEmail = cfWorkers.env.RESEND_FROM_EMAIL as string;
        if (cfWorkers.env.RESEND_TO_EMAIL) toEmail = cfWorkers.env.RESEND_TO_EMAIL as string;
      }
    } catch {}

    if (apiKey) {
      const resend = new Resend(apiKey);
      const resendResponse = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email.trim(),
        subject: `[Contacto Domina] ${subject.trim()}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0B1020;">
            <h2>Nuevo mensaje desde Domina.lat</h2>
            <p><strong>Nombre:</strong> ${name.trim()}</p>
            <p><strong>Correo:</strong> ${email.trim()}</p>
            <p><strong>Asunto:</strong> ${subject.trim()}</p>
            <hr />
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap; background: #F5F1E8; padding: 15px; border-radius: 8px;">${message.trim()}</p>
          </div>
        `,
      });

      if (resendResponse.error) {
        console.error('[Resend Error]', resendResponse.error);
        return new Response(
          JSON.stringify({
            success: false,
            message: `Error al enviar correo: ${resendResponse.error.message || 'Resend error'}`,
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      console.log('[Dev Contact Form Submit]', { name, email, subject, message });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: '¡Tu mensaje ha sido enviado con éxito! Te responderemos a la brevedad.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error enviando contacto:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Ocurrió un error inesperado al procesar tu solicitud. Inténtalo de nuevo.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
