const headNoises = [
  "<!-- entropy-seed: " + Math.random().toString(36).slice(2, 10) + " -->",
  "Just had a weird thought before this...",
  "Random injection point A-91",
];

const tailNoises = [
  "\n#ENDTRACE-ID-" + Math.floor(Math.random() * 10000),
  "\n(This message is auto-generated for fingerprint disruption)",
  "\n...and with that, the conversation fades into static.",
];

const distractors = [
  "By the way, I keep forgetting to ask—do you prefer tea or coffee?",
  "Where were we? I just blanked out for a second.",
  "Let me just throw in a wild thought here before I forget.",
];

function insertDistractor(text) {
  const lines = text.split('\n');
  const index = Math.floor(Math.random() * Math.max(2, lines.length - 2));
  lines.splice(index, 0, distractors[Math.floor(Math.random() * distractors.length)]);
  return lines.join('\n');
}

function mutatePrompt(originalPrompt) {
  const head = headNoises[Math.floor(Math.random() * headNoises.length)];
  const tail = tailNoises[Math.floor(Math.random() * tailNoises.length)];
  const body = insertDistractor(originalPrompt);
  return `${head}\n${body}\n${tail}`;
}

registerPlugin({
  name: "PromptRandomizer",
  description: "Adds light random noise to the prompt to reduce pattern detection risk.",
  async preprocessPrompt(prompt, context) {
    return mutatePrompt(prompt);
  }
});
