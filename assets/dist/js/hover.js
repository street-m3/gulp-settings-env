'use strict';
document.addEventListener('DOMContentLoaded', () => {
    new Hover();
});

/**
 * hoverイベント
 * @constructor
 */

class Hover {
    constructor() {
        const o = {
            hoverEffectObjects: 'touch-hover',
            hoverEventToggleCls: 'hover',
        }
        this.hoverEffectObjects = document.querySelectorAll(`.${o.hoverEffectObjects}`);
        this.hoverEventToggleCls = o.hoverEventToggleCls;
        this.hoverEventStart = this._hoverEffectEventStart();
        this.hoverEventEnd = this._hoverEffectEventEnd();
    }

    _hoverEventEffect() {
        this.hoverEffectObjects.forEach(element => {
            element.addEventListener(this.hoverEventStart, () => {
                element.classList.add(this.hoverEventToggleCls);
            });
            element.addEventListener(this.hoverEventEnd, () => {
                element.classList.remove(this.hoverEventToggleCls);
            });
        });
    }

    _hoverEffectEventStart() {
        return window.ontouchstart ? 'touchstart' : 'mouseover';
    }
    _hoverEffectEventEnd() {
        return window.ontouchstart ? 'touchend' : 'mouseout';
    }
}