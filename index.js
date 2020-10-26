const section = document.querySelector(".section-images");
const collection = document.querySelector(".collection");
const user_img = document.getElementById("user-img");
const nav_section = document.querySelector(".nav-section");

const sport = document.getElementById("sport");
const food = document.getElementById("food");
const music = document.getElementById("music");

let myVar = null;

nav_section.addEventListener("click", (e) => {
  user_img.selectedIndex = 0;
  const b = e.target.innerHTML;
  clearInterval(myVar);
  fetch(
    `https://pixabay.com/api/?key=14910698-da2d9192ee156a4fb851cc1c6&q=${b}&image_type=photo`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      print = [];
      res.hits.forEach((img) => {
        const { largeImageURL } = img;

        print.push(`
            <img src="${largeImageURL}" class="img-section">
            `);
      });
      return print;
    })
    .then((res) => {
      section.innerHTML = res[0];
      let ind = 1;

      function myTimer() {
        section.innerHTML = res[ind];
        ind++;
        if (ind == res.length) {
          ind = 0;
        }
      }
      myVar = setInterval(myTimer, 3000);
      collection.innerHTML = `showind ${b} collection`;

      user_img.addEventListener("change", (e) => {
        const runImgUntil = e.target.value == "" ? res.length : e.target.value;
        clearInterval(myVar);
        ind = 0;
        
        function myTimer() {
          section.innerHTML = res[ind];
          ind++;
          if (ind == runImgUntil) {
            ind = 0;
          }
        }
        myVar = setInterval(myTimer, 3000);
      });
    });
});
