import { Point } from "../primitives/point"
import { Segment } from "../primitives/segment"

export class Graph {
  constructor(points = [], segments= [],) {
    this.points = points
    this.segments = segments
  }

  addPoint(point) {
    this.points.push(point)
  }
  
  containsPoint(point) {
    return this.points.find( (p) => p.equals(point))
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point)
      return true
    }
    
    return false
  }

  addSegment(segment) {
    this.segments.push(segment)
  }

  containsSegment(segment) {
    return this.segments.find( (s) => s.equals(segment))
  }

  tryAddSegment(segment) {
    if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
      this.addSegment(segment)
      return true
    }
    
    return false
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1)
  }

  getSegmentsWithPoint(point) {
    const segments = []
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segments.push(seg)
      }
    }
    return segments
  }

  static load(info) {
    const points = info.points.map((p) => new Point(p.x, p.y))
    const segments = info.segments.map((s) => new Segment(
      points.find((p) => p.equals(s.p1)),
      points.find((p) => p.equals(s.p2))  
    ))
    
    return new Graph(points, segments)
  }

  hash() {
    return JSON.stringify({
      points: this.points.map(p => ({ x: p.x, y: p.y })),
      segments: this.segments.map(s => ({
        p1: { x: s.p1.x, y: s.p1.y },
        p2: { x: s.p2.x, y: s.p2.y }
      }))
    })
  }

  hasData() {
    return this.points.length > 0 && this.segments.length > 0
  }

  removePoint(point) {
    const segments = this.getSegmentsWithPoint(point)
    for (const seg of segments) {
      this.removeSegment(seg)
    }
    const index = this.points.indexOf(point)
    if (index !== -1) {
      this.points.splice(index, 1)
    }
    
  }

  dispose() {
    console.log('Cleaning graph');
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx)
    }

    for (const point of this.points) {
      point.draw(ctx)
    }
  }
}