
        class Calculator {
            constructor(previousOperandElement, currentOperandElement) {
                this.previousOperandElement = previousOperandElement;
                this.currentOperandElement = currentOperandElement;
                this.clear();
            }

            clear() {
                this.currentOperand = '0';
                this.previousOperand = '';
                this.operation = undefined;
            }

            delete() {
                this.currentOperand = this.currentOperand.toString().slice(0, -1);
                if (this.currentOperand === '') {
                    this.currentOperand = '0';
                }
            }

            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                if (this.currentOperand === '0' && number !== '.') {
                    this.currentOperand = number.toString();
                } else {
                    this.currentOperand = this.currentOperand.toString() + number.toString();
                }
            }

            chooseOperation(operation) {
                if (this.currentOperand === '') return;
                if (this.previousOperand !== '') {
                    this.compute();
                }
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
            }

            compute() {
                let computation;
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);
                if (isNaN(prev) || isNaN(current)) return;

                switch (this.operation) {
                    case '+':
                        computation = prev + current;
                        break;
                    case '-':
                        computation = prev - current;
                        break;
                    case '×':
                        computation = prev * current;
                        break;
                    case '÷':
                        computation = prev / current;
                        break;
                    default:
                        return;
                }

                this.currentOperand = computation.toString();
                this.operation = undefined;
                this.previousOperand = '';
            }

            updateDisplay() {
                this.currentOperandElement.innerText = this.currentOperand;
                if (this.operation != null) {
                    this.previousOperandElement.innerText = 
                        `${this.previousOperand} ${this.operation}`;
                } else {
                    this.previousOperandElement.innerText = '';
                }
            }
        }

        const numberButtons = document.querySelectorAll('button:not(.operator):not(.equals):not(.clear):not(.delete):not(.span-2)');
        const operatorButtons = document.querySelectorAll('.operator');
        const equalsButton = document.querySelector('.equals');
        const clearButton = document.querySelector('.clear');
        const deleteButton = document.querySelector('.delete');
        const previousOperandElement = document.querySelector('.previous-operand');
        const currentOperandElement = document.querySelector('.current-operand');

        const calculator = new Calculator(previousOperandElement, currentOperandElement);

        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.innerText);
                calculator.updateDisplay();
            });
        });

        operatorButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOperation(button.innerText);
                calculator.updateDisplay();
            });
        });

        equalsButton.addEventListener('click', () => {
            calculator.compute();
            calculator.updateDisplay();
        });

        clearButton.addEventListener('click', () => {
            calculator.clear();
            calculator.updateDisplay();
        });

        deleteButton.addEventListener('click', () => {
            calculator.delete();
            calculator.updateDisplay();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (/[0-9.]/.test(e.key)) {
                calculator.appendNumber(e.key);
                calculator.updateDisplay();
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                let operation = e.key;
                if (operation === '*') operation = '×';
                if (operation === '/') operation = '÷';
                calculator.chooseOperation(operation);
                calculator.updateDisplay();
            } else if (e.key === 'Enter' || e.key === '=') {
                calculator.compute();
                calculator.updateDisplay();
            } else if (e.key === 'Backspace') {
                calculator.delete();
                calculator.updateDisplay();
            } else if (e.key === 'Escape') {
                calculator.clear();
                calculator.updateDisplay();
            }
        });
    