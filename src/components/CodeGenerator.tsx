"use client";

import React from "react";
import { FormState } from "@/type/form-builder";

interface CodeGeneratorProps {
  formState: FormState;
}

export default function CodeGenerator({ formState }: CodeGeneratorProps) {
  const generateCode = () => {
    const imports = `import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';`;

    const schema = `const schema = z.object({
${formState.elements
  .map((el) => `  ${el.id}: ${el.validation?.toString() || "z.string()"},`)
  .join("\n")}
});`;

    const component = `
export default function GeneratedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      ${formState.elements
        .map(
          (el) => `
      <div>
        <label htmlFor="${
          el.id
        }" className="block text-sm font-medium text-gray-700">
          ${el.label}
        </label>
        <input
          type="${el.type}"
          id="${el.id}"
          {...register("${el.id}")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="${el.placeholder || ""}"
        />
        {errors.${el.id} && (
          <p className="mt-1 text-sm text-red-600">{errors.${el.id}.message}</p>
        )}
      </div>`
        )
        .join("")}
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
}`;

    return `${imports}\n\n${schema}\n\n${component}`;
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Generated Code</h3>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        <code>{generateCode()}</code>
      </pre>
    </div>
  );
}
