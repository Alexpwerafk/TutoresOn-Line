"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Registro() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "TUTOR" ? "TUTOR" : "STUDENT";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(initialRole);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        
        if (role === "TUTOR") {
          router.push("/dashboard-tutor");
        } else {
          router.push("/dashboard-estudiante");
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-academic-platinum to-white dark:from-academic-oxford dark:to-gray-900 font-sans p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-wider text-academic-oxford dark:text-white mb-2">
            🎓 Únete a Tutores<span className="text-academic-cerulean">On-Line</span>
          </h1>
          <h2 className="text-lg text-gray-500 dark:text-gray-400">Crea tu cuenta gratuita</h2>
        </div>

        {error && <div className="mb-4 text-red-500 bg-red-100 p-2 rounded">{error}</div>}

        <form className="space-y-5" onSubmit={handleRegister}>
          
          <div className="flex gap-4 mb-4">
            <button 
              type="button"
              onClick={() => setRole("STUDENT")}
              className={`flex-1 py-2 rounded-lg font-bold border transition ${role === 'STUDENT' ? 'bg-academic-cerulean text-white border-academic-cerulean' : 'border-gray-300 text-gray-500'}`}
            >
              Estudiante
            </button>
            <button 
              type="button"
              onClick={() => setRole("TUTOR")}
              className={`flex-1 py-2 rounded-lg font-bold border transition ${role === 'TUTOR' ? 'bg-academic-yale text-white border-academic-yale' : 'border-gray-300 text-gray-500'}`}
            >
              Tutor
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Nombre Completo</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-cerulean transition" 
              placeholder="Juan Pérez" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-cerulean transition" 
              placeholder="correo@ejemplo.com" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-cerulean transition" 
              placeholder="••••••••" 
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-academic-yale text-white py-3 rounded-lg font-bold hover:bg-academic-cerulean transition shadow-md">
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">¿Ya tienes una cuenta?</p>
          <Link href="/login" className="text-sm font-bold text-academic-cerulean hover:underline">Iniciar Sesión</Link>
        </div>

      </div>
      
      <div className="mt-8">
        <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-academic-cerulean transition flex items-center gap-2">
          <span>←</span> Volver al inicio
        </Link>
      </div>
    </div>
  );
}
