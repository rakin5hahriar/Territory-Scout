import * as XLSX from 'xlsx'

// Generate sample vendor data for Dhaka
const generateSampleVendors = (count = 500) => {
  const vendors = []
  const dhakaLat = 23.8103
  const dhakaLng = 90.4125
  
  const areas = [
    { name: 'Mirpur', lat: 23.8223, lng: 90.3654 },
    { name: 'Gulshan', lat: 23.7808, lng: 90.4158 },
    { name: 'Dhanmondi', lat: 23.7461, lng: 90.3742 },
    { name: 'Uttara', lat: 23.8759, lng: 90.3795 },
    { name: 'Motijheel', lat: 23.7338, lng: 90.4178 },
  ]
  
  for (let i = 0; i < count; i++) {
    const area = areas[Math.floor(Math.random() * areas.length)]
    vendors.push({
      Name: `${area.name} Vendor ${i + 1}`,
      Latitude: area.lat + (Math.random() - 0.5) * 0.05,
      Longitude: area.lng + (Math.random() - 0.5) * 0.05,
      Revenue: Math.floor(Math.random() * 500000) + 50000,
    })
  }
  
  return vendors
}

const vendors = generateSampleVendors(500)
const worksheet = XLSX.utils.json_to_sheet(vendors)
const workbook = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendors')
XLSX.writeFile(workbook, 'sample-vendors.xlsx')

console.log('✅ Generated sample-vendors.xlsx with 500 vendors')
