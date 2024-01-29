"use strict";

// ELEMENT/S
const cardNameEl = {
	input: document.querySelector("#name"),
	display: document.querySelector(".card__name"),
};

const cardNumberEl = {
	input: document.querySelector("#number"),
	display: document.querySelector(".card__number"),
};

const cardExpMonthEl = {
	input: document.querySelector("#exp-month"),
	display: document.querySelector(".card__exp-date-month"),
};

const cardExpYearEl = {
	input: document.querySelector("#exp-year"),
	display: document.querySelector(".card__exp-date-year"),
};

const cardCvcEl = {
	input: document.querySelector("#cvc"),
	display: document.querySelector(".card__cvc"),
};

const formEl = document.querySelector(".form");
const formSubmitButtonEl = document.querySelector("#form__button");
const completeButtonEl = document.querySelector(".complete__button");
const allInputEl = document.querySelectorAll("input");
const allErrorContainerEl = document.querySelectorAll(".error-container");

// FUNCTION/S
function appendCardName() {
	// -- Update cardNameEl with cardNameInputEl value
	cardNameEl.display.textContent = cardNameEl.input.value;
}

function appendCardNumber() {
	// -- Replace consecutive spaces and keep all characters
	let cardNumber = cardNumberEl.input.value.replace(/\s+/g, "");

	// -- Ensure the value is no more than 16 characters
	cardNumber = cardNumber.slice(0, 16);

	// -- Add a space after every four characters
	const formattedCardNumber = cardNumber.replace(/(.{4})/g, "$1 ").trim();

	// -- Update the input field with the formatted value
	cardNumberEl.input.value = formattedCardNumber;

	// -- Update the cardNumberEl with the formatted card number
	cardNumberEl.display.textContent = formattedCardNumber;
}

function appendExpDate(e) {
	// -- Get Exp Date type based on event target
	const type = e.target.name;

	// -- Get the entered value and remove non-numeric characters
	let expDate =
		type === "exp-month"
			? cardExpMonthEl.input.value.replace(/\D/g, "")
			: cardExpYearEl.input.value.replace(/\D/g, "");

	// -- Ensure the value is no more than 2 characters
	expDate = expDate.slice(0, 2);

	// -- Get the target input field
	const targetInputField =
		type === "exp-month" ? cardExpMonthEl.input : cardExpYearEl.input;

	// -- Get the target UI field
	const targetUIField =
		type === "exp-month" ? cardExpMonthEl.display : cardExpYearEl.display;

	// -- Update the input field with the cleaned value
	targetInputField.value = expDate;

	// -- Append the cleaned value to the target element
	targetUIField.textContent = expDate;
}

function appendCvc() {
	// -- Get the entered value and remove non-numeric characters
	let cleanedCvc = cardCvcEl.input.value.replace(/\D/g, "");

	// -- Ensure the value is no more than 3 characters
	cleanedCvc = cleanedCvc.slice(0, 3);

	// -- Update the input field with the cleaned value
	cardCvcEl.input.value = cleanedCvc;

	// -- Append the cleaned value to cardCvc
	cardCvcEl.display.textContent = cleanedCvc;
}

function getInput(e) {
	// -- Get input element based on event target
	const targetInputEl = e.target.closest("input");

	// -- If there is no target input element, return
	if (!targetInputEl) return;

	// -- Get input ID based on target input element
	const targetInputElID = targetInputEl.id;

	// -- Invoke approriate function for the target input
	switch (targetInputElID) {
		case "name":
			targetInputEl.addEventListener("input", appendCardName);
			break;
		case "number":
			targetInputEl.addEventListener("input", appendCardNumber);
			break;
		case "exp-month":
		case "exp-year":
			targetInputEl.addEventListener("input", appendExpDate);
			break;
		case "cvc":
			targetInputEl.addEventListener("input", appendCvc);
			break;
		default:
			return;
	}
}

