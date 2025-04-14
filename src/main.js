import './style.css'
import { Graph } from './math/graph'
import { Point } from './primitives/point'
import { Segment } from './primitives/segment'
import { GraphEditor } from './graph-Editor'



const myCanvas = document.querySelector('#myCanvas')
myCanvas.width = 800  
myCanvas.height = 600

const ctx = myCanvas.getContext("2d")


 
const p1= new Point(200, 200)
const p2= new Point(500, 200)
const p3= new Point(400, 400)
const p4= new Point(100, 300)

const s1 = new Segment(p1, p2)
const s2 = new Segment(p1, p3)
const s3 = new Segment(p1, p4)    


const graph = new Graph([p1, p2, p3, p4],[s1, s2, s3])
const graphEditor = new GraphEditor(myCanvas, graph)

animate()

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
  graphEditor.display()
  requestAnimationFrame(animate)
}

const globalVariables = {
  p1,
  p2,
  p3,
  p4,
  s1,
  s2,
  s3,
  graph,
  graphEditor
};

// Asignar el objeto al objeto global window
window.globalVariables = globalVariables;