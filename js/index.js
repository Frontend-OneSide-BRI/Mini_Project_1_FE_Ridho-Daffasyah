//Initiate data photos and category
//Get data from folder images and category
let dataImg = [];
let dataVideo = [];

const getDataVideo = (category) => {
  for (let i = 1; i <= 1; i++) {
    dataVideo.push({
      id: i,
      src: `./assets/videos/${category}/${category}-${i}.mp4`,
      name: `Video-${category}-${i}`,
      category: category,
      type: "video",
    });
  }
  return dataVideo;
};

const getDataImg = (category) => {
  if (category == "nature") {
    for (let i = 1; i <= 7; i++) {
      dataImg.push({
        id: i,
        src: `./assets/images/${category}/${category}-${i}.jpg`,
        category: category,
        name: `Image-${category}-${i}`,
        type: "image",
      });
    }
  } else {
    for (let i = 1; i <= 8; i++) {
      dataImg.push({
        id: i,
        src: `./assets/images/${category}/${category}-${i}.jpg`,
        category: category,
        name: `Image-${category}-${i}`,
        type: "image",
      });
    }
  }
  return dataImg;
};

//Embed dataVideo to html
const embedDataVideoToCarousel = (data, category) => {
  const img = document.getElementById("img-carousel");
  img.innerHTML = "";
  if (category) {
    data.map((item, index) => {
        if (item.category == category) {
          img.innerHTML += `
                <div class="carousel-item active">
                    <video class="video-fluid video" src="${item.src}" autoplay loop muted></video>
                </div>
                `;
        }}).join("");
  } else {
    data.map((item, index) => {
        img.innerHTML += `
            <div class="carousel-item">
                <video class="video-fluid" src="${item.src}" autoplay loop muted></video>
            </div>
            `;
      })
      .join("");
  }
};

//Filter data by category
const filterData = (data, category) => {
  const dataFilter = data.filter((item) => item.category == category);
  return dataFilter;
};

//Get one data from filter data
const getOneData = (data) => {
  const dataOne = data.filter((item, index) => index == data.length-1);
  return dataOne;
};

//Merge dataImg and dataVideo
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

//Embed data to html
const embedDataToCarousel = (data) => {
  const img = document.getElementById("img-carousel");
  img.innerHTML = "";
  const dataAll = [];
  const dataOneNature = getOneData(filterData(data, "nature"));
  const dataOneSport = getOneData(filterData(data, "sport"));
  const dataOneCartoon = getOneData(filterData(data, "cartoon"));
  dataAll.push(dataOneNature[0], dataOneSport[0], dataOneCartoon[0]);

  dataAll.map((item, index) => {
    if (item.type == "image") {
      img.innerHTML += `
            <div class="carousel-item ${index == 0 ? "active" : ""} img" style="background-image:url(${item.src})">
            </div>
            <div class="carousel-caption caption d-none d-md-block">
              <h1 class="fs-2">Explore and Get Your Best <span class="text-warning">Photos!</span></h1>
              <p class="fs-5">Curated images and videos by our visual experts to help you make an emotional connection with your audience.</p>
            </div>
            `;
    } else {
      img.innerHTML += `
            <div class="carousel-item ${index == 0 ? "active" : ""}">
                <video class="video-fluid video" src="${item.src}" autoplay loop muted></video>
            </div>
            `;
    }}).join("");
  
};

//Embed data with nature category to html
const embedDataBestToCarousel = (data, category) => {
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
                        <div class="col-3 img-wrap p-3">
                          <div class="card">
                            <img src="${item.src}" class="rounded img-each-category img-img" alt="${item.category}+${index}">
                            <span class="img-text text-capitalize">${item.name}</span>
                          </div>
                        </div>
                      `;
                    } else {
                      return `
                        <div class="col-3 img-wrap p-3">
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

getDataImg("nature");
getDataImg("sport");
getDataImg("cartoon");
getDataVideo("nature");
embedDataToCarousel(mergeData(dataImg, dataVideo));
embedDataBestToCarousel(mergeData(dataImg, dataVideo), "nature");
embedDataBestToCarousel(mergeData(dataImg, dataVideo), "sport");
embedDataBestToCarousel(mergeData(dataImg, dataVideo), "cartoon");

const goToSection = () => {
  var exploreButton = document.getElementById("btn-explore");
  var bestImagesSection = document.getElementById("bestImages");

  exploreButton.addEventListener("click", function (event) {
    event.preventDefault();
    bestImagesSection.scrollIntoView({ behavior: "smooth" });
  });
};

const setActiveNav = () => {
  const homepageLink = document.getElementById("nav-home");
  const galleryLink = document.getElementById("nav-gallery");

  homepageLink.addEventListener("click", () => {
    homepageLink.classList.add("active");
    galleryLink.classList.remove("active");
  });

  galleryLink.addEventListener("click", () => {
    galleryLink.classList.add("active");
    homepageLink.classList.remove("active");
  });
}

goToSection();
setActiveNav();