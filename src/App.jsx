import React, { useState } from "react"
import "./App.css"
import AddWidgetModal from "./components/AddWidgetModal"
import ManageWidgetsPanel from "./components/ManageWidgetsPanel"
import WidgetCard from "./components/WidgetCard"

const initialData = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "w-1",
          title: "Cloud Accounts",
          type: "pie",
          text: "Connected: 2\nNot Connected: 0",
          data: [
            { name: "Connected", value: 2, color: "#16A34A" },
            { name: "Not Connected", value: 0, color: "#EF4444" }
          ]
        },
        {
          id: "w-2",
          title: "Cloud Account Risk Assessment",
          type: "pie",
          text: "Random risk summary",
          data: [
            { name: "Failed", value: 1689, color: "#EF4444" },
            { name: "Warning", value: 810, color: "#F59E0B" },
            { name: "Not available", value: 104, color: "#9CA3AF" },
            { name: "Passed", value: 7256, color: "#10B981" }
          ]
        }
      ]
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        { id: "w-4", title: "Top 5 Namespace Specific Alerts", type: "empty", text: "" },
        { id: "w-5", title: "Workload Alerts", type: "empty", text: "" }
      ]
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        {
          id: "w-6",
          title: "Image Risk Assessment",
          type: "bar",
          text: "1470 vulnerabilities",
          data: [
            { name: "Critical", value: 3 },
            { name: "High", value: 80 },
            { name: "Medium", value: 300 },
            { name: "Low", value: 1087 }
          ]
        },
        {
          id: "w-7",
          title: "Image Security Issues",
          type: "bar",
          text: "2 total images",
          data: [
            { name: "Critical", value: 1 },
            { name: "High", value: 12 },
            { name: "Medium", value: 56 },
            { name: "Low", value: 120 }
          ]
        }
      ]
    }
  ],
  library: [
    {
      id: "tmpl-cloudAccounts",
      title: "Cloud Accounts",
      type: "pie",
      data: [
        { name: "Connected", value: 2, color: "#16A34A" },
        { name: "Not Connected", value: 0, color: "#EF4444" }
      ]
    },
    {
      id: "tmpl-risk",
      title: "Cloud Account Risk Assessment",
      type: "pie",
      data: [
        { name: "Failed", value: 1689, color: "#EF4444" },
        { name: "Warning", value: 810, color: "#F59E0B" },
        { name: "Not available", value: 104, color: "#9CA3AF" },
        { name: "Passed", value: 7256, color: "#10B981" }
      ]
    },
    {
      id: "tmpl-imageRisk",
      title: "Image Risk Assessment",
      type: "bar",
      data: [
        { name: "Critical", value: 3 },
        { name: "High", value: 80 },
        { name: "Medium", value: 300 },
        { name: "Low", value: 1087 }
      ]
    }
  ]
}

function App() {
  const [data, setData] = useState(initialData)
  const [manageOpen, setManageOpen] = useState(false)
  const [addOpen, setAddOpen] = useState({ open: false, categoryId: null })
  const [search, setSearch] = useState("")

  function addWidget(categoryId, widget) {
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === categoryId ? { ...c, widgets: [...c.widgets, widget] } : c
      )
    }))
  }

  function handleToggleWidget(categoryId, widget, checked) {
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(c => {
        if (c.id !== categoryId) return c
        if (checked) {
          const exists = c.widgets.some(w => w.title === widget.title && w.type === widget.type)
          return exists ? c : { ...c, widgets: [...c.widgets, { ...widget, id: `w-${Date.now()}` }] }
        } else {
          return { ...c, widgets: c.widgets.filter(w => !(w.title === widget.title && w.type === widget.type)) }
        }
      })
    }))
  }

  function removeWidget(categoryId, widgetId) {
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === categoryId ? { ...c, widgets: c.widgets.filter(w => w.id !== widgetId) } : c
      )
    }))
  }


return (
  <div className="app-fullscreen bg-gray-100">
    <header className="flex items-center justify-between bg-white p-4 rounded shadow mx-6 my-4">
      <h1 className="text-2xl font-semibold">CNAPP Dashboard</h1>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-2 py-1 border rounded w-48 text-sm"
        />
        <button
          onClick={() => setManageOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded text-sm"
        >
          + Widgets
        </button>
      </div>
    </header>

 
    <main className="app-main mx-6 space-y-6">
      {data.categories.map(cat => (
        <section key={cat.id} className="bg-white p-4 rounded shadow section-full">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">{cat.name}</h2>
            <div className="text-sm text-gray-500">{cat.widgets.length} widgets</div>
          </div>

      
          <div className="widgets-row">
            {cat.widgets
              .filter(w => w.title.toLowerCase().includes(search.toLowerCase()))
              .map(w => (
                <div key={w.id} 
     className="widget-card bg-white p-4 rounded shadow 
                sm:min-w-[320px] sm:max-w-[420px] sm:flex-none 
                w-full">
  <WidgetCard widget={w} onRemove={() => removeWidget(cat.id, w.id)} />
</div>

              ))}

         
           <div
  onClick={() => setAddOpen({ open: true, categoryId: cat.id })}
  className="widget-card flex items-center justify-center border-2 border-dashed rounded cursor-pointer min-h-[150px] text-gray-500
             sm:min-w-[320px] sm:max-w-[420px] sm:flex-none 
             w-full"
>
  + Add Widget
</div>

          </div>
        </section>
      ))}
    </main>

    
    <ManageWidgetsPanel
      open={manageOpen}
      onClose={() => setManageOpen(false)}
      categories={data.categories}
      templates={data.library}
      onToggle={handleToggleWidget}
    />

    <AddWidgetModal
      open={addOpen.open}
      categoryId={addOpen.categoryId}
      onClose={() => setAddOpen({ open: false, categoryId: null })}
      onAdd={addWidget}
    />
  </div>
)


}

export default App
