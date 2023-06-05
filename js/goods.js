window.addEventListener("load", function () {
    let swGoods;
    // const SLIDECOUNT = 4;

    const getData = async function () {
        //async는 함수앞에 붙이자
        try {
            let res = await fetch("data/gooddata.json"); //자료 다 불러올때까지 await하렴
            let result = await res.json(); //json으로 다 만들어질때까지 await하렴
            makeSlide(result);
            makeSlideShow();
            makeMenu(result);
        } catch (err) {
            //에러처리를 위해 try...catch문 사용하기
            console.log(err);
        }
    };

    function makeSlide(_data) {
        let html = ``;
        let copyArr = [..._data.goods];
        //swiper 버전에 따른 문제 발생 (강제 목록추가 제거)
        // //배열이 4개 이하라면 배열개수를 두배로 복사해보자

        // if (_data.goods.length <= SLIDECOUNT) {
        //     copyArr = [..._data.goods, ..._data.goods];
        // }

        copyArr.forEach((item) => {
            let temp = `
            <div class="swiper-slide">
            <a href="${item.link}" class="good-link">
                <div class="good-item">
                    <div class="good-item-img">
                        <img src="images/${item.image}" alt="${item.alt}" />
                    </div>
                    <div class="good-item-txt">
                        <p>${item.title}</p>
                        <span>${item.desc}</span>
                    </div>
                </div>
            </a>
        </div>
            `;
            html += temp;
        });

        document.querySelector(".sw-goods .swiper-wrapper").innerHTML = html;
    }

    function makeSlideShow() {
        swGoods = new Swiper(".goods-slide > .swiper-container", {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            speed: 1000,
            navigation: {
                prevEl: ".sw-goods-prev",
                nextEl: ".sw-goods-next",
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                },
            },
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
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
        lis.forEach((item, index) => {
            if (index === _index) {
                //순서번호랑 슬라이드 번호가 같다면 add
                item.classList.add("focus");
            } else {
                //순서번호랑 슬라이드 번호가 다르다면 remove
                item.classList.remove("focus");
            }
        });
        
    }

    function makeMenu(_data) {
        let html = ``;
        _data.goods.forEach((item) => {
            let temp = `
    <li><a href="#">${item.title}</a></li>
    `;
            html += temp;
        });
        document.querySelector(".goods-list").innerHTML = html;

        //li의 태그를 클릭하는 경우, 슬라이드 이동
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
    //슬라이드 멈추기/재생하기
    const bt = document.querySelector(".sw-goods-pause");
    const icon = bt.querySelector(".fa-pause");
    let swGoodsState = "play";
    bt.onclick = () => {
        if (swGoodsState === "play") {
            //슬라이드 멈춤
            swGoods.autoplay.stop();
            swGoodsState = "stop";
            icon.classList.add("fa-play");
        } else {
            //슬라이드 재생
            swGoods.autoplay.start();
            swGoodsState = "play";
            icon.classList.remove("fa-play");
        }
    };
    getData();
    // fetch("data/gooddata.json")
    //     .then((res) => res.json())
    //     .then((result) => console.log(result))
    //     .catch((err) => console.log(err));
});
