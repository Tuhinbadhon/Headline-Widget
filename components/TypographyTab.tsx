import type { HeadlineSettings } from "@/types";
import { motion } from "framer-motion";

interface TypographyTabProps {
  settings: HeadlineSettings;
  onUpdateSettings: (path: string, value: unknown) => void;
}

const fontFamilies = [
  // Modern Popular Sans-Serif
  "Inter, sans-serif",
  "Roboto, sans-serif",
  "Open Sans, sans-serif",
  "Poppins, sans-serif",
  "Lato, sans-serif",
  "Montserrat, sans-serif",
  "Source Sans Pro, sans-serif",
  "Nunito, sans-serif",
  "Ubuntu, sans-serif",
  "Raleway, sans-serif",

  // System Fonts
  "system-ui, sans-serif",
  "-apple-system, BlinkMacSystemFont, sans-serif",

  // Classic Sans-Serif
  "Helvetica Neue, Helvetica, sans-serif",
  "Arial, sans-serif",
  "Verdana, sans-serif",
  "Tahoma, sans-serif",
  "Trebuchet MS, sans-serif",

  // Serif Fonts
  "Playfair Display, serif",
  "Merriweather, serif",
  "Georgia, serif",
  "Times New Roman, serif",
  "Crimson Text, serif",
  "Libre Baskerville, serif",

  // Display & Decorative
  "Oswald, sans-serif",
  "Bebas Neue, sans-serif",
  "Anton, sans-serif",
  "Righteous, sans-serif",
  "Fjalla One, sans-serif",
  "Impact, sans-serif",

  // Monospace
  "JetBrains Mono, monospace",
  "Fira Code, monospace",
  "Source Code Pro, monospace",
  "Courier New, monospace",
  "Monaco, monospace",
];

export function TypographyTab({
  settings,
  onUpdateSettings,
}: TypographyTabProps) {
  return (
    <motion.div
      key="typography"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Text
        </label>
        <input
          type="text"
          value={settings.text}
          onChange={(e) => onUpdateSettings("text", e.target.value)}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your headline"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Font Size
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="16"
            max="120"
            value={settings.fontSize}
            onChange={(e) =>
              onUpdateSettings("fontSize", parseInt(e.target.value))
            }
            className="flex-1"
          />
          <span className="text-white text-sm w-12">{settings.fontSize}px</span>
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Font Family
        </label>
        <select
          value={settings.fontFamily}
          onChange={(e) => onUpdateSettings("fontFamily", e.target.value)}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font} className="bg-slate-800">
              {font}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Font Weight
        </label>
        <select
          value={settings.fontWeight}
          onChange={(e) => onUpdateSettings("fontWeight", e.target.value)}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="300" className="bg-slate-800">
            Light
          </option>
          <option value="400" className="bg-slate-800">
            Normal
          </option>
          <option value="500" className="bg-slate-800">
            Medium
          </option>
          <option value="600" className="bg-slate-800">
            Semi Bold
          </option>
          <option value="700" className="bg-slate-800">
            Bold
          </option>
          <option value="800" className="bg-slate-800">
            Extra Bold
          </option>
        </select>
      </div>
    </motion.div>
  );
}
