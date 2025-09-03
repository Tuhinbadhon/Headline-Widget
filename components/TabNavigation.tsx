import type { ActiveTab } from "@/types";
import clsx from "clsx";
import { Download, Palette, Sparkles, Type, Zap } from "lucide-react";

interface TabNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const tabs = [
  { id: "presets" as const, label: "Presets", icon: Zap },
  { id: "typography" as const, label: "Typography", icon: Type },
  { id: "gradient" as const, label: "Gradient", icon: Palette },
  { id: "effects" as const, label: "Effects", icon: Sparkles },
  { id: "export" as const, label: "Export", icon: Download },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex border-b border-white/10">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              "flex-1 p-3 flex items-center justify-center gap-2 transition-colors",
              activeTab === tab.id
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:bg-white/10"
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:block">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
