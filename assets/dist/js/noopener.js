'use strict';

/**
 * target_blankを取得 rel属性の付与
 */
const linkersTarget = () => {
    const linksTarget = document.querySelectorAll('a');
    linksTarget.forEach(element => {
        if (element.hasAttribute('target') === false || element.getAttribute('target') !== '_blank') return;
        element.setAttribute('rel', 'noopener noreferrer');
    });
}
linkersTarget();