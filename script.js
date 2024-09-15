
document.getElementById("search").addEventListener("click", function () {
    const searchTerm = document.querySelector(".search-box").value;
    const apiUrl = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Clear previous results
        document.querySelector(".movies-section").innerHTML = "";
  
        // Loop through the search results and display them
        data.forEach((show) => {
          const movieCard = document.createElement("div");
          movieCard.classList.add("movie-card");
  
          const movieImage = document.createElement("div");
          movieImage.classList.add("movie-image");
          const img = document.createElement("img");
          img.src = show.show.image ? show.show.image.medium : "default-image.jpg"; // Add a default image in case there's no image available
          movieImage.appendChild(img);
  
          const movieHeading = document.createElement("h3");
          movieHeading.classList.add("movie-heading");
          movieHeading.textContent = show.show.name;
  
          const details = document.createElement("div");
          details.classList.add("details");
  
          const rating = document.createElement("div");
          rating.classList.add("rating");
          const starImg = document.createElement("img");
          starImg.src = "https://pngimg.com/d/star_PNG41474.png";
          starImg.height = 15;
          const ratingValue = document.createElement("h3");
          ratingValue.textContent = show.show.rating.average || "0";
          rating.appendChild(starImg);
          rating.appendChild(ratingValue);
  
          const genres = document.createElement("p");
          genres.textContent = show.show.genres.join(" | ");
  
          const websiteButton = document.createElement("button");
          websiteButton.classList.add("button");
          websiteButton.textContent = "Website";
          websiteButton.onclick = function () {
            window.open(show.show.officialSite, "_blank");
          };
  
          details.appendChild(rating);
          details.appendChild(genres);
  
          movieCard.appendChild(movieImage);
          movieCard.appendChild(movieHeading);
          movieCard.appendChild(details);
          movieCard.appendChild(websiteButton);
  
          document.querySelector(".movies-section").appendChild(movieCard);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
  