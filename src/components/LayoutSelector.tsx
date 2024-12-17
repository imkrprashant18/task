import React from "react";
import { FormLayout } from "@/type/form-builder";

interface LayoutSelectorProps {
  currentLayout: FormLayout;
  setLayout: (layout: FormLayout) => void;
}

export default function LayoutSelector({
  currentLayout,
  setLayout,
}: LayoutSelectorProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Layout</h3>
      <div className="flex gap-2">
        <button
          onClick={() => setLayout("single")}
          className={`px-3 py-1 rounded ${
            currentLayout === "single"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Single Column
        </button>
        <button
          onClick={() => setLayout("double")}
          className={`px-3 py-1 rounded ${
            currentLayout === "double"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Two Columns
        </button>
        <button
          onClick={() => setLayout("triple")}
          className={`px-3 py-1 rounded ${
            currentLayout === "triple"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Three Columns
        </button>
      </div>
    </div>
  );
}
