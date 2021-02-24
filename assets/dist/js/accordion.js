'use strict';
const accordionVariables = {
    tabs: 'js-accordion-header',
    panels: 'js-accordion-panel',
    addCls: 'is-open-panel',
    duration: '.3s',
    timingFunction: 'ease-out',
    multiSelectable: true,//ここをtrueにするとその他のパネルが閉じる設定
}

const accordionItemTabs = document.querySelectorAll(`.${accordionVariables.tabs}`);
const accordionItemPanels = document.querySelectorAll(`.${accordionVariables.panels}`);

accordionItemTabs.forEach(elem => {
    elem.addEventListener('click', (e) => {
        e.preventDefault;

        if (accordionVariables.multiSelectable == true) {
            const currentlyPanel = document.querySelector(`.${accordionVariables.tabs}` + `.${accordionVariables.addCls}`);
            if (currentlyPanel && currentlyPanel !== elem) {
                currentlyPanel.classList.toggle(accordionVariables.addCls);
                currentlyPanel.nextElementSibling.style.maxHeight = 0;
                currentlyPanel.setAttribute('aria-expanded', 'false');
                currentlyPanel.nextElementSibling.setAttribute('aria-hidden', 'true');
            }
        }

        elem.classList.toggle(accordionVariables.addCls);
        const panelBody = elem.nextElementSibling;
        if (elem.classList.contains(accordionVariables.addCls)) {
            panelBody.style.maxHeight = panelBody.scrollHeight + "px";
            panelBody.style.transition = `max-height ${accordionVariables.duration} ${accordionVariables.timingFunction}`;
            elem.setAttribute('aria-expanded', "true");
            panelBody.setAttribute('aria-hidden', 'false');
        } else {
            panelBody.style.maxHeight = 0;
            elem.setAttribute('aria-expanded', "false");
            panelBody.setAttribute('aria-hidden', 'true');
        }
    });
});

function settingAttributes() {
    const randomId = 'accordion';
    accordionItemTabs.forEach((tab, index) => {
        tab.setAttribute('id', `${randomId}-tab-${index}`);
        tab.setAttribute('aria-expanded', "false");
        tab.setAttribute('aria-controls', `${randomId}-panel-${index}`);
    });
    accordionItemPanels.forEach((panel, index) => {
        panel.setAttribute('id', `${randomId}-panel-${index}`);
        panel.setAttribute('aria-hidden', 'true');
        panel.style.overflow = 'hidden';
        panel.style.boxSizing = 'border-box';
        panel.style.maxHeight = 0;
    })
}
settingAttributes();