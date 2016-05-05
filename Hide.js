/*
 * Encoding   : UTF-8
 * Description: chrome拓展 屏蔽百度推广链接
 *
 * @author    @齐士博 <qii404@126.com>
 *
 * @link http://weibo.com/shiboooo/
 */

var qii404 = {

    /*
     * id黑名单前缀
     */
    blackList: ['3', '4'],

    /*
     * 每个id前缀，强制跑多少次id模拟
     */
    blackLength: 10,

    /*
     * 初始化
     */
    init: function() {

        this.bindAction();
        this.removeAds();
    },

    /*
     * 清理
     */
    removeAds: function() {

        console.log('start...');

        var ad;

        for (var i in this.blackList) {

            for (var j = 1; j < this.blackLength; j++) {

                var idName = this.blackList[i] + '00' + j;

                if (ad = document.getElementById(idName)) {
                    ad.style.display = 'none';
                    console.log(idName, ad);
                }
            }
        }

        // 右侧广告直接去掉
        document.querySelector('#content_right').style.display = 'none';
    },

    /*
     * 绑定
     */
    bindAction: function() {

        var this_ = this;

        var observer = new MutationObserver(function() {
            this_.removeAds();
        });

        observer.observe(document.querySelector('#wrapper_wrapper'), {'childList': true});
    }
}

qii404.init();

// end of file Hide.js
