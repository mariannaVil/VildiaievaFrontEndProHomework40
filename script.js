function searchUser() {
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();    

    if (username === '') {
      alert('Please enter a valid GitHub username');
      return;
    }
  
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(data => displayUserInfo(data))
      .catch(error => {
        document.getElementById('userInfo').innerHTML = `<p>${error.message}</p>`;
      });
  }

  function getRandomUser() {
    fetch('https://api.github.com/users?since=' + Math.floor(Math.random() * 500000))
      .then(response => response.json())
      .then(data => {
        const randomUser = data[Math.floor(Math.random() * data.length)];
        displayUserInfo(randomUser);
      })
      .catch(error => {
        document.getElementById('userInfo').innerHTML = `<p>${error.message}</p>`;
      });
  }
  
  function displayUserInfo(user) {
    const userInfoElement = document.getElementById('userInfo');
  
    userInfoElement.innerHTML = `
      <img src="${user.avatar_url}" alt="User Avatar" style="border-radius: 50%; width: 100px; height: 100px;">
      <h2>${user.login}</h2>
      <p>${user.bio || 'No bio available'}</p>
      <p>Location: ${user.location || 'Not specified'}</p>
      <p>Followers: ${user.followers}</p>
    `;
  }