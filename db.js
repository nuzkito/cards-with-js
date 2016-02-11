var db = (function () {
    var data = {};
    var syncCallback = function () {};

    return function () {
        return {
            syncCallback: function (callback) {
                syncCallback = callback;
            },
            sync: function () {
                syncCallback(function (data) {
                    localStorage.setItem('cards db', JSON.stringify(data));
                });
            },
            getSavedData: function () {
                return JSON.parse(localStorage.getItem('cards db'));
            },
        };
    };
})();
