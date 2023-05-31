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
        //위의 구문을 통해서 slide가 완료되면
        //.sw-visual-pg에는 span.swiper-pagibation-bullet이 생성된다.
        //innerHTML을 이용해서 내용을 넣어보자
        const swVisualBullets = document.querySelectorAll(".sw-visual-pg .swiper-pagination-bullet");
        // swVisualBullets = [span, span]
        swVisualBullets.forEach((item, index, arr) => {
            // if else문을 사용해도 됨
            // if (index < 9) { item.innerHTML = `<em> 0${index + 1} </em>`;} 
            // else { item.innerHTML = `<em> 0${index + 1} </em>`; }
            
            // 삼항 연산자를 사용해도 됨.
            item.innerHTML = `<em>${index < 9 ? "0" : ""}${index + 1}</em>`;
        });
    }
});
