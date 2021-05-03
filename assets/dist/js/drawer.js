'use strict';

document.addEventListener('DOMContentLoaded', () => {
    new Drawer();
});

/**
 * ドロワーナビゲーション
 * @constructor
 */

class Drawer {
    constructor() {
        const o = {
            drawerOpenVisible: "data-focus-visible", //body
            drawerContainer: "mod-drawer__container", //container
            drawerButton: "mod-drawer__button", //btn
            drawerOverlay: "mod-drawer__overlay", //background
            drawernaviContainer: "mod-drawer__navigation",
            drawerNaviList: "mod-drawer-nav__list", //ul
            headerNaviList: "mod-header-nav__list", //header nav ul
            ariaHiddenWindow: "(min-width: 992px)" //メディアクエリ
        };

        this.drawerOpenVisible = document.querySelectorAll(`[${o.drawerOpenVisible}]`);
        this.drawerButton = document.querySelector(`.${o.drawerButton}`);
        this.drawerOverlay = document.querySelector(`.${o.drawerOverlay}`);
        this.drawernaviContainer = document.querySelector(`.${o.drawernaviContainer}`);
        this.drawerNaviList = document.querySelector(`.${o.drawerNaviList}`);
        this.headerNaviList = document.querySelector(`.${o.headerNaviList}`);
        this.deskTopMatched = window.matchMedia(`${o.ariaHiddenWindow}`).matches;
        this.addDeviceEvent = this._addeventMatchDevice();

        this.init();
    }

    init() {
        this._drawerButtonClick();
        this._drawerOverlayClick();
        this._headerReadnaviList();
    }

    _drawerButtonClick() {
        this.drawerButton.addEventListener(this.addDeviceEvent, (e) => {
            e.preventDefault();
            this._settingAttribute();
            this._focusVisibleSetting();
        });
    }
    _drawerOverlayClick() {
        this.drawerOverlay.addEventListener(this.addDeviceEvent, (e) => {
            this._settingAttribute();
            this._focusVisibleSetting();
        });
    }
    /***
     * アクセシビリティの追加
     * @returns
     */
    _settingAttribute() {
        const isExpanded = this.drawerButton.getAttribute("aria-expanded") === "true";
        const isContents = this.drawerNaviList.getAttribute("aria-hidden") === "true";
        this.drawerButton.setAttribute("aria-expanded", !isExpanded);
        this.drawerNaviList.setAttribute("aria-hidden", isExpanded);
    }
    /**
     * データ属性にてstyleを追加 / overlay / scroll制御
     * @returns
     */
    _focusVisibleSetting() {
        this.drawerOpenVisible.forEach((elem) => {
            if (elem.getAttribute("data-focus-visible") === "false") {
                elem.dataset.focusVisible = "true";
                document.body.style.overflow = "hidden";
            } else {
                elem.dataset.focusVisible = "false";
                document.body.style.overflow = "";
            }
        });
    }
    _headerReadnaviList() {
        if (this.drawerNaviList == null) return;
        if (this.deskTopMatched) {
            this.headerNaviList.setAttribute("aria-hidden", "false");
        } else {
            this.headerNaviList.setAttribute("aria-hidden", "ture");
        }
    }
    _addeventMatchDevice() {
        return window.ontouchstart ? "touchstart" : "click";
    }
}