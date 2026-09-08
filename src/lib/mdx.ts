import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

const prettyCodeOptions: PrettyCodeOptions = {
  // Emits --shiki-light / --shiki-dark custom properties so one build serves both themes.
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: "plaintext",
};

export const remarkPlugins: PluggableList = [remarkGfm];

export const rehypePlugins: PluggableList = [
  rehypeSlug,
  [rehypePrettyCode, prettyCodeOptions],
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      properties: { className: "heading-anchor", "aria-hidden": "true", tabIndex: -1 },
      content: { type: "text", value: "#" },
      test: ["h2", "h3"],
    },
  ],
];
