// fonction qui permet d'afficher la navigation responsive
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

// événements pour lancer le modal au clic de l'utilisateur
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// fonction pour lancer le modal
function launchModal() {
  modalbg.style.display = "block";
}

// événement pour fermer le modal au clic de l'utilisateur
modalCloseBtn[0].addEventListener("click", closeModal);

// fonction pour fermer le modal
function closeModal() {
  modalbg.style.display = "none";
  window.location.reload();
}

/// Formulaire

const form = document.querySelector('form');

// message succès
successMsg = '<div class="successMsg">Merci ! Votre réservation a été reçue.<br><button onclick="return closeModal()" class="btn-signup">Fermer</button></div>';

// récupérer tous les champs du formulaire grâce à leur Id
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const allCheckboxCity = document.querySelectorAll('[id^="location"]');
const termsConditions = document.getElementById("checkbox1");
const nextEvents = document.getElementById("checkbox2");

// âge limite
const limitAge = 18;
// écouteur d'événements pour chaque champ du formulaire

firstname.addEventListener('input', verifyFirstName);
lastname.addEventListener('input', verifyLastName);
email.addEventListener('input', verifyEmail);
birthdate.addEventListener('input', verifyBirthDate);
quantity.addEventListener('input', verifyQuantity);
const checkboxCityEvent = addEventListener('change', verifyCheckboxCity);
const termsConditionsEvent = addEventListener('change', verifyTermsConditions);

// message d'erreur pour les champs du formulaire
const nameErrorMsg = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const emailErrorMsg = "Vous devez entrer votre email.";
const birthdateMsgError = "Vous devez entrer votre date de naissance.";
const quantityError = "Vous devez choisir une option.";
const checkboxCityError = "Vous devez sélectionner une ville.";
const termsConditionsError = "Vous devez vérifier que vous acceptez les termes et conditions.";

// expression régulière pour vérifier qu'un champ est valide et ne contient pas de numéro ni de caractères spéciaux, et contient au moins 2 caractères pour le prénom et le nom, et une adresse e-mail valide pour l'e-mail.
const regexName = /^[a-zA-Z]{2,}$/;
const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// fonctions pour chaque champ pour vérifier les champs saisis par l'utilisateur

// verifyFirstName : vérifie la saisie de l'utilisateur avec l'expression régulière pour le nom et utilise test()
function verifyFirstName() {
  if (!regexName.test(firstname.value)) {
    console.log("Prénom invalide");
    // modifie l'attribut html data-error, afin d'afficher un message, retourne faux et utilise test()
    firstname.parentElement.setAttribute("data-error", nameErrorMsg);
    firstname.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  // enlève le message d'erreur et retourne vrai, car valide.
  firstname.parentElement.setAttribute("data-error-visible", false);
  return true;
}
// verifyLastName, vérifie le nom avec la même expression régulière que le prénom et utilise test()
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
// verifyEmail, vérifie que l'e-mail est d'un format correct avec l'expression régulière et utilise test()
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
// vérifie la date de naissance avec l'objet date, il faut prendre l'année actuelle - l'année que l'utilisateur a saisie, et si c'est inférieur à la date limite, c'est invalide
function verifyBirthDate() {
  const currentDate = new Date();
  const dateUser = new Date(birthdate.value);
  const yearUser = dateUser.getFullYear();
  if (!yearUser || (currentDate.getFullYear() - yearUser) < limitAge) {
    birthdate.parentElement.setAttribute("data-error", birthdateMsgError);
    birthdate.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  birthdate.parentElement.setAttribute("data-error-visible", false);
  return true;
}
// vérifie le nombre de tournois, doit être de valeur numérique, vérifie si  la valeur numérique ou si la valeur du champ saisi par l'utilisateur
// est vide, la fonction trim permet de supprimer les espaces blanc.
function verifyQuantity() {
  if (isNaN(quantity.value) || quantity.value.trim() === "") {
    quantity.parentElement.setAttribute("data-error", quantityError);
    quantity.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  quantity.parentElement.setAttribute("data-error-visible", false);
  return true;
}
// vérifie les cases à cocher des villes, initialise une variable isChecked à faux, puis toutes les cases à cocher seront parcourues avec foreach
// vérifie ensuite qu'à chaque itération, la case est cochée, et change la variable en true
function verifyCheckboxCity() {
  let isChecked = false;

  allCheckboxCity.forEach(function (checkbox) {
    if (checkbox.checked) {
      isChecked = true;
    }
  });
  // puis si ce n'est pas valide, avec le [0], chaque itération est parcourue pour vérifier, puis affiche le message d'erreur
  if (!isChecked) {
    allCheckboxCity[0].parentElement.setAttribute("data-error", checkboxCityError);
    allCheckboxCity[0].parentElement.setAttribute("data-error-visible", true);
    return false;
  }

  allCheckboxCity[0].parentElement.setAttribute("data-error-visible", false);
  return true;
}

// vérifier les termes et conditions, initialise une variable pour vérifier si c'est coché, et si la variable n'est pas valide, affiche le message d'erreur
function verifyTermsConditions() {
  const isTermsAccepted = termsConditions.checked;
  if (!isTermsAccepted) {
    termsConditions.parentElement.setAttribute("data-error", termsConditionsError);
    termsConditions.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  termsConditions.parentElement.setAttribute("data-error-visible", false);
  return true;
}
// fonction pour le message de succès, ajoute un message avec innerHTML, et modifie la taille de l'affichage
function success() {
  form.style.height = "300px";
  form.innerHTML = successMsg;
}

// fonction qui est appelée au clic du bouton, permet la validation du formulaire, vérifie que toutes les fonctions retournent vrai avant d'afficher la fonction succès
// réinitialise le formulaire avec form.reset()
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
    form.reset();
    success();
    return true;
  } else {
    return false;
  }
}
