"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardEstudiante() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "STUDENT") {
      router.push("/login");
      return;
    }

    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return <div className="p-8">Cargando dashboard...</div>;

  return (
    <div className="min-h-screen bg-academic-platinum dark:bg-gray-900 font-sans">
      <nav className="bg-academic-oxford text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Portal del Estudiante</h1>
        <div className="flex items-center gap-4">
          <span>Hola, {user.fullName.split(' ')[0]} 👋</span>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600 transition">Salir</button>
        </div>
      </nav>

      <main className="p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-academic-yale dark:text-academic-cerulean">Mis Próximas Clases</h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-8 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400">No tienes clases programadas. ¡Busca un tutor usando Smart Match en el inicio!</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-academic-yale text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">⚡ Tutor Express</h2>
            <p className="text-sm mb-4 text-gray-200">¿Necesitas ayuda ahora mismo? Solicita una sesión instantánea.</p>
            <button className="w-full bg-academic-goldenrod text-academic-oxford py-2 rounded-lg font-bold hover:bg-yellow-400 transition">
              Pedir Tutoría
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-academic-oxford dark:text-white">Mi Historial</h2>
            <p className="text-sm text-gray-500">0 clases completadas.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
