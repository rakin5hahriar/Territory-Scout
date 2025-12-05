import React, { useRef, useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet.markercluster'
import 'leaflet.heat'
import 'leaflet-draw'
import * as turf from '@turf/turf'
import { useStore } from '../store'

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function MapController() {
  const map = useMap()
  const vendors = useStore((state) => state.vendors)
  const heatmapEnabled = useStore((state) => state.heatmapEnabled)
  const drawingMode = useStore((state) => state.drawingMode)
  const setFilteredVendors = useStore((state) => state.setFilteredVendors)
  
  const clusterGroupRef = useRef(null)
  const heatLayerRef = useRef(null)
  const drawnItemsRef = useRef(null)
  const drawControlRef = useRef(null)

  // Setup marker clustering and heatmap
  useEffect(() => {
    if (!map || vendors.length === 0) return

    // Clear existing layers
    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current)
    }
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current)
    }

    if (heatmapEnabled) {
      // Show heatmap
      const heatData = vendors.map(v => [v.lat, v.lng, 0.5])
      heatLayerRef.current = L.heatLayer(heatData, {
        radius: 25,
        blur: 35,
        maxZoom: 17,
      }).addTo(map)
    } else {
      // Show clustered markers
      clusterGroupRef.current = L.markerClusterGroup()
      
      vendors.forEach((vendor) => {
        const marker = L.marker([vendor.lat, vendor.lng])
          .bindPopup(`<strong>${vendor.name}</strong><br/>Revenue: ${vendor.revenue.toLocaleString('en-BD')} BDT`)
        clusterGroupRef.current.addLayer(marker)
      })
      
      map.addLayer(clusterGroupRef.current)
    }

    return () => {
      if (clusterGroupRef.current) map.removeLayer(clusterGroupRef.current)
      if (heatLayerRef.current) map.removeLayer(heatLayerRef.current)
    }
  }, [map, vendors, heatmapEnabled])

  // Setup drawing controls
  useEffect(() => {
    if (!map) return

    if (!drawnItemsRef.current) {
      drawnItemsRef.current = new L.FeatureGroup()
      map.addLayer(drawnItemsRef.current)

      drawControlRef.current = new L.Control.Draw({
        draw: {
          polygon: {
            allowIntersection: false,
            shapeOptions: {
              color: '#1976d2',
              fillOpacity: 0.3,
            }
          },
          rectangle: {
            shapeOptions: {
              color: '#1976d2',
              fillOpacity: 0.3,
            }
          },
          circle: false,
          marker: false,
          polyline: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: drawnItemsRef.current,
          remove: true,
        }
      })

      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer
        drawnItemsRef.current.clearLayers()
        drawnItemsRef.current.addLayer(layer)

        // Filter vendors inside drawn shape
        const geoJSON = layer.toGeoJSON()
        const polygon = turf.polygon(geoJSON.geometry.coordinates)
        
        const filtered = vendors.filter((v) => {
          const point = turf.point([v.lng, v.lat])
          return turf.booleanPointInPolygon(point, polygon)
        })
        
        setFilteredVendors(filtered)
      })

      map.on(L.Draw.Event.DELETED, () => {
        setFilteredVendors(vendors)
      })
    }

    if (drawingMode) {
      if (!map.hasLayer(drawControlRef.current)) {
        map.addControl(drawControlRef.current)
      }
    } else {
      if (map.hasLayer(drawControlRef.current)) {
        map.removeControl(drawControlRef.current)
      }
    }

  }, [map, drawingMode, vendors, setFilteredVendors])

  return null
}

export default function MapView() {
  return (
    <div className="map-container">
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={12}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController />
      </MapContainer>
    </div>
  )
}
