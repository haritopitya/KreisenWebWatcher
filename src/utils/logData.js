import { formatData } from './logDataFormatter'

const formatLogData = (logData) => {
  for (const snapshot of logData) {
    const {
      speedometerData: { airSpeed } = {},
      altimeterData: { altitude } = {},
      empennageData: { elevatorDisplay, rudderDisplay } = {},
    } = snapshot

    snapshot.speedometerData.airSpeed =
      airSpeed !== -1 ? (airSpeed / 10).toFixed(1) : '---'

    snapshot.altimeterData.altitude =
      altitude !== -1 ? (altitude / 1000).toFixed(1) : '---'

    snapshot.empennageData.elevatorDisplay =
      elevatorDisplay !== -1 ? elevatorDisplay - 3 : '---'

    snapshot.empennageData.rudderDisplay =
      rudderDisplay !== -1 ? rudderDisplay - 3 : '---'
  }

  return logData
}

const flattenLogdata = (logData, basename = '') => {
  let flattenedLogdata = {}

  if (logData) {
    for (const key in logData) {
      if (key === 'rawData') continue
      if (key === 'calibrationData') continue

      if (typeof logData[key] === 'object') {
        Object.assign(flattenedLogdata, flattenLogdata(logData[key], basename + key + '/'))
      } else {
        flattenedLogdata[basename + key] = formatData(basename + key, logData[key])
      }
    }
  }
  return flattenedLogdata
}

const getAircraftLatLng = (flattenedLogData) => {
  const latLng = {}
  if (flattenedLogData) {
    latLng.latitude = parseFloat(flattenedLogData['dataStationData/latitude'].value)
    latLng.longitude = parseFloat(flattenedLogData['dataStationData/longitude'].value)
    latLng.bearing = parseFloat(flattenedLogData['dataStationData/trueCourse'].value) || 0;
  }
  return latLng
}

export {
  formatLogData,
  flattenLogdata,
  getAircraftLatLng,
}
