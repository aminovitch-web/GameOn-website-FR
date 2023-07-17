function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.getElementsByClassName("close");
const formData = document.querySelectorAll(".formData");

// évenements pour lancer le modal au click de l'utilisateur
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// fonction pour lancer le modal
function launchModal() {
  modalbg.style.display = "block";
}

//évenement pour fermer le modal au click de l'utilisateur
modalCloseBtn[0].addEventListener("click",closeModal);

//  fonction pour fermer le modal

function closeModal(){
  modalbg.style.display="none";
}


/// Formulaire

// recuperer tous les champs du formulaire grace à leur Id
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const allCheckboxCity = document.querySelectorAll('[id^="location"]');
const termsConditions = document.getElementById("checkbox1");
const nextEvents = document.getElementById("checkbox2");

// age limite
const limitAge = 18;
// écouteur d'évenements pour chaque champs du formulaire

firstname.addEventListener('input', verifyFirstName);
lastname.addEventListener('input', verifyLastName);
email.addEventListener('input', verifyEmail);
birthdate.addEventListener('input', verifyBirthDate);
quantity.addEventListener('input', verifyQuantity);
const checkboxCityEvent = addEventListener('change', verifyCheckboxCity);
const termsConditionsEvent = addEventListener('change', verifyTermsConditions);

// message d'erreur champs de formulaire
const nameErrorMsg = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const emailErrorMsg = "vous devez entrer votre email.";
const birthdateMsgError = "Vous devez entrer votre date de naissance";
const quantityError = "Vous devez choisir une option";
const checkboxCityError = "Vous devez sélectionner une ville.";
const termsConditionsError = "Vous devez vérifier que vous acceptez les termes et conditions.";

// expression régulière pour vérifier qu'un champ est valide et ne contient pas de numéro ni de caractères spéciaux, et contient au moins 2 caractères pour le prénom et le nom, et une adresse e-mail valide pour l'e-mail.
const regexName = /^[a-zA-Z]{2,}$/;
const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// fonctions pour chaque champs pour vérifier les champs saisis par l'utilisateur
function verifyFirstName() {
  if (!regexName.test(firstname.value)) {
    console.log("Prénom invalide");
    firstname.parentElement.setAttribute("data-error", nameErrorMsg);
    firstname.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  firstname.parentElement.setAttribute("data-error-visible", false);
  return true;
}

function verifyLastName() {
  if (!regexName.test(lastname.value)) {
    console.log("Nom invalide");
    lastname.parentElement.setAttribute("data-error", nameErrorMsg);
    lastname.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  lastname.parentElement.setAttribute("data-error-visible", false);
  return true;
}

function verifyEmail() {
  if (!regexEmail.test(email.value)) {
    console.log("Email invalide");
    email.parentElement.setAttribute("data-error", emailErrorMsg);
    email.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  email.parentElement.setAttribute("data-error-visible", false);
  return true;
}

function verifyBirthDate() {
  const currentDate = new Date();
  const dateUser = new Date(birthdate.value);
  const date = dateUser.getDate();
  const yearUser = dateUser.getFullYear();
  if (!yearUser || (currentDate.getFullYear() - yearUser) < limitAge) {
    birthdate.parentElement.setAttribute("data-error", birthdateMsgError);
    birthdate.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  birthdate.parentElement.setAttribute("data-error-visible", false);
  return true;
}


function verifyQuantity() {
  if (!isNaN(quantity.value) && quantity.value === "") {
    quantity.parentElement.setAttribute("data-error", quantityError);
    quantity.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  quantity.parentElement.setAttribute("data-error-visible", false);
  return true;
}

function verifyCheckboxCity() {
  let isChecked= false;

  allCheckboxCity.forEach(function (checkbox) {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  if (!isChecked) {
    allCheckboxCity[0].parentElement.setAttribute("data-error", checkboxCityError);
    allCheckboxCity[0].parentElement.setAttribute("data-error-visible", true);
    return false;
  }

  allCheckboxCity[0].parentElement.setAttribute("data-error-visible", false);
  return true;
}

function verifyTermsConditions() {

  const isTermsAccepted = termsConditions.checked;
 
  if(!isTermsAccepted){
    termsConditions.parentElement.setAttribute("data-error", termsConditionsError);
    termsConditions.parentElement.setAttribute("data-error-visible", true);
    return false;     
  }
  termsConditions.parentElement.setAttribute("data-error-visible", false);
  return true;
}

function success(){
  const form = document.querySelector('form');
  form.style.height="300px";
  form.innerHTML = '<div class="successMsg">Merci ! Votre réservation a été reçue.<br><button onclick="return closeModal()" class="btn-signup">Fermer</button></div>';
  form.reset();

}

function validate() {
  const isFirstNameValid = verifyFirstName();
  const isLastNameValid = verifyLastName();
  const isEmailValid = verifyEmail();
  const isBirthDateValid = verifyBirthDate();
  const isQuantityValid = verifyQuantity();
  const isCheckboxCityValid = verifyCheckboxCity();

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isBirthDateValid &&
    isQuantityValid &&
    isCheckboxCityValid
  ) {
    success();
    return true;
  } else {
    
    return false;
  }
}
