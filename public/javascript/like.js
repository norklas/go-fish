async function likeClickHandler(event) {
  event.preventDefault();

  // taking id from localhost:3001/posts/1
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/posts/like", {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

// need like button to have id of like-btn
document.querySelector(".like-btn").addEventListener("click", likeClickHandler);
