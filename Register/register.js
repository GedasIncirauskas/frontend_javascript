import { registerURL, token } from "../URL/url.js";

//Checking for token status
if (token) {
  location.replace("index.html");
}

//Register form and checking passwords
document.getElementById("register").addEventListener("submit", (e) => {
  e.preventDefault();
  const full_name = e.target.elements.full_name.value;
  const email = e.target.elements.email.value.trim().toLowerCase();
  const password = e.target.elements.password.value;
  const password_rep = e.target.elements.password_rep.value;

  if (password === password_rep) {
    fetch(registerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          return (window.location.pathname = "../Login/login.html");
        }
        return alert(data.err || "Unexpected error");
      })
      .catch((err) => alert(err));
  } else {
    return alert("You entered different password");
  }
});
