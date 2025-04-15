import { add, scale, subtract } from "../math/utils"
import { Polygon } from "../primitives/polygon"


export class Building {
  constructor(poly, hightCoef = 0.4) {
    this.base = poly
    this.hightCoef = hightCoef
  }

  draw(ctx, viewPoint) {
    const topPoints = this.base.points.map( (p) => 
      add(p, scale( subtract(p, viewPoint) , this.hightCoef) ) 
    )
    const ceiling = new Polygon(topPoints)

    const sides = []
    for (let i = 0 ; i < this.base.points.length; i++) {
      const nextI = (i + 1) % this.base.points.length
      const poly = new Polygon([
        this.base.points[i],
        this.base.points[nextI],
        topPoints[nextI],
        topPoints[i]
      ])
      sides.push(poly)
    }

    sides.sort( 
      (a,b) => b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint)  
    )

    this.base.draw(ctx, { fill: "white", stroke: "#AAA" })
    for (const side of sides) {
      side.draw(ctx, { fill: "white", stroke: "#AAA" })
    }
    ceiling.draw(ctx, { fill: "white", stroke: "#AAA" })
  
  }
}