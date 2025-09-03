import {
  animationPresets,
  gradientPresets,
  typographyPresets,
} from "@/lib/presets";
import { motion } from "framer-motion";

interface PresetsTabProps {
  onUpdateSettings: (path: string, value: unknown) => void;
}

const gradientDirections = {
  right: "to right",
  left: "to left",
  down: "to bottom",
  up: "to top",
};

export function PresetsTab({ onUpdateSettings }: PresetsTabProps) {
  return (
    <motion.div
      key="presets"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-white font-medium mb-3">Gradient Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          {gradientPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                onUpdateSettings("gradient.enabled", true);
                onUpdateSettings("gradient.colors", preset.colors);
                onUpdateSettings("gradient.direction", preset.direction);
              }}
              className="p-3 rounded-lg text-xs text-white border border-white/20 hover:border-white/40 transition-colors"
              style={{
                background: `linear-gradient(${
                  gradientDirections[preset.direction]
                }, ${preset.colors.join(", ")})`,
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3">Typography Presets</h3>
        <div className="space-y-2">
          {typographyPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                onUpdateSettings("fontSize", preset.fontSize);
                onUpdateSettings("fontFamily", preset.fontFamily);
                onUpdateSettings("fontWeight", preset.fontWeight);
              }}
              className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-left transition-colors"
            >
              <div className="font-medium">{preset.name}</div>
              <div className="text-xs text-gray-300">
                {preset.fontSize}px, {preset.fontFamily.split(",")[0]}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3">Animation Presets</h3>
        <div className="space-y-2">
          {animationPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                onUpdateSettings("effects", preset.effects);
              }}
              className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-left transition-colors"
            >
              <div className="font-medium">{preset.name}</div>
              <div className="text-xs text-gray-300">
                {Object.entries(preset.effects)
                  .filter(([, value]) => value)
                  .map(([key]) => key)
                  .join(", ")}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
