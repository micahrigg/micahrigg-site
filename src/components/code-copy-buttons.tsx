"use client";

import { useEffect, useRef } from "react";

/** Adds a copy button to every code block rendered inside the wrapper. */
export function CodeCopyButtons({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    root.querySelectorAll("figure[data-rehype-pretty-code-figure]").forEach((figure) => {
      const pre = figure.querySelector("pre");
      if (!pre || figure.querySelector("[data-copy-button]")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.dataset.copyButton = "true";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code to clipboard");
      button.className =
        "absolute right-2 top-2 rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-ink-muted opacity-0 transition-opacity hover:text-accent focus-visible:opacity-100 group-hover/code:opacity-100";

      figure.classList.add("group/code");

      const onClick = async () => {
        try {
          await navigator.clipboard.writeText(pre.innerText);
          button.textContent = "Copied";
          setTimeout(() => (button.textContent = "Copy"), 2000);
        } catch {
          button.textContent = "Failed";
          setTimeout(() => (button.textContent = "Copy"), 2000);
        }
      };

      button.addEventListener("click", onClick);
      figure.appendChild(button);

      cleanups.push(() => {
        button.removeEventListener("click", onClick);
        button.remove();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [children]);

  return (
    <div ref={ref} className="prose">
      {children}
    </div>
  );
}
