const container = document.querySelector('.container')
let num1, num2 = 0
let operation = ''

const calculatorKeys = {
    ' ': {key: 'display'},
    '7': {key: '7'},
    '8': {key: '8'},
    '9': {key: '9'},
    '4': {key: '4'},
    '5': {key: '5'},
    '6': {key: '6'},
    '1': {key: '1'},
    '2': {key: '2'},
    '3': {key: '3'},
    '0': {key: '0'},
    '*': {key: 'multiply'},
    '/': {key: 'divide'},
    '+': {key: 'add'},
    '-': {key: 'subtract'},
    '=': {key: 'equals'},
    '.': {key: 'decimal'},
    'Clear': {key: 'clear'},
    '←': {key: 'backspace'}   
};

for (const key in calculatorKeys) {
    const button = document.createElement('button')
    button.classList.add('btn-key', `btn-${calculatorKeys[key].key}`)
    if (!isNaN(parseInt(key))) {
        button.classList.add('btn-num')
    }
    if (key == '.') {
        button.classList.add('btn-num')
    }
    if (key == '*' || key == '/' || key == '+' || key == '-' || key == '=') {
        button.classList.add('btn-operation')
    }

    button.textContent = key
    container.appendChild(button)

}

const numberKey = document.querySelectorAll('.btn-num')
const display = document.querySelector('.btn-display')
const backspace = document.querySelector('.btn-backspace')
const clear = document.querySelector('.btn-clear')
const operationBtn = document.querySelectorAll('.btn-operation')

function clearActiveOperations() {
    operationBtn.forEach(btn => {
        if (btn.textContent !== '=') {
            btn.classList.remove('active-operation');
        }
    });
}

operationBtn.forEach((key) => {
    key.addEventListener('click', (e) => {
        const clickedOperation = e.target.textContent
        
        if (clickedOperation === '=') {
            if (operation === '') {
                return;
            }
            
            num2 = (display.textContent.includes('.')) ? parseFloat(display.textContent) : parseInt(display.textContent)
            
            switch (operation) {
                case '+':
                    add()
                    break;
                case '-':
                    subtract()
                    break;
                case '/':
                    divide()
                    break;
                case '*':
                    multiply()
                    break;
            }
            clearActiveOperations();
            num1 = (display.textContent.includes('.')) ? parseFloat(display.textContent) : parseInt(display.textContent);
            num2 = 0;
            operation = '';
        } else {
            clearActiveOperations();
            
            e.target.classList.add('active-operation');
            
            if (display.textContent !== '') {
                num1 = (display.textContent.includes('.')) ? parseFloat(display.textContent) : parseInt(display.textContent)
            }
            
            operation = clickedOperation
            clearDisplay()
        }
    })
})

numberKey.forEach((key) => {
    key.addEventListener('click', (e) => {
        const resultDisplayed = (operation === '' && num1 !== 0);
        const inMiddleOfOperation = (num2 !== 0 && operation !== '');
        
        if (resultDisplayed || inMiddleOfOperation) {
            clearDisplay()
            clearNumBuffer()
            clearOperationBuffer()
            display.textContent = e.target.textContent
        } else {
            display.textContent += e.target.textContent
        }
        
        if (display.textContent === '43110') {
            setTimeout(() => {
                display.textContent = 'Hi, please stop poking me!'
            }, 750)
        }
    })
})

backspace.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1)
})

clear.addEventListener('click', () => {
    display.textContent = ''
    clearNumBuffer()
    clearOperationBuffer()
})

function add() {
    display.textContent = num1 + num2
}

function subtract() {
    display.textContent = num1 - num2
}

function multiply() {
    display.textContent = num1 * num2
}

function divide() {
    display.textContent = num1 / num2
}

function clearNumBuffer() {
    num1 = 0
    num2 = 0
}

function clearOperationBuffer() {
    operation = ''
}

function clearDisplay() {
    display.textContent = ''
}