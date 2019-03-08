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
     * 右侧推荐开关设置
     */
    rightSwitch: 1,

    /*
     * 初始化
     */
    init: function() {
        this.initRightSwitch();
        this.bindAction();
        this.removeAds();
    },

    /*
     * 初始化右侧推荐开关
     */
    initRightSwitch: function() {
        var this_ = this;
        chrome.storage.sync.get('right_ad_switch', function(data) {
            this_.rightSwitch = data['right_ad_switch'];
            this_.removeRightAds();
        });
    },

    /*
     * 清理
     */
    removeAds: function() {
        // this.removeNormalAds();
        this.removeMarkedAds();
        this.removeRightAds();
    },

    /*
     * 删除通用形式广告
     */
    removeNormalAds: function() {
        console.log('start removing normal ads...');

        var ads = document.querySelectorAll('#content_left>div:not([class*="result"]):not([class="leftBlock"])');

        for (var i = 0; i < ads.length; i++) {
            ads[i].remove();
            console.log(ads[i]);
        }
    },

    /*
     * 删除带有广告标识的广告
     */
    removeMarkedAds: function() {
        console.log('start removing marked ads...');

        var ads = document.querySelectorAll('#content_left>div');

        for (var i = 0; i < ads.length; i++) {
            var ms = ads[i].querySelectorAll('span');
            for (var j = 0; j < ms.length; j++) {
                if (ms[j].innerHTML === '广告') {
                    ads[i].remove();

                    console.log('removed', ads[i]);
                    break;
                }
            }
        }
    },

    /*
     * 删除右侧【广告？ or 推荐？】
     */
    removeRightAds: function() {
        var rightElement = document.querySelector('#content_right');

        if (rightElement && (this.rightSwitch != 1)) {
            rightElement.remove();
        }
    },

    /*
     * 绑定
     */
    bindAction: function() {
        var this_ = this;
        var observer = new MutationObserver(function() {
            this_.removeAds();
        });

        observer.observe(
            document.querySelector('#wrapper_wrapper'),
            {'childList': true, 'characterData': false, 'attributes': false, 'subtree': true}
        );
    }
}

qii404.init();

// end of file Hide.js
