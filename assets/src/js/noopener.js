'use strict';
// == target_blankを取得 rel属性の付与 ==
function linkersTarget() {
    const linksTarget = document.querySelectorAll('a');
    linksTarget.forEach(elem => {
        if (elem.hasAttribute('target') === false) {
            return;
        }
        if (elem.getAttribute('target') !== '_blank') {
            return;
        }
        elem.setAttribute('rel', 'noopener noreferrer');
    });
}

linkersTarget();