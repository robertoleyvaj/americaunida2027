# América Unida · Tijuana 2027 — Sitio web (Fase 1: Save the Date)

Landing oficial del encuentro, hecho con **Next.js** + **Tailwind CSS**.
Pensado para editarse en **VS Code**, guardarse en **GitHub** y publicarse en **Vercel**.

> Esta guía está escrita para que la puedas seguir aunque no sepas programar.
> Ve paso a paso y no te saltes nada. Cualquier duda, pregúntame.

---

## 🗺️ Qué vas a hacer (panorama)

1. Instalar dos programas gratis: **Node.js** y **VS Code**.
2. Abrir este proyecto en VS Code y verlo funcionar en tu compu.
3. Cambiar tus datos (WhatsApp, correo, fecha).
4. Subirlo a **GitHub** (tu "nube" de código).
5. Publicarlo en **Vercel** (queda en internet con una liga).

Cada vez que cambies algo y lo subas a GitHub, **Vercel actualiza tu página sola**. Así de fácil.

---

## 1) Instalar lo necesario (una sola vez)

1. **Node.js** → entra a https://nodejs.org y descarga la versión **LTS**. Instálala con "Siguiente, siguiente".
2. **VS Code** → https://code.visualstudio.com — descárgalo e instálalo.
3. **Cuenta de GitHub** (gratis) → https://github.com
4. **Cuenta de Vercel** (gratis) → https://vercel.com — al registrarte, elige **"Continue with GitHub"** para que queden conectados.

---

## 2) Abrir el proyecto y verlo en tu compu

1. Descomprime la carpeta del proyecto en un lugar fácil (por ejemplo, tu Escritorio).
2. Abre **VS Code** → menú **Archivo → Abrir carpeta…** → elige la carpeta `america-unida-2027`.
3. Abre la terminal dentro de VS Code: menú **Terminal → New Terminal**.
4. Escribe esto y presiona Enter (instala las piezas del proyecto, tarda 1–2 min la primera vez):

   ```bash
   npm install
   ```

5. Ahora enciende la página en tu compu:

   ```bash
   npm run dev
   ```

6. En la terminal aparecerá una liga tipo `http://localhost:3000`.
   Cópiala en tu navegador (o ctrl+clic). ¡Ahí está tu página! 🎉

Para apagarla, en la terminal presiona **Ctrl + C**.

---

## 3) Cambiar tus datos (lo más importante)

Casi todo lo editable está en **un solo archivo**: `site.config.js` (en la raíz del proyecto).
Ábrelo en VS Code y cambia:

- **`whatsapp`** → tu número con lada, sin "+", sin espacios ni guiones.
  Ejemplo México: `52` + tus 10 dígitos → `"521234567890"`.
- **`email`** → tu correo de contacto.
- **`fechaInicio`** → fecha y hora de inicio (para la cuenta regresiva).
- **`claim`** → la frase principal, si cambian el slogan.
- **`instagram` / `facebook`** → si tienes, pégalas; si no, déjalas con `""`.

Guarda con **Ctrl + S**. Si tienes `npm run dev` corriendo, la página se actualiza sola.

### Poner tu logo
Cuando tengas el logo horizontal en imagen (PNG), guárdalo dentro de la carpeta `public/`
y me dices para cambiar el texto del encabezado por tu imagen. (Por ahora el logo es texto,
lo cual está bien para arrancar.)

---

## 4) Subirlo a GitHub

La forma más fácil sin comandos:

1. Instala **GitHub Desktop**: https://desktop.github.com (inicia sesión con tu cuenta).
2. Menú **File → Add local repository…** → elige la carpeta `america-unida-2027`.
   - Si te dice que no es un repositorio, haz clic en **"create a repository"**.
3. Abajo a la izquierda escribe un resumen (ej. "primera versión") y clic en **Commit to main**.
4. Arriba, clic en **Publish repository**.
   - Deja el nombre `america-unida-2027`.
   - Puedes dejarlo **Privado** (recomendado) o público.
   - Clic en **Publish repository**.

Listo: tu código ya está en GitHub. ✅

> Cada vez que cambies algo: en GitHub Desktop escribe un resumen → **Commit to main** → **Push origin** (arriba). Eso sube los cambios.

---

## 5) Publicarlo en Vercel (queda en internet)

1. Entra a https://vercel.com e inicia sesión **con GitHub**.
2. Clic en **Add New… → Project**.
3. Verás tu repositorio `america-unida-2027`. Clic en **Import**.
4. Vercel detecta que es **Next.js** solito. **No cambies nada.**
5. Clic en **Deploy** y espera 1–2 minutos.
6. Te dará una liga tipo `https://america-unida-2027.vercel.app`. ¡Ya está en línea! 🌎

Desde ahora, **cada vez que hagas Push en GitHub, Vercel republica sola** con tus cambios.

### Dominio propio (cuando lo tengas)
Si compras un dominio (ej. `americaunida2027.mx`), en Vercel entra a tu proyecto →
**Settings → Domains** → agrégalo y sigue las instrucciones. Yo te ayudo cuando llegues ahí.

---

## 🧩 Cómo está organizado el proyecto (por si tienes curiosidad)

```
america-unida-2027/
├─ site.config.js        ← TUS DATOS (edita aquí)
├─ app/
│  ├─ layout.js          ← título, descripción, fuentes
│  ├─ page.js            ← arma la página juntando las secciones
│  └─ globals.css        ← estilos base
├─ components/           ← cada pieza de la página
│  ├─ Navbar.js          ← menú de arriba
│  ├─ Hero.js            ← portada + cuenta regresiva
│  ├─ Manifiesto.js      ← "tierra de encuentro"
│  ├─ QueEs.js           ← qué es América Unida
│  ├─ PorQueTijuana.js   ← por qué la sede
│  ├─ Programa.js        ← los 4 días
│  ├─ CierreCTA.js       ← llamada final
│  ├─ Footer.js          ← pie de página
│  └─ WhatsappFab.js     ← botón flotante de WhatsApp
└─ public/               ← aquí van tus imágenes y logo
```

Los colores y las fuentes están definidos en `tailwind.config.js` (paleta del blueprint:
azul marino, dorado, blanco y los acentos de América Unida).

---

## ❓ Problemas comunes

- **"command not found: npm"** → no está instalado Node.js. Vuelve al paso 1 y reinicia VS Code.
- **La página no abre** → revisa que `npm run dev` siga corriendo y usa la liga `http://localhost:3000`.
- **Cambié algo y no se ve** → guarda con Ctrl+S; si no, apaga (Ctrl+C) y vuelve a `npm run dev`.
- **En internet no se actualizó** → ¿hiciste **Push** en GitHub Desktop? Vercel solo publica lo que subes.

---

## 🔜 Siguientes fases (cuando quieras)

- **Fase 2 (Información):** páginas de Programa, Sede/Hospedaje, Conferencias, FAQ, Valle de Guadalupe.
- **Fase 3 (Inscripción):** registro, pagos (Stripe/Mercado Pago), datos del participante.
- Reemplazar textos "placeholder" por fotos reales de Baja California y el video teaser.

Cualquier cosa, escríbeme y seguimos. 🙌
