music.addEventListener("click", () => {
  clearInterval(myVar);
  fetch(
    "https://pixabay.com/api/?key=14910698-da2d9192ee156a4fb851cc1c6&q=music&image_type=photo",
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
      collection.innerHTML = "showind music collection";

      user_img.addEventListener("change", (e) => {
        clearInterval(myVar);
        section.innerHTML = res[e.target.value];
      });
    });
});
