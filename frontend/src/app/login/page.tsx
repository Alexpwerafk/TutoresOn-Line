import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-academic-platinum to-white dark:from-academic-oxford dark:to-gray-900 font-sans p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-wider text-academic-oxford dark:text-white mb-2">
            🎓 Tutores<span className="text-academic-cerulean">On-Line</span>
          </h1>
          <h2 className="text-lg text-gray-500 dark:text-gray-400">Inicia sesión en tu cuenta</h2>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-cerulean transition" 
              placeholder="estudiante@ejemplo.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Contraseña</label>
            <input 
              type="password" 
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-cerulean transition" 
              placeholder="••••••••" 
            />
          </div>
          
          <div className="flex justify-end">
            <a href="#" className="text-sm text-academic-cerulean hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="button" className="w-full bg-academic-yale text-white py-3 rounded-lg font-bold hover:bg-academic-cerulean transition shadow-md">
            Entrar a la plataforma
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">¿No tienes una cuenta?</p>
          <div className="flex justify-center gap-4">
            <Link href="/buscar-tutores" className="text-sm font-bold text-academic-cerulean hover:underline">Crear cuenta Estudiante</Link>
            <span className="text-gray-400">|</span>
            <Link href="/soy-tutor" className="text-sm font-bold text-academic-cerulean hover:underline">Ser Tutor</Link>
          </div>
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
