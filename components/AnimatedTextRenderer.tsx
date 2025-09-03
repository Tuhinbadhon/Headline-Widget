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
  animationKey?: number;
}

export function AnimatedTextRenderer({
  settings,
  words,
  selectedWordIndex,
  onWordSelect,
  getHeadlineStyle,
  animationKey = 0,
}: AnimatedTextRendererProps) {
  if (settings.effects.letterAnimation) {
    return (
      <div style={getHeadlineStyle()}>
        {words.map((word, wordIndex) => {
          const wordStyling = settings.wordStyling[wordIndex];
          const isGradientEnabled = settings.gradient.enabled;

          // Create dynamic styles for this word
          const wordStyles: React.CSSProperties = {};

          // Handle background styling (always takes priority)
          if (wordStyling?.background) {
            wordStyles.backgroundColor = "#000000";
            wordStyles.color = wordStyling?.color || "#ffffff"; // Allow custom color or default to white
            wordStyles.padding = "2px 8px";
            wordStyles.borderRadius = "4px";
            wordStyles.backgroundClip = "unset";
            wordStyles.WebkitBackgroundClip = "unset";
            wordStyles.WebkitTextFillColor = wordStyling?.color || "#ffffff";
          }
          // Handle highlight styling
          else if (wordStyling?.highlight) {
            wordStyles.backgroundColor = "#fde047";
            wordStyles.color = wordStyling?.color || "#000000"; // Allow custom color or default to black
            wordStyles.padding = "1px 4px";
            wordStyles.borderRadius = "4px";
            wordStyles.backgroundClip = "unset";
            wordStyles.WebkitBackgroundClip = "unset";
            wordStyles.WebkitTextFillColor = wordStyling?.color || "#000000";
          }
          // Handle custom color only (no background/highlight)
          else if (
            wordStyling?.color &&
            wordStyling?.color !== "#ffffff" &&
            !isGradientEnabled
          ) {
            wordStyles.color = wordStyling.color;
          }
          // For gradient text with custom color (no background/highlight)
          else if (
            wordStyling?.color &&
            wordStyling?.color !== "#ffffff" &&
            isGradientEnabled
          ) {
            wordStyles.backgroundImage = `linear-gradient(to right, ${wordStyling.color}, ${wordStyling.color})`;
            wordStyles.WebkitBackgroundClip = "text";
            wordStyles.backgroundClip = "text";
            wordStyles.WebkitTextFillColor = "transparent";
          }

          // Handle underline styling (apply to all styled words)
          if (wordStyling?.underline) {
            wordStyles.textDecoration = "underline";
            wordStyles.textDecorationThickness = "2px";
            wordStyles.textUnderlineOffset = "2px";
          }

          // Important: For words with no styling, ensure they inherit properly
          else if (
            !wordStyling?.background &&
            !wordStyling?.highlight &&
            !wordStyling?.color
          ) {
            // If gradient is enabled globally, let the word inherit the gradient
            if (isGradientEnabled) {
              // Don't override anything, let it inherit from parent
            } else {
              // For non-gradient text, ensure the word has proper color
              wordStyles.color = "inherit";
            }
          }

          return (
            <span
              key={wordIndex}
              className={clsx(
                "inline-block mr-3 cursor-pointer transition-all duration-200",
                selectedWordIndex === wordIndex &&
                  "ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent"
              )}
              style={wordStyles}
              onClick={() =>
                onWordSelect(selectedWordIndex === wordIndex ? null : wordIndex)
              }
            >
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${animationKey}-${wordIndex}-${letterIndex}`}
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
          );
        })}
      </div>
    );
  }

  return (
    <div style={getHeadlineStyle()}>
      {words.map((word, index) => {
        const wordStyling = settings.wordStyling[index];
        const isGradientEnabled = settings.gradient.enabled;

        // Create dynamic styles for this word
        const wordStyles: React.CSSProperties = {};

        // Handle background styling (always takes priority)
        if (wordStyling?.background) {
          wordStyles.backgroundColor = "#000000";
          wordStyles.color = wordStyling?.color || "#ffffff"; // Allow custom color or default to white
          wordStyles.padding = "2px 8px";
          wordStyles.borderRadius = "4px";
          wordStyles.backgroundClip = "unset";
          wordStyles.WebkitBackgroundClip = "unset";
          wordStyles.WebkitTextFillColor = wordStyling?.color || "#ffffff";
        }
        // Handle highlight styling
        else if (wordStyling?.highlight) {
          wordStyles.backgroundColor = "#fde047";
          wordStyles.color = wordStyling?.color || "#000000"; // Allow custom color or default to black
          wordStyles.padding = "1px 4px";
          wordStyles.borderRadius = "4px";
          wordStyles.backgroundClip = "unset";
          wordStyles.WebkitBackgroundClip = "unset";
          wordStyles.WebkitTextFillColor = wordStyling?.color || "#000000";
        }
        // Handle custom color (only if no background/highlight and no gradient)
        else if (
          wordStyling?.color &&
          wordStyling?.color !== "#ffffff" &&
          !isGradientEnabled
        ) {
          wordStyles.color = wordStyling.color;
        }
        // For gradient text with custom color, we need special handling
        else if (
          wordStyling?.color &&
          wordStyling?.color !== "#ffffff" &&
          isGradientEnabled
        ) {
          // Create a custom gradient using the word's color
          wordStyles.backgroundImage = `linear-gradient(to right, ${wordStyling.color}, ${wordStyling.color})`;
          wordStyles.WebkitBackgroundClip = "text";
          wordStyles.backgroundClip = "text";
          wordStyles.WebkitTextFillColor = "transparent";
        }

        // Handle underline styling (apply to all styled words)
        if (wordStyling?.underline) {
          wordStyles.textDecoration = "underline";
          wordStyles.textDecorationThickness = "2px";
          wordStyles.textUnderlineOffset = "2px";
        }

        // Important: For words with no styling, ensure they inherit properly
        else if (
          !wordStyling?.background &&
          !wordStyling?.highlight &&
          !wordStyling?.color
        ) {
          // If gradient is enabled globally, let the word inherit the gradient
          if (isGradientEnabled) {
            // Don't override anything, let it inherit from parent
          } else {
            // For non-gradient text, ensure the word has proper color
            wordStyles.color = "inherit";
          }
        }

        return (
          <motion.span
            key={index}
            className={clsx(
              "inline-block mr-3 cursor-pointer transition-all duration-200",
              selectedWordIndex === index &&
                "ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent"
            )}
            style={wordStyles}
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
