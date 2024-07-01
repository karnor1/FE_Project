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


document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...

    // Fetch weather data
    fetchWeather();
    function fetchWeather() {
        const latitude = 54.6872; // Latitude of Vilnius
        const longitude = 25.2797; // Longitude of Vilnius
    
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
        
        console.log('Fetching weather data from:', url); // Log the URL being fetched
    
        fetch(url)
            .then(response => {
                console.log('Response status:', response.status); // Log the HTTP status code
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                console.log('Weather data received:', data); // Log the received data
                displayWeather(data); // Call function to display weather data
            })
            .catch(error => {
                console.error('Error fetching weather data:', error); // Log any errors that occur during fetch
            });
    }


    function displayWeather(data) {
        // Accessing current temperature and wind speed
        const currentTemperature = data.current.temperature_2m.value;
        const currentWindSpeed = data.current.wind_speed_10m.value;
    
        // Accessing hourly data
        const hourlyData = data.hourly;
    
        // Displaying current temperature and wind speed
        console.log('Current Temperature:', currentTemperature);
        console.log('Current Wind Speed:', currentWindSpeed);
    
        // Displaying hourly data
        console.log('Hourly Data:', hourlyData);
    
        // Example: Displaying hourly temperature and wind speed
        const hourlyTimes = hourlyData.time;
        const hourlyTemperatures = hourlyData.temperature_2m;
        const hourlyWindSpeeds = hourlyData.wind_speed_10m;
    

        const now = new Date();
        const currentHour = now.getHours();
        const currentdAY = now.getDay();

        
        const hourlyDataElement = document.getElementById('weather-content');

        if (hourlyDataElement) {
            hourlyDataElement.innerHTML = '';
    

            for (let i = 0; i < hourlyTimes.length; i++) {
                const listItem = document.createElement('li');

                if ((currentHour == hourlyTimes[i].substring(11,13)) && (currentdAY == hourlyTimes[i].substring(8,10)))
                    {


                    listItem.textContent = `${hourlyTimes[i]} - Temperature: ${hourlyTemperatures[i]} °C, Wind Speed: ${hourlyWindSpeeds[i]} m/s`;
                    hourlyDataElement.appendChild(listItem);
                }
            }
        } else {
            console.error('Element with id "hourly-data" not found.');
        }
    }
    
    
});