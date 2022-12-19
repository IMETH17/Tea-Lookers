// const today = document.querySelectorAll(".today");
const chevronDown               = document.querySelectorAll(".bi-chevron-down");
const durationselected          = document.getElementById("durationSelect");
// ------
const theForm                   = document.getElementById("theForm");
// -----
const duration_display          = document.getElementById("duration_display");
const cost_display              = document.getElementById("cost_display");
const localAdult_spanQuantity   = document.getElementById("localAdult_spanQuantity");
const localChild_spanQuantity   = document.getElementById("localChild_spanQuantity");
const ForeignAdult_spanQuantity = document.getElementById("foreignerAdult_spanQuantity");
const ForeignChild_spanQuantity = document.getElementById("foreignerChild_spanQuantity");
const infant_spanQuantity       = document.getElementById("infant_spanQuantity");
const localAdult_spanPrice      = document.getElementById("localAdult_spanPrice");
const localChild_spanPrice      = document.getElementById("localChild_spanPrice");
const ForeignAdult_spanPrice    = document.getElementById("foreignerAdult_spanPrice");
const ForeignChild_spanPrice    = document.getElementById("foreignerChild_spanPrice");

const quantity_btns             = document.querySelectorAll(".quantity-btn");
const addToOrder_btn            = document.getElementById("addToOrder_btn");
const placeOrder_btn            = document.getElementById("placeOrder_btn");
const displayTotalTickets       = document.getElementById("displayTotalTickets");
const displayTotalCost          = document.getElementById("displayTotalCost");
// -----
const ticket_type               = document.querySelectorAll(".currentOrder_displayPrice");
const displayCart               = document.querySelector("#display_cart");
const display_cartclass         = document.querySelector(".display_cart");

const successDisplay            = document.querySelector("#success-display");

const nameHelp                  = document.getElementById("nameHelp");
const guestContainer            = document.querySelector(".guest-container");
const guestName                 = document.getElementById("guestName");

const guestEmail                = document.getElementById("guestEmail");
const guestConfirmEmail         = document.getElementById("guestConfirmEmail");
const emailHelp                 = document.getElementById("emailHelp");
const emailConfirmHelp          = document.getElementById("emailConfirmHelp");

const teleHelp                  = document.getElementById("teleHelp");
const guestTele                 = document.getElementById("guestTele");

const failureDisplay            = document.getElementById("failureDisplay");
const favorite                  = document.getElementById("favorites");
const favDisplay                = document.getElementById("fav-html");


let cost1,cost2,cost3,cost4,totalCost;
let duration;
let tktQuantity;
let adultSlObj, childSlObj, adultForeignObj, childForeignObj, infantSlObj;
let tktTypeOut, tktQuantityOut, tktCorresDuration, tktCorresTotalPrice;
let orderRecord;
let i;
let orderCount;
let ordersArray;
let orderHtml;
let totalCostOut;
let totalTktsOut;
let orderClickCount;
let userName;
let email;
let phoneNum;
let dateString;
let user;
let successFailCondition;




// Initialising value during load
function init(){
    cost1, cost2, cost3, cost4 = 0;
    duration = 0;
    tktQuantity = {
      adultSl: 0,
      childSl: 0,
      adultForeign: 0,
      childForeign: 0,
      infant: 0,
    };
    tktTypeOut = "not selected";
    tktQuantityOut =  0;
    tktCorresDuration = "3 Hours";
    tktCorresTotalPrice = 0;
    updatedArray = ordersArray;
    i = 0;
    orderCount = 0;
    ordersArray = [];
    totalCostOut = 0;
    totalTktsOut = 0;
    orderClickCount = 0;
    userName = "";
    email = "";
    phoneNum = "+94 ";
    retrieveFromLocal();
}

// Constructor for each ticket type with user selected values
function tktObject (type, quant, pricePerTkt, totalPrice, duration){
  this.type = type;
  this.quant = quant;
  this.pricePerTkt = pricePerTkt;
  this.totalPrice = totalPrice;
  this.duration = duration;
}

