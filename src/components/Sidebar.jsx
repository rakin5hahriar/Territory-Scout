import React from 'react'
import { useStore } from '../store'

export default function Sidebar() {
  const vendors = useStore((state) => state.vendors)
  const filteredVendors = useStore((state) => state.filteredVendors)
  const heatmapEnabled = useStore((state) => state.heatmapEnabled)
  const drawingMode = useStore((state) => state.drawingMode)
  const toggleHeatmap = useStore((state) => state.toggleHeatmap)
  const toggleDrawing = useStore((state) => state.toggleDrawing)
  const clearFilter = useStore((state) => state.clearFilter)

  const totalRevenue = filteredVendors.reduce((sum, v) => sum + v.revenue, 0)

  return (
    <div>
      <h2>📊 Analytics</h2>
      
      <div className="stat">
        <div className="stat-label">Total Vendors</div>
        <div className="stat-value">{vendors.length}</div>
      </div>
      
      <div className="stat">
        <div className="stat-label">Selected Vendors</div>
        <div className="stat-value">{filteredVendors.length}</div>
      </div>
      
      <div className="stat">
        <div className="stat-label">Total Revenue</div>
        <div className="stat-value">
          {totalRevenue.toLocaleString('en-BD', { 
            style: 'currency', 
            currency: 'BDT',
            minimumFractionDigits: 0 
          })}
        </div>
      </div>

      <div className="controls">
        <h2>🛠 Controls</h2>
        
        <label className="toggle">
          <input
            type="checkbox"
            checked={heatmapEnabled}
            onChange={toggleHeatmap}
            disabled={vendors.length === 0}
          />
          <span>Show Heatmap</span>
        </label>

        <button 
          onClick={toggleDrawing}
          disabled={vendors.length === 0}
          className={drawingMode ? 'secondary' : ''}
        >
          {drawingMode ? '🔴 Stop Drawing' : '✏️ Draw to Search'}
        </button>

        <button 
          onClick={clearFilter}
          disabled={filteredVendors.length === vendors.length}
          className="secondary"
        >
          🔄 Clear Filter
        </button>
      </div>

      {filteredVendors.length > 0 && filteredVendors.length < vendors.length && (
        <div className="vendor-list">
          <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            Filtered Vendors ({filteredVendors.length})
          </h3>
          {filteredVendors.slice(0, 20).map((v) => (
            <div key={v.id} className="vendor-item">
              <strong>{v.name}</strong>
              <br />
              <small>Revenue: {v.revenue.toLocaleString('en-BD')} BDT</small>
            </div>
          ))}
          {filteredVendors.length > 20 && (
            <div className="vendor-item" style={{ fontStyle: 'italic', color: '#999' }}>
              ... and {filteredVendors.length - 20} more
            </div>
          )}
        </div>
      )}
    </div>
  )
}
