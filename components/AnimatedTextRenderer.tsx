import type { HeadlineSettings } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedTextRendererProps {
  settings: HeadlineSettings;
  words: string[];
  selectedWordIndex: number | null;
  onWordSelect: (index: number | null) => void;
  getHeadlineStyle: () => React.CSSProperties;
}

export function AnimatedTextRenderer({
  settings,
  words,
  selectedWordIndex,
  onWordSelect,
  getHeadlineStyle,
}: AnimatedTextRendererProps) {
  if (settings.effects.letterAnimation) {
    return (
      <div style={getHeadlineStyle()}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-3">
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={`${wordIndex}-${letterIndex}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (wordIndex * word.length + letterIndex) * 0.05,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div style={getHeadlineStyle()}>
      {words.map((word, index) => {
        const wordStyling = settings.wordStyling[index];
        return (
          <motion.span
            key={index}
            className={clsx(
              "inline-block mr-3 cursor-pointer transition-all duration-200",
              wordStyling?.highlight && "bg-yellow-300 text-black px-1 rounded",
              wordStyling?.underline && "underline",
              wordStyling?.background &&
                "bg-black text-white px-2 py-1 rounded",
              selectedWordIndex === index &&
                "ring-2 ring-blue-400 ring-offset-2"
            )}
            style={{
              color: wordStyling?.color || "inherit",
            }}
            onClick={() =>
              onWordSelect(selectedWordIndex === index ? null : index)
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}
