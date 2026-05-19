# TutoresOn-Line 🎓

Plataforma integral de tutorías en línea y presenciales. Conecta estudiantes con tutores calificados mediante un sistema de reservas, videoconferencias integradas, inteligencia artificial para el "Match" perfecto y un sistema de solicitudes en tiempo real tipo "Uber".

## 🚀 Tecnologías Principales (Stack)

*   **Backend:** Node.js, Express, TypeScript (Arquitectura Limpia / SOLID)
*   **Base de Datos:** PostgreSQL (Relacional) con Prisma ORM
*   **Frontend Web:** Next.js, React, Tailwind CSS (Paleta de colores académica)
*   **Frontend Móvil:** React Native (Expo)
*   **Tiempo Real:** Socket.io
*   **Videoconferencias:** Integración API de Google Meet / Jitsi
*   **IA Generativa:** OpenAI API (Asistente de Match y Temarios)
*   **Notificaciones:** Twilio (WhatsApp/SMS) y Resend (Correos)

## 📁 Estructura del Proyecto

El proyecto está dividido en monorepositorio (lógicamente) con las siguientes carpetas:

*   `/backend`: Contiene la API RESTful aplicando Clean Architecture y SOLID.
*   `/frontend`: Aplicación web responsiva desarrollada en Next.js.
*   `/mobile`: (Placeholder) Código de la aplicación móvil en React Native.
*   `/docs`: Documentación completa del proyecto (Propuesta, Manuales, Diseño BD).

## 🎨 Diseño (Paleta Académica)

Se utilizó una paleta enfocada en transmitir confianza, seriedad y conocimiento:
*   **Oxford Blue (Azul Marino Oscuro):** `#0f172a` - Texto principal, barras de navegación.
*   **Yale Blue (Azul Rey):** `#1e3a8a` - Botones primarios, enlaces.
*   **Cerulean (Azul Claro):** `#0ea5e9` - Acentos, hover states.
*   **Platinum (Gris Claro):** `#f8fafc` - Fondos de la aplicación.
*   **Goldenrod (Dorado):** `#eab308` - Estrellas de reputación, notificaciones de IA.

## 📖 Documentación
Por favor revisa la carpeta `/docs` para encontrar:
1.  [Propuesta Comercial (PROPOSAL.md)](docs/PROPOSAL.md)
2.  [Manual del Usuario (USER_MANUAL.md)](docs/USER_MANUAL.md)
3.  [Manual del Sistema y Base de Datos (SYSTEM_MANUAL.md)](docs/SYSTEM_MANUAL.md)

## ⚙️ Cómo ejecutar el proyecto (Modo Desarrollo)

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend Web
```bash
cd frontend
npm install
npm run dev
```

---
*Desarrollado bajo marco de trabajo ágil Scrum.*