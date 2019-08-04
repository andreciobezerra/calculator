//Math Functions

const add = (a,b) => a+b
const sub = (a,b) => a-b
const mult = (a,b)=> a*b
const div = (a,b)=>  a/b
const percent = (a) => a/100

//Get Elements

const display = document.querySelector("#display")
const btns = document.querySelectorAll(".button")
const clear = document.querySelector("#clear")
const erase = document.querySelector("#erase")
const equal = document.querySelector("#equal-button")

//Mouse events

btns.forEach((btn)=> btn.addEventListener("click",toDisplay))
clear.addEventListener('click', toClear)
erase.addEventListener('click',backspace)
equal.addEventListener('click', operate)

//Keyboars events
window.addEventListener("keydown", keyPress)

function toDisplay() {  
  display.textContent=display.textContent.concat(this.getAttribute("value"))
}

function keyPress(event){
  if(event.key==='Escape') toClear()
  if(event.key==='Backspace') backspace()
  if(event.key==='Enter') operate()
  if((/[-\+*/%]/).test(event.key)){
    display.textContent = display.textContent.concat(` ${event.key} `)
    return  
  }
  if((/\d|[.]/).test(event.key))
    display.textContent = display.textContent.concat(`${event.key}`)
}

function operate(){
  let textDisplay = display.textContent.trim().split(' ')
  if(errors()){
    setTimeout(()=> toClear(),3000)
    textDisplay = ['error']
  } 
  if(textDisplay.some(elem=> elem==='*' || elem==='/')) 
    multDiv(textDisplay)
  else if(textDisplay.some(elem=> elem==='+' || elem==='-'))
   sumMin(textDisplay)
  
   if(textDisplay.length!==1) operate()
}

function toClear(){
  display.textContent =''
}

function backspace(){
  display.textContent = display.textContent.slice(0,-2)
}

function perc(textDisplay){
  let number = textDisplay[textDisplay.indexOf('%')-1]
  display.textContent=display.textContent.replace(`${number} %`,percent(parseFloat(number)))
}

function multDiv(textDisplay){
  if(textDisplay.some(elem=> elem==='*')){
    let number1 = textDisplay[textDisplay.indexOf('*') - 1]
    let number2 = textDisplay[textDisplay.indexOf('*') + 1]
    display.textContent=display.textContent.replace(`${number1} * ${number2}`,mult(parseFloat(number1),parseFloat(number2)))
  }
  else{
    let number1 = textDisplay[textDisplay.indexOf('/') - 1]
    let number2 = textDisplay[textDisplay.indexOf('/') + 1]
    if(number2==='0'){
      errors('divByZero')
      setTimeout(()=>toClear(),1000)
      return 
    } 
    display.textContent=display.textContent.replace(`${number1} / ${number2}`,div(parseFloat(number1),parseFloat(number2)))
  }
}

function sumMin(textDisplay){
  if(textDisplay.some(elem=> elem==='+')){
    let number1 = textDisplay[textDisplay.indexOf('+') - 1]
    let number2 = textDisplay[textDisplay.indexOf('+') + 1]
    display.textContent=display.textContent.replace(`${number1} + ${number2}`,add(parseFloat(number1),parseFloat(number2)))
  }
  else{
    let number1 = textDisplay[textDisplay.indexOf('-') - 1]
    let number2 = textDisplay[textDisplay.indexOf('-') + 1]
    display.textContent=display.textContent.replace(`${number1} - ${number2}`,sub(parseFloat(number1),parseFloat(number2)))
  } 
}

function errors(type){
  let expression = display.textContent.split('')
  
  if(type==='divByZero'){
    display.textContent = "Error! Don't allow division by zero!"
    return true
  }

  if(expression.filter(elem=> elem==='.').length >1){
    display.textContent = 'Error! Invalid expression!'
    return true
  }

 return false
}