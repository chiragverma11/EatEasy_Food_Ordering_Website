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

  Functions to Fetch Cart Count
 
  ///////////////////////////////////////////////
*/

const addBtns = document.querySelectorAll(".item__add");

/*
  -----------------------------------------------
  Get Cart Count Request
  -----------------------------------------------
*/
async function cartCount() {
  const url = `cart/count`;
  const cart = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // The content to update
    // body: JSON.stringify({}), //No Body Or Payload B'coz its a Get Request
  });
  const response = await cart.json();
  const count = +response.items.length;
  //Selecting Cart Count Span Element
  const countSpan = document.getElementById("cartCount");
  countSpan.innerHTML = count;
  return;
}

/*
  -----------------------------------------------
  Post Cart Request Or Add to Cart
  -----------------------------------------------
*/

async function postCart(id) {
  const url = `cart/${id}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // The content to update
    body: JSON.stringify({}), //No Body Or Payload
  });
  cartCount(); //Updating Cart Count
  return;
}

/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

//Change + Sign to Tick Sign After Item Added to Cart
function changetoTick(event) {
  event.target.innerHTML = "&check;";
  event.target.classList.add("item__ticked");
  return;
}

//Cart Add Function
async function cartAdd(event) {
  let itemId = null;

  const btn = event.target;
  const children = btn.parentElement.children;

  //Converting HTML Collection to Array for Using forEach
  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
  });
  changetoTick(event);
  await postCart(itemId);
  return;
}

/*
  -----------------------------------------------
  Event Listeners
  -----------------------------------------------
*/

//Adding Click Event on Cart Add Button
addBtns.forEach((btn) => {
  btn.addEventListener("click", cartAdd);
});