function showComplete() {
	// -- Add "show" class to form to show the compete state
	formEl.classList.add("show");
}

function removeComplete() {
	// -- Empty all the inputs and reset card UI
	cardNameEl.input.value =
		cardNumberEl.input.value =
		cardExpMonthEl.input.value =
		cardExpYearEl.input.value =
		cardCvcEl.input.value =
			"";

	cardNameEl.display.textContent = "Jane Appleseed";
	cardNumberEl.display.textContent = "0000 0000 0000 0000";
	cardExpYearEl.display.textContent = cardExpMonthEl.display.textContent = "00";
	cardCvcEl.display.textContent = "000";

	// -- Remove "show" class to form to remove the compete state
	formEl.classList.remove("show");
}

function errorEmpty(inputContainer, i) {
	// -- Dynamically create error element
	const errorEl = document.createElement("span");

	// -- Add "error-span" class to created error element
	errorEl.classList.add("error-span");

	// -- Add error message
	errorEl.textContent = "Can't be blank";

	// -- Add "error" class to the input container
	inputContainer.classList.add("error");

	// -- Accounting the part where # of inputs > # of error container
	if (!allErrorContainerEl[i]) return;

	// -- Add error
	allErrorContainerEl[i].appendChild(errorEl);
}

// -- Validate card name
function isCardNameValid(value) {
	return /^[a-zA-Z\s]+$/.test(value);
}

// -- Validate card number
function isCardNumberValid(value) {
	return /^\d+$/.test(value.replace(/\s+/g, ""));
}

function errorFormat(inputContainer, message) {
	// -- Dynamically create error element
	const errorEl = document.createElement("span");

	// -- Add "error-span" class to created error element
	errorEl.classList.add("error-span");

	// -- Add error message
	errorEl.textContent = message;

	// -- Add "error" class to the input container
	inputContainer.classList.add("error");

	// -- Append the error element to the error container
	inputContainer.querySelector(".error-container").innerHTML = "";
	inputContainer.querySelector(".error-container").appendChild(errorEl);
}

function checkErrors() {
	// -- Flag to track if any errors are found
	let hasErrors = false;

	// -- Loop through all input element and check for errors
	allInputEl.forEach((inputEl, i) => {
		// -- Get input container element
		const inputContainerEl = inputEl.closest(".form__input-container");

		// -- If user did not enter anything, add error
		if (!inputEl.value) {
			errorEmpty(inputContainerEl, i);
			hasErrors = true; // Set flag to true if an error
		} else {
			// -- Check for specific input formats using helper functions
			switch (inputEl.id) {
				case "name":
					if (!isCardNameValid(inputEl.value)) {
						// -- Add error for wrong format
						errorFormat(inputContainerEl, "Wrong format, letters only");
						hasErrors = true; // Set flag to true if an error is found
					}
					break;
				case "number":
					if (!isCardNumberValid(inputEl.value)) {
						// -- Add error for wrong format
						errorFormat(inputContainerEl, "Wrong format, numbers only");
						hasErrors = true; // Set flag to true if an error is found
					}
					break;
				default:
					return;
			}
		}
	});

	// -- If no errors are found, clear existing errors and invoke showComplete function
	if (!hasErrors) {
		clearErrors();
		showComplete();
	}
}

function clearErrors() {
	// Loop through all error containers and remove existing errors
	allErrorContainerEl.forEach((errorContainer) => {
		errorContainer.innerHTML = "";
	});

	// Loop through all input containers and remove the "error" class
	allInputEl.forEach((inputEl) => {
		const inputContainerEl = inputEl.closest(".form__input-container");
		inputContainerEl.classList.remove("error");
	});
}

// EVENT-LISTENER/S
formEl.addEventListener("input", getInput);

formSubmitButtonEl.addEventListener("click", (e) => {
	// -- Prevent default form behavior
	e.preventDefault();

	// -- Check for errors
	checkErrors();
});

completeButtonEl.addEventListener("click", removeComplete);
