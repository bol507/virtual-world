import { Point } from "../primitives/point"

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

const distance = (point1, point2) => {
  return Math.hypot(point1.x - point2.x, point1.y - point2.y)
}

export const add = (point1, point2) => {
  return new Point(point1.x + point2.x, point1.y + point2.y)
}

export const subtract = (point1, point2) => {
  return new Point(point1.x - point2.x, point1.y - point2.y)
}

export const scale = (point, factor) => {
  return new Point(point.x * factor, point.y * factor)
}