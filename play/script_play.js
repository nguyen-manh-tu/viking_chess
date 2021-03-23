const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
var selected= false

const cellElements = document.querySelectorAll('.cell')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
var circleTurn=false
restartButton.addEventListener('click',restart())

disableall()
enable_X()
function handleClick(e){
  cell=e.target
  placeMark(cell)
  
}
function placeMark(cell){
  if(selected==false){
    cell.id="selected"
    show_path(cell)
    if(!cell.classList.contains("king")){
      turn_on_illegal_square()
    }
    if(circleTurn==false){
    hover(X_CLASS)
    enable_X()
    }
    else{
    hover(CIRCLE_CLASS)
    enable_Circle()
    }
    selected= !selected
    
  }
  else{

    const selectedcell=document.getElementById("selected")
    
    selectedcell.id=""
    
    if(cell.classList.contains(X_CLASS)|| cell.classList.contains(CIRCLE_CLASS)|| cell.classList.contains('king')){
      
      unshow_path()
      cell.id="selected"
      show_path(cell)
      if(!cell.classList.contains("king")){
        turn_on_illegal_square()
      }
      if(circleTurn==false){
        hover(X_CLASS)
        enable_X()
        }
        else{
        hover(X_CLASS)
        enable_Circle()
        }
    }
   
    
     else {
       unshow_path()
       if(circleTurn==false){
         hover(X_CLASS)
          
         if(selectedcell.classList.contains('king')){
          cell.classList.add(X_CLASS)
          cell.classList.add('king')
         }
         else{
         cell.classList.add(X_CLASS)
         }
         selectedcell.classList.remove(X_CLASS)
         selectedcell.classList.remove('king')
         disableall()
         enable_Circle()
         hover(CIRCLE_CLASS)
         selected=!selected
         swapturn()
         if(!endgame()){
          clean_Circle()
        }
        else{
          winningMessageElement.style.display="block"
          if(blackwin()){
            winningMessageTextElement.innerHTML="X wins"
          }
          if(whitewin()){
            winningMessageTextElement.innerHTML="circle wins"
          }
          
        }
    


        }
 
     
   
     else {
          hover(CIRCLE_CLASS)
          cell.classList.add(CIRCLE_CLASS)
          selectedcell.classList.remove(CIRCLE_CLASS)
          disableall()
          enable_X()
          hover(X_CLASS)
          selected=!selected
          swapturn()
          if(!endgame()){
            clean_X()
          }
          else{
            winningMessageElement.style.display="block"
            if(blackwin()){
              winningMessageTextElement.innerHTML="X wins"
            }
            if(whitewin()){
              winningMessageTextElement.innerHTML="circle wins"
            }
            
          }
  
     }
     }
        
        
    
    

    
  }

}

function hover(symbol){
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  board.classList.add(symbol)
}

function swapturn(){
  circleTurn =!circleTurn
  
}


function col(i){
  return (i%11)
}
function ro(i){
  return Math.floor(i/11)

}
function index(u,arr){
  l=arr.length
  for(i=0;i<l;i++){
    if(arr[i]==u){
      return i
    }
  }
}
function show_path(cell){
  disableall()
  
  const i=index(cell,cellElements)
  
  const column=col(i)
  const row= ro(i)
  const h=(row+1)*11
  const h1=row*11
  
  
  for(u = i+1; u< h ;u++) {
    if(isempty(cellElements[u])){
    
    
    cellElements[u].classList.add('grey')
    cellElements[u].addEventListener('click',handleClick)
    cellElements[u].style.cursor="pointer"
    }
    else{
      break
    }
  }
  for(u = i-1; u>h1-1;u--) {
    if(isempty(cellElements[u])){
    
    
    cellElements[u].classList.add('grey')
    cellElements[u].addEventListener('click',handleClick)
    cellElements[u].style.cursor="pointer"
    }
    else{
      break
    }
  }
  for(u = i+11; u< 121 ;u+=11) {
    if(isempty(cellElements[u])){
    
    
    cellElements[u].classList.add('grey')
    cellElements[u].addEventListener('click',handleClick)
    cellElements[u].style.cursor="pointer"
  }
    else{
      break
    }
  }
  for(u = i-11; u>0 ;u-=11) {
    if(isempty(cellElements[u])){
    
    
    cellElements[u].classList.add('grey')
    cellElements[u].addEventListener('click',handleClick)
    cellElements[u].style.cursor="pointer"
    }
    else{
      break
    }
  }
    

}



