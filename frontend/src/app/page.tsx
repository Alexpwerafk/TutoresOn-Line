import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-academic-oxford text-academic-platinum p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider">🎓 Tutores<span className="text-academic-cerulean">On-Line</span></h1>
        <nav className="space-x-4">
          <button className="hover:text-academic-cerulean transition">Buscar Tutores</button>
          <button className="hover:text-academic-cerulean transition">Soy Tutor</button>
          <button className="bg-academic-yale px-4 py-2 rounded-md font-semibold hover:bg-academic-cerulean transition">Iniciar Sesión</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-academic-platinum to-white dark:from-academic-oxford dark:to-gray-900">
        <h2 className="text-5xl font-extrabold text-academic-oxford dark:text-white mb-6">
          Encuentra al <span className="text-academic-yale dark:text-academic-cerulean">Tutor Perfecto</span> en segundos
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
          Conecta con expertos calificados mediante Inteligencia Artificial, reserva sesiones programadas o pide ayuda instantánea con nuestro servicio <strong>Tutor Express</strong>.
        </p>

        {/* AI Search Bar Mock */}
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex items-center border border-gray-200 dark:border-gray-700">
          <span className="pl-4 text-2xl">✨</span>
          <input 
            type="text" 
            placeholder="Ej: Mañana tengo un parcial de cálculo y no entiendo integrales..."
            className="flex-1 bg-transparent p-4 outline-none text-gray-800 dark:text-white"
          />
          <button className="bg-academic-yale text-white px-8 py-3 rounded-full font-bold hover:bg-academic-cerulean transition shadow-md">
            Smart Match
          </button>
        </div>

        {/* Uber-style Realtime Button */}
        <div className="mt-12">
          <button className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-500 transition shadow-lg animate-pulse">
            <span>⚡ Quiero un tutor AHORA (Tiempo Real)</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-academic-oxford text-gray-400 p-6 text-center text-sm">
        <p>© {new Date().getFullYear()} TutoresOn-Line. Desarrollado con ❤️ para aprendizaje ágil.</p>
      </footer>
    </div>
  );
}
