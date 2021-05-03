'use strict';

window.addEventListener('load', () => {
    new FooterFixed();
})

class FooterFixed {
    constructor() {
        const o = {
            fixeditem: 'js-footer-fixed',
            targetblock: 'mod-footer__Main',
            visibleScope: 140,
            hiddenScope: 140,
            processStop: '(min-width: 992px)',
        }

        this.fixeditem = document.querySelector(`.${o.fixeditem}`);
        this.targetblock = document.querySelector(`.${o.targetblock}`);
        this.visibleScope = o.visibleScope; //スクロールしたら表示されるまでの距離
        this.hiddenScope = o.hiddenScope; //非表示になる手前の距離
        this.processStop = window.matchMedia(`${o.processStop}`).matches; //処理を中止させる範囲

        this.init();
    }

    init() {
        if (this.fixeditem == null || this.processStop) return false; //処理を中止させる
        window.addEventListener('scroll', () => {
            this._footer_fixd(); //関数の実行
        });
    }

    _footer_fixd() {
        const windowScroll_visible = window.pageYOffset > this.visibleScope;
        const windowScroll_hidden = this.targetblock.getBoundingClientRect().top;
        const targetblock_before = windowScroll_hidden - this.hiddenScope < window.innerHeight;

        if (!windowScroll_visible || targetblock_before) {
            //非表示の処理
            this.fixeditem.style.visibility = 'hidden';
            this.fixeditem.style.opacity = 0;
        } else if (windowScroll_visible || !targetblock_before) {
            this.fixeditem.style.visibility = 'visible';
            this.fixeditem.style.opacity = 1;
        } else {
            console.log('error');
        }
    }
}


/**
 * <div class="p-footer__fixed js-footer-fixed">
        <a href="#" class="p-footer__fixed--link link-item-01">メールでお問い合わせ</a>
        <a href="#" class="p-footer__fixed--link link-item-02">電話でお問い合わせ</a>
    </div>
    <style>
        .p-footer__fixed {
            background-color: rgba(0, 0, 0, 0.8);
            bottom: 0;
            display: flex;
            justify-content: space-between;
            left: 0;
            opacity: 0;
            overflow: hidden;
            padding: 1rem;
            position: fixed;
            transition: all 0.3s ease-out 0s;
            visibility: hidden;
            width: 100%;
            z-index: 9999;
        }

        .p-footer__fixed .p-footer__fixed--link {
            border-radius: 3px;
            color: #f7f7f7;
            display: block;
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.5;
            padding: 10px 0;
            position: relative;
            text-align: center;
            width: 48%;
        }

        .p-footer__fixed .p-footer__fixed--link.link-item-01 {
            background-color: #a0bc3e;
        }

        .p-footer__fixed .p-footer__fixed--link.link-item-02 {
            background-color: #e9a000;
        }
    </style>
 */