import { buildMiniPreviews } from "./mini-previews.js";
import { tns } from "/node_modules/tiny-slider/src/tiny-slider";

export const initCarousels = () => {
    const sliders = [];
    const sliderElementsQuery = '.tv-show-carousel';

    const onNavigated = (sliderElement, slider, index) => {
        
        if (window.matchMedia("(max-width: 575px)").matches || sliderElement.closest('div[class$="__slider-wrapper"]').dataset.refreshed) {
            return false;
        }

        sliderElement.dataset.refreshed = "1";
        sliderElement.closest('div[class$="__slider-wrapper"]').dataset.refreshed = "1";
        setTimeout(() => {
            sliders[index].destroy();
            sliders[index] = initSlider(
                document.querySelectorAll(sliderElementsQuery)[index],
                index,
                {
                    loop: true,
                },
            );
            sliders[index]?.goTo('next');
        }, 1000);
            
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
            loop: false,
            responsive: {
                320: {
                    edgePadding: 0,
                    items: 2,
                    slideBy: 2,
                    slideBy: 1,
                    mouseDrag: true,
                    loop: false,
                },
                768: {
                    edgePadding: 55,
                    items: 6,
                    slideBy: 6,
                },
                992: {
                    edgePadding: 55,
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
        slider.events.on('indexChanged', (e) => {console.log('e', e); onNavigated(sliderElement, slider, index); });
        return slider;
    }

    document.addEventListener("DOMContentLoaded", (event) => {
        document.querySelectorAll(sliderElementsQuery).forEach((elem, index) => {
            sliders[index] = initSlider(elem, index);
        })
    });
};