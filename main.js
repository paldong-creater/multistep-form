let planSum = 0;
let addonsSum = 0;

let step1 = document.getElementById("step1");
let step2 = document.getElementById("step2");
let step3 = document.getElementById("step3");
let step4 = document.getElementById("step4");

let personalInfo = document.getElementById("personal-info");
let plan = document.getElementById("plan");
let addOns = document.getElementById("addOns");
let summary = document.getElementById("summary");
let thankYou = document.getElementById("thankyou");
let nextButton = document.getElementById("nextButton");
let backButton = document.getElementById("backButton");
let empty = document.getElementById("empty");
let change = document.getElementById("change");
let footer = document.getElementById("footer");

let currentDisplay = "personal-info";
nextButton.addEventListener("click", function () {
  if (currentDisplay == "personal-info") {
    if (checkInput()) {
      step1.classList.remove("circle-highlight");
      step2.classList.add("circle-highlight");
      personalInfo.style.display = "none";
      plan.style.display = "grid";
      empty.style.display = "none";
      backButton.style.display = "block";
      currentDisplay = "plan";
    } else {
      return false;
    }
  } else if (currentDisplay == "plan") {
    step2.classList.remove("circle-highlight");
    step3.classList.add("circle-highlight");
    plan.style.display = "none";
    addOns.style.display = "grid";
    currentDisplay = "addOns";
  } else if (currentDisplay == "addOns") {
    step3.classList.remove("circle-highlight");
    step4.classList.add("circle-highlight");
    addOns.style.display = "none";
    summary.style.display = "grid";
    nextButton.innerText = "Confirm";
    nextButton.style.backgroundColor = "hsl(243, 100%, 62%)";
    currentDisplay = "summary";
    showAddons();
  } else {
    summary.style.display = "none";
    footer.style.display = "none";
    thankYou.style.display = "grid";
  }
});

change.addEventListener("click", function () {
  step4.classList.remove("circle-highlight");
  step2.classList.add("circle-highlight");
  summary.style.display = "none";
  plan.style.display = "grid";
  nextButton.innerText = "Next Step";
  nextButton.style.backgroundColor = "hsl(213, 96%, 18%)";
  currentDisplay = "plan";
  removeAddons();
});

backButton.addEventListener("click", function () {
  if (currentDisplay == "plan") {
    step2.classList.remove("circle-highlight");
    step1.classList.add("circle-highlight");
    plan.style.display = "none";
    personalInfo.style.display = "grid";
    backButton.style.display = "none";
    empty.style.display = "block";
    currentDisplay = "personal-info";
  } else if (currentDisplay == "addOns") {
    step3.classList.remove("circle-highlight");
    step2.classList.add("circle-highlight");
    addOns.style.display = "none";
    plan.style.display = "grid";
    currentDisplay = "plan";
  } else if (currentDisplay == "summary") {
    step4.classList.remove("circle-highlight");
    step3.classList.add("circle-highlight");
    summary.style.display = "none";
    addOns.style.display = "grid";
    currentDisplay = "addOns";
    nextButton.innerText = "Next Step";
    nextButton.style.backgroundColor = "hsl(213, 96%, 18%)";
    removeAddons();
  }
});

// plan functionality

let radioBtns = document.querySelectorAll('input[name="plan"]');
let radioLabels = document.querySelectorAll(".plan-radio label");

let switchBox = document.getElementById("switch");
let findChecked = () => {
  planSum = 0;
  radioLabels.forEach((l) => l.classList.remove("border-blue"));
  let selected = document.querySelector('input[name="plan"]:checked').value;
  let ele = document.querySelector(`label[for="${selected}"]`);
  ele.classList.add("border-blue");

  let planName = document.getElementById("planName");
  let planCost = document.getElementById("planCost");
  if (switchBox.checked == true) {
    if (selected == "arcade") {
      planName.innerHTML = "Arcade" + " " + "(Yearly)";
      planCost.innerHTML = "$90/yr";
      planSum = 90;
    } else if (selected == "advanced") {
      planName.innerHTML = "Advance" + " " + "(Yearly)";
      planCost.innerHTML = "$120/yr";
      planSum = 120;
    } else {
      planName.innerHTML = "Pro" + " " + "(Yearly)";
      planCost.innerHTML = "$150/yr";
      planSum = 150;
    }
  } else {
    if (selected == "arcade") {
      planName.innerHTML = "Arcade" + " " + "(Monthly)";
      planCost.innerHTML = "$9/mo";
      planSum = 9;
    } else if (selected == "advanced") {
      planName.innerHTML = "Advance" + " " + "(Monthly)";
      planCost.innerHTML = "$12/mo";
      planSum = 12;
    } else {
      planName.innerHTML = "Pro" + " " + "(Monthly)";
      planCost.innerHTML = "$15/mo";
      planSum = 15;
    }
  }
};

radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener("click", findChecked);
});
findChecked();

// check if monthly or yearly

