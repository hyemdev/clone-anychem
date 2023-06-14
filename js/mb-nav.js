window.addEventListener("load", function () {
    //모달창 처리
    //스크롤 없애기
    let body = document.querySelector("body");
    body.classList.add("modal-active");
    //클릭하면 사라지게 만들기
    let modal = document.querySelector(".modal");
    modal.onclick = function () {
        body.classList.remove("modal-active");
        this.style.display = "none";
    };
    // 모바일 버튼
    // mbNav라는 이름의 변수에 html의 mb-nav의 클래스를 저장한다.
    // (css에서 클래스를 불러오듯이 작성하면 됨)
    // = document; 는 html임
    // 변수로 뺄수있는 것은 최대한 빼는 것이 좋다
    const mbNav = document.querySelector(".mb-nav");
    const mbNavActive = "mb-nav-active";
    const mbWrap = document.querySelector(".mb-wrap");
    const mbWrapActive = "mb-wrap-active";
    //브라우저 사이즈도 변수로 뽑아준다
    const mbWidth = 1024;

    mbNav.addEventListener("click", function () {
        // 현재 mbNav에 mb-nav-active를 가지고 있는지 검토 (true / false)
        let checkActive = mbNav.classList.contains(mbNavActive);

        // if-else문 삽입
        // checkActive가 false와 같다면(데이터 타입까지 비교)
        if (checkActive === false) {
            mbNav.classList.add(mbNavActive); //add를 해라
            mbWrap.classList.add(mbWrapActive); //add를 해라
        } else {
            //아니라면
            mbNav.classList.remove(mbNavActive); //remove를 해라
            mbWrap.classList.remove(mbWrapActive); //remove를 해라
        }
        // mbNav에 active class를 add/ remove하고싶다
        // mbNav.classList.toggle("active");

        //reset 한다
        resetSubMenu();
        //펼침 기록 변수 초기화
        sideOpenNumber = undefined;
    });

    // 화면의 리사이즈를 조절해서 처리
    this.window.addEventListener("resize", function () {
        //브라우저(window) 가로 사이즈를 변수선언
        let windWidth = window.innerWidth;

        // 브라우저 사이즈가 1024보다 크면 제거하자!
        if (windWidth > mbWidth) {
            mbWrap.classList.remove(mbWrapActive);
            mbNav.classList.remove(mbNavActive);

            //reset 한다
            resetSubMenu();
            //펼침 기록 변수 초기화
            sideOpenNumber = undefined;
        }
    });

    const mbGnb = document.querySelector(".mb-gnb");

    //gnb부분 클릭해도 창 안닫히게 설정해두기
    mbGnb.addEventListener("click", function (event) {
        //이벤트 전달 막기
        event.stopPropagation();
    });

    //dim 클릭하면 사이드메뉴 닫기
    mbWrap.addEventListener("click", function () {
        mbWrap.classList.remove(mbWrapActive);
        mbNav.classList.remove(mbNavActive);

        //reset 한다
        resetSubMenu();
        //펼침 기록 변수 초기화
        sideOpenNumber = undefined;
    });

    // 모바일 아코디언 메뉴
    const sideLis = document.querySelectorAll(".mb-side-menu > li");
    const sideMenuA = document.querySelectorAll(".mb-side-menu > li > a");
    const mbSubMenu = document.querySelectorAll(".mb-side-menu > li > .submenu");
    const sideMenuOffset = 53;
    let sideOpenNumber;

    // 펼쳐질 높이값을 담아둔다.
    // const 변수의 배열(객체)은 값 변경이 가능하다
    const sideOpenHeightArray = [];

    //각 서브메뉴의 높이를 알아보자.
    mbSubMenu.forEach((item, index) => {
        // 늘어날 px값 + 주메뉴px(53px)을 더한다
        sideOpenHeightArray[index] = item.scrollHeight + sideMenuOffset;
    });

    // 클릭 처리 시작
    sideMenuA.forEach((item, index) => {
        item.addEventListener("click", function (event) {
            //a태그의 기본href 막기
            event.preventDefault();
            showSubMenu(index);
        });
    });
    function resetSubMenu() {
        // Reset 하겠다.
        // 모든 li의 높이를 53으로 하겠다
        sideLis.forEach((item) => {
            // item.style.height = sideMenuOffset + "px";
            anime({
                targets: item,
                height: sideMenuOffset,
                easing: "easeInOutQuad",
                duration: 200,
            });
        });
    }
    function showSubMenu(_showNumber) {
        // 모든 li 의 높이를 53 으로 하겠다.
        // Reset 하겠다.
        resetSubMenu();
        // 펼친 번호와 같은 값이 인자로 전달되면
        // 펼친 코드를 실행하지 않는다.
        if (_showNumber === sideOpenNumber) {
            //펼침 기록 숫자 초기화
            sideOpenNumber = undefined;
            //함수를 중단한다.
            return;
        }

        // 메뉴를 펼치고 나서, 브라우저를 축소하면 닫을 수 있도록
        //_showNumber에서 해당하는 li의 높이를 반영하겠다.
        sideLis.forEach((item, index) => {
            // item.style.height = index;
            if (_showNumber === index) {
                // item.style.height = sideOpenHeightArray[_showNumber] + "px";
                anime({
                    targets: item,
                    height: sideOpenHeightArray[_showNumber],
                    easing: "easeInOutQuad",
                    duration: 200,
                });
            }
        });
        //펼친번호를 기억한다.
        sideOpenNumber = _showNumber;
    }
});
