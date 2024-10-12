let displayValue = "0";
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;

const display = document.getElementById("display");
const modeToggleBtn = document.getElementById("modeToggle");
const body = document.body;

// display update
function updateDisplay() {
  if (displayValue.length > 10) {
    displayValue = displayValue.slice(0, 10);
  }
  display.textContent = displayValue;
}

// listener for button clicks
document.querySelectorAll(".calculator button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!isNaN(button.textContent)) {
      handleNumber(button.textContent);
    } else if (button.textContent === ".") {
      handleDecimal();
    } else if (button.textContent === "C") {
      clearCalculator();
    } else if (button.textContent === "←") {
      backspace();
    } else if (button.textContent === "=") {
      handleEquals();
    } else {
      handleOperator(button.textContent);
    }
  });
});

function handleNumber(number) {
  if (waitingForSecondNumber) {
    displayValue = number;
    waitingForSecondNumber = false;
  } else {
    displayValue = displayValue === "0" ? number : displayValue + number;
  }
  updateDisplay();
}

function handleDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  updateDisplay();
}

function handleOperator(operator) {
  if (!waitingForSecondNumber) {
    if (firstNumber === null) {
      firstNumber = parseFloat(displayValue);
    } else if (currentOperator) {
      secondNumber = parseFloat(displayValue);
      const result = operate(currentOperator, firstNumber, secondNumber);
      ddisplayValue = String(result.toFixed(6));
      firstNumber = result;
    }
    waitingForSecondNumber = true;
    currentOperator = operator;
  }
  updateDisplay();
}

function handleEquals() {
  if (firstNumber === null || currentOperator === null) {
    return;
  }
  secondNumber = parseFloat(displayValue);
  const result = operate(currentOperator, firstNumber, secondNumber);
  displayValue = String(result.toFixed(6));
  firstNumber = null;
  currentOperator = null;
  waitingForSecondNumber = false;
  updateDisplay();
}

function clearCalculator() {
  displayValue = "0";
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  waitingForSecondNumber = false;
  updateDisplay();
}

function backspace() {
  displayValue = displayValue.slice(0, -1) || "0";
  updateDisplay();
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error!";
  }
  return a / b;
}

// light mode
modeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    modeToggleBtn.textContent = "🌙";
  } else {
    modeToggleBtn.textContent = "☀️";
  }
});
