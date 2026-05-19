import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import matchRoutes from './routes/match.routes';

const app = express();
// El puerto por defecto es 3001, pero si no especificas otro en .env, usamos 3001
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/match', matchRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'TutoresOn-Line API running' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Lógica para intentar un nuevo puerto si el 3001 está ocupado (EADDRINUSE)
server.on('error', (e: any) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} está ocupado. Intentando con el puerto ${Number(PORT) + 1}...`);
    setTimeout(() => {
      server.close();
      app.listen(Number(PORT) + 1, () => {
        console.log(`Server successfully started on http://localhost:${Number(PORT) + 1} (Puerto alternativo)`);
        console.warn(`\n⚠️ ATENCIÓN: Como el backend cambió de puerto, la UI (Frontend) fallará al intentar conectarse al puerto viejo. Por favor, arregla el problema de puertos cerrando todas las terminales o cambiando el puerto manualmente en el archivo .env\n`);
      });
    }, 1000);
  } else {
    console.error('Server error:', e);
  }
});