// creating objects for each ticket type user selects
function createObject (el){
if (parseInt(el.innerText) > 0) {
  switch (el.id) {
    case "localAdult_spanPrice":
      adultSlObj = new tktObject("Local - Adult", tktQuantity.adultSl, "1,200", cost1,duration);
      // console.log(adultSlObj.totalPrice, adultSlObj.duration);, tkts[1]
      generateHTML(adultSlObj)
      break;
    case "localChild_spanPrice":
      childSlObj = new tktObject("Local - Child", tktQuantity.childSl, "700", cost2,duration);
      // console.log(childSlObj.totalPrice);, tkts[1]
      generateHTML(childSlObj)
      break;
    case "foreignerAdult_spanPrice":
      adultForeignObj = new tktObject("Foreigner - Adult", tktQuantity.adultForeign, "5,500", cost3,duration);
      // console.log(adultForeignObj.totalPrice);, tkts[1]
      generateHTML(adultForeignObj)
      break;
    case "foreignerChild_spanPrice":
      childForeignObj = new tktObject("Foreigner - Child", tktQuantity.childForeign, "2,700", cost4,duration);
      // console.log(childForeignObj.totalPrice);, tkts[1]
      generateHTML(childForeignObj)
      break;
  }
} else {
  console.log("error");
}
}


// function to add orders to an array of all orders during load time
function addToOrderArray (ordersArray,orderCount,orderHtml,orderObj) {
  ordersArray[orderCount] = {
    orderNumber : orderCount,
    orderHTML : orderHtml,
    orderObject :orderObj , 
  }
  console.log(ordersArray);
}

// function to generate dynamic HTML for the order cart
function generateHTML (Obj) {
  orderCount++;
  tktTypeOut = Obj.type;
  tktQuantityOut =  Obj.quant;
  tktCorresTotalPrice = Obj.totalPrice;
  switch(Obj.duration){
    case 0:
      tktCorresDuration = "3 Hours";
      break;
    case 350:
    case 450:
      tktCorresDuration = "Half Day";
      break;
    case 600:
    case 800:
      tktCorresDuration = "Full Day";
      break;
  } 

  orderHtml = `<tr>
  <div class="item px-3 py-2 border-rounded" id="${orderCount}">
                     <td><div><p>#${orderCount}</p></div></td>
                     <td><div><p>${tktTypeOut}</p></div></td>
                     <td><div><p>${tktQuantityOut}</p></div></td>
                     <td><div><p>${tktCorresTotalPrice}</p></div></td>
                     <td><div><p>${tktCorresDuration} </p></div></td>
                     <td><div><button class = "main_btns" onclick="updateOrder(${orderCount})">remove</button></div></td>
                     </div>
                     </tr>`;

  addToOrderArray(ordersArray, orderCount, orderHtml,Obj);
  displayOrders(ordersArray);

  // displayCart.innerHTML += ordersArray[orderCount].orderHTML;
}

// Function to display generated html
function displayOrders (arr){
     displayCart.innerHTML = "";
     arr.forEach((order) => {
       if (order !==null){
         displayCart.innerHTML += order.orderHTML;
       }
     });   
}

// function to update the cart if any order is removed, the corresponding order html is set to null
function updateCart (order){
      order.orderHTML = "";
      order.orderObject.type = "";
      order.orderObject.quant = 0;
      order.orderObject.pricePerTkt = 0;
      order.orderObject.totalPrice = 0;
      order.orderObject.duration = 0; 
}

// function to remove the user removed orders from the array storing orders
function updateOrder(id){
  ordersArray.forEach(order=>{
     if ( order.orderNumber === id){
      updateCart(order);
     }
  })
  console.log(ordersArray);
  displayOrders(ordersArray);
  calTotal(ordersArray);
}

