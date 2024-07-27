document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.querySelector(
    "#carouselExampleControls2 .carousel-inner"
  );
  const loader = `<div class="loader">Loading...</div>`;
  carouselInner.innerHTML = loader;

  fetch("https://smileschool-api.hbtn.info/popular-tutorials")
    .then((response) => response.json())
    .then((data) => {
      carouselInner.innerHTML = "";
      for (let i = 0; i < data.length; i += 4) {
        const isActive = i === 0 ? "active" : "";
        const tutorialItems = data
          .slice(i, i + 4)
          .map(
            (tutorial) => `
          <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
            <div class="card">
              <img src="${
                tutorial.thumb_url
              }" class="card-img-top" alt="Video thumbnail" />
              <div class="card-img-overlay text-center">
                <img src="assets/img/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
              </div>
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${tutorial.title}</h5>
                <p class="card-text text-muted">${tutorial["sub-title"]}</p>
                <div class="creator d-flex align-items-center">
                  <img src="${
                    tutorial.author_pic_url
                  }" alt="Creator of Video" width="30px" class="rounded-circle" />
                  <h6 class="pl-3 m-0 main-color">${tutorial.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">${generateStars(tutorial.star)}</div>
                  <span class="main-color">${tutorial.duration}</span>
                </div>
              </div>
            </div>
          </div>
        `
          )
          .join("");
        const carouselItem = `
          <div class="carousel-item ${isActive}">
            <div class="row align-items-center mx-auto">
              ${tutorialItems}
            </div>
          </div>`;
        carouselInner.insertAdjacentHTML("beforeend", carouselItem);
      }
    })
    .catch((error) => {
      console.error("Error fetching popular tutorials:", error);
      carouselInner.innerHTML =
        '<p class="text-center text-muted">Failed to load popular tutorials.</p>';
    });
});

function generateStars(starCount) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<img src="assets/img/${
      i <= starCount ? "star_on" : "star_off"
    }.png" alt="star" width="15px" />`;
  }
  return stars;
}
