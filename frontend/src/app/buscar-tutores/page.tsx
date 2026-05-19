import Link from "next/link";

export default function BuscarTutores() {
  return (
    <div className="min-h-screen p-8 bg-academic-platinum dark:bg-academic-oxford text-academic-oxford dark:text-white flex flex-col font-sans">
      <header className="mb-8 flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold text-academic-yale dark:text-academic-cerulean flex items-center gap-2">
          🔍 Buscar Tutores
        </h1>
        <Link href="/" className="bg-academic-cerulean text-white px-4 py-2 rounded-md font-semibold hover:bg-academic-yale transition shadow-sm">
          Volver al Inicio
        </Link>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-6 animate-bounce">🚀</div>
        <h2 className="text-3xl font-bold mb-4">Estamos construyendo el catálogo de tutores</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-lg text-lg">
          Pronto podrás filtrar por materia, nivel educativo, ubicación geográfica para modalidad presencial y disponibilidad horaria.
        </p>
      </main>
    </div>
  );
}
