import Papa from 'papaparse'
export const fetcher = (...args) => fetch(...args).then((res) => res.json())
export const fetcherCsv = (...args) =>
  fetch(...args)
    .then((res) => res.text())
    .then((csvString) => parseCsv({ csvString }))

export const loadGeojson = async ({
  name = 'grid', // country, aoi, wdpa
}) => {
  const dataUrl = `${process.env.PUBLIC_URL}/geojson/${name}.json`
  console.log('Loading geojson data', dataUrl)
  // await delay(1000)
  const data = await fetch(dataUrl).then((res) => res.json())
  return data
}

export const loadSingleLocationData = async (locationID) => {
  console.log(`Loading location ${locationID} data`)
  const dataUrl = `${process.env.PUBLIC_URL}/locations_data/${locationID}.json`
  const data = fetch(dataUrl).then((res) => res.json())
  // await delay(1000)
  return data
}

export async function parseCsv({ csvString }) {
  const { data } = Papa.parse(csvString, { header: true, dynamicTyping: true })
  return data
}

// TODO: check these
export const indicatorColnames = {
  mang_fish_dens: 'Mangrove Fish Density',
  mang_invert_dens: 'mang_invert_dens',
  mang_spec_score: 'mang_spec_score',
  salt_spec_score: 'salt_spec_score',
  seag_spec_score: 'seag_spec_score',
  mang_frag_area_mn_rate: 'Mangrove fragmentation area mean rate',
  mang_frag_area_mn: 'Mangrove fragmentation area mean',
  mang_mean_age: 'Mangrove Mean Age',
  mang_mean_agb_mg_ha: 'Mangrove above-ground biomass',
  mang_mean_SOC: 'Mangrove soil organic carbon',
  mang_mean_height_m: 'Mangrove mean height',
  pressure_seagrass_climate_current: 'Seagrass climate pressure',
  pressure_seagrass_land_current: 'Seagrass land pressure',
  pressure_seagrass_marine_current: 'Seagrass marine pressure',
  pressure_seagrass_climate_rate: 'Seagrass climate rate pressure',
  pressure_seagrass_land_rate: 'Seagrass land rate pressure',
  pressure_seagrass_marine_rate: 'Seagrass marine rate pressure',
  pressure_mangrove_climate_current: 'Mangrove climate pressure',
  pressure_mangrove_land_current: 'Mangrove land pressure',
  pressure_mangrove_marine_current: 'Mangrove marine pressure',
  pressure_mangrove_climate_rate: 'Mangrove climate rate pressure',
  pressure_mangrove_land_rate: 'Mangrove land rate pressure',
  pressure_mangrove_marine_rate: 'Mangrove marine rate pressure',
  pressure_saltmarsh_climate_current: 'Saltmarsh climate pressure',
  pressure_saltmarsh_land_current: 'Saltmarsh land pressure',
  pressure_saltmarsh_marine_current: 'Saltmarsh marine pressure',
  pressure_saltmarsh_climate_rate: 'Saltmarsh climate rate pressure',
  pressure_saltmarsh_land_rate: 'Saltmarsh land rate pressure',
  pressure_saltmarsh_marine_rate: 'Saltmarsh marine rate pressure',
  mang_spec_prop: 'mang_spec_prop',
  salt_spec_prop: 'salt_spec_prop',
  seag_spec_prop: 'seag_spec_prop',
  mang_loss_rate: 'Mangrove loss rate',
  seag_change_rate: 'Seagrass change rate',
}

export const indicatorColnamesKeys = Object.keys(indicatorColnames)
export const indicatorColnamesValues = Object.values(indicatorColnames)
