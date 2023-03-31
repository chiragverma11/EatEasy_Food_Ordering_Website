//Profile Dropdown
const profile__menu = document.querySelector(".profile__menu");

document.getElementById("profile").onclick = function () {
  this.classList.toggle("icon-active");
  profile__menu.classList.toggle("profile__menu-active");
};

//Add to Cart Form Submit

// function addToCart(event) {
//   event.preventDefault();
//   const data = new FormData(document.getElementById("addCartForm"));
//   console.log(data);
//   fetch("http://127.0.0.1:8080/cart", {
//     method: "post",
//     body: data,
//   });
//   return false;
// }

// const form = document.getElementById("addCartForm");
// form.addEventListener("submit", addToCart);

//using AJAX
// const userId = document.getElementById("userId").value;
// const itemId = document.getElementById("itemId").value;

// $(document).ready(function () {
//   $("#add").click(function () {
//     $.post(
//       "/cart",
//       {
//         userId: itemId,
//         itemId: userId,
//       },
//       function (data, status) {
//         console.log(data);
//       }
//     );
//   });
// });