// function to check if the quantity of tickets > 1, if so proceed with adding to the cost
function checkCost(tktQuant, tktPrice) {
  console.log(duration);
  return tktQuant > 0 ? tktQuant * (tktPrice + duration) : 0;
}

// function to check if the selected duration is for local or foreign rate
function checkDuration(tktType, value1,value2){
  return tktType.slice(5, 8) === "Sl" ? value1 : value2;
}

// function to check if the quantity of tickets > 1
function checkQuantity(tktQuant){
  return tktQuant > 0 ? tktQuant : 0 ;
}

// ///////////////////////Chevron down///////////////////////////////////////////
//function for dynamic display of dropdowns
function clickedField(){
  switch (this.id) {
    case "chevron_date":
      document.querySelector(".chevron_date").classList.toggle("hidden");
      break;
    case "chevron_guestDetails":
      document
        .querySelector(".chevron_guestDetails")
        .classList.toggle("hidden");
      break;
    case "chevron_ticketSelect":
      document
        .querySelector(".chevron_ticketSelect")
        .classList.toggle("hidden");
      break;
    case "chevron_guestDetails":
      document
        .querySelector(".chevron_guestDetails")
        .classList.toggle("hidden");
      break;
  }
}
// ///////////////////////Chevron down - END/////////////////////////////////////////

// function to reset the form fields
function resetForm(){
  quantity_adultSl.value = 0;
  quantity_childSl.value = 0;
  quantity_adultForeign.value = 0;
  quantity_childForeign.value = 0;
  quantity_infant.value = 0;
  localAdult_spanQuantity.innerText = "0";
  localChild_spanQuantity.innerText = "0";
  ForeignAdult_spanQuantity.innerText = "0";
  ForeignChild_spanQuantity.innerText = "0";
  infant_spanQuantity.innerText = "0";
  localAdult_spanPrice.innerText = "0.00" ;
  localChild_spanPrice.innerText = "0.00" ;
  ForeignAdult_spanPrice.innerText = "0.00" ;
  ForeignChild_spanPrice.innerText = "0.00" ;
  cost_display.innerText = "0.00";
  duration_display.innerText = "3 Hours"
};

// function to find the duration selected by user
function dynamicDisplayToDuration(){
     tktQuantity.adultSl = adultSl_tkts;
     tktQuantity.childSl = childSl_tkts;
     tktQuantity.adultForeign = adultForeign_tkts;
     tktQuantity.childForeign = childForeign_tkts;
     tktQuantity.infant = infant_tkts; 
     Object.entries(tktQuantity).forEach((tkts) => {
     console.log(tkts[0]);
     switch (durationselected.value) {
       case "3Hour":
         duration = 0;
         duration_display.innerText = `3 Hours`;
         dynamicDisplayToBtn(tkts[0],tkts[1]);
         break;
       case "halfDay":
         duration = checkDuration(tkts[0], 350, 450);
         console.log(duration);
         duration_display.innerText = `Half Day`;
         dynamicDisplayToBtn(tkts[0],tkts[1]);
         break;
       case "fullDay":
         duration = checkDuration(tkts[0], 600, 800);
         console.log(duration);
         duration_display.innerText = `Full Day`;
         dynamicDisplayToBtn(tkts[0],tkts[1]);
         break;
     }
})};

// function to find the type of ticket selected by user
function dynamicDisplayToBtn(type,value){
     switch (type) {
       case "adultSl":
         cost1 = checkCost(value, 1200);
         localAdult_spanPrice.innerText = `${cost1}.00`;
         localAdult_spanQuantity.innerText = checkQuantity(value);
         break;
       case "childSl":
         cost2 = checkCost(value, 700);
         localChild_spanPrice.innerText = `${cost2}.00`;
         localChild_spanQuantity.innerText = checkQuantity(value);
         break;
       case "adultForeign":
         cost3 = checkCost(value, 5500);
         ForeignAdult_spanPrice.innerText = `${cost3}.00`;
         ForeignAdult_spanQuantity.innerText = checkQuantity(value);
         break;
       case "childForeign":
         cost4 = checkCost(value, 2700);
         ForeignChild_spanPrice.innerText = `${cost4}.00`;
         ForeignChild_spanQuantity.innerText = checkQuantity(value);
         break;
       case "infant":
         infant_spanQuantity.innerText = checkQuantity(value);
         break;
     }
     totalCost = cost1 + cost2 + cost3 + cost4;
    //  console.log(totalCost);
     cost_display.innerText = `${totalCost}.00`;
}


