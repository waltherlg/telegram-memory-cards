export interface parsedCardCommand {
  category: string;
  title: string;
  text: string;
}

export function newCardParser(text: string): parsedCardCommand | null {
  const parts = text
    .split('#')
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length < 4) return null;
  return {
    category: parts[1],
    title: parts[2],
    text: parts.slice(3).join(' # '),
  };
}
