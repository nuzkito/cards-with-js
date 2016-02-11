function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function init() {
    var cards = Cards(document.body);
    cards.setInitialData(db().getSavedData());
    db().syncCallback(function (next) {
        next(cards);
    });
});
