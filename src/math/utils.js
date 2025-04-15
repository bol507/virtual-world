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

export const translate = (location, angle, offset) => {
  return new Point(location.x + offset * Math.cos(angle), location.y + offset * Math.sin(angle))
}

export const angle = (p) => {
  return Math.atan2(p.y, p.x)
}

export const getIntersection = (A,B,C,D ) => {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)

  if (bottom != 0) {
    const t = tTop / bottom
    const u = uTop / bottom
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      }
    }
  }
  return null
}

const lerp = (a, b, t) => {
  return a + (b - a) * t
}

export const getRanomColor = () => {
  const hue = 290 + Math.random() * 260;
  return "hsl(" + hue + ", 100%, 50%)"
}

export const average = (p1, p2) => {
  return new Point( (p1.x + p2.x)/2 , (p1.y + p2.y)/2 )
}