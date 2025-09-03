import type { HeadlineSettings } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";

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
  if (selectedWordIndex === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20"
    >
      <h3 className="text-white font-medium mb-3">Word Styling</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() =>
            onUpdateSettings(
              `wordStyling.${selectedWordIndex}.highlight`,
              !settings.wordStyling[selectedWordIndex]?.highlight
            )
          }
          className={clsx(
            "p-2 rounded text-sm transition-colors",
            settings.wordStyling[selectedWordIndex]?.highlight
              ? "bg-yellow-500 text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          Highlight
        </button>
        <button
          onClick={() =>
            onUpdateSettings(
              `wordStyling.${selectedWordIndex}.underline`,
              !settings.wordStyling[selectedWordIndex]?.underline
            )
          }
          className={clsx(
            "p-2 rounded text-sm transition-colors",
            settings.wordStyling[selectedWordIndex]?.underline
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          Underline
        </button>
        <button
          onClick={() =>
            onUpdateSettings(
              `wordStyling.${selectedWordIndex}.background`,
              !settings.wordStyling[selectedWordIndex]?.background
            )
          }
          className={clsx(
            "p-2 rounded text-sm transition-colors",
            settings.wordStyling[selectedWordIndex]?.background
              ? "bg-gray-800 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          Background
        </button>
        <button
          onClick={onClearSelection}
          className="p-2 rounded text-sm bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
        >
          Clear
        </button>
      </div>
    </motion.div>
  );
}
