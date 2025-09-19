import React from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts'

export default function WidgetCard({ widget, onRemove }) {
  const renderChart = () => {
    if (!widget || !widget.type) return null

    if (widget.type === 'pie' && Array.isArray(widget.data) && widget.data.length > 0) {
      return (
        <div className="w-full" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={widget.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                paddingAngle={2}
                label
              >
                {widget.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || (['#8884d8','#82ca9d','#ffc658','#ff8042'][index%4])} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )
    }

    if (widget.type === 'bar' && Array.isArray(widget.data) && widget.data.length > 0) {
      return (
        <div className="w-full" style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )
    }

    if (widget.type === 'image' && widget.imageUrl) {
      return (
        <div className="w-full flex items-center justify-center" style={{ height: 180 }}>
          <img src={widget.imageUrl} alt={widget.title} className="max-h-full object-contain" />
        </div>
      )
    }

    if (widget.type === 'empty') {
      return (
        <div className="flex items-center justify-center text-gray-400 italic" style={{ height: 140 }}>
          No Graph data available!
        </div>
      )
    }

   
    return null
  }

  return (
    <div className="relative bg-white border rounded-lg p-4 shadow-sm min-h-[200px]">
      <button
        onClick={onRemove}
        title="Remove widget"
        className="absolute -top-2 -right-2 bg-white border rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
      >
        ✕
      </button>

      <div className="font-medium text-center mb-3">{widget.title}</div>

      {renderChart()}

      {widget.text && (
        <div className="text-sm mt-3 whitespace-pre-line text-gray-600 text-center">
          {widget.text}
        </div>
      )}
    </div>
  )
}
