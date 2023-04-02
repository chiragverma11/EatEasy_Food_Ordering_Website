/*
  ///////////////////////////////////////////////

  Profile Dropdown
 
  ///////////////////////////////////////////////
*/

const profile__menu = document.querySelector(".profile__menu");

document.getElementById("profile").onclick = function () {
  this.classList.toggle("icon-active");
  profile__menu.classList.toggle("profile__menu-active");
};

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
  cartCount();
  // location.reload();
}

/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

//Cart Add Function
function cartAdd(event) {
  let itemId = null;

  const btn = event.target;
  const children = btn.parentElement.children;

  //Converting HTML Collection to Array for Using forEach
  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
  });
  postCart(itemId);
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
