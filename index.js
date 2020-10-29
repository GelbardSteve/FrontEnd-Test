const section = document.querySelector(".section-images");
const collection = document.querySelector(".collection");
const user_img = document.getElementById("user-img");
const nav_section = document.querySelector(".nav-section");

const click_left = document.querySelector(".arrow-left");
const click_right = document.querySelector(".arrow-right");

const sport = document.getElementById("sport");
const food = document.getElementById("food");
const music = document.getElementById("music");

let myVar = null;

nav_section.addEventListener("click", (e) => {
  user_img.selectedIndex = 0;
  const domain = e.target.innerHTML;
  clearInterval(myVar);
  fetch(
    `https://pixabay.com/api/?key=14910698-da2d9192ee156a4fb851cc1c6&q=${domain}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      print = [];
      res.hits.forEach((img) => {
        const { largeImageURL } = img;

        print.push(`<img src="${largeImageURL}" class="img-section">`);
      });

      return print;
    })
    .then((res) => {
      section.innerHTML = res[0];
      let ind = { num: 1 };

      myVar = setInterval(() => {myTimer(ind, 0)}, 3000);
      collection.innerHTML = `showing ${domain} collection`;

      user_img.addEventListener("change", (e) => {
        const runImgUntil = e.target.value == "" ? res.length : e.target.value;
        clearInterval(myVar);
        ind.num = 0;

        myVar = setInterval(() => {myTimer(ind, runImgUntil)}, 3000);
      });

      click_left.addEventListener("click", () => {
        section.innerHTML =
          res[--ind.num === -1 ? (ind.num = res.length - 1) : (ind.num = ind.num)];
        clearInterval(myVar);
      });
      click_right.addEventListener("click", () => {
        section.innerHTML = res[++ind.num === res.length ? (ind.num = 0) : (ind.num = ind.num)];
        clearInterval(myVar);
      });


      function myTimer(time , ind) {
        section.innerHTML = res[time.num];
        time.num++;
        if (time.num == ind) {
          time.num = 0;
        }
      }
    });
});
