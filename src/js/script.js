"use strict";

// ELEMENT/S
const cardNameEl = document.querySelector(".card__name");
const cardNumberEl = document.querySelector(".card__number");
const cardExpDateMonth = document.querySelector(".card__exp-date-month");
const cardExpDateYear = document.querySelector(".card__exp-date-year");
const cardCVC = document.querySelector(".card__cvc");
const formEl = document.querySelector(".form");
const allInputEl = document.querySelectorAll("input");
const cardNameInputEl = document.querySelector("#name");
const cardNumberInputEl = document.querySelector("#number");
const cardExpMonthInputEl = document.querySelector("#exp-month");
const cardExpYearInputEl = document.querySelector("#exp-year");
const cardCVCInputEl = document.querySelector("#cvc");
const formSubmitButtonEl = document.querySelector("#form__button");
const completeButtonEl = document.querySelector(".complete__button");
const allErrorContainerEl = document.querySelectorAll(".error-container");

// FUNTION/S
function appendCardName() {
	// -- Update cardNameEl with cardNameInputEl value
	cardNameEl.textContent = cardNameInputEl.value;
}

function appendCardNumber() {
	// -- Replace consecutive spaces and keep all characters
	let cardNumber = cardNumberInputEl.value.replace(/\s+/g, "");

	// -- Ensure the value is no more than 16 characters
	cardNumber = cardNumber.slice(0, 16);

	// -- Add a space after every four characters
	const formattedCardNumber = cardNumber.replace(/(.{4})/g, "$1 ").trim();

	// -- Update the input field with the formatted value
	cardNumberInputEl.value = formattedCardNumber;

	// -- Update the cardNumberEl with the formatted card number
	cardNumberEl.textContent = formattedCardNumber;
}

function appendExpDate(e) {
	// -- Get Exp Date type based on event target
	const type = e.target.name;

	// -- Get the entered value and remove non-numeric characters
	let expDate =
		type === "exp-month"
			? cardExpMonthInputEl.value.replace(/\D/g, "")
			: cardExpYearInputEl.value.replace(/\D/g, "");

	// -- Ensure the value is no more than 2 characters
	expDate = expDate.slice(0, 2);

	// -- Get the target input field
	const targetInputField =
		type === "exp-month" ? cardExpMonthInputEl : cardExpYearInputEl;

	// -- Get the target UI field
	const targetUIField =
		type === "exp-month" ? cardExpDateMonth : cardExpDateYear;

	// -- Update the input field with the cleaned value
	targetInputField.value = expDate;

	// -- Append the cleaned value to the target element
	targetUIField.textContent = expDate;
}

function appendCvc() {
	// -- Get the entered value and remove non-numeric characters
	let cleanedCvc = cardCVCInputEl.value.replace(/\D/g, "");

	// -- Ensure the value is no more than 3 characters
	cleanedCvc = cleanedCvc.slice(0, 3);

	// -- Update the input field with the cleaned value
	cardCVCInputEl.value = cleanedCvc;

	// -- Append the cleaned value to cardCvc
	cardCVC.textContent = cleanedCvc;
}

function getInput(e) {
	// -- Get input element based on event target
	const targetInputEl = e.target.closest("input");

	// -- If there is no target input element, return
	if (!targetInputEl) return;

	// -- Get input ID based on target input element
	const targetInputElID = targetInputEl.id;

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
	cardNameInputEl.value =
		cardNumberInputEl.value =
		cardExpMonthInputEl.value =
		cardExpYearInputEl.value =
		cardCVCInputEl.value =
			"";

	cardNameEl.textContent = "Jane Appleseed";
	cardNumberEl.textContent = "0000 0000 0000 0000";
	cardExpDateYear.textContent = cardExpDateMonth.textContent = "00";
	cardCVC.textContent = "000";

	// -- Remove "show" class to form to remove the compete state
	formEl.classList.remove("show");
}

function errorEmpty(inputContainer, i) {
	const errorEl = document.createElement("span");
	errorEl.classList.add("error-span");
	errorEl.textContent = "Can't be blank";
	inputContainer.classList.add("error");
	allErrorContainerEl[i].appendChild(errorEl);
}

function checkErrors() {
	allInputEl.forEach((inputEl, i) => {
		const inputContainerEl = inputEl.closest(".form__input-container");
		if (!inputEl.value) {
			errorEmpty(inputContainerEl, i);
		}
	});
}

// EVENT-LISTENER/S
formEl.addEventListener("click", getInput);
formSubmitButtonEl.addEventListener("click", (e) => {
	// -- Prevent default form behavior
	e.preventDefault();

	checkErrors();
});
completeButtonEl.addEventListener("click", removeComplete);
