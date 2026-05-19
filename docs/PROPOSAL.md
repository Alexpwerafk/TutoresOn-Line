# Propuesta Comercial: Plataforma "TutoresOn-Line"

## 1. Resumen Ejecutivo
"TutoresOn-Line" es una plataforma tecnológica diseñada para revolucionar el acceso a tutorías académicas. Al conectar estudiantes con tutores mediante búsquedas inteligentes (IA), reservas programadas y asignación en tiempo real (estilo Uber), garantizamos un acceso inmediato a la educación personalizada, tanto en modalidad virtual como presencial.

## 2. Alcance del Proyecto
*   **App Web & Móvil:** Interfaces para Estudiantes y Tutores.
*   **Smart Match (IA):** Recomendación de tutores basada en el prompt del estudiante y generación de temarios.
*   **Tutorías On-Demand:** Solicitudes en tiempo real vía WebSockets para ayuda inmediata.
*   **Sistema de Reservas:** Calendario de disponibilidad y agendamiento.
*   **Videoconferencias:** Generación automática de salas de estudio.
*   **Reputación:** Sistema de reseñas y calificaciones (1 a 5 estrellas).
*   **Notificaciones:** Alertas automáticas por Email, SMS y WhatsApp.

## 3. Metodología de Trabajo (Scrum)
Se aplicará el framework **Scrum** para asegurar entregas continuas y de valor.
*   **Product Owner:** Prof. Edgar Morillo.
*   **Equipo de Desarrollo:** 4 Desarrolladores (Incluyendo 1 Scrum Master / Líder Técnico).
*   **Duración del Sprint:** 1 Semana.
*   **Ceremonias:** Daily Standups, Sprint Planning (cuando sea necesario), Sprint Review (entregables semanales) y Sprint Retrospective (al final de cada semana).

## 4. Cronograma Estimado (4 Semanas)

### Sprint 1: Cimientos y Seguridad (Semana 1)
*   Diseño y despliegue de Base de Datos PostgreSQL.
*   Autenticación y Autorización (JWT / Auth provider).
*   Gestión de Perfiles (Registro de Estudiantes y Tutores).

### Sprint 2: Core Business - Discovery & Booking (Semana 2)
*   Buscador de tutores con filtros (Materia, Nivel, Ubicación).
*   Configuración de Disponibilidad para tutores.
*   Lógica de Reserva de sesiones.
*   Gestión de reputación (Reviews).

### Sprint 3: Innovación - IA & Videoconferencias (Semana 3)
*   Integración de API de Videoconferencias (Generación de links).
*   Integración OpenAI (Implementación del "Smart Match" y generación de temarios sugeridos).
*   Notificaciones de reserva (Email y WhatsApp).

### Sprint 4: On-Demand & Despliegue (Semana 4)
*   Implementación de WebSockets (Socket.io) para tutorías express en tiempo real.
*   Integración de Frontend Web y Backend.
*   QA, Pruebas de estrés y Corrección de Bugs.
*   Despliegue a Producción (Render/Vercel) y Sustentación Final.

## 5. Estimación de Costos

| Concepto | Detalles | Costo Estimado (USD) |
| :--- | :--- | :--- |
| **Equipo de Desarrollo** | 4 Devs x 160 hrs totales (Part-time) | $4,000.00 |
| **Infraestructura Cloud** | Servidores (Backend), Base de Datos (AWS/Supabase) | $40.00 / mes |
| **API Videoconferencias**| Jitsi / Google Workspace | Gratis / $10.00 / mes |
| **IA & Notificaciones** | OpenAI API Tokens, Twilio (WhatsApp/SMS), Resend | $100.00 (varía por uso) |
| **Mantenimiento & Soporte**| 1 mes post-lanzamiento | $500.00 |
| **TOTAL ESTIMADO** | Costo Inicial del Proyecto | **$4,650.00** |

*Nota: Esta es una estimación de alto nivel para la validación del MVP (Minimum Viable Product).*