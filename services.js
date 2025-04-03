// Smooth Scroll Functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Debounce Function to Optimize Event Listeners
function debounce(func, wait = 200) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Throttle Function for Performance Optimization
function throttle(func, limit = 100) {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Lazy Load Images
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img[data-src]");
    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    };
    const observer = new IntersectionObserver(lazyLoad, { rootMargin: "50px" });
    images.forEach(img => observer.observe(img));
});

// RequestAnimationFrame for Smooth Animations
function smoothAnimation() {
    let lastTime = 0;
    function animate(time) {
        const deltaTime = time - lastTime;
        lastTime = time;
        
        // Your animation logic here...

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}
smoothAnimation();

// Avoid Layout Thrashing - Batch DOM Updates
function updateDOMEfficiently() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
        const newDiv = document.createElement("div");
        newDiv.textContent = `Item ${i}`;
        fragment.appendChild(newDiv);
    }
    document.body.appendChild(fragment);
}
