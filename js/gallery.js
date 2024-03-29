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

//Function: Make JSON data images
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

//Function: Embed category navigation
const embedCategoryToNav = (data) => {
  const category = document.getElementById("nav-tab");
  category.innerHTML = "";
  const uniqueCategory = ["All", ...new Set(data.map((item) => item.category))];
  uniqueCategory
    .map((item, index) => {
      category.innerHTML += `
        <button class="nav-link ${
          index == 0 ? "active" : ""
        } text-capitalize" id="nav-${item}-tab" data-bs-toggle="tab" data-bs-target="#nav-${item}" type="button" role="tab" aria-controls="nav-${item}" aria-selected="${
        index == 0 ? true : false
      }">${item}</button>
        `;
    })
    .join("");
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

//Function: Embed all photos to all navigation
const embedAllDataToNav = (data) => {
  const container = document.getElementById("nav-tabContent");
  container.innerHTML = "";

  const allCategory = ["All"];
  const uniqueCategory = [...new Set(data.map((item) => item.category))];
  const categories = allCategory.concat(uniqueCategory);

  categories.map((category, index) => {
    container.innerHTML += `
      <div class="tab-pane fade ${
        index == 0 ? "show active" : ""
      }" id="nav-${category}" role="tabpanel" aria-labelledby="nav-${category}-tab">
          <div class="row p-5">
              ${data
                .filter(
                  (item) => category === "All" || item.category === category
                )
                .map((item) => {
                  if (item.type === "image") {
                    return `
                      <div class="col-12 col-sm-6 col-lg-4 col-xl-3 img-link img-wrap p-3">
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
  });
};

//Function: Embed search result
const embedResultToSearchResult = (data) => {
  const resSearch = document.getElementById("search-result");
  resSearch.innerHTML = "";
  resSearch.innerHTML += `
    <div class="row p-4">
      ${data
        .map((item, index) => {
          if (item.type === "image") {
            return `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3 img-link img-wrap p-3">
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
              </div>
            </div>
          `;
          }
        })
        .join("")}
    </div>
  `;
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

//Function: Hovering video
const hoveringVideo = () => {
  const video = document.getElementById("video-each-category");
  video.addEventListener("mouseover", () => {
    video.play();
  });
  video.addEventListener("mouseout", () => {
    video.pause();
  });
};

//Function: Search function
const searchSomething = () => {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-button");
  const content = document.getElementById("container-content");
  const contentSearch = document.getElementById("container-search");
  const query = document.getElementById("query");

  searchBtn.addEventListener("click", (event) => {
    content.style.display = "none";
    const data = mergeData(dataImg, dataVideo);
    const searchValue = searchInput.value.toLowerCase();
    const result = data.filter((item) => {
      return item.name.toLowerCase().includes(searchValue);
    });
    console.log(result);
    contentSearch.style.display = "block";

    //No refreshing
    event.preventDefault();

    //Embed query to search result
    query.innerHTML = `"${searchValue}"`;
    embedResultToSearchResult(result);
  });
};

//Function: Set active class to navbar
const setActiveClass = () => {
  const navHome = document.getElementById("nav-home");
  const navGallery = document.getElementById("nav-gallery");

  //Check if url is index.html
  if (window.location.href.includes("index.html")) {
    navHome.classList.add("active");
    navGallery.classList.remove("active");
  } else if (window.location.href.includes("gallery.html")) {
    navHome.classList.remove("active");
    navGallery.classList.add("active");
  } else {
    navHome.classList.remove("active");
    navGallery.classList.remove("active");
  }
};

//Run all functions
getDataImg("nature");
getDataImg("sport");
getDataImg("cartoon");
getDataVideo("nature");
embedCategoryToNav(mergeData(dataImg, dataVideo));
embedAllDataToNav(mergeData(dataImg, dataVideo));
searchSomething();
goToDetailPage(mergeData(dataImg, dataVideo));
hoveringVideo();
setActiveClass();
