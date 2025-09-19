import React, { useState } from "react";

export default function ManageWidgetsPanel({ open, onClose, categories, onToggle }) {
  const [active, setActive] = useState(categories[0]?.id || "");

  if (!open) return null;

  const activeCategory = categories.find(c => c.id === active);

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
    open ? "translate-x-0" : "translate-x-full"
  }`}
    >
      <div className="p-4 h-full flex flex-col">
    
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">+ Widgets</h3>
          <button
            className="px-2 py-1 rounded border"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

  
        <div className="flex mb-4 space-x-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-3 py-2 rounded border text-sm ${
                active === c.id ? "bg-indigo-100 border-indigo-500" : "bg-gray-50"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

  
        <div className="flex-1 overflow-auto">
          {activeCategory && activeCategory.widgets.length > 0 ? (
            <div className="flex flex-col gap-2">
              {activeCategory.widgets.map((w) => (
                <label key={w.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={(e) => onToggle(active, w, e.target.checked)}
                  />
                  <span>{w.title}</span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No widgets added to this category</p>
          )}
        </div>


        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-2 border rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
