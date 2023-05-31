//Function: Get data from local storage
const getData = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  return data;
};

//Function: Get Data Related
const getRelatedData = (data_category) => {
  const data = JSON.parse(localStorage.getItem("data-full"));
  const relatedData = data.filter((item) => {
    return item.category === data_category;
  });
  return relatedData;
};

//Function: Embed data to html
const embedDataToHtml = (data) => {
  const img = document.getElementById("img-details");
  img.innerHTML = "";
  img.innerHTML += `
        <div class="img-wrap-details">
            <img src="${data.src}" class="img-details rounded" alt="${data.category}+${data.index}">
            <span class="img-text-details text-capitalize">${data.name}</span>
        </div>
        `;
};

//Function: Embed data related to html
const embedDataRelatedToHtml = (data) => {
  const related = document.getElementById("related-images");
  related.innerHTML = "";
  related.innerHTML += `
        <div class="row px-5 pb-5">
            ${data
              .map((item, index) => {
                if (item.type == "image") {
                  return `
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 img-wrap p-3">
                          <div class="card">
                            <img src="${item.src}" class="rounded img-each-category img-img" alt="${item.category}+${index}">
                            <span class="img-text text-capitalize">${item.name}</span>
                          </div>
                        </div>
                      `;
                }
              })
              .join("")}
        </div>
    `;
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
embedDataToHtml(getData());
embedDataRelatedToHtml(getRelatedData(getData().category));
setActiveClass();
