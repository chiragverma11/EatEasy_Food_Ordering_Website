const profile__menu = document.querySelector(".profile__menu");

document.getElementById("profile").onclick = function () {
  this.classList.toggle("icon-active");
  profile__menu.classList.toggle("profile__menu-active");
};
