"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Save, Eye, Pencil, Palette } from "lucide-react";
import { useBuilder } from "@/lib/builder/useBuilder";
import { PageRenderer } from "@/lib/builder/BlockRenderer";
import BlockPalette from "@/components/builder/BlockPalette";
import BlockList from "@/components/builder/BlockList";
import PropsEditor from "@/components/builder/PropsEditor";
import type { BlockType, PageDocument } from "@/lib/builder/schema";

interface InlineBuilderProps {
  /** What kind of content is being built */
  contentType: "event" | "post" | "profile" | "page";
  /** Initial partial config — merged with defaults inside useBuilder */
  initialDoc?: Record<string, any>;
  /** Called when user saves */
  onSave: (doc: PageDocument) => void;
  /** Called when user closes */
  onClose: () => void;
  /** Brand color default */
  brandColor?: string;
}

export default function InlineBuilder({
  contentType,
  initialDoc,
  onSave,
  onClose,
  brandColor = "hsl(0 80% 50%)",
}: InlineBuilderProps) {
  const {
    doc,
    selectedBlockIndex,
    setSelectedBlockIndex,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlockProps,
    updateMeta,
    duplicateBlock,
    isDirty,
  } = useBuilder(initialDoc ? {
    id: initialDoc.id || crypto.randomUUID(),
    slug: initialDoc.slug || "novo",
    title: initialDoc.title || "Novo",
    brandColor: initialDoc.brandColor || brandColor,
    author: initialDoc.author || { name: "Seu Nome" },
    blocks: initialDoc.blocks || [],
    createdAt: initialDoc.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: initialDoc.published ?? false,
  } as PageDocument : undefined);

  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePanel, setActivePanel] = useState<"blocks" | "style" | "list">("blocks");

  const handleSave = useCallback(() => {
    onSave(doc);
  }, [doc, onSave]);

  const contentLabel = {
    event: "Evento",
    post: "Post",
    profile: "Perfil",
    page: "Página",
  }[contentType];

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 bg-background flex flex-col ${
          isFullscreen ? "" : "md:inset-4 md:rounded-2xl md:shadow-2xl md:border md:border-border"
        }`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* ─── TOP BAR ─── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-muted-foreground" />
            <div>
              <h2 className="text-sm font-bold text-foreground">
                {mode === "edit" ? "Editando" : "Pré-visualizando"} {contentLabel}
              </h2>
              <input
                className="text-xs text-muted-foreground bg-transparent border-none outline-none w-48"
                value={doc.title}
                onChange={(e) => updateMeta({ title: e.target.value })}
                placeholder="Título..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Brand color picker */}
            <label className="relative cursor-pointer" title="Cor da marca">
              <div
                className="w-7 h-7 rounded-full border-2 border-border"
                style={{ backgroundColor: doc.brandColor }}
              />
              <input
                type="color"
                className="absolute inset-0 opacity-0 cursor-pointer"
                value={doc.brandColor?.startsWith("#") ? doc.brandColor : "#e53e3e"}
                onChange={(e) => updateMeta({ brandColor: e.target.value })}
              />
            </label>

            {/* Mode toggle */}
            <button
              onClick={() => setMode(mode === "edit" ? "preview" : "edit")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                mode === "preview"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode === "edit" ? <Eye className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
              {mode === "edit" ? "Preview" : "Editar"}
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Salvar
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ─── MAIN AREA ─── */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar (edit mode only) */}
          {mode === "edit" && (
            <motion.div
              className="w-72 border-r border-border bg-card flex flex-col overflow-hidden"
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.3 }}
            >
              {/* Panel tabs */}
              <div className="flex border-b border-border">
                {(["blocks", "list", "style"] as const).map((panel) => (
                  <button
                    key={panel}
                    onClick={() => setActivePanel(panel)}
                    className={`flex-1 py-2 text-xs font-medium transition-colors ${
                      activePanel === panel
                        ? "text-foreground border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {panel === "blocks" ? "Adicionar" : panel === "list" ? "Blocos" : "Estilo"}
                  </button>
                ))}
              </div>

              {/* Panel content */}
              <div className="flex-1 overflow-y-auto p-3">
                {activePanel === "blocks" && (
                  <BlockPalette onAdd={(type: BlockType) => addBlock(type)} />
                )}
                {activePanel === "list" && (
                  <BlockList
                    blocks={doc.blocks}
                    selectedIndex={selectedBlockIndex}
                    onSelect={setSelectedBlockIndex}
                    onRemove={removeBlock}
                    onMove={moveBlock}
                    onDuplicate={duplicateBlock}
                  />
                )}
                {activePanel === "style" && selectedBlockIndex !== null && doc.blocks[selectedBlockIndex] && (
                  <PropsEditor
                    block={doc.blocks[selectedBlockIndex]}
                    onChange={(props) => updateBlockProps(selectedBlockIndex, props)}
                  />
                )}
                {activePanel === "style" && selectedBlockIndex === null && (
                  <div className="text-center text-muted-foreground text-xs py-8">
                    Selecione um bloco no canvas para editar suas propriedades
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Canvas */}
          <div className="flex-1 overflow-y-auto bg-muted/30">
            {doc.blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Palette className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Comece a construir seu {contentLabel.toLowerCase()}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  Adicione blocos pela barra lateral para criar um layout único e personalizado.
                </p>
                <button
                  onClick={() => {
                    setActivePanel("blocks");
                    setMode("edit");
                  }}
                  className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
                >
                  Adicionar primeiro bloco
                </button>
              </div>
            ) : (
              <div
                onClick={(e) => {
                  // Deselect block when clicking empty area
                  if ((e.target as HTMLElement).closest("[data-block-index]") === null) {
                    setSelectedBlockIndex(null);
                  }
                }}
              >
                <PageRenderer
                  document={doc}
                  isEditing={mode === "edit"}
                  onSelectBlock={(i) => {
                    setSelectedBlockIndex(i);
                    setActivePanel("style");
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ─── STATUS BAR ─── */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-card text-xs text-muted-foreground">
          <span>{doc.blocks.length} blocos</span>
          <span>{isDirty ? "• Alterações não salvas" : "✓ Salvo"}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
