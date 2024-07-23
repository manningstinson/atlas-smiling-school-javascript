$(document).ready(function () {
  // Show loader
  $("#quotes-loader").show();

  // Fetch quotes
  $.ajax({
    url: "https://smileschool-api.hbtn.info/quotes",
    method: "GET",
    success: function (data) {
      // Hide loader
      $("#quotes-loader").hide();

      // Create carousel items
      data.forEach(function (quote, index) {
        var carouselItem = `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img
                  src="${quote.pic_url}"
                  class="d-block align-self-center"
                  alt="Carousel Pic ${index + 1}"
                />
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                <div class="quote-text">
                  <p class="text-white">
                    « ${quote.text}
                  </p>
                  <h4 class="text-white font-weight-bold">${quote.name}</h4>
                  <span class="text-white">${quote.title}</span>
                </div>
              </div>
            </div>
          </div>`;
        $("#quotes-carousel").append(carouselItem);
      });

      // Initialize carousel
      $("#quotes-carousel").carousel();
    },
    error: function () {
      // Hide loader and show error message
      $("#quotes-loader").hide();
      alert("Failed to load quotes. Please try again later.");
    },
  });
});
