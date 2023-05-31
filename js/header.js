// nav에 마우스 오버 하면 header 높이 변화(260px) 주기
// nav에 마우스 아웃 하면 header 높이 반환(100px) 하기

//웹브라우저에 html , css , js , image를 모두 불러들여서 렌더링 준비가 끝나면
//그때 function의 블럭 안쪽 { } 실행하라!
window.addEventListener("load", function () {

    // toggle 기능 사용해보기
    // mbNav.classList.toggle("mb-nav-active");

    // 1. .header를 js로 저장해보자 (변수를 정의하자)
    let header = document.querySelector(".header");
    // 2. .nav를 js로 저장해보자 (변수를 정의하자)
    let nav = document.querySelector(".nav");

    // console.log(header);
    // console.log(nav);

    // nav에 마우스 오버 처리 (html요소에 마우스 오버 처리하는 법)
    nav.addEventListener("mouseenter", function () {
        // header의 높이를 260px로 변경하고싶다.
        // header.style.height = "260px"; //css 직접 변경시키는건 사실 좋은방법은 아님

        //class를 작성해서 변경시켜보자 (class명 앞에 . 찍지않기)
        header.classList.add("header-active");
    });
    // nav에 마우스 아웃 처리 (html요소에 마우스 아웃 처리하는 법)
    nav.addEventListener("mouseleave", function () {
        // header의 높이를 100px로 변경하고싶다.
        // header.style.height = "100px";

        //add된 class를 제거해서 변경시키자
        header.classList.remove("header-active");
    });

    let gnbA = document.querySelectorAll(".gnb > li");
    let navBlueBar = document.querySelector(".nav-blue-bar");

    //nav-blue-bar의 초기위치 지정해놓기
    let posX = gnbA[0].getBoundingClientRect().left;
    let widthX = gnbA[0].getBoundingClientRect().width;
    navBlueBar.style.left = posX + "px";
    navBlueBar.style.width = widthX + "px";

    gnbA.forEach((item) => {
        item.addEventListener("mouseenter", function (event) {
            //getBoundingClientRect사용해서 위치값 구하기
            //this는 앞 인스턴스(item)을 가리킴
            let posX = this.getBoundingClientRect().left;

            //getBoundingClientRect사용해서 너비구하기
            let widthX = this.getBoundingClientRect().width;

            anime({
                targets: navBlueBar,
                left: posX,
                width: widthX,
                easing: "easeInOutQuad",
                duration: 300,
            });
        });
    });

    
    let visual = document.querySelector(".visual");


    //스크롤에 의한 position:fixed, relative 교체
    window.addEventListener("scroll", function(){
        //스크롤 위치값 파악. 변수에 저장
        let scY = window.scrollY;
        //classList add() / remove() 를 활용
        if(scY > 0 ) {
            //스크롤바가 아래로 조금이라도 이동
            //position: fixed;
            header.classList.add("header-fixed");
            // visual.classList.add("visual-fixed");
        } else {
            //스크롤바가 최상단에 위치
            //position: relative;            
            header.classList.remove("header-fixed");
            // visual.classList.remove("visual-fixed");
        };
    });
});
