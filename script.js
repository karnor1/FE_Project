document.addEventListener('DOMContentLoaded', function() {
  const postForm = document.getElementById('new-post-form');
  const articles = document.getElementById('articles');

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
    const articles = document.querySelector('.articles');
    if (!articles) return; 

    const postItem = document.createElement('div');
    postItem.innerHTML = `
        <article>
            <div class="article-wrapper">
                <figure>
                    <img src="${post.image ? post.image : 'https://via.placeholder.com/800x450'}" alt="${post.title}">
                </figure>
                <div class="article-body">
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <a href="#" class="read-more">
                        Read more <span class="sr-only">about ${post.title}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `;

    articles.appendChild(postItem);
}

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach(displayPost);
});


document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    

    setInterval(changeTimeWidget(now),1000);
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
    

        const currentHour = now.getHours();
        const currentdAY = now.getDay();
        

    

            for (let i = 0; i < hourlyTimes.length; i++) {

                if ((currentHour == hourlyTimes[i].substring(11,13) ) && (currentdAY == hourlyTimes[i].substring(8,10)))
                    {

                        changeTemperature(hourlyTemperatures[i-2]);
                    //listItem.textContent = `${hourlyTimes[i]} - Temperature: ${hourlyTemperatures[i]} °C, Wind Speed: ${hourlyWindSpeeds[i]} m/s`;
                }
            }

    }
    
    
});


function changeTemperature(newTemp) {
    const tempElement = document.querySelector('.Weather-container .Temp');

    if (tempElement) {
        const degreeSpan = tempElement.querySelector('#C');
        tempElement.innerHTML = `${newTemp}${degreeSpan.outerHTML}`;
    } else {
        console.error('Temperature element not found');
    }
}

function changeTimeWidget(newTime) {
    const timeElement = document.querySelector('.Weather-container .Time');

    if (timeElement) {
        timeElement.innerHTML = `${newTime}`;
    } else {
        console.error('Time element not found');
    }
}