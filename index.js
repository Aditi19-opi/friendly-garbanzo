const aboutButton = document.querySelector(".aboutUs");
const dropdownMenu = document.querySelector(".new-dropdown");
const remove = document.querySelector(".remove");


if (aboutButton && dropdownMenu) {
  aboutButton.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
  });
}
// menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", function () {
  menu.classList.toggle("show-menu");
});

remove.addEventListener("click", () => {
  menu.classList.remove("show-menu");
})

// dropdown toggle
const dropIcon = document.querySelector(".open");
const dropItems = document.querySelector(".dropdown-content");

dropIcon.addEventListener("click", function()  {
  dropItems.classList.toggle("content-show");
})
