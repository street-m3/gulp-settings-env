'use strict';

document.addEventListener('DOMContentLoaded', () => {
    new ScreenAnimateInnerHTML();
    new ScreenAnimate();
});

const backfaceFixed = (fixed) => {
    /**
     * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
     */
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : '';

    /**
     * スクロール位置を取得する要素を出力する(`html`or`body`)
     */
    const scrollingElement = () => {
        const browser = window.navigator.userAgent.toLowerCase();
        if ('scrollingElement' in document) return document.scrollingElement;
        if (browser.indexOf('webkit') > 0) return document.body;
        return document.documentElement;
    };

    /**
     * 変数にスクロール量を格納
     */
    const scrollY = fixed ?
        scrollingElement().scrollTop :
        parseInt(document.body.style.top || '0');

    /**
     * CSSで背面を固定
     */
    const styles = {
        height: '100vh',
        left: '0',
        overflow: 'hidden',
        position: 'fixed',
        top: `${scrollY * -1}px`,
        width: '100vw',
    };

    Object.keys(styles).forEach((key) => {
        document.body.style[key] = fixed ? styles[key] : '';
    });

    /**
     * 背面固定解除時に元の位置にスクロールする
     */
    if (!fixed) window.scrollTo(0, scrollY * -1);
};

/**
 * @constructor
 * スクリーンアニメーション
 */
class ScreenAnimate {
    constructor() {
        const o = {
            dataEffectBoolean: 'data-animate-effect',
            animateTimingFunction: 2000, //フェードアニメーションが終了したタイミングの範囲で設定
            maxTime: 5000,
            firstElement: 'screen-animate-first',
            screenTitle: 'screen-animate-title',
            wrap: 'front-wrapper',
        }
        /**
         * @type {string} this.dataEffectBoolean 初期値はfalse
         * @type {number} this.animateTimingFunction trueになるまでの経過時間
         * @type {number} this.maxTime 最大秒数の設定
         * @type {string} this.firstElement タイトルや背景の設定
         * @type {string} this.title ロゴなどのタイトル
         * @type {string} this.wrap コンテンツを囲むコンテナー
         */
        this.dataEffectBoolean = o.dataEffectBoolean
        this.animateTimingFunction = o.animateTimingFunction;
        this.maxTime = o.maxTime;
        this.firstElement = document.querySelector(`.${o.firstElement}`);
        this.title = document.querySelector(`.${o.screenTitle}`);
        this.wrap = document.querySelector(`.${o.wrap}`);
        this.init();
    }

    //初期化 
    init() {
        // data属性がなければ処理を中断する
        if (this.dataEffectBoolean == null) return;
        this._screenAnimateSettings();
        setTimeout(() => { this._showScreenAnimate(); }, this.animateTimingFunction);
        setTimeout(() => { this._showScreenAnimate(); }, this.maxTime);
    }

    _showScreenAnimate() {
        if (document.body.getAttribute(this.dataEffectBoolean) == 'false') {
            document.body.dataset.animateEffect = "true";
            this._showIn();
        }
    }

    _screenAnimateSettings() {
        fadeOut(this.firstElement, 1900, 1000, 300, 1000);
        fadeIn(this.title, 300, 400, 400, 0);
        setTimeout(() => {
            backfaceFixed(false);
        }, this.animateTimingFunction + 100);
    }

    _showIn() {
        fadeIn(this.wrap, 100, 500, 0, 0);
    }

}

/**
 * スクリーンアニメーション用HTMLの追加
 */
class ScreenAnimateInnerHTML {
    constructor() {
        this.init();
    }

    init() {
        this._contentStyles();
        this._adjust();
    }

    _adjust() {
        document.body.insertAdjacentHTML('afterbegin', this._initHTML());
    }

    _contentStyles() {
        backfaceFixed(true);
    }

    _initHTML() {
        document.body.outerHTML =
        `<div class="screen-animate-wrap">
            <div class="screen-animate-first js-screen-animate-first">
                <span class="screen-animate-title">wall one</span>
            </div>
        </div>
        <div class="front-wrapper">${document.body.outerHTML}</div>
        `;
    }
}

// フェードイン用アニメーション関数
// args this.element, animation-duration(経過時間), transition(opacityの設定), transition-delay(opacity遅延時間), displayIn(表示させる秒数)
function fadeIn(element, duration, transition, delay, displayIn) {
    if (element == null) return;
    element.style.opacity = 0;
    element.style.transition = `opacity ${transition}ms ease ${delay}ms`;
    setTimeout(() => { element.style.opacity = 1; }, duration);
    setTimeout(() => { element.style.display = 'block' }, displayIn);
    return element, 200, 300, 0, 100;
}

// フェードイン用アニメーション関数
// args this.element, animation-duration(経過時間), transition(opacityの設定), transition-delay(opacity遅延時間), displayIn(非表示になる秒数)
function fadeOut(element, duration, transition, delay, displayend) {
    if (element == null) return;
    element.style.opacity = 1;
    element.style.transition = `opacity ${transition}ms ease ${delay}ms`;
    setTimeout(() => { element.style.opacity = 0; }, duration);
    setTimeout(() => { element.style.display = 'none'; }, duration + displayend);
    return element, 1000, 300, 0, 100;
}


/**
 * <style>
 * .front-wrapper {
    opacity: 0;
}
.screen - animate - first {
    background: #333333;
    color: #ffffff;
    display: block;
    height: 100%;
    left: 0;
    opacity: 1;
    position: fixed;
    text-align: center;
    top: 0;
    width: 100%;
    z-index: 99999;
}
.screen-animate-first .screen-animate-title {
    font-family: "Lobster Two", cursive;
    font-size: 3.5rem;
    font-weight: bold;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
}
</style>
 */