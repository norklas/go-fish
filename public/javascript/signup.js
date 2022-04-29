async function signupFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const confirmEmail = document.querySelector('#confirmEmail').value.trim();
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document.querySelector('#confirmPassword').value.trim();

  if (email != confirmEmail) {
    alert('Email and confirm email must match');
  } else if (password != confirmPassword) {
    alert('Password and confirm password must match');
  } else if (email && confirmEmail && password && confirmPassword && username) {
    const response = await fetch('api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email, 
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      console.log(`User ${username} created`);
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);