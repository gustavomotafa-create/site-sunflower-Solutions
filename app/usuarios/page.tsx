import Layout from "@/components/Layout";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function criarUsuario(formData: FormData) {
  "use server";

  const nome = String(formData.get("nome") || "");
  const usuario = String(formData.get("usuario") || "");
  const senha = String(formData.get("senha") || "");
  const nivel = String(formData.get("nivel") || "Caixa");

  if (!nome || !usuario || !senha) return;

  await prisma.usuario.create({
    data: {
      nome,
      usuario,
      senha,
      nivel,
    },
  });

  revalidatePath("/usuarios");

  redirect(
    "/usuarios?sucesso=" +
      encodeURIComponent("Usuário salvo com sucesso")
  );
}

async function editarUsuario(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  const nome = String(formData.get("nome") || "");
  const usuario = String(formData.get("usuario") || "");
  const senha = String(formData.get("senha") || "");
  const nivel = String(formData.get("nivel") || "Caixa");

  if (!id || !nome || !usuario) return;

  await prisma.usuario.update({
    where: { id },
    data: {
      nome,
      usuario,
      senha,
      nivel,
    },
  });

  revalidatePath("/usuarios");

  redirect(
    "/usuarios?sucesso=" +
      encodeURIComponent("Usuário alterado com sucesso")
  );
}

async function excluirUsuario(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  if (!id) return;

  await prisma.usuario.delete({
    where: { id },
  });

  revalidatePath("/usuarios");

  redirect(
    "/usuarios?sucesso=" +
      encodeURIComponent("Usuário excluído com sucesso")
  );
}

export default async function Usuarios() {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Usuários</h1>

        <p className="text-neutral-400 mb-8">
          Cadastro de usuários e controle de acesso ao sistema.
        </p>

        <form
          action={criarUsuario}
          className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Cadastrar Usuário</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="nome" className="input" placeholder="Nome completo" />

            <input
              name="usuario"
              className="input"
              placeholder="Usuário para login"
            />

            <input
              name="senha"
              className="input"
              type="password"
              placeholder="Senha"
            />

            <select name="nivel" className="input">
              <option value="Administrador">Administrador</option>
              <option value="Caixa">Caixa</option>
              <option value="Funcionário">Funcionário</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="submit" className="btn-primary">
              Salvar Usuário
            </button>
          </div>
        </form>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Usuários cadastrados</h2>

          <div className="space-y-4">
            {usuarios.map((user) => (
              <form
                key={user.id}
                action={editarUsuario}
                className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center bg-neutral-950 border border-neutral-800 rounded-xl p-4"
              >
                <input type="hidden" name="id" value={user.id} />

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Código</p>
                  <p className="font-bold">{user.id}</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Nome</p>
                  <input name="nome" className="input" defaultValue={user.nome} />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Usuário</p>
                  <input
                    name="usuario"
                    className="input"
                    defaultValue={user.usuario}
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Senha</p>
                  <input
                    name="senha"
                    className="input"
                    type="password"
                    defaultValue={user.senha}
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Nível</p>
                  <select name="nivel" className="input" defaultValue={user.nivel}>
                    <option value="Administrador">Administrador</option>
                    <option value="Caixa">Caixa</option>
                    <option value="Funcionário">Funcionário</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="btn-primary">
                    Salvar
                  </button>
                </div>
              </form>
            ))}
          </div>

          <div className="mt-6">
            {usuarios.map((user) => (
              <form
                key={`excluir-${user.id}`}
                action={excluirUsuario}
                className="inline-block mr-3 mb-3"
              >
                <input type="hidden" name="id" value={user.id} />

                <button type="submit" className="btn-danger">
                  Excluir {user.nome}
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}