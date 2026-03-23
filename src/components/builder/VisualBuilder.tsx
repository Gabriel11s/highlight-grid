"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Pencil, Download, Upload, Palette, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useBuilder } from "@/lib/builder/useBuilder";
import { PageRenderer } from "@/lib/builder/BlockRenderer";
import BlockPalette from "./BlockPalette";
import BlockList from "./BlockList";
import PropsEditor from "./PropsEditor";
import type { PageDocument } from "@/lib/builder/schema";

interface VisualBuilderProps {
  initialDocument?: PageDocument;
  onSave?: (doc: PageDocument) => void;
}

export default function VisualBuilder({ initialDocument, onSave }: VisualBuilderProps) {
  const {
    doc,
    selectedBlockIndex,
    setSelectedBlockIndex,
    isDirty,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlockProps,
    updateMeta,
    duplicateBlock,
    exportJSON,
    importJSON,
  } = useBuilder(initialDocument);

  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showExport, setShowExport] = useState(false);

  const selectedBlock = selectedBlockIndex !== null ? doc.blocks[selectedBlockIndex] : null;

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* ─── SIDEBAR ─── */}
      <AnimatePresence>
        {sidebarOpen && mode === "edit" && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-80 flex-shrink-0 border-r border-border bg-card flex flex-col h-full"
          >
            {/* Sidebar header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-black tracking-tight text-foreground">
                  Builder
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Brand color picker */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={doc.brandColor}
                    onChange={(e) => updateMeta({ brandColor: e.target.value })}
                    className="flex-1 px-2 py-1 rounded-md border border-border bg-background font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="hsl(35 90% 55%)"
                  />
                </div>
                <div
                  className="w-8 h-8 rounded-lg border border-border flex-shrink-0"
                  style={{ backgroundColor: doc.brandColor }}
                />
              </div>
            </div>

            {/* Sidebar content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {selectedBlock ? (
                <>
                  <button
                    onClick={() => setSelectedBlockIndex(null)}
                    className="flex items-center gap-1 font-body text-xs font-bold text-primary hover:underline"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Voltar
                  </button>
                  <PropsEditor
                    block={selectedBlock}
                    onChange={(newProps) => {
                      if (selectedBlockIndex !== null) {
                        updateBlockProps(selectedBlockIndex, newProps);
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <BlockPalette onAdd={(type) => addBlock(type)} />
                  <div className="border-t border-border pt-4">
                    <BlockList
                      blocks={doc.blocks}
                      selectedIndex={selectedBlockIndex}
                      onSelect={setSelectedBlockIndex}
                      onMove={moveBlock}
                      onDuplicate={duplicateBlock}
                      onRemove={removeBlock}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ─── MAIN AREA ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            {!sidebarOpen && mode === "edit" && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <input
              value={doc.title}
              onChange={(e) => updateMeta({ title: e.target.value })}
              className="font-display text-sm font-bold text-foreground bg-transparent border-none focus:outline-none"
              placeholder="Título do perfil"
            />
            {isDirty && (
              <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mode toggle */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setMode("edit")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-body text-xs font-bold transition-all ${
                  mode === "edit"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <Pencil className="w-3 h-3" />
                Editar
              </button>
              <button
                onClick={() => setMode("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-body text-xs font-bold transition-all ${
                  mode === "preview"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <Eye className="w-3 h-3" />
                Preview
              </button>
            </div>

            {/* Export/Import */}
            <button
              onClick={() => setShowExport(!showExport)}
              className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              title="Export/Import JSON"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Save */}
            {onSave && (
              <button
                onClick={() => onSave(doc)}
                className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-body text-xs font-bold hover:opacity-90 transition-all"
              >
                Salvar
              </button>
            )}
          </div>
        </div>

        {/* Export modal */}
        <AnimatePresence>
          {showExport && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-border bg-muted/30 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-bold text-muted-foreground">
                    JSON do documento
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(exportJSON());
                      }}
                      className="font-body text-xs font-bold text-primary hover:underline"
                    >
                      Copiar
                    </button>
                    <label className="font-body text-xs font-bold text-primary hover:underline cursor-pointer">
                      Importar
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            file.text().then(importJSON);
                            setShowExport(false);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <textarea
                  readOnly
                  value={exportJSON()}
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background font-mono text-xs text-foreground resize-y"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto">
          {mode === "preview" ? (
            <PageRenderer document={doc} />
          ) : (
            <PageRenderer
              document={doc}
              isEditing
              onSelectBlock={setSelectedBlockIndex}
            />
          )}

          {/* Empty state */}
          {doc.blocks.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-32">
              <span className="text-5xl mb-4">🧩</span>
              <h3 className="font-display text-xl font-bold text-foreground tracking-tight mb-2">
                Comece a construir
              </h3>
              <p className="font-body text-sm text-muted-foreground max-w-sm text-center">
                Adicione blocos pela barra lateral para montar seu perfil ou anúncio personalizado.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