// function to reset objects 
function resetObjects () {
  adultSl_tkts=0;
  childSl_tkts=0;
  adultForeign_tkts=0;
  childForeign_tkts=0;
  infant_tkts = 0;
  cost1,cost2,cost3,cost4 = 0;
  duration = 0;
}


// fucntion to generate order successfull message with total ticket price and quantity
function calTotal(ordersArray){
  console.log(ordersArray);
  ordersArray.forEach(order=>{
    if (order !==null){
          totalCostOut += order.orderObject.totalPrice;
          totalTktsOut += order.orderObject.quant;
    }
    // updateCart(order);
  })
  displayTotalCost.innerText = `${totalCostOut}.00`;
  displayTotalTickets.innerText = `${totalTktsOut}`;
  totalTktsOut = 0;
  totalCostOut = 0;
}


function guestDetailObj(name, email, mobile, order, date) {
  this.name = name;
  this.email = email;
  this.mobile = mobile;
  this.order = order;
  this.date = date; 
}

function checkNameTkt(name) {
  const regName = /[^a-zA-Z ]/g;
  userName = guestName.value.split(" ");
  if (
    checkForValid(!regName.test(name.value) && userName.length > 1, nameHelp)
  ) {
    userName = guestName.value;
  } else {
    userName = "";
  }
}

function checkEmail(email, help) {
  const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (checkForValid(regEmail.test(email.value), help)) {
    return true;
  } else {
    return false;
  }
}

function confirmEmail() {
  let email1 = checkEmail(guestEmail, emailHelp) ? guestEmail.value : "";
  console.log(email1);
  let email2 = checkEmail(guestConfirmEmail, emailConfirmHelp)
    ? guestConfirmEmail.value
    : "";
  console.log(email2);
  if (email1 === email2 && email1 !== "" && email2 !== "") {
    emailConfirmHelp.textContent = "looks good!";
    emailHelp.textContent = "looks good!";
    email = email1;
  } else {
    emailConfirmHelp.textContent = "email mismatch error";
    emailHelp.textContent = "email mismatch error";
    email = "";
  }
}

function checkForValid(bool, textHelp) {
  textHelp.classList.remove("text-success");
  textHelp.classList.remove("text-danger");
  if (bool) {
    textHelp.innerText = "Looks good!";
    textHelp.classList.add("text-success");
    return true;
  } else {
    textHelp.classList.add("text-danger");
    switch (textHelp) {
      case nameHelp:
        textHelp.innerText =
          "Name should be more than 2 words and contain only letters";
        return false;
      case emailHelp:
        textHelp.innerText = "Invalid email";
        return false;
      case emailConfirmHelp:
        textHelp.innerText = "Invalid email";
        return false;
      case teleHelp:
        textHelp.innerText = "Phone number should be 10 digits";
    }
  }
}

function checkTeleNum(tele) {
  const teleReg = /[0-9]{10}/g;
  if (
    checkForValid(
      tele.value.length === 10 && teleReg.test(tele.value),
      teleHelp
    )
  ) {
    phoneNum += tele.value;
  } else {
    phoneNum = "+94 ";
  }
}


// function to show the cart once clicked
function showCart() {
  // if (display_cartclass.classList.contains("hidden")) {
    display_cartclass.classList.toggle("hidden");
  // }
}


