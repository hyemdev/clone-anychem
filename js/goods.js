window.addEventListener("load", function () {
    // fetch("data/gooddata.json")
    //   .then((res) => res.json())
    //   .then((result) => console.log(result))
    //   .catch((err) => console.log(err));

    let swGoods;
    // const SLIDECOUNT = 4;

    const getData = async function () {
        try {
            let res = await fetch("data/gooddata.json");
            let result = await res.json();
            makeSlide(result);
            makeSlideShow();
            makeMenu(result);
        } catch (err) {
            console.log(err);
        }
    };

    function makeSlide(_data) {
        let html = ``;
        let copyArr = [..._data.goods];

        // Swiper 버전에 따른 문제 발생
        // 강제 목록 추가 제거
        // if (copyArr.length <= SLIDECOUNT) {
        //   copyArr = [..._data.goods, ..._data.goods];
        // }

        copyArr.forEach((item, index, arr) => {
            let tag = `
          <div class="swiper-slide">
            <a href="${item.link}" class="good-link">
              <div class="good-item">
                <div class="good-item-img" style="background-image:url(images/${item.image});">
                  
                </div>
                <div class="good-item-txt">
                  <p>${item.title}</p>
                  <span>${item.desc}</span>
                </div>
              </div>
            </a>
          </div>
        `;
            html += tag;
        });

        document.querySelector(".sw-goods .swiper-wrapper").innerHTML = html;
    }

    function makeSlideShow() {
        swGoods = new Swiper(".sw-goods", {
            loop: true,
            speed: 1000,
            slidesPerView: 3,
            spaceBetween: 50,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".sw-goods-next",
                prevEl: ".sw-goods-prev",
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1600: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
        swGoods.on("slideChange", function () {
            // let count = this.realIndex % SLIDECOUNT;
            // focusMenu(count);
            focusMenu(this.realIndex);
        });
    }

    function focusMenu(_index) {
        let lis = document.querySelectorAll(".goods-list li");
        lis.forEach((item, index, arr) => {
            if (index === _index) {
                // 순서번호랑 슬라이드 번호가 같다면 add
                item.classList.add("focus");
            } else {
                item.classList.remove("focus");
            }
        });
    }

    function makeMenu(_data) {
        let html = ``;
        _data.goods.forEach((item, index, arr) => {
            let tag = `
            <li><a href="#">${item.title}</a></li>
            `;
            html += tag;
        });
        document.querySelector(".goods-list").innerHTML = html;

        // li 의 태그를 클릭을 하는 경우 슬라이드이동
        let lis = document.querySelectorAll(".goods-list li a");
        lis.forEach((item, index, arr) => {
            item.onclick = function (event) {
                // a 태그의 href 막기
                event.preventDefault();
                swGoods.slideToLoop(index);
            };
        });

        focusMenu(0);
    }

    getData();

    // 슬라이드 멈추기/재생하기
    const bt = document.querySelector(".sw-goods-pause");
    const icon = bt.querySelector(".fa-pause");

    let swGoodsState = "play";
    bt.onclick = (event) => {
        const isPlaying = swGoodsState === "play";
        swGoods.autoplay[isPlaying ? "stop" : "start"]();
        swGoodsState = isPlaying ? "stop" : "play";
        icon.classList.toggle("fa-play");
        // if (swGoodsState === "play") {
        //   // 슬라이드 멈춰라
        //   swGoods.autoplay.stop();
        //   swGoodsState = "stop";
        //   icon.classList.add("fa-play");
        // } else {
        //   // 슬라이드 재실행
        //   swGoods.autoplay.start();
        //   swGoodsState = "play";
        //   icon.classList.remove("fa-play");
        // }
    };
    //------------- 재생 멈추기
});
