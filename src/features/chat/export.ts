interface ExportMessage {
  role: string;
  content: string;
}

const ROLE_LABELS: Record<string, string> = {
  user: "You",
  assistant: "Assistant",
};

function getRoleLabel(role: string): string {
  return ROLE_LABELS[role] ?? role;
}

export function formatConversationAsMarkdown(title: string, messages: ExportMessage[]): string {
  const exportDate = new Date().toLocaleString();
  const lines: string[] = [`# ${title}`, `*Exported on ${exportDate}*`, ""];

  for (const message of messages) {
    lines.push("---", "", `**${getRoleLabel(message.role)}:**`, message.content, "");
  }

  return lines.join("\n");
}
