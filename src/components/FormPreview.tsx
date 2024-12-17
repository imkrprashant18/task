import React from "react";

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

type FormPreviewProps = {
  elements: FormElement[];
  layout: Layout;
};

export default function FormPreview({ elements, layout }: FormPreviewProps) {
  const gridClass = {
    single: "grid-cols-1",
    double: "grid-cols-1 md:grid-cols-2",
    triple: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[layout];

  return (
    <form className={`grid ${gridClass} gap-4 bg-white p-4 rounded shadow`}>
      {elements.map((element) => (
        <div key={element.id} className="mb-4">
          <label
            htmlFor={element.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {element.label}
          </label>
          {element.type === "textarea" && (
            <textarea
              id={element.id}
              name={element.id}
              rows={3}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          )}
          {(element.type === "text" ||
            element.type === "number" ||
            element.type === "email") && (
            <input
              type={element.type}
              id={element.id}
              name={element.id}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          )}
          {element.type === "select" && (
            <select
              id={element.id}
              name={element.id}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            >
              {element.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {element.type === "checkbox" && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={element.id}
                name={element.id}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={element.id}
                className="ml-2 block text-sm text-gray-900"
              >
                {element.label}
              </label>
            </div>
          )}
          {element.type === "radio" && (
            <div className="space-y-2">
              {element.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${element.id}-${index}`}
                    name={element.id}
                    value={option}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor={`${element.id}-${index}`}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {elements.length > 0 && (
        <div className="col-span-full">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
