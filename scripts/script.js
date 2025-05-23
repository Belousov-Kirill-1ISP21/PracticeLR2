const upperAlphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const lowerAlphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

function displayAlphabet() {
    const alphabetDisplay = document.getElementById('alphabetDisplay');
    let upperStr = 'Заглавные: ';
    let lowerStr = 'Строчные: ';
    
    for (let i = 0; i < upperAlphabet.length; i++) {
        upperStr += upperAlphabet[i] + ' ';
    }
    
    for (let i = 0; i < lowerAlphabet.length; i++) {
        lowerStr += lowerAlphabet[i] + ' ';
    }
    
    alphabetDisplay.innerHTML = `
        <p>${upperStr}</p>
        <p>${lowerStr}</p>
    `;
}

function decodeText() {
    const inputText = document.getElementById('inputText').value;
    let outputText = '';
    let operationsInfo = [];
    
    for (let i = 0; i < inputText.length; i++) {
        const char = inputText[i];
        let decodedChar = char;
        let operation = `'${char}' → '${char}' (not a letter)`;
        
        let upperIndex = -1;
        for (let j = 0; j < upperAlphabet.length; j++) {
            if (upperAlphabet[j] === char) {
                upperIndex = j;
                break;
            }
        }
        
        if (upperIndex !== -1) {
            let newIndex = upperIndex - 13;
            if (newIndex < 0) newIndex += upperAlphabet.length;
            decodedChar = upperAlphabet[newIndex];
            operation = `'${char}' (${upperIndex}) → '${decodedChar}' (${newIndex})`;
        } 

        else {
            let lowerIndex = -1;
            for (let j = 0; j < lowerAlphabet.length; j++) {
                if (lowerAlphabet[j] === char) {
                    lowerIndex = j;
                    break;
                }
            }
            
            if (lowerIndex !== -1) {
                let newIndex = lowerIndex - 13;
                if (newIndex < 0) newIndex += lowerAlphabet.length;
                decodedChar = lowerAlphabet[newIndex];
                operation = `'${char}' (${lowerIndex}) → '${decodedChar}' (${newIndex})`;
            }
        }
        
        operationsInfo.push(operation);
        outputText += decodedChar;
    }
    
    document.getElementById('outputText').value = outputText;
    
    let operationsHTML = '';
    for (let i = 0; i < operationsInfo.length; i++) {
        operationsHTML += operationsInfo[i] + '<br>';
    }
    
    document.getElementById('operationsInfo').innerHTML = operationsHTML;

}

document.addEventListener('DOMContentLoaded', function() {
    displayAlphabet();
    document.getElementById('inputText').addEventListener('input', decodeText);
});