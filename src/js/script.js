"use strict";

// ELEMENT/S
const cardNameEl = document.querySelector(".card__name");
const cardNumberEl = document.querySelector(".card__number");
const cardExpDateMonth = document.querySelector(".card__exp-date-month");
const cardExpDateYear = document.querySelector(".card__exp-date-year");
const cardCVC = document.querySelector(".card__cvc");

const cardNameInputEl = document.querySelector("#name");
const cardNumberInputEl = document.querySelector("#number");
const cardExpMonthInputEl = document.querySelector("#exp-month");
const cardExpYearInputEl = document.querySelector("#exp-year");
const cardCVCInputEl = document.querySelector("#cvc");

const formSubmitButtonEl = document.querySelector("#form__button");

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

// EVENT-LISTENER/S
cardNameInputEl.addEventListener("input", appendCardName);
cardNumberInputEl.addEventListener("input", appendCardNumber);
cardExpMonthInputEl.addEventListener("input", appendExpDate);
cardExpYearInputEl.addEventListener("input", appendExpDate);
cardCVCInputEl.addEventListener("input", appendCvc);