function unshow_path() {
  l=cellElements.length
  for(i=0;i<l;i++){
    if (cellElements[i].classList.contains("grey")){
      cellElements[i].classList.remove("grey")
    }
  }
}



function disableall(){
  l=cellElements.length
  for(i=0;i<l;i++){
    cellElements[i].removeEventListener('click',handleClick)
    cellElements[i].style.cursor="not-allowed"
  }
}
function enable_X(){
  l=cellElements.length
  for(i=0;i<l;i++){
    if(cellElements[i].classList.contains(X_CLASS)){
    cellElements[i].addEventListener('click',handleClick)
    cellElements[i].style.cursor="pointer"
  }


}
}
function enable_Circle(){
  l=cellElements.length
  for(i=0;i<l;i++){
    if(cellElements[i].classList.contains(CIRCLE_CLASS)){
    cellElements[i].addEventListener('click',handleClick)
    cellElements[i].style.cursor="pointer"
  }


}
}

function turn_on_illegal_square(){
   
  cellElements[0].removeEventListener('click',handleClick)
  cellElements[0].classList.remove('grey')
  cellElements[0].style.cursor="not-allowed"
  
  cellElements[10].removeEventListener('click',handleClick)
  cellElements[10].classList.remove('grey')
  cellElements[10].style.cursor="not-allowed"
  
  cellElements[110].removeEventListener('click',handleClick)
  cellElements[110].classList.remove('grey')
  cellElements[110].style.cursor="not-allowed"
  
  cellElements[120].removeEventListener('click',handleClick)
  cellElements[120].classList.remove('grey')
  cellElements[120].style.cursor="not-allowed"

  cellElements[60].removeEventListener('click',handleClick)
  cellElements[60].classList.remove('grey')
  cellElements[60].style.cursor="not-allowed"
  
    

}


function isempty(cell){
  if(cell.classList.contains(X_CLASS)|| cell.classList.contains(CIRCLE_CLASS)|| cell.classList.contains('king')){
    return false
  }
  else{
    return true
  }


}




function unshow_path() {
  l=cellElements.length
  for(i=0;i<l;i++){
    if (cellElements[i].classList.contains("grey")){
      cellElements[i].removeEventListener('click',handleClick)
      cellElements[i].style.cursor="not-allowed"
      cellElements[i].classList.remove("grey")
    }
  }
}

function killable(i){
  if(cellElements[i].classList.contains('king')==true){
    return false
  }

  else if(cellElements[i].classList.contains(X_CLASS)==true){
    if(col(i)==0 || col(i)==10){
      if (cellElements[i+11].classList.contains(CIRCLE_CLASS)==true && cellElements[i-11].classList.contains(CIRCLE_CLASS)==true){
      return true
      }
      else{
        return false
      }
    }
    else if (ro(i)==0|| ro(i)==10){
      if (cellElements[i-1].classList.contains(CIRCLE_CLASS)==true && cellElements[i+1].classList.contains(CIRCLE_CLASS)==true){
      return true
      }
      else{
      return false
      }

    }
    else {
      if (cellElements[i+11].classList.contains(CIRCLE_CLASS)==true && cellElements[i-11].classList.contains(CIRCLE_CLASS)==true){
        return true
      }
      else if (cellElements[i-1].classList.contains(CIRCLE_CLASS)==true && cellElements[i+1].classList.contains(CIRCLE_CLASS)==true){
        return true
      }
      else{
        return false
      }
    }
  }
  
  else if(cellElements[i].classList.contains(CIRCLE_CLASS)==true){
      if(col(i)==0 || col(i)==10){
        if (cellElements[i+11].classList.contains(X_CLASS)==true && cellElements[i-11].classList.contains(X_CLASS)==true){
        return true
        }
        else{
          return false
        }
      }
      else if (ro(i)==0|| ro(i)==10){
        if (cellElements[i-1].classList.contains(X_CLASS)==true && cellElements[i+1].classList.contains(X_CLASS)==true){
        return true
        }
        else{
        return false
        }
  
      }
      else {
        if (cellElements[i+11].classList.contains(X_CLASS)==true && cellElements[i-11].classList.contains(X_CLASS)==true){
          return true
        }
        else if (cellElements[i-1].classList.contains(X_CLASS)==true && cellElements[i+1].classList.contains(X_CLASS)==true){
          return true
        }
        else{
          return false
        }
      }
  }
  else {
    
  return false
  }
  
}
  

