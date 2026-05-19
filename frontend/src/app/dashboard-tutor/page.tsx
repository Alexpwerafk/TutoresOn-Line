"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardTutor() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAvailableNow, setIsAvailableNow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "TUTOR") {
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
        <h1 className="text-xl font-bold">Portal del Tutor</h1>
        <div className="flex items-center gap-4">
          <span>Prof. {user.fullName.split(' ')[0]} 👨‍🏫</span>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600 transition">Salir</button>
        </div>
      </nav>

      <main className="p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-academic-oxford dark:text-white">Modo Express</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isAvailableNow} onChange={() => setIsAvailableNow(!isAvailableNow)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isAvailableNow 
              ? "🟢 Estás visible. Recibirás solicitudes en tiempo real." 
              : "🔴 Estás oculto. Actívalo para recibir estudiantes urgentes."}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-academic-yale dark:text-academic-cerulean">Solicitudes Pendientes</h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-8 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400">No tienes solicitudes pendientes. Asegúrate de configurar tus materias.</p>
          </div>
        </div>

      </main>
    </div>
  );
}
