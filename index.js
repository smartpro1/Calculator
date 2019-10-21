const getNumBtns = document.getElementsByClassName("btn-num");
const getOpBtns = document.getElementsByClassName("btn-op");
let displayValue = document.getElementById("display");
let displayResult = document.getElementById("btn-result");
let switchPower = document.getElementById("togglePower");

let evalArr = [];
let display = 0;

function getNums(event){
   let btnValue = event.target.innerText;
   if(displayValue.innerText === "0")
       display = "";

   if (btnValue === "." && display.includes(".")){
       btnValue = "";
   }
   display += btnValue;
   displayValue.innerText = display;
}

function settoZero(){
    displayValue.innerText = "0";
    display = 0;
}

// When an operator button(+, - etc) is clicked
function pushThenReset(sign){
    evalArr.push(displayValue.innerText);
    evalArr.push(sign);
    settoZero();
}

function reset(){
    evalArr = [];
    settoZero();
}

// when the backspace button on the calculator is pressed
function clearLastOne(str){
    if(str.length == 1){
        settoZero();
    }else{
        display = str.slice(0, str.length-1);
        displayValue.innerText = display;
    }
   
    
  
}

// Responsible for on and off
function toggleSwitch(){
    if(displayValue.innerText === ""){
        displayValue.innerText = "0";
        display = "";
    }else{
        displayValue.innerText = "";
        display = "";
    }
}

switchPower.addEventListener("click", toggleSwitch);

// This function gets triggered when an operation is carried out
function performOperation(event){
  let operation = event.target.innerText;
  switch (operation){
    case "+":
        pushThenReset(operation);
        break;

    case "-":
        pushThenReset(operation);
        break;
        
    case "x":
        pushThenReset("*");
        break;

    case "÷":
        pushThenReset("/");
        break;

    case "AC":
          reset();
          break;

    case "←":
         clearLastOne(displayValue.innerText);

    default:
        break;

  }

  
}


// add event listeners to the buttons
for(let i = 0; i < getNumBtns.length; i++){
   getNumBtns[i].addEventListener("click", getNums);
}



 // add event listeners to the operator buttons
 for(let i = 0; i < getOpBtns.length; i++){
    getOpBtns[i].addEventListener("click", performOperation);
 }

 // when the "=" button is pressed display result
displayResult.onclick = () =>{
    evalArr.push(displayValue.innerText);
    let result = eval(evalArr.join(" "));
    if (typeof(result) !== "number") result = "Error";
    evalArr = [];
    displayValue.innerText = result;
    display = "";
}