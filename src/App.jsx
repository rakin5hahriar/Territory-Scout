import React from 'react'
import MapView from './components/MapView'
import UploadDropzone from './components/UploadDropzone'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <div className="app">
      <header className="topbar">Territory Scout — OpenStreetMap Edition</header>
      <main className="main">
        <div className="left">
          <UploadDropzone />
          <MapView />
        </div>
        <aside className="right">
          <Sidebar />
        </aside>
      </main>
    </div>
  )
}
