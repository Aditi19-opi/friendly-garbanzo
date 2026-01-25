let data = [];
let id = 1;
let editMode = false;
let editIndex = null;
const form = document.getElementById("userForm");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const scoreError = document.getElementById("scoreError");
const subjectError = document.getElementById("subjectError");

function validateForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name").value.trim();
  const emailInput = document.getElementById("email").value.trim();
  const phoneInput = document.getElementById("phone").value.trim();
  const scoreInput = document.getElementById("score").value.trim();
  const subjectInput = document.getElementById("subject").value.trim();

  // Reset errors
  [nameError, emailError, phoneError, scoreError, subjectError].forEach(
    (e) => (e.textContent = "")
  );
  let hasError = false;

  // Validation
  if (nameInput === "") {
    nameError.textContent = "Name is required";
    hasError = true;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput)) {
    emailError.textContent = "Invalid email";
    hasError = true;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (phoneInput === "") {
    phoneError.textContent = "Enter the number";
    hasError = true;
  } else if (!phonePattern.test(phoneInput)) {
    phoneError.textContent = "Phone number must contain 10 digits";
    hasError = true;
  }
  const score = Number(scoreInput);
  if (scoreInput === "") {
    scoreError.textContent = "Score is required";
  } else if ((!score >= 0 && score >= 100)) {
    scoreError.textContent = "Score must be between 0 and 100";
    hasError = true;
  }

  if (subjectInput === "") {
    subjectError.textContent = "Subject is required";
    hasError = true;
  }

  if (hasError) return;

  const formData = {
    id: editMode ? data[editIndex].id : id++,
    name: nameInput,
    email: emailInput,
    phone: phoneInput,
    score: scoreInput,
    subject: subjectInput,
  };
  // Edit
  if (editMode) {
    data[editIndex] = formData;
    editMode = false;
    editIndex = null;
  } else {
    data.push(formData);
  }
  form.reset();
  renderTable();
  resetStyle();
}
// Table
function renderTable() {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach((formData, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formData.id}</td>
      <td>${formData.name}</td>
      <td>${formData.email}</td>
      <td>${formData.phone}</td>
      <td>${formData.score}</td>
      <td>${formData.subject}</td>
    `;

    table.appendChild(row);
    buttons(row, index);
  });
}
// Buttons
function buttons(row, index) {
  const editBtn = row.insertCell(6);
  const actionBtn = document.createElement("button");
  actionBtn.textContent = "Edit";
  actionBtn.className = "edit-btn";
  actionBtn.onclick = () => editUser(index);
  editBtn.appendChild(actionBtn);

  const deleteBtn = row.insertCell(7);
  const actionBtn2 = document.createElement("button");
  actionBtn2.textContent = "Delete";
  actionBtn2.className = "delete-btn";
  actionBtn2.onclick = () => row.remove();
  deleteBtn.appendChild(actionBtn2);
}

// Edit style
function editUser(index) {
  const user = data[index];
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone;
  document.getElementById("score").value = user.score;
  document.getElementById("subject").value = user.subject;

  editMode = true;
  editIndex = index;

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.textContent = "Update User";
  submitBtn.style.backgroundColor = "#f39c12";

  const formTitle = document.getElementById("formTitle");
  formTitle.textContent = "Edit User";
  formTitle.style.color = "#f39c12";
}

// Reset style
function resetStyle() {
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.textContent = "Add User";
  submitBtn.style.backgroundColor = "#56a73d";

  const formTitle = document.getElementById("formTitle");
  formTitle.textContent = "Add User";
  formTitle.style.color = "#121111";
}

// For search data
const searchInput = document.getElementById("search");
const filterSubject = document.getElementById("filterSubject");
const filterScore = document.getElementById("filterScore");

searchInput.addEventListener("input", renderTable2);
filterSubject.addEventListener("change", renderTable2);
filterScore.addEventListener("change", renderTable2);

function renderTable2() {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  const searchValue = searchInput.value;
  const searchSubject = filterSubject.value;
  const searchScore = filterScore.value;

  const filterData = data.filter((user) => {
    const matchesSearch =
      user.name.includes(searchValue) || user.email.includes(searchValue);

    const matchesSubject =
      searchSubject === "" || user.subject === searchSubject;

    const matchesScore = searchScore === "" || parseInt(user.score) >= parseInt(searchScore) || parseInt(user.score) <= parseInt(searchScore);

    return matchesSearch && matchesSubject && matchesScore;
  });
  filterData.forEach((formData, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formData.id}</td>
      <td>${formData.name}</td>
      <td>${formData.email}</td>
      <td>${formData.phone}</td>
      <td>${formData.score}</td>
      <td>${formData.subject}</td>
    `;

    table.appendChild(row);
    buttons(row, index, data.indexOf(formData));
  });
}
