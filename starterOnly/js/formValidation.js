// get form fields
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkboxCity = document.getElementsByClassName("checkbox-label");

// écouteur d'évenements pour chaque champs du formulaire

firstname.addEventListener('input', verifyFirstName);
lastname.addEventListener('input', verifyLastName);
email.addEventListener('input', verifyEmail);
birthdate.addEventListener('input', verifyBirthDate);
quantity.addEventListener('input', verifyQuantity);

// message d'erreur champs de formulaire

const nameErrorMsg ="Veuillez entrer 2 caractères alphabétique ou plus pour le champ du nom."
const emailErrorMsg =" un email valide est requis"
const birthdateMsgError =" vous devez entrez votre age"
const quantityError ="vous devez selectionnez une quantité"
const checkboxCityError="vous devez selectionnez une ville"
// expression régulière pour vérifier qu'un champ est valide et ne contient pas de numéro ni de caractères spéciaux, et contient au moins 2 caractères pour le prénom et le nom, et une adresse e-mail valide pour l'e-mail.
const regexName = /^[a-zA-Z]{2,}$/;
const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// fonctions pour vérifier les champs saisis par l'utilisateur
function verifyFirstName() {
  if (!regexName.test(firstname.value)) {
    console.log("Prénom invalide");
    
    return false;
  }
 
  return true;
}

function verifyLastName() {
  if (!regexName.test(lastname.value)) {
    console.log("Nom invalide");
   
    return false;
  }
 
  return true;
}

function verifyEmail() {
  if (!regexEmail.test(email.value)) {
    console.log("Email invalide");
    
    return false;
  }
 
  return true;
}

function verifyBirthDate() {
    const dateUser = new Date(birthdate.value);
    const date= dateUser.getDate();
    const yearUser = dateUser.getFullYear();
    if(!yearUser){
        
        return false;
    }
    
    return true;
}

function verifyQuantity() {

    if(!isNaN(quantity.value) && quantity.value == ""){
       
        return false;
    }
    
    return true;
}

function verifyCheckboxCity() {
 
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
    console.log("Formulaire valide. Soumission en cours...");

    return true;
  } else {
    console.log("Le formulaire contient des champs invalides. Veuillez vérifier les champs.");
    return false;
  }
}
