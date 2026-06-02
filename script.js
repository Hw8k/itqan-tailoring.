document.addEventListener("DOMContentLoaded", function () {
    // تأثير ظهور العناصر عند التمرير لأسفل (Scroll Animation)
    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = revealElements[i].getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                revealElements[i].classList.add("active");
            }
        }
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // نظام التقييمات التفاعلي وحفظه في المتصفح LocalStorage
    const reviewsList = document.getElementById("reviewsList");
    const reviewForm = document.getElementById("reviewForm");
    const stars = document.querySelectorAll("#starsRating .star");
    const reviewRatingInput = document.getElementById("reviewRating");

    // التقييمات الافتراضية للمحل
    const defaultReviews = [
        { name: "أ. علي", rating: 5, text: "خياطة ممتازة وتفصيل متقن جداً، الأثواب مضبوطة من أول قياس وأنصح بالتعامل معهم بشدة." },
        { name: "أ. خالد", rating: 4, text: "الأقمشة الشتوية عندهم فخمة جداً وثقيلة ولها هيبة، خياطة ممتازة." }
    ];

    function getReviews() {
        let storedReviews = localStorage.getItem("itqan_reviews");
        return storedReviews ? JSON.parse(storedReviews) : defaultReviews;
    }

    function displayReviews() {
        if (!reviewsList) return;
        reviewsList.innerHTML = "";
        getReviews().forEach(rev => {
            let starIcons = "";
            for (let i = 1; i <= 5; i++) {
                starIcons += i <= rev.rating ? `<i class="fas fa-star"></i>` : `<i class="far fa-star"></i>`;
            }
            const card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML = `<div class="review-header"><span class="review-user">${rev.name}</span><div class="rating-stars">${starIcons}</div></div><p class="review-text">"${rev.text}"</p>`;
            reviewsList.appendChild(card);
        });
    }

    // تفاعل اختيار النجوم في التقييم
    stars.forEach(star => {
        star.addEventListener("click", function () {
            let ratingValue = this.getAttribute("data-value");
            reviewRatingInput.value = ratingValue;
            stars.forEach(s => s.classList.toggle("active", s.getAttribute("data-value") <= ratingValue));
        });
    });

    // إرسال تقييم جديد
    if (reviewForm) {
        reviewForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("reviewName").value;
            const text = document.getElementById("reviewText").value;
            const rating = parseInt(reviewRatingInput.value);

            let currentReviews = getReviews();
            currentReviews.push({ name, rating, text });
            localStorage.setItem("itqan_reviews", JSON.stringify(currentReviews));
            
            displayReviews();
            reviewForm.reset();
            stars.forEach(s => s.classList.add("active"));
            alert("شكراً لك! تم إضافة تقييمك بنجاح.");
        });
    }

    displayReviews();
});
