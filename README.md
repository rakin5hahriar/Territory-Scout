# Territory Scout — Free OpenStreetMap Edition

A professional React + Leaflet application for visualizing vendor data with clustering, heatmaps, and spatial filtering. **100% free, no API key required!**

## 🚀 Quick Start

1. **Install dependencies**
   ```powershell
   npm install
   ```

2. **Run development server**
   ```powershell
   npm run dev
   ```

4. **Open browser** at `http://localhost:5173`

5. **Test the app**:
   - Drag & drop `sample-vendors.xlsx` onto the upload zone
   - See 500 vendor markers clustered on the Dhaka map
   - Toggle **Heatmap** to visualize density
   - Click **Draw to Search** and draw a polygon to filter vendors
   - View filtered revenue in the sidebar

## 📋 Features

- **📂 Excel Upload**: Drag & drop `.xlsx` files with auto-detection of Latitude, Longitude, and Revenue columns
- **📍 Marker Clustering**: Uses `leaflet.markercluster` to group thousands of markers
- **🔥 Heatmap**: Toggle visualization layer using `leaflet.heat`
- **✏️ Draw-to-Search**: Draw polygons/rectangles to filter vendors using `@turf/turf`
- **📊 Real-time Analytics**: Instant revenue calculations for selected regions

## 🛠 Tech Stack

- **React** (Vite)
- **Leaflet** + **react-leaflet** (free map library)
- **OpenStreetMap** tiles (free, no API key)
- **Zustand** (state management)
- **SheetJS (xlsx)** (Excel parsing)
- **Turf.js** (spatial calculations)

## 📝 Usage

1. Upload your vendor `.xlsx` file (must have Latitude and Longitude columns)
2. View clustered markers on the map (centered on Dhaka by default)
3. Toggle **Heatmap** to see intensity visualization
4. Click **Draw to Search** and draw a polygon to filter vendors in that area
5. View filtered revenue and vendor count in the sidebar

## 📦 Build for Production

```powershell
npm run build
```

Output will be in `dist/` folder.

---

**Note**: This version uses OpenStreetMap which is completely free and open-source. No API keys or credit cards required!
