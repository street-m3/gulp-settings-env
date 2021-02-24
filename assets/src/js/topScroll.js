'use strict';
document.addEventListener('DOMContentLoaded', () => {
    new topScrollingBtnAction();
});

/**
 * トップに戻るボタン
 * @constructor
 */
class topScrollingBtnAction {
    constructor() {
        const o = {
            topScrollingBtn: 'js-topScroll-btn',
            pageScrollValue: 140,
            conditionAddCls: 'is-topScroll',
            targetElement: 'body'
        }
        this.topScrollingBtn = document.querySelector(`.${o.topScrollingBtn}`);
        this.pageScrollValue = o.pageScrollValue;
        this.conditionAddCls = o.conditionAddCls;
        this.targetElement = document.body;
        this.touchEventType = this._touchEventDeviceType();

        this._scrollButtonStart();
        this._windowScrollButtonIn();
    }

    _scrollButtonStart() {
        if (this.topScrollingBtn == null) return;
        this.topScrollingBtn.addEventListener(this.touchEventType, (e) => {
            e.preventDefault();
            this._smoothScrollBacktoTop();
        });
    }

    _windowScrollButtonIn() {
        window.addEventListener('scroll', () => {
            this._effectCondition();
        });
    }

    _effectCondition() {
        if (window.pageYOffset > this.pageScrollValue) {
            this.topScrollingBtn.classList.add(this.conditionAddCls);
        } else {
            this.topScrollingBtn.classList.remove(this.conditionAddCls);
        }
    }

    _smoothScrollBacktoTop() {
        this.targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    _touchEventDeviceType() {
        return window.ontouchstart ? "touchstart" : "click";
    }
}