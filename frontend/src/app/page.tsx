"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSmartMatch = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setMatchResult(null);

    try {
      const res = await fetch("http://localhost:3001/api/v1/match/smart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const json = await res.json();
      if (json.success) {
        setMatchResult(json.data);
      } else {
        setError(json.message);
      }
    } catch (err) {
      setError("Error de red intentando conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-academic-oxford text-academic-platinum p-4 shadow-md flex justify-between items-center z-10 relative">
        <h1 className="text-2xl font-bold tracking-wider flex items-center gap-2">
          🎓 Tutores<span className="text-academic-cerulean">On-Line</span>
        </h1>
        <nav className="space-x-4 hidden md:block">
          <button className="hover:text-academic-cerulean transition">Buscar Tutores</button>
          <button className="hover:text-academic-cerulean transition">Soy Tutor</button>
          <button className="bg-academic-yale px-4 py-2 rounded-md font-semibold hover:bg-academic-cerulean transition shadow-md">Iniciar Sesión</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-start pt-16 p-8 text-center bg-gradient-to-b from-academic-platinum to-white dark:from-academic-oxford dark:to-gray-900 relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-academic-oxford dark:text-white mb-6">
          Encuentra al <span className="text-academic-yale dark:text-academic-cerulean">Tutor Perfecto</span> en segundos
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-12">
          Conecta con expertos calificados mediante Inteligencia Artificial, reserva sesiones programadas o pide ayuda instantánea.
        </p>

        {/* AI Search Bar */}
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-full shadow-xl p-2 flex flex-col md:flex-row items-center border border-gray-200 dark:border-gray-700 transition-all focus-within:ring-2 focus-within:ring-academic-cerulean">
          <span className="pl-4 text-2xl py-2 md:py-0">✨</span>
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: Mañana tengo un parcial de cálculo y no entiendo integrales..."
            className="flex-1 bg-transparent p-4 outline-none text-gray-800 dark:text-white w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleSmartMatch()}
          />
          <button 
            onClick={handleSmartMatch}
            disabled={loading}
            className="w-full md:w-auto bg-academic-yale text-white px-8 py-3 rounded-full font-bold hover:bg-academic-cerulean transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Pensando..." : "Smart Match"}
          </button>
        </div>

        {/* Errors */}
        {error && (
          <div className="mt-8 p-4 bg-red-100 text-red-700 border border-red-400 rounded-lg max-w-2xl w-full">
            ⚠️ {error}
          </div>
        )}

        {/* Results Area */}
        {matchResult && (
          <div className="mt-12 w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-left border border-academic-cerulean/30">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              {/* Plan de Estudio */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-academic-oxford dark:text-white mb-2 flex items-center gap-2">
                  📚 Materia Identificada: <span className="text-academic-cerulean">{matchResult.subject}</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Temario sugerido para 1 hora de sesión:</p>
                <ul className="space-y-3">
                  {matchResult.syllabus.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 bg-academic-platinum dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                      <span className="text-academic-cerulean font-bold">{idx + 1}.</span>
                      <span className="text-gray-800 dark:text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tutores Recomendados */}
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-bold text-academic-oxford dark:text-white mb-4">Tutores Ideales</h3>
                {matchResult.tutors.length === 0 ? (
                  <p className="text-gray-500 italic">No hay tutores disponibles ahora mismo para esta materia.</p>
                ) : (
                  <div className="space-y-4">
                    {matchResult.tutors.map((tutor: any) => (
                      <div key={tutor.id} className="bg-academic-platinum dark:bg-gray-700 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-600 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer">
                        <div className="w-16 h-16 bg-academic-yale rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
                          {tutor.fullName.charAt(0)}
                        </div>
                        <h4 className="font-bold text-academic-oxford dark:text-white">{tutor.fullName}</h4>
                        <div className="text-academic-goldenrod text-sm">★★★★★ 5.0</div>
                        <button className="mt-3 w-full bg-academic-cerulean text-white py-1 rounded-md text-sm font-semibold hover:bg-academic-yale transition">
                          Reservar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}