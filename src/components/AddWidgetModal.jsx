import React, { useState } from "react";

export default function AddWidgetModal({ open, onClose, onAdd, categoryId }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("text");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Widget name required");

    let widget = { id: "w-" + Date.now(), title, type };

    if (type === "text") {
      widget.text = content;
    } else if (type === "pie" || type === "bar") {
      alert("Chart types are not supported yet. Please use Text type.");
      return;
    }

    onAdd(categoryId, widget);
    setTitle(""); 
    setContent(""); 
    setType("text");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border">
        <h3 className="text-lg font-semibold mb-4">Add New Widget</h3>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mb-1">Widget Name</label>
          <input
            className="w-full px-3 py-2 border rounded mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block text-sm font-medium mb-1">Widget Type</label>
          <select
            className="w-full px-3 py-2 border rounded mb-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="pie">Pie Chart</option>
            <option value="bar">Bar Chart</option>
          </select>

         
          {type === "text" ? (
            <>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded mb-3"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </>
          ) : (
            <p className="text-gray-500 text-sm mb-3">
              Chart type selected. Only text input is allowed for now.
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button type="button" className="px-3 py-2 border rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
