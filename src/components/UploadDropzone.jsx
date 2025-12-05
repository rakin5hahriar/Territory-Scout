import React, { useCallback } from 'react'
import { useStore } from '../store'
import { parseExcelFile } from '../utils/parseExcel'

export default function UploadDropzone() {
  const setVendors = useStore((state) => state.setVendors)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleFile = useCallback(async (file) => {
    if (!file || !file.name.match(/\.(xlsx|xls)$/i)) {
      alert('Please upload a valid Excel file (.xlsx or .xls)')
      return
    }
    
    try {
      const vendors = await parseExcelFile(file)
      setVendors(vendors)
      alert(`✅ Loaded ${vendors.length} vendors`)
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }, [setVendors])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }, [handleFile])

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const onFileChange = useCallback((e) => {
    const file = e.target.files[0]
    handleFile(file)
  }, [handleFile])

  return (
    <div
      className={`upload-zone ${isDragging ? 'drag-over' : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => document.getElementById('file-input').click()}
    >
      <p>📂 Drop your <strong>.xlsx</strong> file here or click to browse</p>
      <input
        id="file-input"
        type="file"
        accept=".xlsx,.xls"
        onChange={onFileChange}
      />
    </div>
  )
}
