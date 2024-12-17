"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormElement } from "@/type/form-builder";
import { z } from "zod";

interface ValidationConfigProps {
  elements: FormElement[];
  updateElement: (id: string, updates: Partial<FormElement>) => void;
}

export default function ValidationConfig({
  elements,
  updateElement,
}: ValidationConfigProps) {
  const setValidation = (id: string, validationType: string) => {
    let validation: z.ZodType<any>;

    switch (validationType) {
      case "required":
        validation = z.string().min(1, { message: "This field is required" });
        break;
      case "email":
        validation = z.string().email({ message: "Invalid email address" });
        break;
      case "number":
        validation = z.number({ invalid_type_error: "Must be a number" });
        break;
      default:
        validation = z.string();
    }

    updateElement(id, { validation });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Validation Rules</h3>
      {elements.map((element) => (
        <div key={element.id} className="mb-2">
          <span className="font-medium">{element.label}: </span>
          <select
            onChange={(e) => setValidation(element.id, e.target.value)}
            className="p-1 border rounded"
          >
            <option value="">No validation</option>
            <option value="required">Required</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
          </select>
        </div>
      ))}
    </div>
  );
}
