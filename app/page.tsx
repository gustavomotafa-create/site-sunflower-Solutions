export default function Home() {
  const numeroWhatsApp = "5527988492573";

  const whatsapp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    "Olá! Quero solicitar um orçamento para um projeto digital."
  )}`;

  const opcoesOrcamento = [
    ["Site profissional", "Olá! Quero um orçamento para um site profissional."],
    ["Sistema web", "Olá! Quero um orçamento para um sistema web."],
    ["Catálogo online", "Olá! Quero um orçamento para um catálogo online."],
    ["Loja virtual", "Olá! Quero um orçamento para uma loja virtual."],
  ];

  const passos = [
    ["1", "Diagnóstico", "Entendemos sua ideia, seu negócio e o objetivo do projeto."],
    ["2", "Proposta", "Você recebe escopo, prazo e investimento de forma clara."],
    ["3", "Criação", "Desenvolvemos uma solução moderna, bonita e funcional."],
    ["4", "Entrega", "Publicamos o projeto e acompanhamos você após a entrega."],
  ];

  const servicos = [
    ["🌐", "Sites profissionais", "Páginas modernas para apresentar sua empresa e atrair clientes.", "Site profissional"],
    ["💻", "Sistemas web", "Sistemas personalizados para organizar vendas, clientes e processos.", "Sistema web"],
    ["🛒", "Catálogos online", "Mostre seus produtos e receba pedidos direto pelo WhatsApp.", "Catálogo online"],
    ["📦", "Lojas virtuais", "Venda online com uma estrutura feita para o seu negócio.", "Loja virtual"],
    ["🔧", "Manutenção", "Correções, melhorias e ajustes em sites ou sistemas existentes.", "Manutenção"],
    ["☁️", "Hospedagem e domínio", "Ajuda com publicação, domínio, e-mail profissional e configurações.", "Hospedagem e domínio"],
  ];

  const projetos = [
  [
    "/images/maracana.png",
    "Sistema Maracanã",
    "Sistema Comercial",
    "Sistema desenvolvido para gestão de produtos, clientes, compras, vendas e relatórios.",
    "Next.js • TypeScript • PostgreSQL",
  ],

  [
    "/images/anime.png",
    "Sunflower Anime",
    "Portal de Conteúdo",
    "Site multilíngue com postagens, SEO, categorias, sitemap e painel administrativo.",
    "HTML • CSS • JavaScript • Firebase",
  ],

  [
    "/images/gorgeous.png",
    "Sunflower Gorgeous",
    "Portal Feminino",
    "Projeto focado em conteúdo, reviews, beleza, organização visual e experiência do usuário.",
    "Landing Page • Design • Blog",
  ],
];

  return (
    <main className="relative min-h-screen overflow-hidden text-[#4a3524]">
      <div
        className="fixed inset-0 -z-10 opacity-[0.20]"
        style={{
          backgroundImage: "url('/images/bg.png')",
          backgroundSize: "260px",
          backgroundRepeat: "repeat",
        }}
      />

      <header className="sticky top-4 z-50 mx-auto max-w-[1320px] rounded-[30px] border border-[#efdfbb] bg-[#fffaf4]/95 backdrop-blur-xl shadow-[0_12px_30px_rgba(176,132,76,0.10)]">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-5 px-6 py-4">
          <a href="#" className="flex items-center gap-4">
            <img
              src="/images/logo.png"
              alt="Logo Sunflower Solutions"
              className="h-[68px] w-[68px] rounded-full border-[3px] border-white object-cover shadow-[0_8px_20px_rgba(176,132,76,0.18)]"
            />

            <div>
              <h1 className="m-0 text-3xl font-black leading-none tracking-[-0.8px]">
                <span className="text-[#d89b1d]">Sunflower</span> Solutions 🌻
              </h1>
              <p className="mt-2 text-sm text-[#866b57]">
                Tecnologia bonita, funcional e acessível
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-3 md:flex">
            {[
              ["Início", "#"],
              ["Como funciona", "#como-funciona"],
              ["Serviços", "#servicos"],
              ["Portfólio", "#portfolio"],
              ["Sobre", "#sobre"],
            ].map(([item, link], index) => (
              <a
                key={item}
                href={link}
                className={`w-[150px] text-center rounded-full border border-[#efdfbb] py-4 text-sm font-bold shadow-[0_8px_18px_rgba(176,132,76,0.08)] transition hover:-translate-y-1 ${
                  index === 0
                    ? "bg-gradient-to-br from-[#ffe37b] to-[#f3c64d] text-[#4a3524]"
                    : "bg-white/70 text-[#5c4533] hover:bg-[#fff1bf]"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href={whatsapp}
            target="_blank"
            className="hidden rounded-full bg-gradient-to-br from-[#ffe37b] to-[#d89b1d] px-6 py-4 text-sm font-black text-[#4a3524] shadow-[0_10px_20px_rgba(243,198,77,0.22)] transition hover:-translate-y-1 sm:block"
          >
            💬 Orçamento via WhatsApp
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-7 px-6 py-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative overflow-hidden rounded-[30px] border border-[#efdfbb] bg-gradient-to-br from-white/95 to-[#fff4d6]/90 p-8 shadow-[0_16px_38px_rgba(176,132,76,0.12)] md:p-12">
          <span className="mb-5 inline-flex rounded-full bg-[#fff1bf] px-4 py-2 text-sm font-black text-[#7a5711]">
            🌻 Sunflower Solutions
          </span>

          <h2 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-[-1px] text-[#4a3524] md:text-6xl">
            O digital profissional que seu negócio precisa para{" "}
            <span className="text-[#d89b1d]">crescer</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#7a6554]">
            Desenvolvemos sites, sistemas web, catálogos online e soluções
            digitais sob medida para pequenos negócios que querem vender mais,
            passar confiança e se organizar melhor.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsapp}
              target="_blank"
              className="rounded-2xl bg-gradient-to-br from-[#ffd84f] to-[#d89b1d] px-6 py-4 font-black text-[#4a3524] shadow-[0_10px_20px_rgba(243,198,77,0.25)] transition hover:-translate-y-1"
            >
              Pedir orçamento agora
            </a>

            <a
              href="#servicos"
              className="rounded-2xl border border-[#efdfbb] bg-white/70 px-6 py-4 font-black text-[#6b4c37] transition hover:-translate-y-1"
            >
              Ver serviços
            </a>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["Prazo médio", "7 a 30 dias"],
              ["Orçamento", "A partir de R$ 500"],
              ["Resposta", "Em até 24h"],
            ].map(([titulo, texto]) => (
              <div
                key={titulo}
                className="rounded-[18px] border border-[#efdfbb] bg-white/60 p-4"
              >
                <strong className="block text-sm text-[#4a3524]">{titulo}</strong>
                <span className="mt-1 block text-sm text-[#866b57]">{texto}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-[#efdfbb] bg-gradient-to-br from-white/95 to-[#fff4d6]/90 p-8 shadow-[0_16px_38px_rgba(176,132,76,0.12)] md:p-10">
          <span className="inline-flex rounded-full bg-gradient-to-br from-[#ffe37b] to-[#f3c64d] px-4 py-2 text-sm font-black text-[#5c4117]">
            Favorito dos empreendedores 💛
          </span>

          <div className="mt-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_180px]">
            <div>
              <h3 className="text-3xl font-black leading-tight text-[#4a3524]">
                Tecnologia bonita, funcional e sob medida
              </h3>
              <p className="mt-4 leading-7 text-[#866b57]">
                Soluções digitais que destacam sua marca, simplificam processos
                e ajudam seu negócio a parecer mais profissional.
              </p>
            </div>

            <img
              src="/images/logo.png"
              alt="Sunflower Solutions"
              className="mx-auto h-40 w-40 rounded-full object-cover shadow-[0_12px_28px_rgba(176,132,76,0.18)]"
            />
          </div>

          <div className="mt-8 grid gap-4">
            {[
              ["🧩", "Projetos personalizados", "Feitos sob medida para o seu negócio"],
              ["🎨", "Design moderno", "Visual profissional que gera confiança"],
              ["💛", "Suporte de verdade", "Estamos com você após a entrega"],
            ].map(([icone, titulo, texto]) => (
              <div
                key={titulo}
                className="flex items-center gap-4 rounded-[18px] border border-[#efdfbb] bg-white/65 p-4 transition hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1bf] text-2xl">
                  {icone}
                </div>
                <div>
                  <strong className="block text-[#4a3524]">{titulo}</strong>
                  <span className="text-sm text-[#866b57]">{texto}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pb-4">
        <div className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-[#efdfbb] bg-white/75 shadow-[0_12px_28px_rgba(176,132,76,0.10)] md:grid-cols-4">
          {[
            ["📁", "+10", "Projetos realizados"],
            ["👤", "100%", "Atendimento personalizado"],
            ["💬", "24h", "Resposta média"],
            ["📍", "BA", "Atendimento em Posto da Mata"],
          ].map(([icone, numero, texto]) => (
            <div
              key={texto}
              className="flex items-center gap-4 border-[#efdfbb] p-7 md:border-r last:border-r-0"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f3c64d] bg-[#fffaf4] text-2xl">
                {icone}
              </div>
              <div>
                <p className="text-3xl font-black text-[#4a3524]">{numero}</p>
                <p className="text-sm text-[#5c4533]">{texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="servicos" className="mx-auto max-w-[1320px] px-6 py-6">
        <div className="rounded-[30px] border border-[#efdfbb] bg-white/78 p-8 shadow-[0_14px_34px_rgba(176,132,76,0.12)] backdrop-blur">
          <span className="mb-4 inline-flex rounded-full bg-[#fff1bf] px-4 py-2 text-sm font-black text-[#7a5711]">
            Nossos serviços
          </span>

          <h2 className="text-3xl font-black text-[#4a3524] md:text-4xl">
            Escolha o tipo de projeto ideal para seu negócio
          </h2>

          <p className="mt-2 text-[#866b57]">
            Cada solução pode ser adaptada ao tamanho e necessidade da sua empresa.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {servicos.map(([icone, titulo, texto, tipo]) => (
              <div
                key={titulo}
                className="rounded-[20px] border border-[#efdfbb] bg-white/65 p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(176,132,76,0.16)]"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1bf] text-3xl">
                  {icone}
                </div>

                <h3 className="text-xl font-black text-[#4a3524]">{titulo}</h3>

                <p className="mt-2 min-h-[72px] leading-6 text-[#866b57]">
                  {texto}
                </p>

                <a
                  href={`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                    `Olá! Quero um orçamento para ${tipo}.`
                  )}`}
                  target="_blank"
                  className="mt-4 inline-flex font-black text-[#d89b1d] transition hover:text-[#4a3524]"
                >
                  Quero este serviço →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-[1320px] px-6 py-6">
        <div className="rounded-[30px] border border-[#efdfbb] bg-white/78 p-8 shadow-[0_14px_34px_rgba(176,132,76,0.12)]">
          <span className="mb-4 inline-flex rounded-full bg-[#fff1bf] px-4 py-2 text-sm font-black text-[#7a5711]">
            Processo simples
          </span>

          <h2 className="text-3xl font-black text-[#4a3524] md:text-4xl">
            Como funciona
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            {passos.map(([numero, titulo, texto]) => (
              <div
                key={titulo}
                className="rounded-[20px] border border-[#efdfbb] bg-white/65 p-5 transition hover:-translate-y-1"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#ffe37b] to-[#d89b1d] font-black text-[#4a3524]">
                  {numero}
                </div>

                <h3 className="text-xl font-black text-[#4a3524]">{titulo}</h3>
                <p className="mt-2 leading-6 text-[#866b57]">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 py-6">
        <div className="rounded-[24px] bg-gradient-to-br from-[#3a281c] to-[#1f160f] p-8 text-white shadow-[0_18px_40px_rgba(80,50,20,0.22)]">
          <span className="inline-flex rounded-full bg-[#6b4a16] px-4 py-2 text-sm font-black text-[#ffd84f]">
            Por que escolher a Sunflower?
          </span>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              ["🤝", "Atendimento humano", "Foco no que você precisa"],
              ["🧩", "Projeto sob medida", "Nada de soluções prontas"],
              ["🚀", "Visual moderno", "Design que representa sua marca"],
              ["💡", "Suporte após entrega", "Estamos com você sempre"],
            ].map(([icone, titulo, texto]) => (
              <div key={titulo} className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffd84f] text-2xl">
                  {icone}
                </div>
                <div>
                  <h3 className="font-black">{titulo}</h3>
                  <p className="mt-1 text-sm text-white/75">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-[1320px] px-6 py-6">
        <div className="rounded-[30px] border border-[#efdfbb] bg-white/78 p-8 shadow-[0_14px_34px_rgba(176,132,76,0.12)]">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-4 inline-flex rounded-full bg-[#fff1bf] px-4 py-2 text-sm font-black text-[#7a5711]">
                Projetos e experiências
              </span>

              <h2 className="text-3xl font-black text-[#4a3524] md:text-4xl">
                Alguns projetos que desenvolvemos
              </h2>
            </div>

            <a
              href={whatsapp}
              target="_blank"
              className="w-fit rounded-full border border-[#efdfbb] bg-white/70 px-5 py-3 text-sm font-black transition hover:-translate-y-1"
            >
              Ver todos os projetos
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {projetos.map(([icone, titulo, categoria, texto, tecnologia]) => (
              <div
  key={titulo}
  className="overflow-hidden rounded-[20px] border border-[#efdfbb] bg-white/65 transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(176,132,76,0.16)]"
>
  <img
    src={icone}
    alt={titulo}
    className="w-full"
  />

  <div className="p-5">
                  <h3 className="text-lg font-black text-[#4a3524]">{titulo}</h3>
                  <p className="mt-1 text-sm font-bold text-[#866b57]">{categoria}</p>
                  <p className="mt-2 text-sm leading-6 text-[#866b57]">{texto}</p>
                  <p className="mt-2 text-xs font-bold text-[#5c4533]">{tecnologia}</p>

                  <a
                    href={whatsapp}
                    target="_blank"
                    className="mt-3 inline-flex text-sm font-black text-[#d89b1d]"
                  >
                    Ver detalhes →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" className="mx-auto max-w-[1320px] px-6 py-6">
        <div className="rounded-[30px] border border-[#efdfbb] bg-gradient-to-br from-white/95 to-[#fff4d6]/90 p-8 shadow-[0_14px_34px_rgba(176,132,76,0.12)]">
          <span className="mb-4 inline-flex rounded-full bg-[#fff1bf] px-4 py-2 text-sm font-black text-[#7a5711]">
            Sobre a marca 🌻
          </span>

          <h2 className="text-3xl font-black text-[#4a3524] md:text-4xl">
            Sunflower Solutions
          </h2>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#866b57]">
            A Sunflower Solutions desenvolve sites, sistemas web e soluções
            digitais para pequenos e médios negócios. Nosso foco é unir visual
            bonito, tecnologia funcional e atendimento direto para transformar
            ideias em projetos digitais úteis, profissionais e acessíveis.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 py-6">
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#ffd84f] to-[#d89b1d] p-8 shadow-[0_18px_40px_rgba(176,132,76,0.18)] md:p-10">
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-black text-[#4a3524] md:text-4xl">
                Vamos tirar sua ideia do papel?
              </h2>
              <p className="mt-2 max-w-2xl text-[#5c4533]">
                Fale agora mesmo com a gente no WhatsApp e receba uma proposta
                personalizada para o seu projeto digital.
              </p>
            </div>

            <a
              href={whatsapp}
              target="_blank"
              className="mr-28 rounded-full bg-[#2b1d13] px-8 py-4 font-black text-white shadow-xl transition hover:-translate-y-1"
            >
              💬 Solicitar orçamento agora
            </a>
          </div>

          <img
           src="/images/logo.png"
           alt=""
           className="absolute right-4 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full object-cover opacity-90"
            />
            
            
            
          
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 py-6">
        <div className="rounded-[30px] border border-[#efdfbb] bg-white/78 p-8 shadow-[0_14px_34px_rgba(176,132,76,0.12)]">
          <span className="mb-4 inline-flex rounded-full bg-[#fff1bf] px-4 py-2 text-sm font-black text-[#7a5711]">
            Dúvidas comuns
          </span>

          <h2 className="text-3xl font-black text-[#4a3524] md:text-4xl">
            Perguntas frequentes
          </h2>

          <div className="mt-8 grid gap-4">
            {[
              ["Quanto custa um site?", "O valor depende do tamanho, das funcionalidades e do nível de personalização do projeto."],
              ["Quanto tempo demora?", "Normalmente entre 7 e 30 dias, dependendo da complexidade da solução."],
              ["Vocês fazem manutenção?", "Sim. Realizamos correções, melhorias, ajustes visuais e suporte contínuo."],
              ["Posso pedir apenas um orçamento?", "Claro. O orçamento é sem compromisso e feito com base na sua necessidade."],
            ].map(([pergunta, resposta]) => (
              <div
                key={pergunta}
                className="rounded-[20px] border border-[#efdfbb] bg-white/65 p-5"
              >
                <h3 className="text-xl font-black text-[#4a3524]">{pergunta}</h3>
                <p className="mt-2 leading-7 text-[#866b57]">{resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <a
        href={whatsapp}
        target="_blank"
        className="fixed bottom-8 right-8 z-50 rounded-full bg-green-500 px-6 py-4 font-black text-white shadow-2xl transition hover:-translate-y-1 hover:bg-green-600"
      >
        WhatsApp
      </a>

      <footer className="mt-8 border-t border-[#efdfbb] bg-[#fffaf4]/85 backdrop-blur">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-8 px-6 py-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Logo Sunflower Solutions"
                className="h-14 w-14 rounded-full object-cover shadow-md"
              />
              <div>
                <h2 className="text-2xl font-black">
                  <span className="text-[#d89b1d]">Sunflower</span> Solutions 🌻
                </h2>
                <p className="text-sm text-[#866b57]">
                  Tecnologia bonita, funcional e acessível.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-black text-[#4a3524]">Contato</h3>
            <p className="mt-2 text-sm text-[#866b57]">WhatsApp: (27) 98849-2573</p>
            <p className="text-sm text-[#866b57]">E-mail: sunflowercollectivegf@gmail.com</p>
            <p className="text-sm text-[#866b57]">Posto da Mata - BA</p>
          </div>

          <div>
            <h3 className="font-black text-[#4a3524]">Links rápidos</h3>
            <div className="mt-2 grid gap-1 text-sm text-[#866b57]">
              <a href="#como-funciona">Como funciona</a>
              <a href="#servicos">Serviços</a>
              <a href="#portfolio">Portfólio</a>
              <a href="#sobre">Sobre</a>
            </div>
          </div>

          <div>
            <h3 className="font-black text-[#4a3524]">Fale com a Sunflower</h3>
            <a
              href={whatsapp}
              target="_blank"
              className="mt-3 inline-flex rounded-full bg-gradient-to-br from-[#ffe37b] to-[#d89b1d] px-5 py-3 text-sm font-black text-[#4a3524]"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        <p className="pb-6 text-center text-sm text-[#866b57]">
          © 2026 Sunflower Solutions. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}