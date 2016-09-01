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
     * 初始化
     */
    init: function() {

        this.bindAction();
        this.removeAds();
    },

    /*
     * 根据设置关掉右侧广告
     */
    removeRight: function() {
        chrome.storage.sync.get('right_ad_switch', function(data) {
            if (data['right_ad_switch'] == 1) {
                document.querySelector('#content_right').style.display='block';
            }
            else {
                document.querySelector('#content_right').remove();
            }
        });
    },

    /*
     * 清理
     */
    removeAds: function() {

        console.log('start...');

        var ads = document.querySelectorAll('#content_left>div:not([class*="result"]):not([class="leftBlock"])');

        for (var i = 0; i < ads.length; i++) {
            ads[i].remove();
            console.log(ads[i]);
        }

        // 右侧广告
        document.querySelector('#content_right').style.display='none';
        this.removeRight();
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
