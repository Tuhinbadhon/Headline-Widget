import type { ColorPickerType, HeadlineSettings } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Minus,
  Palette,
  Plus,
  Sparkles,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";

interface GradientTabProps {
  settings: HeadlineSettings;
  showColorPicker: ColorPickerType;
  onUpdateSettings: (path: string, value: unknown) => void;
  onShowColorPicker: (picker: ColorPickerType) => void;
}

const gradientDirections = {
  right: "to right",
  left: "to left",
  down: "to bottom",
  up: "to top",
};

const directionIcons = {
  right: ArrowRight,
  left: ArrowLeft,
  down: ArrowDown,
  up: ArrowUp,
};

const gradientPresets = [
  { name: "Ocean Blue", colors: ["#667eea", "#764ba2"] },
  { name: "Sunset", colors: ["#f093fb", "#f5576c"] },
  { name: "Forest", colors: ["#56ab2f", "#a8e6cf"] },
  { name: "Fire", colors: ["#ff416c", "#ff4b2b"] },
  { name: "Purple Rain", colors: ["#667eea", "#764ba2", "#f093fb"] },
  { name: "Miami Vice", colors: ["#3f51b1", "#5a55ae", "#7b1fa2", "#e91e63"] },
  {
    name: "Northern Lights",
    colors: ["#00c6ff", "#0072ff", "#2196f3", "#21cbf3"],
  },
  {
    name: "Rainbow",
    colors: ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff80"],
  },
];

export function GradientTab({
  settings,
  showColorPicker,
  onUpdateSettings,
  onShowColorPicker,
}: GradientTabProps) {
  const addColor = () => {
    const colors = Array.isArray(settings.gradient.colors)
      ? settings.gradient.colors
      : ["#667eea", "#764ba2"];

    if (colors.length < 5) {
      const newColors = [...colors, "#667eea"];
      onUpdateSettings("gradient.colors", newColors);
    }
  };

  const removeColor = (index: number) => {
    const colors = Array.isArray(settings.gradient.colors)
      ? settings.gradient.colors
      : ["#667eea", "#764ba2"];

    if (colors.length > 2) {
      const newColors = colors.filter((_, i) => i !== index);
      onUpdateSettings("gradient.colors", newColors);
    }
  };

  const applyPreset = (presetColors: string[]) => {
    onUpdateSettings("gradient.colors", presetColors);
  };

  const colors = Array.isArray(settings.gradient.colors)
    ? settings.gradient.colors
    : ["#667eea", "#764ba2"];

  const gradientStyle = {
    background: `linear-gradient(${
      gradientDirections[settings.gradient.direction]
    }, ${colors.join(", ")})`,
  };

  return (
    <motion.div
      key="gradient"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Enable Toggle with Live Preview */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-400" />
            <label className="text-white text-sm font-medium">
              Gradient Effect
            </label>
          </div>
          <button
            onClick={() =>
              onUpdateSettings("gradient.enabled", !settings.gradient.enabled)
            }
            className={clsx(
              "w-12 h-6 rounded-full transition-all duration-300 relative shadow-lg",
              settings.gradient.enabled
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : "bg-gray-600"
            )}
          >
            <div
              className={clsx(
                "w-5 h-5 rounded-full bg-white transition-transform duration-300 absolute top-0.5 shadow-md",
                settings.gradient.enabled ? "translate-x-6" : "translate-x-0.5"
              )}
            />
          </button>
        </div>

        {/* Live Preview */}
        <div className="h-12 rounded-lg border border-white/20 overflow-hidden">
          <div
            className="w-full h-full"
            style={
              settings.gradient.enabled
                ? gradientStyle
                : { background: "#667eea" }
            }
          />
        </div>
      </div>

      {settings.gradient.enabled && (
        <>
          {/* Gradient Presets */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <label className="text-white text-sm font-medium">
                Quick Presets
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {gradientPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset.colors)}
                  className="group relative h-8 rounded-lg overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-200"
                  title={preset.name}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(to right, ${preset.colors.join(
                        ", "
                      )})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white text-xs font-medium">
                      {preset.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Direction Control */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <label className="block text-white text-sm font-medium mb-3">
              Gradient Direction
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(
                Object.keys(gradientDirections) as Array<
                  keyof typeof gradientDirections
                >
              ).map((direction) => {
                const Icon = directionIcons[direction];
                return (
                  <button
                    key={direction}
                    onClick={() =>
                      onUpdateSettings("gradient.direction", direction)
                    }
                    className={clsx(
                      "p-3 rounded-lg transition-all duration-200 flex items-center justify-center relative overflow-hidden",
                      settings.gradient.direction === direction
                        ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Management */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <label className="text-white text-sm font-medium">
                Colors ({colors.length})
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={addColor}
                  disabled={colors.length >= 5}
                  className={clsx(
                    "p-1.5 rounded-lg transition-all duration-200",
                    colors.length >= 5
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white hover:scale-105"
                  )}
                  title="Add Color"
                >
                  <Plus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeColor(colors.length - 1)}
                  disabled={colors.length <= 2}
                  className={clsx(
                    "p-1.5 rounded-lg transition-all duration-200",
                    colors.length <= 2
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white hover:scale-105"
                  )}
                  title="Remove Color"
                >
                  <Minus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {colors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-white text-xs font-medium">
                      Color {index + 1}
                    </label>
                    {colors.length > 2 && (
                      <button
                        onClick={() => removeColor(index)}
                        className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                        title="Remove this color"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => {
                        const pickerKey = `color${index}` as ColorPickerType;
                        onShowColorPicker(
                          showColorPicker === pickerKey ? null : pickerKey
                        );
                      }}
                      className="w-full h-12 rounded-lg border-2 border-white/20 transition-all duration-200 hover:border-white/40 hover:scale-105 shadow-lg relative overflow-hidden group"
                      style={{ backgroundColor: color }}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                      <div className="absolute bottom-1 left-1 right-1">
                        <div className="text-xs font-mono text-white/80 bg-black/30 rounded px-1 py-0.5 backdrop-blur-sm">
                          {color.toUpperCase()}
                        </div>
                      </div>
                    </button>
                    {showColorPicker === `color${index}` && (
                      <div
                        className="fixed inset-0 z-[9999]"
                        onClick={() => onShowColorPicker(null)}
                      >
                        <div
                          className="absolute bg-white rounded-lg p-3 shadow-2xl border border-gray-200 z-[10000]"
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="mb-2 text-center">
                            <span className="text-sm font-medium text-gray-700">
                              Color {index + 1}
                            </span>
                          </div>
                          <HexColorPicker
                            color={color}
                            onChange={(newColor) =>
                              onUpdateSettings(
                                `gradient.colors.${index}`,
                                newColor
                              )
                            }
                          />
                          <div className="mt-2 text-center">
                            <button
                              onClick={() => onShowColorPicker(null)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-600 transition-colors"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {colors.length < 5 && (
              <button
                onClick={addColor}
                className="w-full mt-3 p-3 rounded-lg border-2 border-dashed border-white/30 text-white/60 hover:text-white hover:border-white/50 transition-all duration-200 flex items-center justify-center gap-2 hover:bg-white/5"
              >
                <Plus className="w-4 h-4" />
                Add Another Color
              </button>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
