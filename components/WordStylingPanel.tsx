import type { HeadlineSettings } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Highlighter,
  Palette,
  RotateCcw,
  Square,
  Type,
  Underline,
  X,
} from "lucide-react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface WordStylingPanelProps {
  selectedWordIndex: number | null;
  settings: HeadlineSettings;
  onUpdateSettings: (path: string, value: unknown) => void;
  onClearSelection: () => void;
}

export function WordStylingPanel({
  selectedWordIndex,
  settings,
  onUpdateSettings,
  onClearSelection,
}: WordStylingPanelProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (selectedWordIndex === null) return null;

  const currentStyling = settings.wordStyling[selectedWordIndex] || {
    highlight: false,
    underline: false,
    background: false,
    color: "#ffffff",
  };

  const wordText = settings.text.split(" ")[selectedWordIndex] || "Word";

  const toggleStyling = (property: keyof typeof currentStyling) => {
    if (property === "color") return;

    // If we're turning on background, turn off highlight
    if (property === "background" && !currentStyling.background) {
      onUpdateSettings(`wordStyling.${selectedWordIndex}.highlight`, false);
    }

    // If we're turning on highlight, turn off background
    if (property === "highlight" && !currentStyling.highlight) {
      onUpdateSettings(`wordStyling.${selectedWordIndex}.background`, false);
    }

    onUpdateSettings(
      `wordStyling.${selectedWordIndex}.${property}`,
      !currentStyling[property]
    );
  };

  const updateColor = (color: string) => {
    // Initialize the word styling object if it doesn't exist
    if (!settings.wordStyling[selectedWordIndex]) {
      onUpdateSettings(`wordStyling.${selectedWordIndex}`, {
        highlight: false,
        underline: false,
        background: false,
        color: color,
      });
    } else {
      onUpdateSettings(`wordStyling.${selectedWordIndex}.color`, color);
    }
  };

  const resetWordStyling = () => {
    onUpdateSettings(`wordStyling.${selectedWordIndex}`, undefined);
    setShowColorPicker(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="mt-6 p-6 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Type className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Word Styling</h3>
            <p className="text-gray-300 text-sm">
              Styling:{" "}
              <span className="font-mono text-blue-300">
                &quot;{wordText}&quot;
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={onClearSelection}
          className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all duration-200 text-red-300 hover:text-red-200"
          title="Close styling panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Style Options */}
      <div className="space-y-4">
        {/* Main Style Toggles */}
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleStyling("highlight")}
            className={clsx(
              "p-4 rounded-xl transition-all duration-200 flex flex-col items-center gap-2 border",
              currentStyling.highlight
                ? "bg-yellow-500/20 border-yellow-400/50 text-yellow-300"
                : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30"
            )}
          >
            <Highlighter className="w-5 h-5" />
            <span className="text-xs font-medium">Highlight</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleStyling("underline")}
            className={clsx(
              "p-4 rounded-xl transition-all duration-200 flex flex-col items-center gap-2 border",
              currentStyling.underline
                ? "bg-blue-500/20 border-blue-400/50 text-blue-300"
                : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30"
            )}
          >
            <Underline className="w-5 h-5" />
            <span className="text-xs font-medium">Underline</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleStyling("background")}
            className={clsx(
              "p-4 rounded-xl transition-all duration-200 flex flex-col items-center gap-2 border",
              currentStyling.background
                ? "bg-gray-500/20 border-gray-400/50 text-gray-300"
                : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30"
            )}
          >
            <Square className="w-5 h-5" />
            <span className="text-xs font-medium">Background</span>
          </motion.button>
        </div>

        {/* Color Picker Section */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              <label className="text-white text-sm font-medium">
                Text Color
              </label>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              {currentStyling.color?.toUpperCase() || "#FFFFFF"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-12 h-12 rounded-lg border-2 border-white/20 transition-all duration-200 hover:border-white/40 hover:scale-105 shadow-lg relative overflow-hidden"
              style={{ backgroundColor: currentStyling.color || "#ffffff" }}
              title="Click to change color"
            >
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200" />
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">Preview:</span>
                <span
                  className="px-3 py-1 rounded text-sm font-medium transition-all duration-200"
                  style={{
                    color: currentStyling.background
                      ? currentStyling.color || "#ffffff"
                      : currentStyling.highlight
                      ? currentStyling.color || "#000000"
                      : currentStyling.color || "#ffffff",
                    backgroundColor: currentStyling.background
                      ? "#000000"
                      : currentStyling.highlight
                      ? "#fde047"
                      : "transparent",
                    padding: currentStyling.background
                      ? "2px 8px"
                      : currentStyling.highlight
                      ? "1px 4px"
                      : "4px 8px",
                    textDecoration: currentStyling.underline
                      ? "underline"
                      : "none",
                    textDecorationThickness: currentStyling.underline
                      ? "2px"
                      : "auto",
                    textUnderlineOffset: currentStyling.underline
                      ? "2px"
                      : "auto",
                  }}
                >
                  {wordText}
                </span>
              </div>
            </div>
          </div>

          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-white rounded-xl shadow-xl border border-gray-200"
            >
              <HexColorPicker
                color={currentStyling.color || "#ffffff"}
                onChange={updateColor}
              />
            </motion.div>
          )}
        </div>

        {/* Quick Color Presets */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <label className="block text-white text-sm font-medium mb-3">
            Quick Colors
          </label>
          <div className="grid grid-cols-8 gap-2">
            {[
              "#ffffff",
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffff00",
              "#ff00ff",
              "#00ffff",
              "#ffa500",
              "#800080",
              "#008000",
              "#000080",
              "#800000",
              "#808080",
              "#ffc0cb",
              "#a52a2a",
              "#dda0dd",
            ].map((color) => (
              <button
                key={color}
                onClick={() => updateColor(color)}
                className={clsx(
                  "w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110",
                  currentStyling.color === color
                    ? "border-white shadow-lg ring-2 ring-white/50"
                    : "border-white/30 hover:border-white/60"
                )}
                style={{ backgroundColor: color }}
                title={color.toUpperCase()}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetWordStyling}
            className="flex-1 p-3 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-all duration-200 text-orange-300 hover:text-orange-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Styling
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClearSelection}
            className="px-6 py-3 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg transition-all duration-200 text-gray-300 hover:text-gray-200"
          >
            Done
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
