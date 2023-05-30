//Initiate data photos and category
//Get data from folder images and category
let dataImg = [];
let dataVideo = [];

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

//Embed category navigation
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

//Embed all photos to all navigation
const embedAllDataToNav = (data) => {
  const container = document.getElementById("nav-tabContent");
  container.innerHTML = "";

  const allCategory = ["All"];
  const uniqueCategory = [...new Set(data.map((item) => item.category))];
  const categories = allCategory.concat(uniqueCategory);

  categories.map((category, index) => {
    container.innerHTML += `
      <div class="tab-pane fade ${index == 0 ? "show active" : ""}" id="nav-${category}" role="tabpanel" aria-labelledby="nav-${category}-tab">
          <div class="row p-5">
              ${data
                .filter((item) => category === "All" || item.category === category)
                .map((item) => {
                  if (item.type === "image") {
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
  });
};

const hoveringVideo = () => {
  const video = document.getElementById("video-each-category");
  video.addEventListener("mouseover", () => {
    video.play();
  });
  video.addEventListener("mouseout", () => {
    video.pause();
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

getDataImg("nature");
getDataImg("sport");
getDataImg("cartoon");
getDataVideo("nature");
embedCategoryToNav(mergeData(dataImg, dataVideo));
embedAllDataToNav(mergeData(dataImg, dataVideo));
hoveringVideo();
setActiveNav();