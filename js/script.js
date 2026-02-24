// 1. 타이핑 효과 (사용자 맞춤형)
const textSpan = document.querySelector(".typing-text");
const textArray = ["Backend Developer", "Spring Learner", "Java Programmer"]; // 원하는 멘트로 수정
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textIndex].length) {
        textSpan.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        textSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0;
        setTimeout(type, 500);
    }
}
document.addEventListener("DOMContentLoaded", type);

// 2. 다크 모드 / 라이트 모드 토글
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeBtn.querySelector("i");

themeBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    
    // 아이콘 및 텍스트 변경
    if(isLight){
        icon.classList.replace("fa-moon", "fa-sun");
        themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
        themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
});

// 3. 프로젝트 필터링
const filterBtns = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // 버튼 활성화 스타일
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        projectItems.forEach(item => {
            if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                item.classList.remove("hide");
            } else {
                item.classList.add("hide");
            }
        });
    });
});

// 4. 스크롤 스파이 (사이드바 메뉴 활성화)
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) { // 200px 여유
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});