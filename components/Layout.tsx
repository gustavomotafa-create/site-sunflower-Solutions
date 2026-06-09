import Header from "./Header";
import MensagemSistema from "./MensagemSistema";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <main className="p-8">
        <MensagemSistema />

        {children}
      </main>
    </div>
  );
}