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
     * 针对每个id前缀，强制跑多少次id模拟
     */
    blackLength: 10,

    /*
     * 搜索动作是否已经绑定
     */
    actionBinded: false,

    init: function() {

        this.bindAction();

        console.log('start...');

        for (var i in this.blackList) {

            for (var j = 1; j < this.blackLength; j++) {
                var idName = this.blackList[i] + '00' + j;
                var ad;

                if (ad = document.getElementById(idName)) {
                    ad.style.display = 'none';
                    console.log(idName, ad);
                }
            }

        }

        // 右侧广告直接去掉
        document.querySelector('#content_right').style.display = 'none';
    },

    bindAction: function() {
        if (!this.actionBinded) {

            this.actionBinded = true;
            var this_ = this;

            var observer = new MutationObserver(function() {
                this_.init();
            });

            // var config = { attributes: true, childList: true, characterData: true };
            observer.observe(document.querySelector('#wrapper_wrapper'), {'childList': true});
        }
    }
}

qii404.init();

// end of file Hide.js
