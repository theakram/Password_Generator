/** Select required elements in DOM */
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const resultEl = document.getElementById('result');
const clipboardEl = document.getElementById('clipboard');
const generateEl = document.getElementById('generate');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

//Add functionality to copy password on clipboard
clipboardEl.addEventListener('click',()=>{
    const password = resultEl.innerText;
    if(!password){
        return ;
    }
    navigator.clipboard.writeText(password);
    alert("password copied to clipboard");
});

generateEl.addEventListener('click', () => {
    const length = lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasSymbols = symbols.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber,hasSymbols, length);

});

//Add functionality to generate password
function generatePassword(lower, upper, number, symbol, length) {
    let generatePassword = '';
    const typesCount = lower + upper + number + symbol;

    const typesArray = [{lower}, {upper}, {number},{symbol}].filter(item =>Object.values(item)[0]);

    if(typesArray === 0){
        return ""
    }

    for(let i=0; i<length; i += typesCount){
        typesArray.forEach(type =>{
            const functionName = Object.keys(type)[0]
            generatePassword += randomFunc[functionName]()
        });
    }

    const finalPassword = generatePassword.slice(0,length)
    return finalPassword
        
}

//Generate random lower case alphabets 
function getRandomLower() {
   return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

//Generate random upper case alphabets 
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

//Generate random numbers
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

//Generate random symbol
function getRandomSymbol() {
  const symbols ='!@#$%^&*(){}[]<>/,.?';
  return symbols[Math.floor(Math.random()*symbols.length)];
}
