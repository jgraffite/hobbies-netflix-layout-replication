import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import "./style.scss";
var $owlCarousel;

const onDragged = function(e) {
    console.log('arrastou', e);
    if (!e.currentTarget.dataset.refreshed) {
        e.currentTarget.dataset.refreshed = "1";
        $owlCarousel.trigger('destroy.owl.carousel');
        $owlCarousel = initSlider(
            {
                loop: true,
                onInitialized: function() {
                    $owlCarousel.trigger('startPosition.owl.carousel', 0);
                }
            }
        );
        $owlCarousel.trigger('next.owl.carousel');
    }
};

const initSlider = function(items) {
    return $('.owl-carousel').owlCarousel({
        ...items,
        items: 6,
        stagePadding: 30,
        onDragged: onDragged,
    });
}
jQuery(function() {
    $owlCarousel = initSlider();
});
