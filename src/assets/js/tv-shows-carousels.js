import { buildMiniPreviews } from "./mini-previews.js";
import { tns } from "/node_modules/tiny-slider/src/tiny-slider";

export const initCarousels = () => {
    const sliders = [];
    const sliderElementsQuery = '.tv-show-carousel';

    const onNavigated = (sliderElement, slider, index) => {
        if (!sliderElement.closest('div[class$="__slider-wrapper"]').dataset.refreshed) {
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
            }, 1000);
            
        }
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
            items: 6,
            slideBy: 'page',
            autoplay: false,
            edgePadding: 65,
            mouseDrag: false,
            dots: false,
            nav: true,
            controls: false,
            loop: false,
            responsive: {
                320: {
                    items: 2,
                },
                768: {
                    items: 6,
                }
            },
            ...options,
          });

        attachNavButtons(sliderElement, index);
        buildMiniPreviews();
        slider.events.on('indexChanged', () => onNavigated(sliderElement, slider, index));
        return slider;
    }

    document.addEventListener("DOMContentLoaded", (event) => {
        document.querySelectorAll(sliderElementsQuery).forEach((elem, index) => {
            sliders[index] = initSlider(elem, index);
        })
    });
};