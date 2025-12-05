import * as XLSX from 'xlsx'

/**
 * Parse .xlsx file and auto-detect Latitude, Longitude, Revenue columns
 * @param {File} file
 * @returns {Promise<Array>} vendors array
 */
export async function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(firstSheet)
        
        if (rows.length === 0) {
          reject(new Error('No data found in Excel file'))
          return
        }
        
        // Auto-detect column names (case-insensitive)
        const firstRow = rows[0]
        const keys = Object.keys(firstRow)
        
        const latKey = keys.find(k => /latitude|lat/i.test(k))
        const lngKey = keys.find(k => /longitude|lng|long/i.test(k))
        const revKey = keys.find(k => /revenue|rev|sales/i.test(k))
        const nameKey = keys.find(k => /name|vendor|title/i.test(k))
        
        if (!latKey || !lngKey) {
          reject(new Error('Could not find Latitude and Longitude columns'))
          return
        }
        
        const vendors = rows.map((row, idx) => ({
          id: idx,
          lat: parseFloat(row[latKey]),
          lng: parseFloat(row[lngKey]),
          revenue: revKey ? parseFloat(row[revKey]) || 0 : 0,
          name: nameKey ? row[nameKey] : `Vendor ${idx + 1}`,
        })).filter(v => !isNaN(v.lat) && !isNaN(v.lng))
        
        resolve(vendors)
      } catch (err) {
        reject(err)
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}
