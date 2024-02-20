// button
const confirmButton = document.querySelector(".confirm-button");
const continueButton = document.querySelector(".continue-button");
const rightSection = document.querySelector(".right-section");
const thankYouMessage = document.querySelector(".thank-you-message");

// card holder
const cardNameInput = document.querySelector(".name-input");
const cardNameError = document.querySelector(".card-name-error");

// card number
const cardNumber = document.querySelector(".card-number-input");
const cardNumberError = document.querySelector(".card-number-error");

// expiration
const expMonth = document.querySelector(".month-input");
const expErrorMessage = document.querySelector(".exp-error-message");

const expYear = document.querySelector(".year-input");

// CVC
const cvcInput = document.querySelector(".CVC-input");
const cvcBlankError = document.querySelector(".cvc-blank-issue");

// Card details
const cardName = document.querySelector(".name-holder");
const number = document.querySelector(".card-number");
const cardMonthExp = document.querySelector(".month");
const cardYearExp = document.querySelector(".year");
const cardCVC = document.querySelector(".security-number");

// Update Card details
function updateCardDetails() {
  number.textContent = cardNumber.value.toUpperCase();
  cardName.textContent = cardNameInput.value.toUpperCase();
  cardMonthExp.textContent = expMonth.value;
  cardYearExp.textContent = expYear.value;
  cardCVC.textContent = cvcInput.value;
}

// Remove values when clicking on "continue" button
function removeValues() {
  cardNameInput.value = "";
  cardNumber.value = "";
  expMonth.value = "";
  expYear.value = "";
  cvcInput.value = "";
  number.value = "";

  number.textContent = "0000 0000 0000 0000";
  cardName.textContent = "JANE APPLESEED";
  cardMonthExp.textContent = "00";
  cardYearExp.textContent = "00";
  cardCVC.textContent = "000";
}

// Card name validation
cardNameInput.addEventListener("input", function () {
  updateCardDetails();
  const cardNameValue = cardNameInput.value.trim();
  if (cardNameValue === "") {
    cardNameError.textContent = "Can't be blank";
    cardNameInput.style.borderColor = "hsl(0, 100%, 66%)";
  } else {
    cardNameError.textContent = "";
    cardNameInput.style.borderColor = "";
  }
});

// card number validation
cardNumber.addEventListener("input", function () {
  updateCardDetails();

  let cardValue = cardNumber.value.replace(/\s/g, "");
  cardValue = cardValue
    .replace(/(\d{4})/g, "$1 ")
    .trim()
    .toUpperCase();
  if (cardValue === "") {
    cardNumberError.innerHTML = "Can't be blank";
    cardNumber.style.borderColor = "hsl(0, 100%, 66%)";
  } else if (
    !/^\d+$/.test(cardValue.replace(/\s/g, "")) ||
    cardValue.replace(/\s/g, "").length !== 16
  ) {
    cardNumberError.innerHTML = "Wrong format, numbers only";
    cardNumber.style.borderColor = "hsl(0, 100%, 66%)";
  } else {
    cardNumberError.textContent = "";
    cardNumber.style.borderColor = "";
  }
  cardNumber.value = cardValue;
});

// Expiration Month validation
expMonth.addEventListener("input", function () {
  updateCardDetails();
  const monthValue = expMonth.value;

  if (monthValue === "") {
    expErrorMessage.innerHTML = "Can't be blank";
    expMonth.style.borderColor = "hsl(0, 100%, 66%)";
  } else if (!/^(0[1-9]|1[0-2])$/.test(monthValue)) {
    expErrorMessage.innerHTML = "Must be a valid date";
    expMonth.style.borderColor = "hsl(0, 100%, 66%)";
  } else {
    expErrorMessage.innerHTML = "";
    expMonth.style.borderColor = "";
  }
  expMonth.value = monthValue.slice(0, 2);
});

// Expiration Year validation
expYear.addEventListener("input", function () {
  updateCardDetails();
  const yearValue = expYear.value;
  const currentYear = new Date().getFullYear() % 100;

  if (yearValue === "") {
    expErrorMessage.innerHTML = "Can't be blank";
    expYear.style.borderColor = "hsl(0, 100%, 66%)";
  } else if (parseInt(yearValue) < currentYear) {
    expErrorMessage.innerHTML = "Must be a valid date";
    expYear.style.borderColor = "hsl(0, 100%, 66%)";
  } else {
    expErrorMessage.innerHTML = "";
    expYear.style.borderColor = "";
  }

  expYear.value = yearValue.slice(0, 2);
});

// CVC validation
cvcInput.addEventListener("input", function () {
  updateCardDetails();
  const cvcValue = cvcInput.value;

  if (cvcValue === "") {
    cvcBlankError.innerHTML = "Can't be blank";
    cvcInput.style.borderColor = "hsl(0, 100%, 66%)";
  } else {
    cvcBlankError.innerHTML = "";
    cvcInput.style.borderColor = "";
  }

  cvcInput.value = cvcValue.slice(0, 3);
  updateCardDetails();
});

// Confirm button
confirmButton.addEventListener("click", function () {
  if (
    !cardNameError.innerHTML &&
    !cardNumberError.innerHTML &&
    !expErrorMessage.innerHTML &&
    !cvcBlankError.innerHTML &&
    cardNameInput.value &&
    cardNumber.value &&
    expMonth.value &&
    expYear.value &&
    cvcInput.value
  ) {
    rightSection.classList.add("hide");
    thankYouMessage.classList.remove("hide");
  }
});
// Continue button
continueButton.addEventListener("click", function () {
  rightSection.classList.remove("hide");
  thankYouMessage.classList.add("hide");
  removeValues();
});
