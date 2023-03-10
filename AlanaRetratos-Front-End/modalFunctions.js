const submitButton = document.getElementById("submit");
const modal = document.getElementById("forms-modal");
const overlay = document.querySelector(".overlay");

const closeModalBtn = document.querySelector(".btn-close");

// Opens the modal to submit or change data
const openModal = function (id) {
  if (id === "create") {
    submitButton.id = "create";
  } else {
    submitButton.id = "edit";
  }

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button or screen is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when hitting Esc key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  } else if (e.key === "Escape" && !divUl.classList.contains("hidden")) {
    divUl.classList.add("hidden");
    buttonColors.classList.remove("disabled");
  }
});
// Identifies wheter
const createOrEdit = function () {
  if (submitButton.id === "create") {
    return createAppointment();
  } else {
    return changeAppointment();
  }
};

submitButton.addEventListener("click", createOrEdit);
