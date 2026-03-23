"use client";

import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, Copy, Trash2, GripVertical } from "lucide-react";
import { BLOCK_CATALOG } from "@/lib/builder/schema";
import type { Block } from "@/lib/builder/schema";

interface BlockListProps {
  blocks: Block[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onMove: (from: number, to: number) => void;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
}

export default function BlockList({
  blocks,
  selectedIndex,
  onSelect,
  onMove,
  onDuplicate,
  onRemove,
}: BlockListProps) {
  if (blocks.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-body text-sm text-muted-foreground">
          Nenhum bloco adicionado.
        </p>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Use a paleta acima para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <h3 className="font-body text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground px-1 mb-3">
        Blocos ({blocks.length})
      </h3>
      {blocks.map((block, i) => {
        const catalog = BLOCK_CATALOG.find((c) => c.type === block.type);
        const isSelected = selectedIndex === i;

        return (
          <motion.div
            key={`${block.type}-${i}`}
            className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-transparent hover:border-border hover:bg-muted/50"
            }`}
            onClick={() => onSelect(i)}
            layout
          >
            <GripVertical className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />

            <span className="text-sm flex-shrink-0">{catalog?.icon ?? "?"}</span>
            <span className="font-body text-xs font-semibold text-foreground flex-1 truncate">
              {catalog?.label ?? block.type}
            </span>

            {isSelected && (
              <div className="flex items-center gap-0.5">
                <button
                  onClick={(e) => { e.stopPropagation(); if (i > 0) onMove(i, i - 1); }}
                  disabled={i === 0}
                  className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-all"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); if (i < blocks.length - 1) onMove(i, i + 1); }}
                  disabled={i === blocks.length - 1}
                  className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-all"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDuplicate(i); }}
                  className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onRemove(i); }}
                  className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