let monthly = document.getElementsByClassName("monthly");
let yearly = document.getElementsByClassName("yearly");
switchBox.addEventListener("change", function () {
  if (switchBox.checked == true) {
    document.getElementById("year").style.color = "hsl(213, 96%, 18%)";
    document.getElementById("month").style.color = "hsl(231, 11%, 63%)";

    for (let month of monthly) {
      month.style.display = "none";
    }

    for (let year of yearly) {
      year.style.display = "block";
    }
  } else {
    document.getElementById("month").style.color = "hsl(213, 96%, 18%)";
    document.getElementById("year").style.color = "hsl(231, 11%, 63%)";
    for (let month of monthly) {
      month.style.display = "block";
    }

    for (let year of yearly) {
      year.style.display = "none";
    }
  }
  findChecked();
});

let checkBoxes = document.querySelectorAll('input[name="addOns"]');
listArr = [];
for (let checkBox of checkBoxes) {
  checkBox.addEventListener("change", function () {
    if (this.checked == true) {
      listArr.push(this.value);
      document
        .querySelector(`fieldset[id="${this.value}"]`)
        .classList.add("border-blue");
    } else {
      listArr = listArr.filter((ele) => ele !== this.value);
      document
        .querySelector(`fieldset[id="${this.value}"]`)
        .classList.remove("border-blue");
    }
  });
}

let selectedAddons = document.getElementById("selectedAddons");
function showAddons() {
  addonsSum = 0;
  let addonsArrName, addonsArrCost;
  for (let i = 0; i < listArr.length; i++) {
    let addonsArr = listArr[i];
    if (switchBox.checked == true) {
      if (addonsArr == "online") {
        addonsArrName = "Online service";
        addonsArrCost = "+$10/yr";
        addonsSum += 10;
      } else if (addonsArr == "storage") {
        addonsArrName = "Large storage";
        addonsArrCost = "+$20/yr";
        addonsSum += 20;
      } else {
        addonsArrName = "Customizable profile";
        addonsArrCost = "+$20/yr";
        addonsSum += 20;
      }
    } else {
      if (addonsArr == "online") {
        addonsArrName = "Online service";
        addonsArrCost = "+$1/mo";
        addonsSum += 1;
      } else if (addonsArr == "storage") {
        addonsArrName = "Large storage";
        addonsArrCost = "+$2/mo";
        addonsSum += 2;
      } else {
        addonsArrName = "Customizable profile";
        addonsArrCost = "+$2/mo";
        addonsSum += 2;
      }
    }
    var newDiv = document.createElement("div");
    newDiv.className = "addonsList";
    var newP = document.createElement("p");
    newP.className = "addonsName";
    newP.innerHTML = addonsArrName;
    newDiv.appendChild(newP);
    var newH4 = document.createElement("h5");
    newH4.className = "addonsCost";
    newH4.innerHTML = addonsArrCost;
    newDiv.appendChild(newH4);
    selectedAddons.appendChild(newDiv);
  }
  let period1 = switchBox.checked ? "yr" : "mo";
  let period2 = switchBox.checked ? "year" : "month";

  let sum = planSum + addonsSum;
  document.getElementById("totalText").innerHTML = `Total (per ${period2})`;
  document.getElementById("totalCost").innerHTML = `+$${sum}/${period1}`;
}

function removeAddons() {
  selectedAddons.innerHTML = "";
}

// Form validation

function checkInput() {
  const usernameEl = document.querySelector("#name");
  const emailEl = document.querySelector("#email");
  const phoneEl = document.querySelector("#phone");

  const infoForm = document.querySelector("#infoForm");

  const checkUsername = () => {
    let valid = false;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
      showError(usernameEl, "This field is required");
    } else {
      showSuccess(usernameEl);
      valid = true;
    }
    return valid;
  };

  const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
      showError(emailEl, "This field is required");
    } else if (!isEmailValid(email)) {
      showError(emailEl, "Email is not valid");
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };

  const checkPhone = () => {
    let valid = false;

    const phone = phoneEl.value.trim();

    if (!isRequired(phone)) {
      showError(phoneEl, "This field is required");
    } else if (!isNumberValid(phone)) {
      showError(phoneEl, "Enter 10 digit phone number");
    } else {
      showSuccess(phoneEl);
      valid = true;
    }
    return valid;
  };

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isNumberValid = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const isRequired = (value) => (value === "" ? false : true);

  const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    input.classList.remove("success");
    input.classList.add("error");

    // show the error message
    const error = formField.querySelector("small");
    error.textContent = message;
  };

  const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    input.classList.remove("error");
    input.classList.add("success");

    // hide the error message
    const error = formField.querySelector("small");
    error.textContent = "";
  };

  // validate fields
  let isUsernameValid = checkUsername(),
    isMailValid = checkEmail(),
    isPhoneValid = checkPhone();

  let isFormValid = isUsernameValid && isMailValid && isPhoneValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    return true;
  } else {
    return false;
  }
}
