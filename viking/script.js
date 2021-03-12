const X_CLASS = 'black'
const CIRCLE_CLASS = 'circle'

const cellElements = document.querySelectorAll('[data-cell]')

let circleTurn
cellElements.forEach(cell=>{
  cell.addEventListener('click',handleClick,{Once: true})
})
function handleClick(e) {
  const cell1 = e.target
  
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  swapTurns()
 
  }

function placeMark(cell currentClass) {
  if(cell.className=="cell"){
    cell.classList.add(currentClass)

  }else{
    cell.classList.remove(currentClass)
  }
}

function swapTurns() {
  circleTurn = !circleTurn
}


