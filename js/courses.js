document.addEventListener("DOMContentLoaded", () => {
  const searchKeywords = document.getElementById("searchKeywords");
  const selectedTopic = document.getElementById("selectedTopic");
  const selectedSort = document.getElementById("selectedSort");
  const topicDropdown = document.getElementById("topicDropdown");
  const sortDropdown = document.getElementById("sortDropdown");
  const videoContainer = document.getElementById("videoContainer");

  const loadCourses = (query = "", topic = "", sort = "") => {
    videoContainer.innerHTML = '<div class="loader">Loading...</div>';
    fetch(
      `https://smileschool-api.hbtn.info/courses?q=${query}&topic=${topic}&sort=${sort}`
    )
      .then((response) => response.json())
      .then((data) => {
        videoContainer.innerHTML = "";
        document.querySelector(
          ".video-count"
        ).innerText = `${data.courses.length} videos`;

        data.courses.forEach((course) => {
          const videoCard = `
            <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
              <div class="card">
                <img src="${
                  course.thumb_url
                }" class="card-img-top" alt="Video thumbnail" />
                <div class="card-img-overlay text-center">
                  <img src="assets/img/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${course.title}</h5>
                  <p class="card-text text-muted">${course["sub-title"]}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${
                      course.author_pic_url
                    }" alt="Creator of Video" width="30px" class="rounded-circle" />
                    <h6 class="pl-3 m-0 main-color">${course.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">${generateStars(course.star)}</div>
                    <span class="main-color">${course.duration}</span>
                  </div>
                </div>
              </div>
            </div>`;
          videoContainer.insertAdjacentHTML("beforeend", videoCard);
        });
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        videoContainer.innerHTML =
          '<p class="text-center text-muted">Failed to load courses.</p>';
      });
  };

  const loadDropdowns = () => {
    fetch("https://smileschool-api.hbtn.info/courses")
      .then((response) => response.json())
      .then((data) => {
        topicDropdown.innerHTML =
          '<a class="dropdown-item" href="#">All Topics</a>';
        sortDropdown.innerHTML = "";

        data.topics.forEach((topic) => {
          const topicItem = `<a class="dropdown-item" href="#">${topic}</a>`;
          topicDropdown.insertAdjacentHTML("beforeend", topicItem);
        });

        data.sorts.forEach((sort) => {
          const sortItem = `<a class="dropdown-item" href="#">${sort}</a>`;
          sortDropdown.insertAdjacentHTML("beforeend", sortItem);
        });

        document.querySelector(
          ".video-count"
        ).innerText = `${data.courses.length} videos`;

        loadCourses();
      })
      .catch((error) => {
        console.error("Error fetching dropdown data:", error);
      });
  };

  const generateStars = (starCount) => {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += `<img src="assets/img/${
        i <= starCount ? "star_on" : "star_off"
      }.png" alt="star" width="15px" />`;
    }
    return stars;
  };

  searchKeywords.addEventListener("input", (e) => {
    const query = e.target.value;
    const topic = selectedTopic.querySelector("span").innerText;
    const sort = selectedSort.querySelector("span").innerText;
    loadCourses(query, topic === "All Topics" ? "" : topic, sort);
  });

  topicDropdown.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      const topic = e.target.innerText;
      selectedTopic.querySelector("span").innerText = topic;
      const query = searchKeywords.value;
      const sort = selectedSort.querySelector("span").innerText;
      loadCourses(query, topic === "All Topics" ? "" : topic, sort);
    }
  });

  sortDropdown.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      const sort = e.target.innerText;
      selectedSort.querySelector("span").innerText = sort;
      const query = searchKeywords.value;
      const topic = selectedTopic.querySelector("span").innerText;
      loadCourses(query, topic === "All Topics" ? "" : topic, sort);
    }
  });

  loadDropdowns();
});
