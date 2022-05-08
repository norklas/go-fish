async function newPostHandler(event) {
  event.preventDefault();

  // need input to have name of post_text
  const post_text = document
    .querySelector('input[name="post-text"]')
    .value.trim();

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

// need post form to have ID of new-post-form
document.querySelector("#new-post").addEventListener("submit", newPostHandler);