// function to show succees msg once clicked
function showSuccess() {
  // if (successDisplay.classList.contains("hidden")){
  successDisplay.classList.toggle("hidden");
  // }
}

function showFav(){
  favorite.classList.toggle("hidden");
}


const userInfo = document.getElementById("user-info");
function generateUserInfoHtml() {
  const html = `      
      <table>
        <tbody>
          <tr>
            <p><td>Booked for</td> <td>&nbsp;:&nbsp;</td> <td>${dateString}</td> </p>
          </tr>
          <tr>
            <p><td>Name</td> <td>&nbsp;:&nbsp;</td> <td>${userName}</td> </p>
          </tr>
          <tr>
            <p><td>Email</td> <td>&nbsp;:&nbsp;</td> <td>${email}</td> </p>
          </tr>
          <tr>
            <p><td>Phone Number</td> <td>&nbsp;:&nbsp;</td> <td>${phoneNum}</td> </p>
          </tr>
        </tbody>
      </table>`;
  userInfo.innerHTML = html;
}
function resetCart() {
  displayCart.innerHTML = "";
  userInfo.innerHTML = "";
  showCart();
  displayTotalCost.innerText = 0;
  displayTotalTickets.innerText = 0;
}

function showFailure() {
  console.log("hey");
  failureDisplay.classList.toggle("hidden");
}


function generateFavHtml(){
  successFailCondition =
    parseInt(displayTotalCost.innerText) > 0 &&
    parseInt(displayTotalTickets.innerText) > 0;
if (successFailCondition){
  if (localStorage.getItem("user")){
    localStorage.removeItem("user");
  }
  user = new guestDetailObj(
    userName,
    email,
    phoneNum,
    ordersArray,
    dateString,
    );
    localStorage.setItem("user", JSON.stringify(user))
    let tktType, tktTotalPrice,tktTotalQuant,htmlOrder;
    user.order.forEach(order=>{
      if (order!==null){
              tktType = order.orderObject.type;
              tktTotalPrice = order.orderObject.totalPrice;
              tktTotalQuant = order.orderObject.quant;
              htmlOrder += `
      <tr>
      <p><td>Type</td> <td>:</td><td>${tktType}</td></p>
      </tr>  
      <tr>
      <p><td>Number of tickets</td> <td>:</td><td>${tktTotalQuant}</td></p>
      </tr>       
      <tr>
      <p><td>Price of tickets</td> <td>:</td><td>${tktTotalPrice}</td></p>
      </tr> `;
      }
    })
    
    const html = `      
    <table class="table">
    <tbody class="container-fluid">
    <tr>
    <p><td>Name</td><td>:</td><td>${user.name}</td></p>
    </tr>
    <tr>
    <p><td>Email</td><td>:</td><td>${user.email}</td></p>
    </tr>
    <tr>
    <p><td>Phone Number</td><td>:</td><td>${user.mobile}</td></p>
    </tr>
    <tr>
    <p><td>Order</td></p>
    </tr>
    </tbody>
    </table>
    <table class="table">
    <tbody>
    ${htmlOrder}
    </tbody>
    </table>
    <button class="btn btn-success" onclick="favOrderAdd()">Add to order</button>`;
    favDisplay.innerHTML = html;
  }else{
    showFailure();
  }
  console.log(user);
}

