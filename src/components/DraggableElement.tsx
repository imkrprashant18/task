import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FormElement } from "@/type/form-builder";

interface DraggableElementProps {
  element: FormElement;
  index: number;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
  removeElement: (id: string) => void;
}

export default function DraggableElement({
  element,
  index,
  updateElement,
  removeElement,
}: DraggableElementProps) {
  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-2 rounded shadow"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{element.type}</span>
            <button
              onClick={() => removeElement(element.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={element.label}
            onChange={(e) =>
              updateElement(element.id, { label: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
            placeholder="Label"
          />
          {element.type !== "checkbox" && element.type !== "radio" && (
            <input
              type="text"
              value={element.placeholder || ""}
              onChange={(e) =>
                updateElement(element.id, { placeholder: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
              placeholder="Placeholder"
            />
          )}
          {(element.type === "select" || element.type === "radio") && (
            <textarea
              value={element.options?.join("\n") || ""}
              onChange={(e) =>
                updateElement(element.id, {
                  options: e.target.value.split("\n").filter((o) => o.trim()),
                })
              }
              className="w-full p-2 border rounded mb-2"
              placeholder="Options (one per line)"
            />
          )}
        </div>
      )}
    </Draggable>
  );
}
