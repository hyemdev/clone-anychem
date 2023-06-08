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
                        <span><i class="fa-regular fa-clock"></i>${item.date}</span>
                    </a>
                </div>
            </div>
            `;
            html += tag;
        });
        console.log(html);
    };
    getNews();
});
