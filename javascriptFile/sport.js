const section = document.querySelector(".section-images");
const collection = document.querySelector(".collection");
const user_img = document.getElementById("user-img");

const sport = document.getElementById("sport");
const food = document.getElementById("food");
const music = document.getElementById("music");

let myVar = null;

sport.addEventListener("click", () => {
  clearInterval(myVar);
  fetch(
    "https://pixabay.com/api/?key=14910698-da2d9192ee156a4fb851cc1c6&q=sport&image_type=photo",
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
      collection.innerHTML = "showind sport collection";

      user_img.addEventListener("change", (e) => {
        clearInterval(myVar);
        section.innerHTML = res[e.target.value];
      });
    });
});
