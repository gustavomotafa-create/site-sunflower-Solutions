import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-red-900 border-b-4 border-yellow-500">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <img
            src="/logo-maracana.png"
            alt="Açougue Maracanã"
            className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
          />

          <div>
            <h1 className="text-3xl font-bold text-white">
              Açougue Maracanã
            </h1>
            <p className="text-yellow-300 text-sm">
              Sistema de Gestão Comercial
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-400"
        >
          Menu Principal
        </Link>
      </div>
    </header>
  );
}