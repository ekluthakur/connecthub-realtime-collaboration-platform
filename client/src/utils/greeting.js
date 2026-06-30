export function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      emoji: "☀️",
      text: "Good Morning",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      emoji: "🌤️",
      text: "Good Afternoon",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      emoji: "🌇",
      text: "Good Evening",
    };
  }

  return {
    emoji: "🌙",
    text: "Working Late?",
  };
}