function clean_X(){
 l=cellElements.length
 for(i=0;i<l;i++){
   if(killable(i)==true && cellElements[i].classList.contains(X_CLASS)){
     
       cellElements[i].classList.remove(X_CLASS)
     
    
   }

 }


}

function clean_Circle(){
  l=cellElements.length
  for(i=0;i<l;i++){
    if(killable(i)==true && cellElements[i].classList.contains(CIRCLE_CLASS)){
      
        cellElements[i].classList.remove(CIRCLE_CLASS)
      
     
    }
 
  }
 
 
 }
 











function blackwin(){
  const kingcell=document.getElementsByClassName("cell x king")
  const kingposition=index(kingcell[0],cellElements)
  if(kingposition==0 || kingposition==10 || kingposition==109 || kingposition==120 ){
    return true
    }
  else{
    return false
  }

  
}
function whitewin(){
  const kingcell=document.getElementsByClassName("cell x king")
  const kingposition=index(kingcell[0],cellElements)
  if(col(kingposition)==0 || col(kingposition)==10 || ro(kingposition)==0 || ro(kingposition)==10){
    return false
  }
  else if(cellElements[kingposition+1].classList.contains(CIRCLE_CLASS) && cellElements[kingposition-1].classList.contains(CIRCLE_CLASS)&& cellElements[kingposition-11].classList.contains(CIRCLE_CLASS) && cellElements[kingposition+11].classList.contains(CIRCLE_CLASS)){
    return true
  }
  else {
    return false
  }
}

function endgame(){
  if(blackwin() || whitewin()){
    return true
  }
  else{
    return false
  }
}

function restart(){
  l=cellElements.length
  for(i=0;i<l;i++){
    cellElements[i].classList.remove(X_CLASS)
    cellElements[i].classList.remove(CIRCLE_CLASS)
    cellElements[i].classList.remove('king')
  }
  winningMessageElement.style.display="none"
  cellElements[3].classList.add(CIRCLE_CLASS)
  cellElements[4].classList.add(CIRCLE_CLASS)
  cellElements[5].classList.add(CIRCLE_CLASS)
  cellElements[6].classList.add(CIRCLE_CLASS)
  cellElements[7].classList.add(CIRCLE_CLASS)
  cellElements[16].classList.add(CIRCLE_CLASS)
  

  cellElements[33].classList.add(CIRCLE_CLASS)
  cellElements[44].classList.add(CIRCLE_CLASS)
  cellElements[55].classList.add(CIRCLE_CLASS)
  cellElements[66].classList.add(CIRCLE_CLASS)
  cellElements[77].classList.add(CIRCLE_CLASS)
  cellElements[56].classList.add(CIRCLE_CLASS)
  

  
  cellElements[43].classList.add(CIRCLE_CLASS)
  cellElements[54].classList.add(CIRCLE_CLASS)
  cellElements[65].classList.add(CIRCLE_CLASS)
  cellElements[76].classList.add(CIRCLE_CLASS)
  cellElements[87].classList.add(CIRCLE_CLASS)
  cellElements[64].classList.add(CIRCLE_CLASS)
  
  
  cellElements[113].classList.add(CIRCLE_CLASS)
  cellElements[114].classList.add(CIRCLE_CLASS)
  cellElements[115].classList.add(CIRCLE_CLASS)
  cellElements[116].classList.add(CIRCLE_CLASS)
  cellElements[117].classList.add(CIRCLE_CLASS)
  cellElements[104].classList.add(CIRCLE_CLASS)
  

  cellElements[58].classList.add(X_CLASS)
  cellElements[59].classList.add(X_CLASS)
  cellElements[60].classList.add(X_CLASS)
  cellElements[60].classList.add('king')
  cellElements[61].classList.add(X_CLASS)
  cellElements[62].classList.add(X_CLASS)
  cellElements[38].classList.add(X_CLASS)
  cellElements[48].classList.add(X_CLASS)
  cellElements[49].classList.add(X_CLASS)
  cellElements[50].classList.add(X_CLASS)
  cellElements[70].classList.add(X_CLASS)
  cellElements[71].classList.add(X_CLASS)
  cellElements[72].classList.add(X_CLASS)
  cellElements[82].classList.add(X_CLASS)
  

  
  unshow_path()
  circleTurn=false
  selected=false
  cellElements.forEach(cell=> {
    cell.addEventListener('click',handleClick)
  })
}