const form = document.querySelector("#form");
const small = document.querySelector("small");

form.onsubmit = function (e) {
  e.preventDefault();

  checkRequiredFields([username, email, password, password2]);
  checkEmailValidation(email);
  checkPasswordMatch(password, password2);
};

function checkRequiredFields(formElementsArray) {
  formElementsArray.map((input) => {
    if (input.value === "") {
      showError(input, "is required");
    } else {
      showSuccess(input);
    }
  });
}

function checkEmailValidation(email) {
  if (email.value !== "") {
    if (isValidEmail(email.value)) {
      showSuccess(email);
    } else {
      showError(email, "is not valid");
    }
  }
}

function checkPasswordMatch(password, confirmPassword) {
  if (password.value !== "" && confirmPassword.value !== "") {
    if (password.value === confirmPassword.value) {
      showSuccess(confirmPassword);
    } else {
      showError(confirmPassword, "is not match.");
    }
  }
}

function showError(input, message) {
  const formControl = input.parentNode;
  let small = formControl.querySelector("small");

  formControl.classList.remove("success");
  formControl.classList.add("error");

  small.innerText = `${input.id + " " + message}`;
}

function showSuccess(input) {
  const formControl = input.parentNode;

  formControl.classList.remove("error");
  formControl.classList.add("success");
}

function isValidEmail(userEmail) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (userEmail.match(mailformat)) {
    return true;
  }
  return false;
}
