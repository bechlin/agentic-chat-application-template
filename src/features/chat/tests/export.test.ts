import { describe, expect, it } from "bun:test";

import { formatConversationAsMarkdown } from "../export";

describe("formatConversationAsMarkdown", () => {
  it("formats a conversation with multiple messages", () => {
    const result = formatConversationAsMarkdown("Test Chat", [
      { role: "user", content: "Hello!" },
      { role: "assistant", content: "Hi there, how can I help?" },
      { role: "user", content: "What is 2+2?" },
      { role: "assistant", content: "2+2 equals 4." },
    ]);

    expect(result).toContain("# Test Chat");
    expect(result).toContain("*Exported on ");
    expect(result).toContain("**You:**\nHello!");
    expect(result).toContain("**Assistant:**\nHi there, how can I help?");
    expect(result).toContain("**You:**\nWhat is 2+2?");
    expect(result).toContain("**Assistant:**\n2+2 equals 4.");
  });

  it("handles empty message list", () => {
    const result = formatConversationAsMarkdown("Empty Chat", []);

    expect(result).toContain("# Empty Chat");
    expect(result).toContain("*Exported on ");
    expect(result).not.toContain("**You:**");
    expect(result).not.toContain("**Assistant:**");
  });

  it("preserves markdown content in messages", () => {
    const codeContent =
      "Here is some code:\n\n```typescript\nconst x = 42;\n```\n\nAnd a list:\n- one\n- two";
    const result = formatConversationAsMarkdown("Code Chat", [
      { role: "user", content: "Show me code" },
      { role: "assistant", content: codeContent },
    ]);

    expect(result).toContain("```typescript\nconst x = 42;\n```");
    expect(result).toContain("- one\n- two");
  });

  it("uses raw role name for unknown roles", () => {
    const result = formatConversationAsMarkdown("Custom Roles", [
      { role: "system", content: "You are helpful." },
    ]);

    expect(result).toContain("**system:**\nYou are helpful.");
  });
});
