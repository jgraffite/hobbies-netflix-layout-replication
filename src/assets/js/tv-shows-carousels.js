import { buildMiniPreviews } from "./mini-previews.js";
import { tns } from "/node_modules/tiny-slider/src/tiny-slider";

export const initCarousels = () => {
    const sliders = [];
    const sliderElementsQuery = '.tv-show-carousel';

    const findOutCorneredElements = (sliderElement) => {
        const nthItem = sliderElement.querySelector('.tns-slide-cloned') ? 2 : 1;
        sliderElement.querySelectorAll('.corner-start, corner-end').forEach(elem => elem?.classList.remove('corner-start', 'corner-end'));
        sliderElement.querySelector(`.tns-item:nth-child(${nthItem} of .tns-slide-active)`)?.classList.add('corner-start');
        sliderElement.querySelector(`.tns-item:nth-last-child(2 of .tns-slide-active)`)?.classList.add('corner-end');
    }

    const onNavigated = (sliderElement, slider, index) => {

        findOutCorneredElements(sliderElement);

        sliderElement.closest('div[class$="__slider-wrapper"]').dataset.navigated = "1";  
    };

    const attachNavButtons = (sliderElement, index) => {
        const sliderWrapper = document.querySelectorAll(sliderElementsQuery)[index].closest('div[class$="__slider-wrapper"]');
        const prevButton = sliderWrapper.querySelector('[class$="__nav-prev"]');
        const nextButton = sliderWrapper.querySelector('[class$="__nav-next"]');

        if (!nextButton || nextButton.dataset.addOk == "1")
            return false;

        nextButton.dataset.addOk = "1";

        prevButton?.addEventListener('click', () => {

            sliders[index]?.goTo('prev');
        });

        nextButton?.addEventListener('click', () => {
            sliders[index]?.goTo('next');
        });
    };

    const initSlider = (sliderElement, index, options) => {
        
        const slider = tns({
            container: sliderElement,
            slideBy: 6,
            autoplay: false,
            edgePadding: 55,
            mouseDrag: false,
            dots: false,
            nav: true,
            controls: false,
            loop: true,
            responsive: {
                320: {
                    edgePadding: 0,
                    items: 2,
                    slideBy: 1,
                    mouseDrag: true,
                    loop: false,
                },
                768: {
                    edgePadding: 55,
                    mouseDrag: false,
                    items: 6,
                    slideBy: 6,
                    loop: true,
                },
                992: {
                    edgePadding: 35,
                    items: 6,
                    slideBy: 6,
                },
                1200: {
                    edgePadding: 45,
                    items: 6,
                    slideBy: 6,
                },
                1600: {
                    edgePadding: 55,
                    items: 6,
                    slideBy: 6,
                },
                3840: {
                    edgePadding: 100,
                    items: 10,
                    slideBy: 10,
                },
            },
            ...options,
          });

        attachNavButtons(sliderElement, index);
        buildMiniPreviews();
        findOutCorneredElements(sliderElement);
        slider.events.on('indexChanged', () => onNavigated(sliderElement, slider, index));
        return slider;
    }

    document.addEventListener("DOMContentLoaded", (event) => {
        document.querySelectorAll(sliderElementsQuery).forEach((elem, index) => {
            sliders[index] = initSlider(elem, index);
        })
    });
};