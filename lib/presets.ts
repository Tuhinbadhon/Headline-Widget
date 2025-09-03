// Predefined gradient presets for quick selection
export const gradientPresets = [
  {
    name: "Ocean Breeze",
    colors: ["#667eea", "#764ba2"],
    direction: "right" as const,
  },
  {
    name: "Sunset Glow",
    colors: ["#f093fb", "#f5576c"],
    direction: "right" as const,
  },
  {
    name: "Forest Dream",
    colors: ["#56ab2f", "#a8e6cf"],
    direction: "down" as const,
  },
  {
    name: "Purple Rain",
    colors: ["#8360c3", "#2ebf91"],
    direction: "left" as const,
  },
  {
    name: "Golden Hour",
    colors: ["#ffecd2", "#fcb69f"],
    direction: "up" as const,
  },
  {
    name: "Electric Blue",
    colors: ["#74b9ff", "#0984e3"],
    direction: "right" as const,
  },
];

// Typography presets
export const typographyPresets = [
  {
    name: "Bold Impact",
    fontSize: 72,
    fontFamily: "Impact, sans-serif",
    fontWeight: "900",
  },
  {
    name: "Elegant Serif",
    fontSize: 48,
    fontFamily: "Georgia, serif",
    fontWeight: "400",
  },
  {
    name: "Modern Clean",
    fontSize: 52,
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
  },
  {
    name: "Tech Mono",
    fontSize: 40,
    fontFamily: "Courier New, monospace",
    fontWeight: "700",
  },
];

// Animation presets
export const animationPresets = [
  {
    name: "Smooth Fade",
    effects: {
      fadeIn: true,
      hoverGlow: false,
      letterAnimation: false,
      textShadow: false,
      outline: false,
    },
  },
  {
    name: "Typewriter",
    effects: {
      fadeIn: false,
      hoverGlow: false,
      letterAnimation: true,
      textShadow: false,
      outline: false,
    },
  },
  {
    name: "Glowing Text",
    effects: {
      fadeIn: true,
      hoverGlow: true,
      letterAnimation: false,
      textShadow: true,
      outline: false,
    },
  },
  {
    name: "Outlined Bold",
    effects: {
      fadeIn: true,
      hoverGlow: false,
      letterAnimation: false,
      textShadow: false,
      outline: true,
    },
  },
];