function retrieveFromLocal(){
      user = JSON.parse(localStorage.getItem("user"))
      console.log(user);
      let tktType, tktTotalPrice, tktTotalQuant, htmlOrder;
      user.order.forEach((order) => {
        if (order !== null){
          tktType = order.orderObject.type;
          tktTotalPrice = order.orderObject.totalPrice;
          tktTotalQuant = order.orderObject.quant;
          htmlOrder += `
        <tr>
        <p><td>Type</td> <td>:</td><td>${tktType}</td></p>
        </tr>  
        <tr>
        <p><td>Number of tickets</td> <td>:</td><td>${tktTotalQuant}</td></p>
        </tr>       
        <tr>
        <p><td>Price of tickets</td> <td>:</td><td>${tktTotalPrice}</td></p>
        </tr> `;
        }
      });

      const html = `      
    <table class="table">
    <tbody class="container-fluid">
    <tr>
    <p><td>Name</td><td>:</td><td>${user.name}</td></p>
    </tr>
    <tr>
    <p><td>Email</td><td>:</td><td>${user.email}</td></p>
    </tr>
    <tr>
    <p><td>Phone Number</td><td>:</td><td>${user.mobile}</td></p>
    </tr>
    <tr>
    <p><td>Order</td></p>
    </tr>
    </tbody>
    </table>
    <table class="table">
    <tbody>
    ${htmlOrder}
    </tbody>
    </table>
    <button class="btn btn-success" onclick="favOrderAdd()">Add to order</button>`;
      favDisplay.innerHTML = html;
}

const loyaltyDisplay = document.getElementById("loyalty-display");

// function loyaltyUserObj(name, points){
//   this.name = name;
//   this.points = points;
// }

// let loyaltyUsers = [];

// function generateUser(){
//   let newUser = new loyaltyUserObj()
// }

// function addToloyaltyUserArray(name, loyaltypoints,userId) {
//   loyaltyUsersArray[userId] = {
//     orderNumber: orderCount,
//     orderHTML: orderHtml,
//     orderObject: orderObj,
//   };
//   console.log(ordersArray);
// }


function checkLoyalPoints(orderArr){
  let itemCount = 0;
  orderArr.forEach(order=>{
    let loyaltyPoints;
    if (order!==null){
      itemCount +=order.orderObject.quant; 
    }
    if (itemCount >=3){
      loyaltyPoints = itemCount * 15;
      console.log(loyaltyPoints);
      loyaltyDisplay.innerText = loyaltyPoints;
    }
  })
}

const loyaltyModal = document.getElementById("loyaltyModal");

function showLoyalty(){
  loyaltyModal.classList.toggle("hidden");
  if (ordersArray.length !== 0){
    checkLoyalPoints(ordersArray);
  }else{
    checkLoyalPoints(user.order);
  };
}


function favOrderAdd() {
  displayOrders(user.order);
  calTotal(user.order);
}
// ///////////////////////Event listeners/////////////////////////////////////////////

window.addEventListener("load", init);

chevronDown.forEach((clickEvent) => {
  clickEvent.addEventListener("click", clickedField);
});

guestContainer.addEventListener("change", ()=>{
  checkNameTkt(guestName);
  confirmEmail();
  checkTeleNum(guestTele)
})

addToOrder_btn.addEventListener("click", () => {
  console.log("-------------------------hey");

  ticket_type.forEach(element=>{
    createObject(element);
  }) 
  resetForm();
  resetObjects();
  updateOrder();
  dateString = `${selectedDay}/${selectedMonth}/${selectedYear}`;
  generateUserInfoHtml();

});

durationselected.addEventListener("click", dynamicDisplayToDuration)

quantity_btns.forEach(btn=>{
  btn.addEventListener("click", dynamicDisplayToDuration);
})

placeOrder_btn.addEventListener("click", ()=>{
  successFailCondition =
      parseInt(displayTotalCost.innerText) > 0 &&
      parseInt(displayTotalTickets.innerText) > 0;
  if (successFailCondition) {
    showSuccess();
    resetCart();
  } else {
    showFailure();
  }

});

display_cartclass.addEventListener("change",updateOrder);

theForm.addEventListener("click", (e) => {
  e.preventDefault();
});

// let me = new guestDetailObj ("imeth","","","","","")
// console.log(me);

// function guestDetailObj(name, email, mobile, order, date) {
//   this.name = name;
//   this.email = email;
//   this.mobile = mobile;
//   this.order = order;
//   this.date = date;
// }




























