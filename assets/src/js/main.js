'use strict';

/**
 * brを取得 aria-hiddenの追加
 */
const lineBreaks = () => {
    const breakElements = document.querySelectorAll('br');
    breakElements.forEach(element => {
        if (element.hasAttribute('aria-hidden') !== 'false') return;
        element.setAttribute('aria-hidden', 'true');
    });
}

lineBreaks();