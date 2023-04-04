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

  Order Details on Click via Redirect
 
  ///////////////////////////////////////////////
*/

const order = document.querySelectorAll(".order");

/*
  -----------------------------------------------
  Redirecting to Order Detail
  -----------------------------------------------
*/

async function getOrder(orderId) {
  const url = `orders/${orderId}`;
  location.assign(url);
}

/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

function orderClick(event) {
  let orderId = null;
  const children = event.target.children;

  //Converting HTML Collection to Array for Using forEach
  Array.from(children).forEach((element) => {
    if (element.id == "orderId") {
      orderId = element.value;
      return;
    }
  });
  getOrder(orderId);
}

/*
  -----------------------------------------------
  Event Listeners
  -----------------------------------------------
*/

//Adding Click Event on Order Tile
order.forEach((tile) => {
  tile.addEventListener("click", orderClick);
});
