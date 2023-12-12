import "./mini-previews.js";

var owlCarousels = [];

const onDragged = function(e, index) {
    console.log('e', e);
    if (!e.currentTarget.dataset.refreshed) {
        e.currentTarget.dataset.refreshed = "1";
        const owl = $('.owl-carousel').eq(index);
        owl.trigger('destroy.owl.carousel');
        owlCarousels[index] = initSlider(
            e.target,
            index,
            {
                loop: true,
                onInitialized: function() {
                    setTimeout(() => owl.trigger('next.owl.carousel'), 0);
                }
            },
        );
    }
};

const initSlider = function(elem, index, options) {
    return $(elem).owlCarousel({
        ...options,
        items: 6,
        stagePadding: 65,
        onDragged: (e) => onDragged(e, index),
        responsive: {
            320: {
                items: 2,
            },
            768: {
                items: 6,
            }
        }
    });
}
jQuery(function() {
    $('.owl-carousel').each(function (index, elem) {
        owlCarousels[index] = initSlider(elem, index);
        console.log('owlCarousels', owlCarousels);
    });
});