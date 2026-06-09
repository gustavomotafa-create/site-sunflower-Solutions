"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function MensagemSistema() {
  const searchParams = useSearchParams();
  const sucesso = searchParams.get("sucesso");

  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (sucesso) {
      setVisivel(true);

      const timer = setTimeout(() => {
        setVisivel(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [sucesso]);

  if (!sucesso || !visivel) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-pulse">
      <div className="flex items-center gap-3 rounded-xl border border-green-500/40 bg-neutral-900 px-5 py-4 shadow-2xl">
        <div className="text-2xl">✅</div>

        <div>
          <p className="font-bold text-green-400">
            Sucesso
          </p>

          <p className="text-white">
            {decodeURIComponent(sucesso)}
          </p>
        </div>
      </div>
    </div>
  );
}