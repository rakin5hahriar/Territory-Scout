import { create } from 'zustand'

export const useStore = create((set) => ({
  vendors: [],
  filteredVendors: [],
  heatmapEnabled: false,
  drawingMode: false,
  
  setVendors: (vendors) => set({ vendors, filteredVendors: vendors }),
  setFilteredVendors: (filteredVendors) => set({ filteredVendors }),
  toggleHeatmap: () => set((state) => ({ heatmapEnabled: !state.heatmapEnabled })),
  toggleDrawing: () => set((state) => ({ drawingMode: !state.drawingMode })),
  clearFilter: () => set((state) => ({ filteredVendors: state.vendors })),
}))
