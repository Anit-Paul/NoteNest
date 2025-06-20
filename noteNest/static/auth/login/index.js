function customAlert(msg) {
  const alt = document.querySelector("#customAlert");
  alt.classList.remove("hidden");
  alt.innerHTML = "";
  const child = document.createElement("p");
  const node = document.createTextNode(msg);
  child.appendChild(node);
  alt.appendChild(child);
  setTimeout(() => {
    alt.removeChild(child);
    alt.classList.add("hidden");
  }, 3000);
}

async function authenticate(email, password) {
  const response = await fetch("http://127.0.0.1:8000/auth/loginAPI/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return { data, ok: response.ok };
}
async function pushOnHome(data) {
  console.log(data.token)
  localStorage.setItem("token", data.token); //for not being log out after refresh
  window.location.href = "/home/";
}
document
  .querySelector("#btn")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const email = document.querySelector(".email").value.trim();
    const password = document.querySelector(".password").value.trim();

    if (email.length == 0 || password.length < 4 || password.length > 10) {
      customAlert("Please enter a valid email and password!");
      return;
    }

    const { data, ok } = await authenticate(email, password);

    if (ok) {
      pushOnHome(data);
    } else {
      customAlert("Invalid credential for login!");
    }
  });
