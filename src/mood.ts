export type Mood = "dreamy" | "sleepy" | "dawn";

export const MOODS: Mood[] = ["dreamy", "sleepy", "dawn"];

export const MOOD_INFO: Record<Mood, { icon: string; label: string; line: string }> = {
  dreamy: { icon: "✦", label: "Dreamy", line: "Mmm, dreaming up lullabies..." },
  sleepy: { icon: "☾", label: "Sleepy", line: "Yaaawn... five more minutes?" },
  dawn: { icon: "☼", label: "Dawn", line: "Good morning! I stitched all night!" },
};

export function nextMood(mood: Mood): Mood {
  return MOODS[(MOODS.indexOf(mood) + 1) % MOODS.length];
}