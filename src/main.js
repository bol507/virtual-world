import './style.css'
import { Graph } from './math/graph'
import { Point } from './primitives/point'
import { Segment } from './primitives/segment'
import { GraphEditor } from './graph-Editor'
import { Viewport } from './viewport'



const myCanvas = document.querySelector('#myCanvas')
myCanvas.width = 800  
myCanvas.height = 600

const ctx = myCanvas.getContext("2d")

const graphString = localStorage.getItem("graph")
const graphInfo = graphString ? JSON.parse(graphString) : null
const graph = graphInfo ? Graph.load(graphInfo) : new Graph()
const viewport = new Viewport(myCanvas, graph)
const graphEditor = new GraphEditor(viewport, graph)

animate()

function animate() {
  viewport.reset()
  graphEditor.display()
  requestAnimationFrame(animate)
}

function dispose() {
  graph.dispose()
}

function save() {
  localStorage.setItem("graph", JSON.stringify(graph))  
}


window.dispose = dispose;
window.save = save; 