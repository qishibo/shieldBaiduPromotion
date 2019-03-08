/*
 * Encoding   : UTF-8
 * Description: chrome拓展 屏蔽百度推广链接
 *
 * @author    @齐士博 <qii404@126.com>
 *
 * @link http://weibo.com/shiboooo/
 */

~function(){
    var rightSwitchKey = 'right_ad_switch';

    document.getElementById("radio").onclick = function () {
        var rightSwitch = document.getElementById('radio').checked;

        chrome.storage.sync.set({[rightSwitchKey]: rightSwitch ? 1 : 0}, function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var url = tabs[0].url;

                if (url.indexOf('www.baidu.com') !== -1) {
                    chrome.tabs.update(tabs[0].id, {url: url});
                }

                else {
                    document.getElementById('desc-extra').innerHTML = '更新成功，刷新百度搜索结果页即可';
                }
            });
        });
    };

    chrome.storage.sync.get(rightSwitchKey, function(data) {
        var rightSwitch = data[rightSwitchKey];
        document.getElementById('radio').checked = ((rightSwitch == 1) ? true : false);
    });
}();
