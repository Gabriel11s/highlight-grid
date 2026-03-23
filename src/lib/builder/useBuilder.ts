import { useState, useCallback } from "react";
import type { Block, BlockType, PageDocument } from "./schema";
import { BLOCK_CATALOG } from "./schema";

export function useBuilder(initial?: PageDocument) {
  const [doc, setDoc] = useState<PageDocument>(
    initial ?? {
      id: crypto.randomUUID(),
      slug: "novo-perfil",
      title: "Novo Perfil",
      brandColor: "hsl(35 90% 55%)",
      author: { name: "Seu Nome" },
      blocks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: false,
    }
  );

  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const touch = useCallback(() => {
    setIsDirty(true);
    setDoc((prev) => ({ ...prev, updatedAt: new Date().toISOString() }));
  }, []);

  const addBlock = useCallback(
    (type: BlockType, atIndex?: number) => {
      const catalogItem = BLOCK_CATALOG.find((c) => c.type === type);
      if (!catalogItem) return;

      const newBlock = { type, props: { ...catalogItem.defaultProps } } as Block;

      setDoc((prev) => {
        const blocks = [...prev.blocks];
        const insertAt = atIndex ?? blocks.length;
        blocks.splice(insertAt, 0, newBlock);
        return { ...prev, blocks };
      });
      touch();
      setSelectedBlockIndex(atIndex ?? doc.blocks.length);
    },
    [doc.blocks.length, touch]
  );

  const removeBlock = useCallback(
    (index: number) => {
      setDoc((prev) => {
        const blocks = prev.blocks.filter((_, i) => i !== index);
        return { ...prev, blocks };
      });
      touch();
      setSelectedBlockIndex(null);
    },
    [touch]
  );

  const moveBlock = useCallback(
    (from: number, to: number) => {
      setDoc((prev) => {
        const blocks = [...prev.blocks];
        const [moved] = blocks.splice(from, 1);
        blocks.splice(to, 0, moved);
        return { ...prev, blocks };
      });
      touch();
      setSelectedBlockIndex(to);
    },
    [touch]
  );

  const updateBlockProps = useCallback(
    (index: number, newProps: Record<string, unknown>) => {
      setDoc((prev) => {
        const blocks = [...prev.blocks];
        blocks[index] = { ...blocks[index], props: { ...blocks[index].props, ...newProps } } as Block;
        return { ...prev, blocks };
      });
      touch();
    },
    [touch]
  );

  const updateMeta = useCallback(
    (updates: Partial<Pick<PageDocument, "title" | "slug" | "brandColor" | "author" | "published">>) => {
      setDoc((prev) => ({ ...prev, ...updates }));
      touch();
    },
    [touch]
  );

  const duplicateBlock = useCallback(
    (index: number) => {
      setDoc((prev) => {
        const blocks = [...prev.blocks];
        const clone = JSON.parse(JSON.stringify(blocks[index])) as Block;
        blocks.splice(index + 1, 0, clone);
        return { ...prev, blocks };
      });
      touch();
      setSelectedBlockIndex(selectedBlockIndex !== null ? selectedBlockIndex + 1 : null);
    },
    [selectedBlockIndex, touch]
  );

  const exportJSON = useCallback(() => {
    return JSON.stringify(doc, null, 2);
  }, [doc]);

  const importJSON = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json) as PageDocument;
      setDoc(parsed);
      setIsDirty(false);
      setSelectedBlockIndex(null);
    } catch {
      console.error("Invalid JSON");
    }
  }, []);

  return {
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
  };
}
