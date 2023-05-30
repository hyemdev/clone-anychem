
window.addEventListener("load", function (event) {
  const swVisualWrap = document.querySelector(".sw-visual .swiper-wrapper");

  fetch("data/visualdata.json")
    .then((res) => res.json())
    .then((result) => makeVisualHtml(result))
    .catch((err) => console.log(err));

  function makeVisualHtml(_data) {
    let html = ``;
    _data.img.forEach((item) => {
      let temp = `
            <div class="swiper-slide" style="background-image: url(images/${item})"></div>
        `;
      html += temp;
    });

    swVisualWrap.innerHTML = html;

    const swVisual = new Swiper(".sw-visual", {
      loop: true,
      effect: "fade",
      speed: 800,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".sw-visual-pg",
        clickable: true,
      },
    });
  }
});