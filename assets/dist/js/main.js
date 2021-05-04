'use strict';

/**
 * target_blankを取得 rel属性の付与
 */
const textBreaks = () => {
    const breakElements = document.querySelectorAll('br');
    breakElements.forEach(element => {
        if (element.hasAttribute('aria-hidden') !== false) return;
        element.setAttribute('aria-hidden', 'true');
    });
}

textBreaks();