/*
  ///////////////////////////////////////////////

  Profile Dropdown
 
  ///////////////////////////////////////////////
*/

const profile__menu = document.querySelector(".profile__menu");
const profileBtn = document.getElementById("profileBtn");

/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

//Toggle the DropDown Menu and Scale the ProfieBtn
function toggleProfileDropdown(event) {
  event.target.classList.toggle("icon-hover"); // Toggle the icon hover for profileBtn
  event.target.classList.toggle("icon-active"); //Scale the profileBtn
  profile__menu.classList.toggle("profile__menu-active");
}

//Closes Profile Dropdown Menu
function closeProfileDropdown(event) {
  if (event.target.id != "profileBtn") {
    if (profile__menu.classList.contains("profile__menu-active")) {
      profileBtn.classList.remove("icon-active");
      profileBtn.classList.toggle("icon-hover");
      profile__menu.classList.remove("profile__menu-active");
    }
  }
}

/*
  -----------------------------------------------
  Event Listeners
  -----------------------------------------------
*/

//Adding Click Event on ProfileBtn
profileBtn.addEventListener("click", toggleProfileDropdown);

// Adding Click Event on Document to Close Profile Dropdown
document.addEventListener("click", closeProfileDropdown);

/*
  ///////////////////////////////////////////////

  Functions for  Increase, Decrease or Delete CART Item Quantity
 
  ///////////////////////////////////////////////
*/

const decBtns = document.querySelectorAll(".dec");
const incBtns = document.querySelectorAll(".inc");
const removeBtns = document.querySelectorAll(".remove__item");

/*
  -----------------------------------------------
  Patch Cart Request or Update Quantity
  -----------------------------------------------
*/
async function patchCart(id, newQty) {
  const url = `cart/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    // The content to update
    body: JSON.stringify({
      qty: newQty,
    }),
  });
  location.reload();
}

/*
  -----------------------------------------------
  Delete Cart Request or Delete Item
  -----------------------------------------------
*/
async function deleteCart(id) {
  const url = `cart/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // The content to update
    body: JSON.stringify({}), //No Body Or Payload
  });
  location.reload();
}

/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

//Decrease Quantity
function decQty(event) {
  let itemId = null;
  let currentQty = null;

  const btn = event.target;
  const children = btn.parentElement.children;

  //Converting HTML Collection to Array for Using forEach
  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
    if (element.id == "qty") {
      currentQty = +element.value;
    }
  });
  const newQty = currentQty - 1;
  if (newQty == 0) {
    deleteCart(itemId);
  } else {
    patchCart(itemId, newQty);
  }
}

//Increase Quantity
function incQty(event) {
  let itemId = null;
  let currentQty = null;

  const btn = event.target;
  const children = btn.parentElement.children;

  //Converting HTML Collection to Array for Using forEach
  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
    if (element.id == "qty") {
      currentQty = +element.value;
    }
  });
  const newQty = currentQty + 1;
  patchCart(itemId, newQty);
}

//Remove Item
function removeItem(event) {
  let itemId = null;

  const btn = event.target;
  const children = btn.parentElement.parentElement.children;

  //Converting HTML Collection to Array for Using forEach
  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
  });
  deleteCart(itemId);
}

/*
  -----------------------------------------------
  Event Listeners
  -----------------------------------------------
*/

//Adding Click Event on Decrement Button
decBtns.forEach((btn) => {
  btn.addEventListener("click", decQty);
});

//Adding Click Event on Increment Button
incBtns.forEach((btn) => {
  btn.addEventListener("click", incQty);
});

//Adding Click Event on Remove Button
removeBtns.forEach((btn) => {
  btn.addEventListener("click", removeItem);
});

/*
  ///////////////////////////////////////////////

  Functions to Edit and Patch DELIVERY ADDRESS
 
  ///////////////////////////////////////////////
*/

