const modal = document.getElementById("forms-modal");
const overlay = document.querySelector(".overlay");

const closeModalBtn = document.querySelector(".btn-close");

// open modal function
const openModal = function (id) {
  const submitButton = document.getElementById("submit");
  if (id === "createButton") {
    submitButton.onclick = createAppointment;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else if (id === "editButton") {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
};
// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
