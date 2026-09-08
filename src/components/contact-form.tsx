"use client";

import { useForm, ValidationError } from "@formspree/react";
import { site } from "@/lib/site";
import { buttonClasses } from "@/components/ui";

const fieldClasses =
  "w-full rounded-md border border-line bg-surface-raised px-3 py-2 text-sm text-ink placeholder:text-ink-subtle focus-visible:border-accent";

export function ContactForm() {
  const [state, handleSubmit] = useForm(site.formspreeId || "unconfigured");

  if (!site.formspreeId) {
    return (
      <div className="border-line bg-surface-sunken rounded-md border p-6 text-sm">
        <p className="font-medium">Contact form not configured</p>
        <p className="text-ink-muted mt-2">
          Set <code className="font-mono">NEXT_PUBLIC_FORMSPREE_ID</code> to your Formspree form
          hash to enable this form.
        </p>
      </div>
    );
  }

  if (state.succeeded) {
    return (
      <div role="status" className="border-accent/40 bg-surface-sunken rounded-md border p-6">
        <p className="font-serif text-xl">Thank you — message received.</p>
        <p className="text-ink-muted mt-2 text-sm">
          I read everything that comes through here and will reply soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          autoComplete="name"
          className={fieldClasses}
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
          className="text-accent mt-2 block text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className={fieldClasses}
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-accent mt-2 block text-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={fieldClasses} />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-accent mt-2 block text-sm"
        />
      </div>

      {/* Formspree silently discards submissions that fill this in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="_gotcha">Leave this field empty</label>
        <input id="_gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={state.submitting} className={buttonClasses()}>
          {state.submitting ? "Sending…" : "Send message"}
        </button>
        <ValidationError errors={state.errors} className="text-accent text-sm" />
      </div>
    </form>
  );
}
