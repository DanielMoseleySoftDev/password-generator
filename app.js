//jshint esversion: 6
const LOWER_CASE_CHARS = generateCharArray(97, 122);
const UPPER_CASE_CHARS = generateCharArray(65, 90);
const NUMBER_CHARS = generateCharArray(48, 57);
const SYMBOL_CHARS = [ ...generateCharArray(33, 47), ...generateCharArray(58, 64), ...generateCharArray(91, 96), ...generateCharArray(123, 126)];

var includeLowerCase = true;
var includeUpperCase = false;
var includeNumbers = false;
var includeSymbols = false;

function generatePassword(length) {
  //check selected options by looking for variables set to true
  const optionsArray = [includeLowerCase, includeUpperCase, includeNumbers, includeSymbols];
  const selectedOptions = function() {
    let selectedOptions = [];
    for (const option of optionsArray) {
      if (option === true) {
        selectedOptions.push(option);
      }
    }
    return selectedOptions;
  }();

  //ensures an even split of the desired options
  const characterSplit = length / numberOfOptions;
  // const isWholeNumber = function() {
  //   if (characterSplit % 2 === 0) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }();

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
  let passwordArray = [...lowerCaseSegment ,  ...upperCaseSegment, ...numbersSegment, ...symbolsSegment];
  const finalPassword = scramblePassword(passwordArray);
  document.getElementById("password").innerHTML = finalPassword;
}


function createPasswordSegment(characterSplit, array) {
  var passwordSegment = [];
  var randomIndex;
  if(array) {
    for(let i=1; i<=characterSplit; i++) {
     randomIndex = Math.floor(Math.random() * array.length);
     passwordSegment.push(array[randomIndex]);
    }
    return passwordSegment;
  }
  else {
    return passwordSegment;
  }
}

//generate an array containing a range of charcodes
function generateCharArray(low, high) {
  const array = [];
  for (let i=low; i<=high; i++) {
    array.push(String.fromCharCode(i));
  }
  return array;
}

function scramblePassword(passwordArray) {
  let password = "";
  let randomIndex;
  const passwordArrayLength = passwordArray.length;
  for (let i=1; i<=passwordArrayLength; i++) {
    randomIndex = Math.floor(Math.random() * passwordArray.length);
    password += passwordArray[randomIndex];
    //removes the added char so that there are no repeats
    passwordArray.splice(randomIndex, 1);
  }
  return password;
}

function updateLengthInput(length) {
  document.getElementById("lengthInput").value = length;
}

function setOption(option) {

  switch(option) {
    case "upperCaseChecked" :
      includeUpperCase = !includeUpperCase;
      break;
    case "numbersChecked" :
      includeNumbers = !includeNumbers;
      break;
    case "symbolsChecked" :
      includeSymbols = !includeSymbols;
    }
}

function generateClicked() {
  const length = document.getElementById("lengthInput").value;
  if (length < 6) {
    alert("Passwords shorter than length 6 are extremely insecure, a password of length 12 or more containing a mix of lowercase, uppercase, numbers & symbols is strongly recommended.");
  }
  else if (length > 2048) {
    alert("Are you trying to secure a nuclear device?");
  }
  else {
    generatePassword(length);
  }
}

// $("#upperCaseChecked").bootstrapSwitch({onColor: 'danger'});





const optionsArray = [includeLowerCase, includeUpperCase, includeNumbers, includeSymbols];
const selectedOptions = function() {
  let selectedOptions = [];
  for (const option of optionsArray) {
    if (option === true) {
      selectedOptions.push(option);
    }
  }
  return selectedOptions;
}();
