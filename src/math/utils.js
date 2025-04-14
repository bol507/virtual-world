export const getNearestPoint = (location, points, trheshold = Number.MAX_SAFE_INTEGER) => {  
  let minDist = Number.MAX_SAFE_INTEGER
  let nearest = null
  for (const point of points) {
    const dist = distance(point, location)
    if (dist < minDist && dist < trheshold) {
      minDist = dist
      nearest = point
    }
  }
  return nearest
}

function distance(point1, point2) {
  return Math.hypot(point1.x - point2.x, point1.y - point2.y)
}