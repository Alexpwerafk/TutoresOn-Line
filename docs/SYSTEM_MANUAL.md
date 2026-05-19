# Manual del Sistema y Arquitectura

Este documento describe la arquitectura técnica, los patrones de diseño y la estructura de la base de datos de "TutoresOn-Line".

## 1. Patrones de Diseño y Principios
El proyecto se rige estrictamente por los principios **SOLID** y una **Arquitectura Limpia (Clean Architecture)** en el Backend:
*   **S - Single Responsibility Principle:** Cada clase (Controlador, Servicio, Repositorio) tiene una única responsabilidad.
*   **O - Open/Closed Principle:** El sistema está diseñado para extenderse (ej. agregar un nuevo proveedor de notificaciones) sin modificar el código existente mediante el uso de interfaces.
*   **L - Liskov Substitution:** Las implementaciones concretas pueden ser reemplazadas por otras que compartan la misma interfaz.
*   **I - Interface Segregation:** Clientes (Frontend) y servicios internos dependen solo de interfaces pequeñas y específicas.
*   **D - Dependency Inversion:** Los servicios de alto nivel dependen de abstracciones (Inyección de Dependencias), no de implementaciones concretas de bases de datos o APIs externas.

## 2. Organización del Proyecto (Backend)
```text
/backend/src
├── /domain           # Entidades core del negocio e Interfaces (No depende de nada externo)
├── /application      # Casos de uso (Servicios), orquestan la lógica.
├── /infrastructure   # Implementaciones concretas (Prisma, Controladores Express, Servicios Externos: Twilio, OpenAI)
└── /presentation     # Rutas, Middlewares y Controladores de HTTP / WebSockets.
```

## 3. Arquitectura del Sistema
*   **Cliente Web/Móvil:** Envía peticiones HTTP REST para operaciones CRUD y se conecta vía WebSockets (Socket.io) para notificaciones de "Tutor Express".
*   **Servidor Node/Express:** Valida los datos, ejecuta lógica de negocio y se comunica con la BD y APIs de terceros.
*   **IA Generativa:** Comunicación vía HTTP REST con `api.openai.com/v1/chat/completions` para el motor "Smart Match".
*   **Base de Datos:** PostgreSQL en la nube (Neon.tech o Supabase) gestionada mediante el ORM Prisma.

---

## 4. Diseño de Base de Datos (Relacional - PostgreSQL)

El sistema utiliza una base de datos relacional para asegurar la integridad transaccional (crucial para sistemas de reserva).

### Entidades y Relaciones

**1. User (Usuario)**
*   `id` (UUID, PK)
*   `email` (String, Unique)
*   `password_hash` (String)
*   `role` (Enum: STUDENT, TUTOR, ADMIN)
*   `full_name` (String)
*   `location_lat` (Float, null)
*   `location_lng` (Float, null)
*   `reputation_score` (Float, default 0) - *Denormalizado para búsquedas rápidas.*
*   `is_online_express` (Boolean) - *Para solicitudes en tiempo real.*
*   `created_at` (DateTime)

**2. Subject (Materia)**
*   `id` (UUID, PK)
*   `name` (String, Unique) - *Ej: "Física", "Cálculo Integral"*
*   `educational_level` (Enum: HIGHSCHOOL, COLLEGE, UNIVERSITY)

**3. TutorSubject (Asignación Tutor-Materia - Tabla Intermedia)**
*   `id` (UUID, PK)
*   `tutor_id` (UUID, FK -> User.id)
*   `subject_id` (UUID, FK -> Subject.id)
*   `hourly_rate` (Decimal)

**4. Availability (Disponibilidad del Tutor)**
*   `id` (UUID, PK)
*   `tutor_id` (UUID, FK -> User.id)
*   `day_of_week` (Int: 0-6)
*   `start_time` (Time)
*   `end_time` (Time)

**5. Session (Tutoría / Reserva)**
*   `id` (UUID, PK)
*   `student_id` (UUID, FK -> User.id)
*   `tutor_id` (UUID, FK -> User.id)
*   `subject_id` (UUID, FK -> Subject.id)
*   `scheduled_at` (DateTime)
*   `status` (Enum: PENDING, ACCEPTED, REJECTED, COMPLETED, CANCELLED)
*   `meeting_link` (String, null)
*   `is_presential` (Boolean)
*   `ai_suggested_syllabus` (Text, null) - *Generado por OpenAI en Smart Match.*

**6. Review (Reseñas)**
*   `id` (UUID, PK)
*   `session_id` (UUID, FK -> Session.id, Unique)
*   `reviewer_id` (UUID, FK -> User.id)
*   `reviewee_id` (UUID, FK -> User.id)
*   `rating` (Int: 1-5)
*   `comment` (Text)

## 5. Endpoints Principales (API REST)

*   `POST /api/auth/register` - Registro.
*   `POST /api/auth/login` - Inicio de sesión (Devuelve JWT).
*   `GET /api/tutors?subject=X&lat=Y&lng=Z` - Búsqueda de tutores.
*   `POST /api/match/smart` - Envía un prompt a la IA y retorna lista de tutores recomendados + temario.
*   `POST /api/sessions` - Crea una reserva de tutoría.
*   `PATCH /api/sessions/:id/status` - Aceptar/Rechazar reserva (Solo Tutores).
*   `POST /api/sessions/:id/review` - Enviar reseña y recalcular reputación.

*Fin del Manual del Sistema.*