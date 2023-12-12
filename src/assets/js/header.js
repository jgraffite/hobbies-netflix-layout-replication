
(() => {
    /**
     * Toggle .scrolled on #header based on windows scrolled state
     */
    window.addEventListener('scroll', (e) => {
        const header = document.querySelector('#header');
        const method = (window.scrollY > 0) ? 'add' : 'remove';
        header.classList[method]('scrolled');
    });


     /**
     * Open / Close search box
     */
    const searchBox = document.querySelector('#search-box');
    searchBox.querySelector('input').addEventListener('blur', (e) => {
        searchBox.dataset.expanded = "0";
    });
    searchBox.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        searchBox.dataset.expanded = "1";
        searchBox.querySelector('input').focus();
    })
})();