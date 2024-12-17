"use client";

import { useState } from 'react';
import { FormState, FormElement, FormLayout } from "@/type/form-builder";
import { v4 as uuidv4 } from 'uuid';

export function useFormBuilder() {
  const [formState, setFormState] = useState<FormState>({
    elements: [],
    layout: 'single',
  });

  const addElement = (type: FormElement['type']) => {
    const newElement: FormElement = {
      id: uuidv4(),
      type,
      label: `New ${type} field`,
    };
    setFormState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
  };

  const removeElement = (id: string) => {
    setFormState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id),
    }));
  };

  const updateElement = (id: string, updates: Partial<FormElement>) => {
    setFormState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
  };

  const setLayout = (layout: FormLayout) => {
    setFormState(prev => ({ ...prev, layout }));
  };

  const reorderElements = (startIndex: number, endIndex: number) => {
    const result = Array.from(formState.elements);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setFormState(prev => ({
      ...prev,
      elements: result,
    }));
  };

  return {
    formState,
    addElement,
    removeElement,
    updateElement,
    setLayout,
    reorderElements,
  };
}

