// src/store.js
import { useState, useEffect } from "react";
import initial from "./data/dashboard.json";

/**
 * Lightweight ID generator:
 * - Uses crypto.randomUUID() if available (modern browsers)
 * - Falls back to a short pseudo-random id otherwise.
 */
const generateId = () => {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch (e) {}
  return "id-" + Math.random().toString(36).slice(2, 9);
};

// safe clone helper (structuredClone if available)
const clone = (obj) =>
  typeof structuredClone !== "undefined" ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));

/**
 * A simple hook that stores dashboard data and provides actions.
 * Persisted into localStorage under "dashboard-v2".
 */
export function useDashboard() {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem("dashboard-v2");
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem("dashboard-v2", JSON.stringify(data));
  }, [data]);

  function addWidget(categoryId, widget) {
    setData((d) => {
      const copy = clone(d);
      const cat = copy.categories.find((c) => c.id === categoryId);
      if (!cat) return copy;
      cat.widgets.push({ ...widget, id: widget.id || generateId() });
      return copy;
    });
  }

  function removeWidget(categoryId, widgetId) {
    setData((d) => {
      const copy = clone(d);
      const cat = copy.categories.find((c) => c.id === categoryId);
      if (!cat) return copy;
      cat.widgets = cat.widgets.filter((w) => w.id !== widgetId);
      return copy;
    });
  }

  function toggleTemplateInCategory(categoryId, templateId, checked) {
    setData((d) => {
      const copy = clone(d);
      const cat = copy.categories.find((c) => c.id === categoryId);
      if (!cat) return copy;
      const tpl = copy.availableTemplates.find((t) => t.id === templateId);
      if (!tpl) return copy;
      if (checked) {
        // add a clone if not already present (by title)
        const exists = cat.widgets.some((w) => w.title === tpl.title);
        if (!exists) {
          const w = { ...tpl, id: generateId() };
          cat.widgets.push(w);
        }
      } else {
        // remove by title match
        cat.widgets = cat.widgets.filter((w) => w.title !== tpl.title);
      }
      return copy;
    });
  }

  return {
    data,
    actions: { addWidget, removeWidget, toggleTemplateInCategory },
  };
}
