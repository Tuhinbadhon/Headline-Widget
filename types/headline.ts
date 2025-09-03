export interface HeadlineSettings {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  gradient: {
    enabled: boolean;
    direction: "right" | "left" | "down" | "up";
    colors: string[];
  };
  effects: {
    fadeIn: boolean;
    hoverGlow: boolean;
    letterAnimation: boolean;
    textShadow: boolean;
    outline: boolean;
  };
  wordStyling: {
    [key: number]: {
      highlight: boolean;
      underline: boolean;
      background: boolean;
      color: string;
    };
  };
}

export interface WordStyling {
  highlight: boolean;
  underline: boolean;
  background: boolean;
  color: string;
}

export interface GradientSettings {
  enabled: boolean;
  direction: "right" | "left" | "down" | "up";
  colors: string[];
}

export interface EffectSettings {
  fadeIn: boolean;
  hoverGlow: boolean;
  letterAnimation: boolean;
  textShadow: boolean;
  outline: boolean;
}

export type GradientDirection = "right" | "left" | "down" | "up";
export type FontWeight = "300" | "400" | "500" | "600" | "700" | "800";
export type ColorPickerType = string | null;
export type ActiveTab =
  | "presets"
  | "typography"
  | "gradient"
  | "effects"
  | "export";

export interface ExportData {
  settings: HeadlineSettings;
  timestamp: string;
  version: string;
}
