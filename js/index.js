//Initiate data photos and category
//Get data from folder images and category
let dataImg = [];
let dataVideo = [];

//Function: Make JSON data video
const getDataVideo = (category) => {
  for (let i = 1; i <= 1; i++) {
    dataVideo.push({
      id: i,
      src: `../assets/videos/${category}/${category}-${i}.mp4`,
      name: `Video-${category}-${i}`,
      category: category,
      type: "video",
    });
  }
  return dataVideo;
};

//Function: Make JSON data image
const getDataImg = (category) => {
  if (category == "nature") {
    for (let i = 1; i <= 7; i++) {
      dataImg.push({
        id: i,
        src: `../assets/images/${category}/${category}-${i}.jpg`,
        category: category,
        name: `Image-${category}-${i}`,
        type: "image",
      });
    }
  } else {
    for (let i = 1; i <= 8; i++) {
      dataImg.push({
        id: i,
        src: `../assets/images/${category}/${category}-${i}.jpg`,
        category: category,
        name: `Image-${category}-${i}`,
        type: "image",
      });
    }
  }
  return dataImg;
};

//Function: Embed dataVideo to html
const embedDataVideoToCarousel = (data, category) => {
  const img = document.getElementById("img-carousel");
  img.innerHTML = "";
  if (category) {
    data
      .map((item) => {
        if (item.category == category) {
          img.innerHTML += `
                <div class="carousel-item active">
                    <video class="video-fluid video" src="${item.src}" autoplay loop muted></video>
                </div>
                `;
        }
      })
      .join("");
  } else {
    data
      .map((item) => {
        img.innerHTML += `
            <div class="carousel-item">
                <video class="video-fluid" src="${item.src}" autoplay loop muted></video>
            </div>
            `;
      })
      .join("");
  }
};

//Function: Filter data by category
const filterData = (data, category) => {
  const dataFilter = data.filter((item) => item.category == category);
  return dataFilter;
};

//Function: Get one data from filter data
const getOneData = (data) => {
  const dataOne = data.filter((item, index) => index == data.length - 1);
  return dataOne;
};

//Function: Merge dataImg and dataVideo
const mergeData = (dataImg, dataVideo) => {
  const data = [];
  dataImg.map((item) => {
    data.push(item);
  });
  dataVideo.map((item) => {
    data.push(item);
  });
  return data;
};

//Function: Embed data to Carousel
const embedDataToCarousel = (data) => {
  const img = document.getElementById("img-carousel");
  img.innerHTML = "";
  const dataAll = [];
  const dataOneNature = getOneData(filterData(data, "nature"));
  const dataOneSport = getOneData(filterData(data, "sport"));
  const dataOneCartoon = getOneData(filterData(data, "cartoon"));
  dataAll.push(dataOneNature[0], dataOneSport[0], dataOneCartoon[0]);

  dataAll
    .map((item, index) => {
      if (item.type == "image") {
        img.innerHTML += `
            <div class="carousel-item ${
              index == 0 ? "active" : ""
            } img" style="background-image:url(${item.src})">
            </div>
            <div class="carousel-caption caption">
              <h1 class="fs-2">Explore and Get Your Best <span class="text-warning">Photos!</span></h1>
              <p class="fs-5">Curated images and videos by our visual experts to help you make an emotional connection with your audience.</p>
            </div>
            `;
      } else {
        img.innerHTML += `
            <div class="carousel-item ${index == 0 ? "active" : ""}">
                <video class="video-fluid video" src="${
                  item.src
                }" autoplay loop muted></video>
            </div>
            `;
      }
    })
    .join("");
};

//Function: Embed best data to html
const embedDataBest = (data, category) => {
  const img = document.getElementById(`best-${category}`);
  img.innerHTML = "";
  let filteredData = filterData(data, category);
  filteredData = filteredData.slice(0, 4);
  img.innerHTML += `
          <div class="row">
              ${filteredData
                .map((item, index) => {
                  if (item.type == "image") {
                    return `
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 img-wrap p-3 img-link">
                          <div class="card">
                            <img src="${item.src}" class="rounded img-each-category img-img" alt="${item.category}+${index}">
                            <span class="img-text text-capitalize">${item.name}</span>
                          </div>
                        </div>
                      `;
                  } else {
                    return `
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 img-wrap p-3">
                          <div class="card rounded">
                            <video src="${item.src}" class="rounded video-each-category img-img" id="video-each-category" alt="${item.category}+${index}">
                            <span class="video-text text-capitalize">${item.name}</span>
                        </div>
                        `;
                  }
                })
                .join("")}
          </div>
      </div>
      `;
};

//Function: Go to section with smooth scroll
const goToSection = () => {
  var exploreButton = document.getElementById("btn-explore");
  var bestImagesSection = document.getElementById("bestImages");

  exploreButton.addEventListener("click", function (event) {
    event.preventDefault();
    bestImagesSection.scrollIntoView({ behavior: "smooth" });
  });
};

//Function: Go to detail page when click on each image
const goToDetailPage = (data) => {
  const img = document.querySelectorAll(".img-link");

  img.forEach((item, index) => {
    item.addEventListener("click", () => {
      localStorage.setItem("data", JSON.stringify(data[index]));
      localStorage.setItem("data-full", JSON.stringify(data));
      window.location.href = "./details.html";
    });
  });
};

//Function: Set active class to navbar
const setActiveClass = () => {
  const navHome = document.getElementById("nav-home");
  const navGallery = document.getElementById("nav-gallery");

  //Check if url is index.html
  if (window.location.href.includes("index.html")) {
    navHome.classList.add("active");
    navGallery.classList.add("text-dark");
    navGallery.classList.remove("active");
  } else if (window.location.href.includes("gallery.html")) {
    navHome.classList.remove("active");
    navHome.classList.add("text-dark");
    navGallery.classList.add("active");
  } else {
    navHome.classList.remove("active");
    navGallery.classList.remove("active");
  }
};

//Run all Function
getDataImg("nature");
getDataImg("sport");
getDataImg("cartoon");
getDataVideo("nature");
embedDataToCarousel(mergeData(dataImg, dataVideo));
embedDataBest(mergeData(dataImg, dataVideo), "nature");
embedDataBest(mergeData(dataImg, dataVideo), "sport");
embedDataBest(mergeData(dataImg, dataVideo), "cartoon");
goToSection();
goToDetailPage(mergeData(dataImg, dataVideo));
setActiveClass();
