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
            headerLogo: "mod-header__logo", // logo
            headerNaviList: "mod-header-nav__list", //header nav ul
            ariaHiddenWindow: "(min-width: 992px)" //メディアクエリ
        };

        this.drawerOpenVisible = document.querySelectorAll(`[${o.drawerOpenVisible}]`);
        this.drawerButton = document.querySelector(`.${o.drawerButton}`);
        this.drawerOverlay = document.querySelector(`.${o.drawerOverlay}`);
        this.drawernaviContainer = document.querySelector(`.${o.drawernaviContainer}`);
        this.drawerNaviList = document.querySelector(`.${o.drawerNaviList}`);
        this.headerNaviList = document.querySelector(`.${o.headerNaviList}`);
        this.headerLogo = document.querySelector(`.${o.headerLogo}`);
        this.deskTopMatched = window.matchMedia(`${o.ariaHiddenWindow}`).matches;
        if (this.drawerButton == null) {
            return;
        }
        const addEvent = window.ontouchstart ? "touchstart" : "click";
        this.drawerButton.addEventListener(addEvent, (e) => {
            e.preventDefault();
            this._settingAttribute();
            this._focusVisibleSetting();
        });
        this.drawerOverlay.addEventListener(addEvent, (e) => {
            this._settingAttribute();
            this._focusVisibleSetting();
        });
        this._headerReadnaviList();
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
                this.headerLogo.style.pointerEvents = "none";
            } else {
                elem.dataset.focusVisible = "false";
                document.body.style.overflow = "";
                this.headerLogo.style.pointerEvents = "auto";
            }
        });
    }
    _headerReadnaviList() {
        if (this.drawerNaviList == null) {
            return;
        }
        if (this.deskTopMatched) {
            this.headerNaviList.setAttribute("aria-hidden", "false");
        } else {
            this.headerNaviList.setAttribute("aria-hidden", "ture");
        }
    }
}