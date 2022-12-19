"use strict";
const btn_donation     = document.querySelectorAll(".btn-donation");
const donationHelp     = document.getElementById("donationHelp");
const cardNumber       = document.getElementById("cardNumber");
const cardNumHelp      = document.getElementById("cardNumHelp");
const cvv              = document.getElementById("cvv");
const cvvNumHelp       = document.getElementById("cvvNumHelp");
const cardName         = document.getElementById("nameOnCard");
const cardNameHelp     = document.getElementById("cardNameHelp");
const donation_display = document.getElementById("donation_display");
const donateForm       = document.getElementById("donateForm");
const expireMM         = document.getElementById("expireMM");
const expireYY         = document.getElementById("expireYY");
const expiryHelp       = document.getElementById("expiryHelp");
const pay_btn          = document.getElementById("pay_btn");

let donation;

function init() {
  donation = 0;
}



function setDonation(){
  console.log(this.innerText);
  donation = parseFloat(this.innerText);
  this.classList.toggle("btn-primary");
  console.log(donation);
  donationHelp.innerHTML = "";
  donation_display.innerHTML = `<p>Donation Amount : ${donation}.00</p>`
}


function checkCardNumValid(cardNumber){
  const regCardNum = /[0-9 ]{19}/g;
  displayHelp(regCardNum.test(cardNumber.value), cardNumHelp)
}

function chechCvv(cvv){
  const regCvvNum = /[0-9]{3}/;
  displayHelp(regCvvNum.test(cvv.value),cvvNumHelp);
}

function checkName(name) {
  const regName = /[^A-Z \W]/g;
  displayHelp(!regName.test(name.value),cardNameHelp)
}

function checkMonth(month,year){
  if (year.value === ""){
    expiryHelp.innerText = "Please select valid year";
    expiryHelp.classList.add("text-danger");
  }else if (month.value ===""){
    expiryHelp.innerText = "Please select valid month";
    expiryHelp.classList.add("text-danger");
  }else{
    displayHelp(false, expiryHelp);
  }
}

function displayHelp(bool,helpTxt){
    helpTxt.classList.remove("text-success");
    helpTxt.classList.remove("text-danger");
    if (bool) {
      helpTxt.innerText = "Looks good!";
      helpTxt.classList.add("text-success");
    } else {
      switch (helpTxt) {
        case cardNameHelp:
          cardNameHelp.innerText = "Please enter name in upper case letters";
          cardNameHelp.classList.add("text-danger");
          break;
        case cvvNumHelp:
          cvvNumHelp.innerText = "Enter valid cvv";
          cvvNumHelp.classList.add("text-danger");
          break;
        case cardNumHelp:
          cardNumHelp.innerText =
            "Please enter valid card number (Contains 16 digits)";
          cardNumHelp.classList.add("text-danger");
          break;
        case expiryHelp:
          expiryHelp.innerText="Looks good!"
          expiryHelp.classList.add("text-success");
          break;
      }
    }
}

const successDonation = document.getElementById("successDonation");
const donationAmount = document.getElementById("donation-amount");

function showSuccessDonation(){
  successDonation.classList.toggle("hidden");
  donationAmount.innerText = `LKR ${donation}.00`;
}

const formfields = document.querySelectorAll(".form-fields");
const formHelps = document.querySelectorAll(".form-help");

function resetForm(){
  formfields.forEach(form=>{
    form.value = "";
  })
  formHelps.forEach(helps=>{
    helps.innerText = "";
  })
  donation_display.innerHTML = "";
}


/////////////////////////////////////////////////////////////////////////

btn_donation.forEach(donation=>{
  donation.addEventListener("click", setDonation)
})

cardNumber.addEventListener("keyup", ()=>{
  let num = cardNumber.value;
  if (num.length === 16 ){
      let newNum = "";
      console.log(num);

      num = num.replace(/\s/g, "");
      console.log(num);
      for (let i = 0; i < num.length; i++) {
        if (i % 4 == 0 && i > 0) newNum = newNum.concat(" ");
        // concatenate the new value
        newNum = newNum.concat(num[i]);
      }
      cardNumber.value = newNum;
  }
})


window.addEventListener("load", init)

donateForm.addEventListener("change",()=>{
  // e.preventDefault();
  checkCardNumValid(cardNumber);
  chechCvv(cvv)
  checkName(cardName)
  checkMonth(expireMM,expireYY)
  donationHelp.innerHTML = donation === 0 ? "<p class='text-danger'>Please select donation</p>" : ""; 
})

pay_btn.addEventListener("click",(e)=>{
  e.preventDefault();
  console.log(342);
  showSuccessDonation();
  resetForm();

})







