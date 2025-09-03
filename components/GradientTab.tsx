import type { ColorPickerType, HeadlineSettings } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
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

export function GradientTab({
  settings,
  showColorPicker,
  onUpdateSettings,
  onShowColorPicker,
}: GradientTabProps) {
  return (
    <motion.div
      key="gradient"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <label className="text-white text-sm font-medium">
          Enable Gradient
        </label>
        <button
          onClick={() =>
            onUpdateSettings("gradient.enabled", !settings.gradient.enabled)
          }
          className={clsx(
            "w-12 h-6 rounded-full transition-colors relative",
            settings.gradient.enabled ? "bg-blue-500" : "bg-gray-600"
          )}
        >
          <div
            className={clsx(
              "w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5",
              settings.gradient.enabled ? "translate-x-6" : "translate-x-0.5"
            )}
          />
        </button>
      </div>

      {settings.gradient.enabled && (
        <>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Direction
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
                      "p-3 rounded-lg transition-colors flex items-center justify-center",
                      settings.gradient.direction === direction
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Color 1
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    onShowColorPicker(
                      showColorPicker === "color1" ? null : "color1"
                    )
                  }
                  className="w-full h-12 rounded-lg border-2 border-white/20 transition-colors"
                  style={{
                    backgroundColor: settings.gradient.colors[0],
                  }}
                />
                {showColorPicker === "color1" && (
                  <div className="absolute top-14 left-0 z-10">
                    <HexColorPicker
                      color={settings.gradient.colors[0]}
                      onChange={(color) =>
                        onUpdateSettings("gradient.colors.0", color)
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Color 2
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    onShowColorPicker(
                      showColorPicker === "color2" ? null : "color2"
                    )
                  }
                  className="w-full h-12 rounded-lg border-2 border-white/20 transition-colors"
                  style={{
                    backgroundColor: settings.gradient.colors[1],
                  }}
                />
                {showColorPicker === "color2" && (
                  <div className="absolute top-14 left-0 z-10">
                    <HexColorPicker
                      color={settings.gradient.colors[1]}
                      onChange={(color) =>
                        onUpdateSettings("gradient.colors.1", color)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
