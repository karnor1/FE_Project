document.addEventListener('DOMContentLoaded', function() {
  const postForm = document.getElementById('new-post-form');
  const postList = document.getElementById('post-list');

  if (postForm) {
      postForm.addEventListener('submit', function(event) {
          event.preventDefault();

          const title = document.getElementById('new-post-title').value;
          const content = document.getElementById('new-post-content').value;
          const image = document.getElementById('new-post-image').value;

          const post = {
              title,
              content,
              image,
              date: new Date().toISOString()
          };

          savePost(post);
          displayPost(post);
          postForm.reset();
      });
  }

  function savePost(post) {
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));
  }

  function displayPost(post) {
      if (!postList) return; 

      const postItem = document.createElement('li');
      postItem.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
          <p><small>${new Date(post.date).toLocaleString()}</small></p>
      `;

      postList.appendChild(postItem);
  }

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach(displayPost);
});
