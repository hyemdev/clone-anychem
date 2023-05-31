window.addEventListener("load", function (){
    const swGoods = new Swiper (".sw-goods", {
        slidesPerView: 3, 
        loop: true,
        speed: 800,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
})