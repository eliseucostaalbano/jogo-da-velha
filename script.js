const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('quadro')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('botao-Restart')
const winningMessageElement = document.getElementById('mensagem-Vitoriosa')
let circleTurn


comecarGame()

restartButton.addEventListener('click',comecarGame)

function comecarGame() {
circleTurn = false
cellElements.forEach(cell => {
cell.classList.remove(X_CLASS)
cell.classList.remove(O_CLASS)
cell.removeEventListener('click', lidarClick)
cell.addEventListener('click',lidarClick,{once:true})
})
aplicarClasseHover()
winningMessageElement.classList.remove('show')
}


function  lidarClick(e) {
 const cell = e.target
 const currentClass = circleTurn ? O_CLASS : X_CLASS
  colocarMarca(cell,currentClass)
  if (checarVitoria(currentClass)){
    fimJogo(false)
    } else if (umEmpate()) {
      fimJogo(true)
    } else {
       trocaTurno()
       aplicarClasseHover()
    }
    
}
function fimJogo(draw) {
   if (draw) {
      winningMessageTextElement.innerText = 'Empate!'
   } else {
  winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Venceu!`
   }
   winningMessageElement.classList.add('show')
}

function umEmpate() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}

function colocarMarca(cell,currentClass) {
  cell.classList.add(currentClass)
}

function trocaTurno() {
   circleTurn = !circleTurn
}

function aplicarClasseHover() {
   board.classList.remove(X_CLASS)
   board.classList.remove(O_CLASS)
  if (circleTurn) {
   board.classList.add(O_CLASS)
  } else {
   board.classList.add(X_CLASS)
  }
}

function checarVitoria(currentClass){
   return WINNING_COMBINATIONS.some(combination => {
   return combination.every(index =>{
   return cellElements[index].classList.contains(currentClass)
   })
   })
}
