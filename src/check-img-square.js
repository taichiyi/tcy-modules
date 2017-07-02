(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global);
        });
    } else {
        global.checkImgSquare = factory(global);
    }
}(this, function(window) {
    "use strict";

    var checkImgSquare = function(params, callback) {
        var document = window.document
        var min_side = null; // 最小边长，或者说最小高(宽)度
        var max_side = null; // 最大边长，或者说最大高(宽)度
        var id = +new Date();
        var img_html = '';
        var element = null;

        if (!params.url) {
            callback({
                status: false,
                code: 2,
                height: element.naturalHeight,
                width: element.naturalWidth,
            });
            return;
        }

        img_html = '<img src="' + params.url + '" style="position: fixed;top: 0;left: 0;opacity: 0;" id="id' + id + '">';

        if (typeof params.side === 'object') {
            min_side = params.side.min || min_side;
            max_side = params.side.max || max_side;
        }

        function remove_img() {
            element.parentNode.removeChild(element);
        }

        function check() {
            function is_square() {
                return element.naturalHeight === element.naturalWidth;
            }

            function check_min_size() {
                if (!params.side || !min_side) {
                    return true;
                }
                if (element.naturalHeight < min_side) {
                    return false;
                }
                return true;
            }

            function check_max_size() {
                if (!params.side || !max_side) {
                    return true;
                }
                if (element.naturalHeight > max_side) {
                    return false;
                }
                return true;
            }

            if (!is_square()) {
                callback({
                    status: false,
                    code: 3,
                    height: element.naturalHeight,
                    width: element.naturalWidth,
                });
                return;
            }

            if (!check_min_size()) {
                callback({
                    status: false,
                    code: 4,
                    height: element.naturalHeight,
                    width: element.naturalWidth,
                });
                return;
            }

            if (!check_max_size()) {
                callback({
                    status: false,
                    code: 5,
                    height: element.naturalHeight,
                    width: element.naturalWidth,
                });
                return;
            }

            callback({
                status: true,
                height: element.naturalHeight,
                width: element.naturalWidth,
            });
        }

        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', img_html);
        element = document.getElementById('id' + id);
        console.dir(element);

        window.setTimeout(function() {
            check();
            remove_img();
        }, 300);
    };

    return checkImgSquare;
}));