let addressInput = document.getElementById("newAddress");
let updateBtn = document.getElementById("updateBtn");
let editBtn = document.getElementById("editBtn");
let addressContainer = document.getElementById("addressContainer");
let proceedContainer = document.getElementById("proceedContainer");

function getvariables() {
  addressInput = document.getElementById("newAddress");
  updateBtn = document.getElementById("updateBtn");
  // const editBtn = document.getElementById("editBtn");
  // const addressContainer = document.getElementById("addressContainer");
}

/*
  -----------------------------------------------
  Patch Address Request or Update Address
  -----------------------------------------------
*/
async function patchAddress(newAddress) {
  const url = "/user/u/address";
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    // The content to update
    body: JSON.stringify({
      newValue: newAddress,
    }),
  });
  location.reload();
}

/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

//Update ADDRESS
function updateAddress() {
  const newAddress = addressInput.value;
  patchAddress(newAddress);
}

//Edit Address
function editAddress() {
  addressContainer.innerHTML = `<input type="text" id="newAddress" name="address" class="address__input" placeholder="Enter your address" spellcheck="false">
  <button class="update__btn" id="updateBtn">Update</button>`;
  proceedContainer.innerHTML = `<input type="button" class="proceed__btn" title="Please update your address before placing order." value="Place Order&#9205;">`;
  getvariables(); //Getting Update button and addressInput again b'coz there isn't before
  updateBtn.addEventListener("click", updateAddress);
}

/*
  -----------------------------------------------
  Event Listeners
  -----------------------------------------------
*/

//Adding Click Event on Update Button
if (updateBtn) {
  updateBtn.addEventListener("click", updateAddress);
}

//Adding Click Event on Edit Button
if (editBtn) {
  editBtn.addEventListener("click", editAddress);
}

/*
  ///////////////////////////////////////////////

  Functions to Post/Place Order, Clear Cart and Order Placed Popup

  ///////////////////////////////////////////////
*/

const itemName = document.getElementById("itemName").value.split(",");
const itemServe = document.getElementById("itemServe").value.split(",");
const itemQty = document.getElementById("itemQty").value.split(",");
const itemPrice = document.getElementById("itemPrice").value.split(",");
const subTotal = document.getElementById("subTotal").value;
const tax = document.getElementById("tax").value;
const deliveryCharge = document.getElementById("deliveryCharge").value;
const grandTotal = document.getElementById("grandTotal").value;

const placeOrderBtn = document.getElementById("placeOrderBtn");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

/*
  -----------------------------------------------
  Popup Handler
  -----------------------------------------------
*/

function popupActive() {
  popup.classList.add("active");
  overlay.classList.add("active");
  return;
}

/*
  -----------------------------------------------
  Clear Cart Request
  -----------------------------------------------
*/
async function clearCart(orderId) {
  const url = `/cart/clear/all`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // The content to update
    body: JSON.stringify({
      orderId: orderId,
    }),
  });
  popupActive();
  const reloadPage = setTimeout(() => {
    location.reload();
  }, 2200);
}

/*
  -----------------------------------------------
  Post Order Request or Place Order
  -----------------------------------------------
*/
async function postOrder(items, bill) {
  const url = `/orders/new`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // The content to update
    body: JSON.stringify({
      items: items,
      bill: bill,
    }),
  });
  const order = await response.json();
  clearCart(order._id);
}

/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

//Edit Address
function placeOrder() {
  let items = [];
  for (let i = 0; i < itemName.length; i++) {
    items.push({
      itemName: itemName[i],
      itemServe: itemServe[i],
      itemQty: itemQty[i],
      itemPrice: itemPrice[i],
    });
  }
  const bill = { subTotal, tax, deliveryCharge, grandTotal };
  // console.log(items.json());
  postOrder(items, bill);
}

/*
  -----------------------------------------------
  Event Listeners
  -----------------------------------------------
*/

//Adding Click Event on placeOrderBtn Button
placeOrderBtn.addEventListener("click", placeOrder);
