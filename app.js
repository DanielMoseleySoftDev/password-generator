//jshint esversion: 6
const LOWER_CASE_CHARS = generateCharArray(97, 122);
const UPPER_CASE_CHARS = generateCharArray(65, 90);
const NUMBER_CHARS = generateCharArray(48, 57);
const SYMBOL_CHARS = [...generateCharArray(33, 47), ...generateCharArray(58, 64), ...generateCharArray(91, 96), ...generateCharArray(123, 126)];

var includeLowerCase = true;
var includeUpperCase = false;
var includeNumbers = false;
var includeSymbols = false;

function generatePassword(length) {
  //check selected options by looking for variables set to true
  const optionsArray = [includeLowerCase, includeUpperCase, includeNumbers, includeSymbols];

  const numberOfOptions = function() {
    let numOptions = 0;
    for (const option of optionsArray) {
      if (option === true) {
        numOptions++;
      }
    }
    return numOptions;
  }();

  //ensures an even split of the desired options
  const characterSplit = length / numberOfOptions;

  let lowerCaseSegment = [];
  let upperCaseSegment = [];
  let numbersSegment = [];
  let symbolsSegment = [];

  if (includeLowerCase) {
    lowerCaseSegment = createPasswordSegment(characterSplit, LOWER_CASE_CHARS);
  }
  if (includeUpperCase) {
    upperCaseSegment = createPasswordSegment(characterSplit, UPPER_CASE_CHARS);
  }
  if (includeNumbers) {
    numbersSegment = createPasswordSegment(characterSplit, NUMBER_CHARS);
  }
  if (includeSymbols) {
    symbolsSegment = createPasswordSegment(characterSplit, SYMBOL_CHARS);
  }

  //create an array which includes the spans of all segment arrays then scramble and convert to string
  let passwordArray = [...lowerCaseSegment, ...upperCaseSegment, ...numbersSegment, ...symbolsSegment];

  //ensures the length of the word is actually equal to the requested length by adding LOWER_CASE_CHARS
  if (passwordArray.length !== length) {
    for (let i = passwordArray.length; i < length; i++) {
      randomIndex = Math.floor(Math.random() * LOWER_CASE_CHARS.length);
      passwordArray.push(LOWER_CASE_CHARS[randomIndex]);
    }
  }

  //scramble array and convert to string, then display
  console.log(passwordArray.length);
  const finalPassword = scramblePassword(passwordArray);
  document.getElementById("password").textContent = finalPassword;
}

function createPasswordSegment(characterSplit, array) {
  let passwordSegment = [];
  for (let i = 1; i <= characterSplit; i++) {
    randomIndex = Math.floor(Math.random() * array.length);
    passwordSegment.push(array[randomIndex]);
  }
  return passwordSegment;
}

//generate an array containing a range of charcodes
function generateCharArray(low, high) {
  const charArray = [];
  for (let i = low; i <= high; i++) {
    charArray.push(String.fromCharCode(i));
  }
  return charArray;
}

//convert array to string and scramble the order
function scramblePassword(passwordArray) {
  let password = "";
  const passwordArrayLength = passwordArray.length;

  for (let i = 1; i <= passwordArrayLength; i++) {
    randomIndex = Math.floor(Math.random() * passwordArray.length);
    password += passwordArray[randomIndex];
    //removes the added char so that there are no repeats
    passwordArray.splice(randomIndex, 1);
  }
  return password;
}

//option switch boolean logic
function setOption(option) {
  switch (option) {
    case "upperCaseChecked":
      includeUpperCase = !includeUpperCase;
      break;
    case "numbersChecked":
      includeNumbers = !includeNumbers;
      break;
    case "symbolsChecked":
      includeSymbols = !includeSymbols;
  }
}

//'generate' button onClick logic
function generateClicked() {
  const length = document.getElementById("lengthInput").value;

  if (length < 6) {
    alert("Passwords shorter than length 6 are extremely insecure, a password of length 12 or more containing a mix of lowercase, uppercase, numbers & symbols is strongly recommended.");
  } else if (length > 2048) {
    alert("Are you trying to secure a nuclear device?");
  } else {
    generatePassword(length);
  }
}

//ties changing of input slider and input field
function updateLengthInput(length) {
  document.getElementById("lengthInput").value = length;
}
function updateLengthSlder(length) {
  document.getElementById("lengthSlider").value = length;
}
