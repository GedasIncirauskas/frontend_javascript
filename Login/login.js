import { loginURL, token } from "../URL/url.js";

//Checking for token status
if (token) {
  location.replace("../Content/groups.html");
}

//Login form and authentication
document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value.trim().toLowerCase();
  const password = e.target.elements.password.value;
  if (email && password) {
    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", `${data.token}`);
          window.location.pathname = "../Content/groups.html";
          return "";
        }
        return alert(data.err || "Please try again");
      })
      .catch((err) => alert(err.msg));
  }
});
