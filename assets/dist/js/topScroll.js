window.addEventListener('load', () => {
    new TopScroll();
});

class TopScroll {
    constructor() {
        const o = {
            topScrollBtn: 'c-topScroll-button',
            scrollValue: 140,
            topscrolladdCls: 'is-topScroll',
        }
        this.topScrollBtn = document.querySelector(`.${o.topScrollBtn}`);
        this.scrollValue = o.scrollValue;
        this.topscrolladdCls = o.topscrolladdCls;
        this.topScroll_init();
    }

    topScroll_init() {
        if (this.topScrollBtn == null) return;
        this.topScrollButton();
        this.topScrollButtonClickd();
    }

    topScrollButton() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > this.scrollValue) {
                this.topScrollBtn.classList.add(this.topscrolladdCls);
            } else {
                this.topScrollBtn.classList.remove(this.topscrolladdCls);
            }
        });
    }

    topScrollButtonClickd() {
        this.topScrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            _smoothScroll(0);
        });
    }
}

function _smoothScroll(position) {
    let targetPosition = position;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let duration = 750;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};