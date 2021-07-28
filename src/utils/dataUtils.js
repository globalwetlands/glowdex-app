import _ from 'lodash'
import Papa from 'papaparse'

import indicatorLabels from './indicator-labels.json'

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

function mapHabitatLabel(indicatorRow) {
  let habitatLabel = ''
  switch (indicatorRow.habitat) {
    case 'sg':
      habitatLabel = 'Seagrass'
      break
    case 'mg':
      habitatLabel = 'Mangrove'
      break
    case 'sm':
      habitatLabel = 'Saltmarsh'
      break
    default:
      habitatLabel = ''
  }
  return { ...indicatorRow, habitatLabel }
}
export const indicatorColnames = _.chain(indicatorLabels)
  .map(mapHabitatLabel)
  .keyBy('indicator')
  .value()

export const indicatorColnamesKeys = Object.keys(indicatorColnames)
