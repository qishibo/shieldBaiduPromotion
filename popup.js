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
    init: function () {
        this.rightAdsButtons = document.querySelectorAll('.right-ad-switch');
        this.renderButtons();
        this.bindActions();
    },

    /*
     * 点开popup,渲染开关设置
     */
    renderButtons: function() {
        chrome.storage.sync.get('right_ad_switch', function(data) {
            (data['right_ad_switch'] == undefined) && (data['right_ad_switch'] = 0);
            document.getElementById('right-ad-switch-' + data['right_ad_switch']).classList.add('right-ad-active');
        });
    },

    /*
     * 绑定开关事件
     */
    bindActions: function() {
        for (var i = 0; i < this.rightAdsButtons.length; i++) {
            var this_ = this;
            this.rightAdsButtons[i].onclick = function() {
                this_.changeAdStatus(this.getAttribute('op'))
                this_.removeAllActive();
                this.classList.add('right-ad-active');
            }
        }
    },

    /*
     * 更改开关状态，存储配置
     */
    changeAdStatus: function(option) {
        chrome.storage.sync.set({'right_ad_switch': option}, function() {
            console.log('save success! switch is ' + option)
        });

        document.querySelector('.status-tips').innerHTML = '开关设置成功，刷新页面即可';
    },

    /*
     * 取消按钮高亮，用于切换状态
     */
    removeAllActive: function() {
        for (var i = 0; i < this.rightAdsButtons.length; i++) {
            this.rightAdsButtons[i].classList.remove('right-ad-active');
        }
    }
}

qii404.init();

// end of file popup.js
