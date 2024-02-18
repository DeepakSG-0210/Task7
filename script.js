class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
    this.clear();
  }

  clear() {
    this.current = '';
    this.previous = '';
    this.operation = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.current.includes('.')) return;
    this.current = this.current.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.current === '') return;
    if (this.previous !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previous);
    const current = parseFloat(this.current);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.current = computation;
    this.operation = undefined;
    this.previous = '';
  }

  updateDisplay() {
    this.currentOperand.innerText = this.current;
    if (this.operation != null) {
      this.previousOperand.innerText = `${this.previous} ${this.operation}`;
    } else {
      this.previousOperand.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperand = document.querySelector('[data-previous]');
const currentOperand = document.querySelector('[data-current]');


const calculator = new Calculator(previousOperand, currentOperand);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
    }
);

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
    }
);

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
}
);

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
}
);

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
}
);
