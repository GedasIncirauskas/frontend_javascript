import { groupURL, token } from "../URL/url.js";

const div = document.getElementById("card_info");
const section = document.createElement("section");

//Error function
function validationCheck() {
  const dontShowClass = document.getElementById("not_show");
  dontShowClass.style.display = "none";
  section.classList = "invalid";
  section.textContent = "You need to login";
  div.append(section);
}

//Checking token part
if (!token) {
  validationCheck();
}

fetch(groupURL, {
  headers: {
    authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.err) {
      return;
    }
    if (data.length === 0) {
      return alert("No pages found");
    }
    createCard(data);
  })
  .catch((err) => alert(err));

//Data is displayed
function createCard(data) {
  data.forEach((item) => {
    const div = document.getElementById("card_info");
    const section = document.createElement("section");
    section.classList = "blocks";
    const name = document.createElement("h2");
    name.textContent = `ID: ${item.id}`;
    const description = document.createElement("p");
    description.textContent = `${item.name}`;

    section.addEventListener("click", () => {
      openModal(item.group_id);
    });

    section.append(name, description);
    div.append(section);
  });
}

//Pass user to bils by group_id
function openModal(id) {
  window.location.href = `../Content/bills.html?id=${id}`;
}

//Add form for group_id
document.getElementById("add_group").addEventListener("submit", (e) => {
  e.preventDefault();
  const group_id = e.target.elements.group.value.trim();
  if (group_id) {
    fetch(groupURL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ group_id }),
    });
    alert("Your data passed");
    setTimeout(() => {
      window.location.pathname = "../Content/groups.html";
    }, 1500);
  }
  return;
});

//Log out button
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.pathname = "../Login/login.html";
});
