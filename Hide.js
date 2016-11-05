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
     * 清理
     */
    removeAds: function() {

        console.log('start normal ads...');

        this.removeNormalAds();
        this.removeRightAds();

        var this_ = this;
        setTimeout(function() {
            console.log('start mock ads...');
            this_.removeMockAds();
        }, 2000);
    },

    /*
     * 删除通用形式广告
     */
    removeNormalAds: function() {
        var ads = document.querySelectorAll('#content_left>div:not([class*="result"]):not([class="leftBlock"])');

        for (var i = 0; i < ads.length; i++) {
            ads[i].remove();
            console.log(ads[i]);
        }
    },

    /*
     * 删除一些假冒是搜索结果的特殊广告
     */
    removeMockAds: function() {
        var ads = document.querySelectorAll('#content_left>div[class*="result"]');

        for (var i = 0; i < ads.length; i++) {

            var ms = ads[i].querySelectorAll('.m');

            for (var j = 0; j < ms.length; j++) {
                if (ms[j].innerHTML === '广告') {
                    ads[i].remove();

                    console.log(ads[i]);
                    break;
                }
            }
        }
    },

    /*
     * 删除右侧【广告？ or 推荐？】
     */
    removeRightAds: function() {
        document.querySelector('#content_right').style.display='none';
        this.removeRight();
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
