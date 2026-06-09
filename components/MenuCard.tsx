import Link from "next/link";

type MenuCardProps = {
  title: string;
  icon: string;
  href: string;
  description?: string;
};

export default function MenuCard({ title, icon, href, description }: MenuCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-44 flex-col items-center justify-center rounded-2xl border border-yellow-700/40 bg-neutral-900 p-6 text-center shadow-lg transition hover:-translate-y-1 hover:border-yellow-400 hover:bg-red-950"
    >
      <div className="mb-3 text-6xl transition group-hover:scale-110">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-neutral-400">
          {description}
        </p>
      )}
    </Link>
  );
}