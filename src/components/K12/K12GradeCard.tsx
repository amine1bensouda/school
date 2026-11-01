import Link from 'next/link';

type K12GradeCardProps = {
  code: string;
  title: string;
  description: string;
  color: string;
  href?: string | null;
  skillsLabel: string;
};

export default function K12GradeCard({
  code,
  title,
  description,
  color,
  href,
  skillsLabel,
}: K12GradeCardProps) {
  const inner = (
    <>
      <div className="flex items-center gap-3 mb-3">
        <span
          className="inline-flex items-center justify-center min-w-[3rem] h-12 px-2 rounded-lg text-white text-lg font-bold shadow-sm"
          style={{ backgroundColor: color }}
        >
          {code}
        </span>
        <h2 className="text-2xl font-serif font-bold" style={{ color }}>
          {title}
        </h2>
      </div>
      <p className="text-gray-700 text-[15px] leading-relaxed mb-5 flex-1">
        {description}
      </p>
      <span className="text-sm font-medium" style={{ color }}>
        {href ? `>> ${skillsLabel}` : '>> Coming soon'}
      </span>
    </>
  );

  const className =
    'flex flex-col h-full rounded-xl bg-white p-5 sm:p-6 border-2 shadow-sm transition-all duration-200 hover:shadow-md';

  if (href) {
    return (
      <Link
        href={href}
        className={`${className} hover:-translate-y-0.5`}
        style={{ borderColor: color }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={`${className} opacity-90`} style={{ borderColor: `${color}66` }}>
      {inner}
    </div>
  );
}
