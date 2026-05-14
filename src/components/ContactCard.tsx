import { GripVertical, ShieldCheck, Trash2 } from "lucide-react";
import type { TrustedContact } from "@/types";

export function ContactCard({ contact, onRemove }: { contact: TrustedContact; onRemove?: (id: string) => void }) {
  return (
    <article className="safe-card flex items-center gap-3 rounded-lg p-4">
      <GripVertical className="h-5 w-5 text-slate-300" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{contact.name}</h3>
          <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-100">Priority {contact.priority}</span>
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{contact.relationship} · {contact.phone}</p>
      </div>
      <ShieldCheck className={`h-5 w-5 ${contact.escalationEnabled ? "text-teal-600" : "text-slate-300"}`} />
      {onRemove ? (
        <button className="grid h-11 w-11 place-items-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950" onClick={() => onRemove(contact.id)} aria-label={`Remove ${contact.name}`}>
          <Trash2 className="h-5 w-5" />
        </button>
      ) : null}
    </article>
  );
}
