"use client";

import { motion } from "framer-motion";
import { BLOCK_CATALOG, type BlockType } from "@/lib/builder/schema";

interface BlockPaletteProps {
  onAdd: (type: BlockType) => void;
}

export default function BlockPalette({ onAdd }: BlockPaletteProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-body text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground px-1 mb-3">
        Adicionar Bloco
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {BLOCK_CATALOG.map((item) => (
          <motion.button
            key={item.type}
            onClick={() => onAdd(item.type)}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-body text-xs font-semibold text-foreground">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
