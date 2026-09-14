import { Resend } from "resend";
import { site, cuentaBancaria as banco, notificaciones as N } from "@/site.config";

const resend = new Resend(process.env.RESEND_API_KEY);

function mxn(n) { return "$" + Math.round(Number(n) || 0).toLocaleString("es-MX"); }

// Envoltura con la identidad del evento
function plantilla(titulo, cuerpoHtml) {
  return `
  <div style="background:#f4f6fb;padding:24px 0;font-family:Segoe UI,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e4e8f0;">
      <div style="background:#0A1F44;padding:22px 28px;">
        <div style="color:#fff;font-weight:800;letter-spacing:2px;font-size:16px;">AMÉRICA UNIDA</div>
        <div style="color:#C9A24B;font-weight:700;letter-spacing:3px;font-size:11px;">BAJA CALIFORNIA 2027</div>
      </div>
      <div style="padding:28px;color:#222;font-size:15px;line-height:1.6;">
        <h1 style="color:#0A1F44;font-size:20px;margin:0 0 14px;">${titulo}</h1>
        ${cuerpoHtml}
      </div>
      <div style="padding:16px 28px;background:#04122b;color:#8ea0bf;font-size:12px;">
        América Unida · Baja California 2027 · Zona 1 · CMI<br/>
        <a href="https://americaunidabc.com" style="color:#C9A24B;text-decoration:none;">americaunidabc.com</a>
      </div>
    </div>
  </div>`;
}

async function enviar({ to, subject, html, replyTo }) {
  return resend.emails.send({
    from: N.from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    reply_to: replyTo || site.email,
  });
}

export async function POST(req) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ ok: false, error: "Falta RESEND_API_KEY" }, { status: 500 });
  }
  let body;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: "JSON inválido" }, { status: 400 }); }
  const { tipo } = body || {};

  try {
    if (tipo === "bienvenida") {
      const { nombre, email, folio } = body;
      const html = plantilla(`¡Bienvenido, ${nombre || "hermano"}!`, `
        <p>Tu registro para <b>América Unida · Baja California 2027</b> quedó listo. 🎉</p>
        <p>Tu folio es: <b style="color:#0A1F44;font-size:18px;">${folio || "—"}</b></p>
        <p><b>Para pagar por transferencia</b>, usa estos datos y pon tu <b>folio</b> en el concepto:</p>
        <table style="font-size:14px;color:#333;margin:8px 0;">
          <tr><td style="color:#777;padding:2px 12px 2px 0;">Banco</td><td><b>${banco.banco}</b></td></tr>
          <tr><td style="color:#777;padding:2px 12px 2px 0;">Titular</td><td>${banco.titular}</td></tr>
          <tr><td style="color:#777;padding:2px 12px 2px 0;">Cuenta</td><td>${banco.cuenta}</td></tr>
          <tr><td style="color:#777;padding:2px 12px 2px 0;">CLABE</td><td>${banco.clabe}</td></tr>
          <tr><td style="color:#777;padding:2px 12px 2px 0;">Concepto</td><td><b>${folio || "—"}</b></td></tr>
        </table>
        <p>Después entra a tu panel y sube tu comprobante:</p>
        <p><a href="https://americaunidabc.com/ingresar" style="background:#C9A24B;color:#0A1F44;text-decoration:none;font-weight:700;padding:10px 20px;border-radius:99px;display:inline-block;">Entrar a mi panel</a></p>
      `);
      await enviar({ to: email, subject: "¡Bienvenido a América Unida · Baja California 2027!", html });
      return Response.json({ ok: true });
    }

    if (tipo === "pago_recibido") {
      const { nombre, email, folio, monto, fecha, comprobanteUrl } = body;
      // 1) Al congresista
      const htmlC = plantilla("Recibimos tu comprobante", `
        <p>Hola ${nombre || "hermano"}, recibimos tu comprobante por <b>${mxn(monto)}</b>.</p>
        <p>Tu pago quedó <b>en revisión</b>. En cuanto la organización lo verifique, te avisamos y se acreditará a tu saldo.</p>
        <p>Gracias por tu pago. 🙌</p>
      `);
      // 2) Al tesorero y contadora (con el comprobante)
      const htmlT = plantilla("Nuevo comprobante por revisar", `
        <p>Se registró un nuevo comprobante de pago:</p>
        <table style="font-size:14px;color:#333;margin:8px 0;">
          <tr><td style="color:#777;padding:2px 12px 2px 0;">Congresista</td><td><b>${nombre || "—"}</b></td></tr>
          <tr><td style="color:#777;padding:2px 12px 2px 0;">Folio</td><td>${folio || "—"}</td></tr>
          <tr><td style="color:#777;padding:2px 12px 2px 0;">Monto</td><td><b>${mxn(monto)}</b></td></tr>
          <tr><td style="color:#777;padding:2px 12px 2px 0;">Fecha</td><td>${fecha || "—"}</td></tr>
        </table>
        ${comprobanteUrl ? `<p><a href="${comprobanteUrl}" style="background:#0A1F44;color:#fff;text-decoration:none;font-weight:700;padding:10px 20px;border-radius:99px;display:inline-block;">Ver comprobante</a></p>` : ""}
        <p style="font-size:13px;color:#777;">Confírmalo o recházalo en el panel de administración: <a href="https://americaunidabc.com/admin">americaunidabc.com/admin</a></p>
      `);
      await enviar({ to: email, subject: "Recibimos tu comprobante — América Unida 2027", html: htmlC });
      await enviar({ to: [N.tesorero, N.contadora], subject: `Nuevo comprobante · ${nombre || ""} (${folio || ""})`, html: htmlT, replyTo: email });
      return Response.json({ ok: true });
    }

    if (tipo === "pago_acreditado") {
      const { nombre, email, monto, restante } = body;
      const liquidado = Number(restante) <= 0;
      const html = plantilla("Tu pago se acreditó ✅", `
        <p>Hola ${nombre || "hermano"}, confirmamos tu pago de <b>${mxn(monto)}</b>. ¡Gracias!</p>
        ${liquidado
          ? `<p style="color:#2F9E6B;font-weight:700;">¡Tu inscripción está pagada por completo! 🎉 Nos vemos en Baja California 2027.</p>`
          : `<p>Tu restante por pagar es: <b style="color:#0A1F44;font-size:18px;">${mxn(restante)}</b></p>
             <p>Puedes seguir abonando cuando quieras desde tu panel.</p>`}
        <p><a href="https://americaunidabc.com/ingresar" style="background:#C9A24B;color:#0A1F44;text-decoration:none;font-weight:700;padding:10px 20px;border-radius:99px;display:inline-block;">Ver mi saldo</a></p>
      `);
      await enviar({ to: email, subject: "Tu pago se acreditó — América Unida 2027", html });
      return Response.json({ ok: true });
    }

    return Response.json({ ok: false, error: "tipo no reconocido" }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
