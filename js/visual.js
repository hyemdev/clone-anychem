window.addEventListener("load", function () {
    const swVisualWrap = this.document.querySelector(
        ".sw-visual .swiper-wrapper"
    );

    //json 불러오기
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function (event) {
        let req = event.target;
        if (req.readyState === XMLHttpRequest.DONE) {
            let data = JSON.parse(req.response);
            makeVisualHtml(data);
        }
    });
    xhr.open("GET", "data/visualdata.json");
    xhr.send();

    function makeVisualHtml(_data) {
        let html = ``;
        _data.img.forEach((item) => {
            let temp = `
                <div
                class="swiper-slide"
                style="background-image: url(images/${item})"></div>
            `;
            html += temp;
        });

        //html에 밀어넣기
        swVisualWrap.innerHTML = html;

        //스와이퍼 넣는 위치 신경쓰기!
        const swVisual = new Swiper(".sw-visual", {
            loop: true,
            effect: "fade",
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    }
});
