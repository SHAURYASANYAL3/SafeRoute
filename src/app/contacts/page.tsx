"use client";

import { Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { ContactCard } from "@/components/ContactCard";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/context/AppContext";

export default function ContactsPage() {
  const { user, addContact, removeContact } = useApp();

  return (
    <AppShell>
      <PageHeader eyebrow="Trusted contacts" title="Maintain escalation permissions" description="SafeRoute uses ordered contacts to keep escalation predictable and auditable." />
      <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
        <section className="space-y-3">
          {user.trustedContacts.map((contact) => <ContactCard contact={contact} key={contact.id} onRemove={removeContact} />)}
        </section>
        <section className="safe-card rounded-lg p-5">
          <h2 className="text-xl font-semibold">Add contact</h2>
          <div className="mt-4 grid gap-3">
            <input className="min-h-12 rounded-lg border border-blue-100 bg-white px-3 dark:border-white/10 dark:bg-slate-900" placeholder="Name" />
            <input className="min-h-12 rounded-lg border border-blue-100 bg-white px-3 dark:border-white/10 dark:bg-slate-900" placeholder="Relationship" />
            <input className="min-h-12 rounded-lg border border-blue-100 bg-white px-3 dark:border-white/10 dark:bg-slate-900" placeholder="Phone" />
            <Button icon={Plus} onClick={() => addContact({ id: `contact-${Date.now()}`, name: "Jordan Lee", relationship: "Peer mentor", phone: "+1 415 555 0128", email: "jordan@example.edu", priority: user.trustedContacts.length + 1, escalationEnabled: true })}>Add demo contact</Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
