import { billsURL, token } from "../URL/url.js";

const queryString = window.location.search;
const params = queryString.split("=")[1];

if (billsURL && token && queryString) {
  fetch(`${billsURL}/${params}`, {
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
        return alert("You don't have any bills yet");
      }
      createTable(data);
    })
    .catch((err) => alert(err));

  function createTable(data) {
    data.forEach((item) => {
      console.log(item);
      const table = document.querySelector("tbody");
      const row = table.insertRow(0);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      cell1.textContent = `${item.group_id}`;
      cell2.textContent = `${item.description}`;
      cell3.textContent = `$${item.amount}`;
    });
  }
}

//Add form for bill amount and description
document.getElementById("add_bill").addEventListener("submit", (e) => {
  e.preventDefault();
  const group_id = params;
  const amount = e.target.elements.amount.value;
  const description = e.target.elements.description.value;

  if (group_id && amount && description) {
    fetch(billsURL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ group_id, amount, description }),
    });
    alert("Your data passed");
    setTimeout(() => {
      document.getElementById("add_bill").reset();
      window.location.pathname = "../Login/login.html";
    }, 1500);
  }
  return;
});

//Log out button
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.pathname = "../Login/login.html";
});
