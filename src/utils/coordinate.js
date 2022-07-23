const getDistance = (point1, point2) => {
  var a = 6378137.0 // 赤道半径
  var b = 6356752.314140356 // 極半径
  var e2 = 0.00669438002301188 // 第一離心率^2
  var a1e2 = 6335439.32708317 // 赤道上の子午線曲率半径
  console.log(point1,point2);
  const lat1 = (point1.latitude || point1.lat) * Math.PI / 180
  const lng1 = (point1.longitude || point1.lng) * Math.PI / 180
  const lat2 = (point2.latitude || point2.lat) * Math.PI / 180
  const lng2 = (point2.longitude || point2.lng) * Math.PI / 180

  const deltaLat = lat1 - lat2
  const deltaLng = lng1 - lng2
  const avgLat = (lat1 + lat2) / 2.0

  const sinLat = Math.sin(avgLat)
  const W2 = 1.0 - e2 * (sinLat * sinLat)

  // 子午線曲率半径M
  const M = a1e2 / (Math.sqrt(W2) * W2)
  // 卯酉線曲率半径
  const N = a / Math.sqrt(W2)

  const t1 = M * deltaLat
  const t2 = N * Math.cos(avgLat) * deltaLng
  console.log("1",lng1,"2",lng2);
  return Math.sqrt((t1 * t1) + (t2 * t2))
}

export {
  getDistance
}