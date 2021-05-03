'use strict';

window.addEventListener('load', () => {
    new Slideshow('topMainvisual__list', 'topMainvisual__item');
});

class Slideshow {
    constructor(container, elements) {
        const o = {
            nextImageDelay: 5000,
            fadeAnimation: 1000,
            currentImageCounter: 0,
            showInEffectCls: 'is-show',
            zoomInEffectCls: 'is-zoom',
            slideShowZoom: 'data-effect',
        }
        /**
         * DOMオブジェクト
         * @type {object} スライダーアイテムを包括するコンテナー
         * @type {object} スライダーアイテム
         * @type {number} 画像の表示時間
         * @type {number} フェードアウトにかかる時間(ms)
         * @type {number} カウンターの初期値
         * @type {string} 表示される時に付与されるクラス
         * @type {string} ズームエフェクト有効時に付与されるクラス
         * @type {string} スライダーのエフェクトを判別するデータ属性
         */ 
        this.slideShowContainer = document.querySelector(`.${container}`)
        this.slideShowImages = document.querySelectorAll(`.${elements}`);
        this.nextImageDelay = o.nextImageDelay;
        this.fadeAnimation = o.fadeAnimation;
        this.currentImageCounter = o.currentImageCounter;
        this.showInEffectCls = o.showInEffectCls;
        this.zoomInEffectCls = o.zoomInEffectCls;
        this._sldier_settings();
    }

    _sldier_settings() {
        if (this.slideShowContainer == null) return;
        // 最初のスライドの初期値を設定
        this.slideShowImages[0].classList.add(`${this.showInEffectCls}`);
        setInterval(() => {
            if (this.currentImageCounter < this.slideShowImages.length - 1) {
                let currentImage = this.slideShowImages[this.currentImageCounter];
                let hasNextImage = this.slideShowImages[++this.currentImageCounter]; //カウントアップの処理
                if (this.slideShowContainer.getAttribute('data-effect') === "zoom") {
                    this._interval_accessZoom(currentImage, hasNextImage);
                } else {
                    this._interval_access(currentImage, hasNextImage);
                }
            } else {
                let currentImage = this.slideShowImages[this.currentImageCounter]; //fadeOutする処理
                let hasNextImage = this.slideShowImages[this.currentImageCounter = 0]; //fadeinの処理
                if (this.slideShowContainer.getAttribute('data-effect') === "zoom") {
                    this._interval_accessZoom(currentImage, hasNextImage);
                } else {
                    this._interval_access(currentImage, hasNextImage);
                }
            }
        }, this.nextImageDelay);
    }

    _interval_access(current, next) {
        current.classList.remove(`${this.showInEffectCls}`);
        next.classList.add(`${this.showInEffectCls}`);
    }

    _interval_accessZoom(current, next) {
        current.classList.remove(`${this.showInEffectCls}`);
        next.classList.add(`${this.showInEffectCls}`, `${this.zoomInEffectCls}`);
        setTimeout(() => {
            current.classList.remove(`${this.zoomInEffectCls}`);
        }, this.fadeAnimation);
    }

    _openSlideShow(element) {
        return element.style.opacity = 1;
    }
}

/**
 * <section class="mod-topMainvisual">
        <div class="mod-topMainvisual__contnets">
            <div class="mod-topMainvisual__images">
                <ul class="topMainvisual__list" data-effect="zoom">
                    <li class="topMainvisual__item"
                        style="background-image: url(./images/topMainvisual-01.png);"></li>
                    <li class="topMainvisual__item"
                        style="background-image: url(./images/topMainvisual-02.png);"></li>
                    <li class="topMainvisual__item"
                        style="background-image: url(./images/topMainvisual-03.png);"></li>
                    <li class="topMainvisual__item"
                        style="background-image: url(./images/topMainvisual-04.png);"></li>
                </ul>
            </div>
            <div class="mod-topMainvisual__intorodaction">
                <span class="topMainvisual__intorodaction--caption">変わるをつくる</span>
                <h1 class="topMainvisual__intorodaction--logo">intorodaction</h1>
            </div>
        </div>
        <!-- scroll-down next section -->
        <button class="c-scroll-down__button" type="button">
            <span></span>
        </button>
    </section>

    <style>
        .mod-topMainvisual {
            display: block;
            height: calc(100vh - 90px);
            overflow: hidden;
            position: relative;
            z-index: 0;
        }
        .mod-topMainvisual .mod-topMainvisual__contnets .mod-topMainvisual__intorodaction {
            color: #ffffff;
            left: 50%;
            padding: 2rem 2.5rem;
            position: absolute;
            text-align: center;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;
        }
        .mod-topMainvisual .mod-topMainvisual__contnets .mod-topMainvisual__intorodaction .topMainvisual__intorodaction--caption {
            font-size: 26px;
            font-weight: bold;
            letter-spacing: 0.5em;
            user-select: none;
        }
        .mod-topMainvisual .mod-topMainvisual__contnets .mod-topMainvisual__intorodaction .topMainvisual__intorodaction--logo {
            font-family: "Lobster Two", cursive;
            font-size: 140px;
            letter-spacing: 0.05em;
            user-select: none;
        }
        .mod-topMainvisual .topMainvisual__list .topMainvisual__item {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            display: block;
            height: 100%;
            left: 0;
            object-fit: cover;
            opacity: 0;
            position: absolute;
            top: 0;
            transition: opacity 0.75s ease-in-out 0s;
            width: 100%;
            z-index: 1;
        }
        .mod-topMainvisual .topMainvisual__list .topMainvisual__item::after {
            background: rgba(0, 0, 0, 0.2) radial-gradient(rgba(0, 0, 0, 0.4) 30%, transparent 0) center center/4px 4px;
            content: "";
            display: inline-block;
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 2;
        }
        .mod-topMainvisual .topMainvisual__list .topMainvisual__item.is-show {
            opacity: 1;
            transition: opacity 0.75s ease-in-out 0s;
        }
    </style>
 */