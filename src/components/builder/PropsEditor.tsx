"use client";

import { useState } from "react";
import type { Block } from "@/lib/builder/schema";
import { BLOCK_CATALOG } from "@/lib/builder/schema";

interface PropsEditorProps {
  block: Block;
  onChange: (newProps: Record<string, unknown>) => void;
}

export default function PropsEditor({ block, onChange }: PropsEditorProps) {
  const catalog = BLOCK_CATALOG.find((c) => c.type === block.type);
  const props = block.props as Record<string, unknown>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{catalog?.icon ?? "?"}</span>
        <h3 className="font-display text-lg font-bold text-foreground tracking-tight">
          {catalog?.label ?? block.type}
        </h3>
      </div>

      {Object.entries(props).map(([key, value]) => (
        <FieldEditor
          key={key}
          label={key}
          value={value}
          onChange={(newValue) => onChange({ [key]: newValue })}
        />
      ))}
    </div>
  );
}

/* ─── Field-level editors ─── */

function FieldEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  // String field
  if (typeof value === "string") {
    const isLong = value.length > 80 || label === "description" || label === "content" || label === "quote";

    return (
      <div>
        <label className="block font-body text-xs font-bold text-muted-foreground mb-1 capitalize">
          {formatLabel(label)}
        </label>
        {isLong ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        )}
      </div>
    );
  }

  // Number field
  if (typeof value === "number") {
    return (
      <div>
        <label className="block font-body text-xs font-bold text-muted-foreground mb-1 capitalize">
          {formatLabel(label)}
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
    );
  }

  // Array field — render as JSON textarea for now
  if (Array.isArray(value)) {
    return <ArrayEditor label={label} value={value} onChange={onChange} />;
  }

  // Object field
  if (typeof value === "object" && value !== null) {
    return (
      <div className="pl-3 border-l-2 border-border space-y-3">
        <span className="block font-body text-xs font-bold text-muted-foreground capitalize">
          {formatLabel(label)}
        </span>
        {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
          <FieldEditor
            key={k}
            label={k}
            value={v}
            onChange={(newV) => onChange({ ...(value as Record<string, unknown>), [k]: newV })}
          />
        ))}
      </div>
    );
  }

  return null;
}

function ArrayEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown[];
  onChange: (v: unknown[]) => void;
}) {
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonStr, setJsonStr] = useState(JSON.stringify(value, null, 2));

  if (jsonMode) {
    return (
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="font-body text-xs font-bold text-muted-foreground capitalize">
            {formatLabel(label)} ({value.length})
          </label>
          <button
            onClick={() => {
              try {
                onChange(JSON.parse(jsonStr));
                setJsonMode(false);
              } catch { /* ignore */ }
            }}
            className="font-body text-xs font-bold text-primary hover:underline"
          >
            Salvar JSON
          </button>
        </div>
        <textarea
          value={jsonStr}
          onChange={(e) => setJsonStr(e.target.value)}
          rows={8}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background font-mono text-xs text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="font-body text-xs font-bold text-muted-foreground capitalize">
          {formatLabel(label)} ({value.length} itens)
        </label>
        <button
          onClick={() => {
            setJsonStr(JSON.stringify(value, null, 2));
            setJsonMode(true);
          }}
          className="font-body text-xs font-bold text-primary hover:underline"
        >
          Editar JSON
        </button>
      </div>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="p-2 rounded-lg border border-border bg-muted/30">
            <span className="font-body text-[10px] font-bold text-muted-foreground">
              #{i + 1}
            </span>
            {typeof item === "object" && item !== null ? (
              <div className="space-y-2 mt-1">
                {Object.entries(item as Record<string, unknown>).map(([k, v]) => (
                  <FieldEditor
                    key={k}
                    label={k}
                    value={v}
                    onChange={(newV) => {
                      const newArray = [...value];
                      newArray[i] = { ...(item as Record<string, unknown>), [k]: newV };
                      onChange(newArray);
                    }}
                  />
                ))}
              </div>
            ) : (
              <FieldEditor label={`item`} value={item} onChange={(newV) => {
                const newArray = [...value];
                newArray[i] = newV;
                onChange(newArray);
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
