import type { HeadlineSettings } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Pause, Play, RefreshCw } from "lucide-react";
import React from "react";

interface HeadlinePreviewProps {
  settings: HeadlineSettings;
  isAnimating: boolean;
  headlineRef: React.RefObject<HTMLDivElement | null>;
  onTextChange: (text: string) => void;
  onResetAnimation: () => void;
  onToggleLetterAnimation: () => void;
  children: React.ReactNode;
  selectedWordIndex: number | null;
}

export function HeadlinePreview({
  settings,
  isAnimating,
  headlineRef,
  onTextChange,
  onResetAnimation,
  onToggleLetterAnimation,
  children,
  selectedWordIndex,
}: HeadlinePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={onResetAnimation}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            title="Refresh Animation"
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onToggleLetterAnimation}
            className={clsx(
              "p-2 rounded-lg transition-colors",
              settings.effects.letterAnimation
                ? "bg-blue-500 text-white"
                : "bg-white/10 hover:bg-white/20 text-white"
            )}
            title={
              settings.effects.letterAnimation
                ? "Pause Animation"
                : "Play Animation"
            }
          >
            {settings.effects.letterAnimation ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="min-h-[200px] flex items-center justify-center relative">
        {selectedWordIndex !== null && (
          <div className="absolute top-2 right-2 px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
            <span className="text-xs text-blue-300 font-medium">
              Word Styling Active
            </span>
          </div>
        )}
        <motion.div
          ref={headlineRef}
          key={isAnimating ? "animating" : "static"}
          initial={settings.effects.fadeIn ? { opacity: 0, y: 30 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={clsx(
            "text-center transition-all duration-300",
            selectedWordIndex === null ? "cursor-text" : "cursor-default",
            settings.effects.hoverGlow &&
              "hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          )}
          contentEditable={selectedWordIndex === null}
          suppressContentEditableWarning
          onBlur={(e) => {
            // Only update text if no word is selected to avoid losing word structure
            if (selectedWordIndex === null) {
              onTextChange(e.target.textContent || "");
            }
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
