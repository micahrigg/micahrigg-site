"use client";

import { buttonClasses } from "@/components/ui";

export function PrintButton({ children = "Print / Save as PDF" }: { children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={buttonClasses({ variant: "secondary" })}
    >
      {children}
    </button>
  );
}
