document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.querySelector(
    "#carouselExampleControls .carousel-inner"
  );
  const loader = `<div class="loader">Loading...</div>`;
  carouselInner.innerHTML = loader;

  fetch("https://smileschool-api.hbtn.info/quotes")
    .then((response) => response.json())
    .then((data) => {
      carouselInner.innerHTML = "";
      data.forEach((quote, index) => {
        const isActive = index === 0 ? "active" : "";
        const quoteItem = `
          <div class="carousel-item ${isActive}">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img src="${
                  quote.pic_url
                }" class="d-block align-self-center" alt="Carousel Pic ${
          index + 1
        }" />
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                <div class="quote-text">
                  <p class="text-white">« ${quote.text}</p>
                  <h4 class="text-white font-weight-bold">${quote.name}</h4>
                  <span class="text-white">${quote.title}</span>
                </div>
              </div>
            </div>
          </div>`;
        carouselInner.insertAdjacentHTML("beforeend", quoteItem);
      });
    })
    .catch((error) => console.error("Error fetching quotes:", error));
});
