"use client";

import type {
  ActiveTab,
  ColorPickerType,
  ExportData,
  HeadlineSettings,
} from "@/types";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { HeadlinePreview } from "./HeadlinePreview";
import {
  AnimatedTextRenderer,
  EffectsTab,
  ExportTab,
  GradientTab,
  PresetsTab,
  TabNavigation,
  TypographyTab,
  WordStylingPanel,
} from "./index";

const gradientDirections = {
  right: "to right",
  left: "to left",
  down: "to bottom",
  up: "to top",
};

export default function HeadlineWidget() {
  const [settings, setSettings] = useState<HeadlineSettings>({
    text: "Create Stunning Headlines",
    fontSize: 48,
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    gradient: {
      enabled: true,
      direction: "right",
      colors: ["#667eea", "#764ba2"],
    },
    effects: {
      fadeIn: true,
      hoverGlow: true,
      letterAnimation: false,
      textShadow: false,
      outline: false,
    },
    wordStyling: {},
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>("presets");
  const [showColorPicker, setShowColorPicker] = useState<ColorPickerType>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(
    null
  );
  const [exportCopied, setExportCopied] = useState(false);
  const [animationTimer, setAnimationTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [animationKey, setAnimationKey] = useState(0);
  const headlineRef = useRef<HTMLDivElement>(null);

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (animationTimer) {
        clearTimeout(animationTimer);
      }
    };
  }, [animationTimer]);

  const updateSettings = (path: string, value: unknown) => {
    setSettings((prev) => {
      const keys = path.split(".");
      const updated = { ...prev };
      let current: Record<string, unknown> | unknown[] = updated as Record<
        string,
        unknown
      >;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (Array.isArray(current[key as keyof typeof current])) {
          (current as Record<string, unknown>)[key] = [
            ...(current[key as keyof typeof current] as unknown[]),
          ];
        } else {
          (current as Record<string, unknown>)[key] = {
            ...((current as Record<string, unknown>)[key] as Record<
              string,
              unknown
            >),
          };
        }
        current = (current as Record<string, unknown>)[key] as
          | Record<string, unknown>
          | unknown[];
      }

      const lastKey = keys[keys.length - 1];
      if (Array.isArray(current) && !isNaN(Number(lastKey))) {
        // Handle array index updates
        (current as unknown[])[Number(lastKey)] = value;
      } else {
        // Handle object property updates
        (current as Record<string, unknown>)[lastKey] = value;
      }

      return updated;
    });
  };

  const getHeadlineStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      fontSize: `${settings.fontSize}px`,
      fontFamily: settings.fontFamily,
      fontWeight: settings.fontWeight,
      lineHeight: 1.2,
    };

    if (settings.gradient.enabled) {
      // Ensure colors is an array and has at least one color
      const colors = Array.isArray(settings.gradient.colors)
        ? settings.gradient.colors
        : ["#667eea", "#764ba2"];

      baseStyle.backgroundImage = `linear-gradient(${
        gradientDirections[settings.gradient.direction]
      }, ${colors.join(", ")})`;
      baseStyle.WebkitBackgroundClip = "text";
      baseStyle.WebkitTextFillColor = "transparent";
      baseStyle.backgroundClip = "text";
    }

    if (settings.effects.textShadow) {
      baseStyle.textShadow = "0 4px 20px rgba(0,0,0,0.3)";
    }

    if (settings.effects.outline) {
      baseStyle.WebkitTextStroke = "2px rgba(255,255,255,0.3)";
    }

    return baseStyle;
  };

  const words = settings.text.split(" ");

  const exportSettings = () => {
    const exportData: ExportData = {
      settings,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "headline-settings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateEmbedCode = () => {
    const embedCode = `<div style="font-size: ${
      settings.fontSize
    }px; font-family: ${settings.fontFamily}; font-weight: ${
      settings.fontWeight
    }; ${
      settings.gradient.enabled
        ? (() => {
            const colors = Array.isArray(settings.gradient.colors)
              ? settings.gradient.colors
              : ["#667eea", "#764ba2"];
            return `background-image: linear-gradient(${
              gradientDirections[settings.gradient.direction]
            }, ${colors.join(
              ", "
            )}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;`;
          })()
        : ""
    }">${settings.text}</div>`;

    navigator.clipboard.writeText(embedCode);
    setExportCopied(true);
    setTimeout(() => setExportCopied(false), 2000);
  };

  const resetAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 100);
  };

  const handleToggleLetterAnimation = () => {
    setSettings((prev) => {
      const newLetterAnimation = !prev.effects.letterAnimation;

      // Always increment animation key to force re-render
      setAnimationKey((current) => current + 1);

      // If turning on animation, set a timer to automatically turn it off
      if (newLetterAnimation) {
        // Clear any existing timer
        if (animationTimer) {
          clearTimeout(animationTimer);
        }

        // Calculate animation duration based on text length
        const textLength = prev.text.length;
        const baseDelay = 0.03; // Updated to match our new timing
        const totalAnimationTime = (textLength * baseDelay + 1) * 1000; // Convert to milliseconds, add 1s buffer

        // Set timer to automatically turn off animation
        const timer = setTimeout(() => {
          setSettings((currentSettings) => ({
            ...currentSettings,
            effects: {
              ...currentSettings.effects,
              letterAnimation: false,
            },
          }));
          setAnimationKey((current) => current + 1);
          setAnimationTimer(null);
        }, totalAnimationTime);

        setAnimationTimer(timer);
      } else {
        // If turning off animation manually, clear the timer
        if (animationTimer) {
          clearTimeout(animationTimer);
          setAnimationTimer(null);
        }
      }

      return {
        ...prev,
        effects: {
          ...prev.effects,
          letterAnimation: newLetterAnimation,
        },
      };
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "presets":
        return <PresetsTab onUpdateSettings={updateSettings} />;
      case "typography":
        return (
          <TypographyTab
            settings={settings}
            onUpdateSettings={updateSettings}
          />
        );
      case "gradient":
        return (
          <GradientTab
            settings={settings}
            showColorPicker={showColorPicker}
            onUpdateSettings={updateSettings}
            onShowColorPicker={setShowColorPicker}
          />
        );
      case "effects":
        return (
          <EffectsTab settings={settings} onUpdateSettings={updateSettings} />
        );
      case "export":
        return (
          <ExportTab
            settings={settings}
            exportCopied={exportCopied}
            onExportSettings={exportSettings}
            onGenerateEmbedCode={generateEmbedCode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="md:text-4xl text-3xl font-bold text-white mb-2">
            Headline Widget Creator
          </h1>
          <p className="text-gray-300">
            Create stunning, customizable headlines with modern effects
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Preview Section */}
          <div className="lg:col-span-2">
            <HeadlinePreview
              settings={settings}
              isAnimating={isAnimating}
              headlineRef={headlineRef}
              onTextChange={(text) => updateSettings("text", text)}
              onResetAnimation={resetAnimation}
              onToggleLetterAnimation={handleToggleLetterAnimation}
              selectedWordIndex={selectedWordIndex}
            >
              <AnimatedTextRenderer
                settings={settings}
                words={words}
                selectedWordIndex={selectedWordIndex}
                onWordSelect={setSelectedWordIndex}
                getHeadlineStyle={getHeadlineStyle}
                animationKey={animationKey}
              />
            </HeadlinePreview>

            <WordStylingPanel
              selectedWordIndex={selectedWordIndex}
              settings={settings}
              onUpdateSettings={updateSettings}
              onClearSelection={() => setSelectedWordIndex(null)}
            />
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 relative"
            >
              <div className="overflow-hidden rounded-2xl">
                <TabNavigation
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>

              <div className="p-5">{renderTabContent()}</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
