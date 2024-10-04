// Load APi
const loadApi = (searchText, status) => {
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchText ? searchText : "iphone"
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      if (status) {
        displayProduct(data.data);
      } else {
        displayProduct(data.data.slice(0, 6));
      }
    });
};

function handleSearcBtn() {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");

  setTimeout(function () {
    loader.classList.add("hidden");
  }, 3000);

  const searchValue = document.getElementById("searctInput").value;
  loadApi(searchValue);
}

function displayProduct(data) {
  const productSection = document.getElementById("productSection");
  productSection.innerHTML = "";
  data.forEach((element) => {
    console.log(element);

    const { brand, image, phone_name, slug } = element;

    const div = document.createElement("div");

    div.innerHTML = `
        <div class="card-container p-8 rounded-md border">
          <section class="card">
            <div class="bg-[#0D6EFD0D] p-5 rounded-lg">
              <img
                src=${image}
                alt=${phone_name}
                class="w-[214px] h-[250px] mx-auto"
              />
            </div>
            <div class="text-center py-4 flex flex-col items-center gap-4">
              <h2 class="font-bold text-xl">${phone_name}</h2>
              <p class="w-8/12 mx-auto">
                ${slug}
              </p>
              <p class="font-bold text-xl">$999</p>
              <button
                class="btn btn-primary bg-[#0D6EFD] text-white rounded-[8px]"
              >
                Show Details
              </button>
            </div>
          </section>
        </div>
    `;

    productSection.append(div);
  });
}

function showMoreBtn() {
  const loadMore = document.createElement("div");
  loadMore.classList.add("flex", "py-4", "justify-center");
  loadMore.innerHTML = `
      <button onclick="loadMoreProduct()" class="btn btn-primary bg-[#0D6EFD] text-white rounded-[8px]"> See more </button
    `;
  document.getElementById("seeMore").append(loadMore);
}

function loadMoreProduct() {
  loadApi("", true);
}

loadApi();
showMoreBtn();
