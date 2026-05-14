export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-200">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-normal md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
