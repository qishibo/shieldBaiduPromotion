// ==UserScript==
// @name         屏蔽百度推广|Powered by qii404.me
// @namespace    https://qii404.me/
// @version      0.1
// @description  为了你，为了你的家人在百度搜索的时候不至于被广告所蒙蔽
// @author       qii404
// @match        *://www.baidu.com/s*
// @run-at       document-start
// @homepage     https://github.com/qishibo/shieldBaiduPromotion
// @icon         https://imgup.qii404.me/shield_baidu_128.png
// @downloadURL  https://github.com/qishibo/shieldBaiduPromotion/blob/master/TamperMonkey.js
// @supportURL   https://qii404.me/
// ==/UserScript==

Object.defineProperty(window, 'MutationObserver', {
    value: window.MutationObserver,
    writable: false,
    configurable: false,
    enumerable: false
});

window.addEventListener ("load", function() {
    qii404.init();
});

var qii404 = {

    init: function() {
        this.removeAds();
        this.bindAction();
    },

    removeAds: function() {
        this.removeNormalAds();
        this.removeMockAds();
    },

    removeNormalAds: function() {
        console.log('start removing normal ads...');

        var ads = document.querySelectorAll('#content_left>div:not([class*="result"]):not([class="leftBlock"])');

        for (var i = 0; i < ads.length; i++) {
            ads[i].remove();
            console.log(ads[i]);
        }
    },

    removeMockAds: function() {
        console.log('start removing mock ads...');
        var ads = document.querySelectorAll('#content_left>div');

        for (var i = 0; i < ads.length; i++) {
            var ms = ads[i].querySelectorAll('span');
            for (var j = 0; j < ms.length; j++) {
                if (ms[j].innerHTML === '广告') {
                    ads[i].remove();

                    console.log(ads[i]);
                    break;
                }
            }
        }
    },

    bindAction: function() {
        var this_ = this;

        var observer = new window.MutationObserver(function() {
            this_.removeAds();
        });

        observer.observe(
            document.querySelector('#wrapper_wrapper'),
            {'childList': true, 'characterData': false, 'attributes': false, 'subtree': true}
        );
    }
}
