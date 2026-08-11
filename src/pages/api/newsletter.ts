import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json();
    const { email } = data;

    // --- VALIDACIÓN SERVER-SIDE ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: { email: 'Por favor ingresa un correo electrónico válido.' },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
    let fromEmail = import.meta.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'Domina Newsletter <noreply@updates.domina.lat>';
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
        subject: `[Nuevo Suscriptor Newsletter] ${email.trim()}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0B1020;">
            <h2>Nuevo suscriptor en el Newsletter de Domina.lat</h2>
            <p><strong>Correo del suscriptor:</strong> ${email.trim()}</p>
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
      console.log('[Dev Newsletter Submit]', { email });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: '¡Gracias por suscribirte! Te mantendremos informado de nuevos cursos y guías.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error suscribiendo al newsletter:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Ocurrió un error al procesar tu suscripción. Por favor reinténtalo.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
