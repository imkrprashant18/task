"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import FormPreview from "../components/FormPreview";

type FormElement = {
  id: string;
  type:
    | "text"
    | "number"
    | "email"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";
  label: string;
  options?: string[];
};

type Layout = "single" | "double" | "triple";

export default function FormBuilder() {
  const [elements, setElements] = useState<FormElement[]>([]);
  const [layout, setLayout] = useState<Layout>("single");

  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addElement = (type: FormElement["type"]) => {
    const newElement: FormElement = {
      id: generateUniqueId(),
      type,
      label: `New ${type} field`,
      options:
        type === "select" || type === "radio"
          ? ["Option 1", "Option 2"]
          : undefined,
    };
    setElements([...elements, newElement]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  const updateElement = (id: string, updates: Partial<FormElement>) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newElements = Array.from(elements);
    const [reorderedItem] = newElements.splice(result.source.index, 1);
    newElements.splice(result.destination.index, 0, reorderedItem);

    setElements(newElements);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-gray-600 font-bold mb-4">Form Builder</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/3">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">Toolbox</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "text",
              "number",
              "email",
              "textarea",
              "select",
              "checkbox",
              "radio",
            ].map((type) => (
              <button
                key={type}
                onClick={() => addElement(type as FormElement["type"])}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              >
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2">Layout</h2>
          <div className="flex gap-2 mb-4">
            {["single", "double", "triple"].map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l as Layout)}
                className={`px-3 py-1 rounded transition-colors ${
                  layout === l
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {l.charAt(0).toUpperCase() + l.slice(1)} Column
              </button>
            ))}
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="form-elements">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 p-4 rounded"
                >
                  {elements.map((element, index) => (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 mb-2 rounded shadow"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{element.type}</span>
                            <button
                              onClick={() => removeElement(element.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                          <input
                            type="text"
                            value={element.label}
                            onChange={(e) =>
                              updateElement(element.id, {
                                label: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Label"
                          />
                          {(element.type === "select" ||
                            element.type === "radio") && (
                            <textarea
                              value={element.options?.join("\n")}
                              onChange={(e) =>
                                updateElement(element.id, {
                                  options: e.target.value
                                    .split("\n")
                                    .filter((o) => o.trim()),
                                })
                              }
                              className="w-full p-2 border rounded"
                              placeholder="Options (one per line)"
                              rows={3}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-semibold mb-2">Form Preview</h2>
          <FormPreview elements={elements} layout={layout} />
        </div>
      </div>
    </div>
  );
}
