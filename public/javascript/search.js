const res = require("express/lib/response");

async function searchFormHandler(event) {
  event.preventDefault();

  // reference from main.handlebar: id="search-input" name="search-text"
  const search = document.querySelector('input[name="search"]').value.trim();

  console.log('go clicked');
  console.log(search);

  // if search exists, then do GET fetch
  if (search) {
    const response = await fetch(`/search/${search}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // if response is okay, then change page to search results
    if (response.ok) {
      document.location.replace(`/search/${search}`);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#search-form")
  .addEventListener("submit", searchFormHandler);
