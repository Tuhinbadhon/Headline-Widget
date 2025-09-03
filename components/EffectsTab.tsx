import type { HeadlineSettings } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { MousePointer } from "lucide-react";

interface EffectsTabProps {
  settings: HeadlineSettings;
  onUpdateSettings: (path: string, value: unknown) => void;
}

const effects = [
  { key: "fadeIn", label: "Fade In Animation" },
  { key: "hoverGlow", label: "Hover Glow Effect" },
  { key: "letterAnimation", label: "Letter-by-Letter Animation" },
  { key: "textShadow", label: "Text Shadow" },
  { key: "outline", label: "Text Outline" },
];

export function EffectsTab({ settings, onUpdateSettings }: EffectsTabProps) {
  return (
    <motion.div
      key="effects"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="space-y-3">
        {effects.map((effect) => (
          <div key={effect.key} className="flex items-center justify-between">
            <label className="text-white text-sm font-medium">
              {effect.label}
            </label>
            <button
              onClick={() =>
                onUpdateSettings(
                  `effects.${effect.key}`,
                  !settings.effects[effect.key as keyof typeof settings.effects]
                )
              }
              className={clsx(
                "w-12 h-6 rounded-full transition-colors relative",
                settings.effects[effect.key as keyof typeof settings.effects]
                  ? "bg-blue-500"
                  : "bg-gray-600"
              )}
            >
              <div
                className={clsx(
                  "w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5",
                  settings.effects[effect.key as keyof typeof settings.effects]
                    ? "translate-x-6"
                    : "translate-x-0.5"
                )}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/10">
        <label className="block text-white text-sm font-medium mb-2">
          Word Styling
        </label>
        <p className="text-gray-300 text-xs mb-3">
          Click on words in the preview to style them individually
        </p>
        <div className="flex items-center gap-2 text-gray-400">
          <MousePointer className="w-4 h-4" />
          <span className="text-xs">Click words above to customize</span>
        </div>
      </div>
    </motion.div>
  );
}
