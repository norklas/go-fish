async function signupFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const confirmPassword = document
    .querySelector("#confirmPassword-signup")
    .value.trim();

  if (password !== confirmPassword) {
    alert("Password and confirm password must match");
  } else if (email && password && confirmPassword && username) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(`User ${username} created`);
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#form-signup")
  .addEventListener("submit", signupFormHandler);
