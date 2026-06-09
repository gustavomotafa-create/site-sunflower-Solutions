import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function entrar(formData: FormData) {
  "use server";

  const usuario = String(formData.get("usuario") || "");
  const senha = String(formData.get("senha") || "");

  if (!usuario || !senha) {
    redirect("/login?erro=Preencha usuário e senha");
  }

  const usuarioEncontrado = await prisma.usuario.findUnique({
    where: {
      usuario,
    },
  });

  if (!usuarioEncontrado || usuarioEncontrado.senha !== senha) {
    redirect("/login?erro=Usuário ou senha inválidos");
  }

  const cookieStore = await cookies();

  cookieStore.set("maracana_login", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  cookieStore.set("maracana_usuario", usuarioEncontrado.nome, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/");
}

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{
    erro?: string;
  }>;
}) {
  const params = await searchParams;
  const erro = params.erro;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-neutral-900 border border-yellow-700/40 rounded-2xl p-8">
        <div className="text-center mb-8">
          <img
            src="/logo-maracana.png"
            alt="Açougue Maracanã"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />

          <h1 className="text-3xl font-bold">Açougue Maracanã</h1>

          <p className="text-yellow-400 mt-2">
            Sistema de Gestão Comercial
          </p>
        </div>

        {erro && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-950 p-4 text-red-300 font-bold">
            {erro}
          </div>
        )}

        <form action={entrar} className="space-y-4">
          <input
            name="usuario"
            className="input w-full"
            placeholder="Usuário"
          />

          <input
            name="senha"
            type="password"
            className="input w-full"
            placeholder="Senha"
          />

          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}