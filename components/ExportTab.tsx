import type { HeadlineSettings } from "@/types";
import { motion } from "framer-motion";
import { Check, Code, Download } from "lucide-react";

interface ExportTabProps {
  settings: HeadlineSettings;
  exportCopied: boolean;
  onExportSettings: () => void;
  onGenerateEmbedCode: () => void;
}

export function ExportTab({
  settings,
  exportCopied,
  onExportSettings,
  onGenerateEmbedCode,
}: ExportTabProps) {
  return (
    <motion.div
      key="export"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <button
        onClick={onExportSettings}
        className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Export Settings as JSON
      </button>

      <button
        onClick={onGenerateEmbedCode}
        className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {exportCopied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Code className="w-4 h-4" />
        )}
        {exportCopied ? "Copied!" : "Copy Embed Code"}
      </button>

      <div className="pt-4 border-t border-white/10">
        <h3 className="text-white font-medium mb-2">Current Settings</h3>
        <div className="bg-black/20 rounded-lg p-3 text-xs text-gray-300 font-mono max-h-32 overflow-y-auto">
          <pre>{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </div>
    </motion.div>
  );
}
