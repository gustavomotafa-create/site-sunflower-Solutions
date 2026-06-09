import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete("maracana_login");
  cookieStore.delete("maracana_usuario");

  redirect("/login");
}