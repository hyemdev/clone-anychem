window.addEventListener("load", function () {
    //외부데이터 로딩
    // fetch("../data/newsdata.json")
    //     .then((res) => res.json())
    //     .then((result) => console.log(result))
    //     .catch((err) => console.log(err));
    const getNews = async () => {
        try {
            const res = await fetch("data/newsdata.json");
            const result = await res.json();
            makeHtml(result);
        } catch (err) {
            console.log(err);
        }
    };
    let makeHtml = (_data) => {
        let html = ``;
        _data.forEach((item) => {
            let tag = `
            <div class="swiper-slide">
                <div class="news-box">
                    <a href="${item.link}">
                        <span>${item.cate}</span>
                        <p>${item.title}</p>
                        <span class=news-box-date><i class="fa-regular fa-clock"></i>${item.date}</span>
                    </a>
                </div>
            </div>
            `;
            html += tag;
        });
        const newsWrap = document.querySelector(".sw-news > .swiper-wrapper");
        newsWrap.innerHTML = html;
        // swiper 생성
        new Swiper(".sw-news", {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            breakpoints: {
                1200: { slidesPerView: 3, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 10 },
            },
            pagination: {
                el: ".sw-news-pg",
                clickable: true,
            },
            speed: 800,
            autoplay: {
                delay: 2500,

            }
        });
    };
    getNews();
});
