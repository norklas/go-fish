async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
}

async function logoutBtnHandler(event) {
  event.preventDefault();

  const response = await fetch('/api/users/logout', {
      // need to check on logout functionality... does this just mean kill the session?  also need to build logout route
  });

  if (response.ok) {
    document.location.replace('/homepage');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#logoutBtn').addEventListener('click', logoutBtnHandler);