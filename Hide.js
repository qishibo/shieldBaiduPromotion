/**
 * Created on : 2016-04-15 18:49:33 星期五
 * Encoding   : UTF-8
 * Description: chrome拓展 屏蔽百度推广链接
 *
 * @author    @齐士博 <qii404@126.com>
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

    /*
     * 点击、enter动作进行搜索之后，等待该时间,再次进行屏蔽
     * 网速快的可以设置小一点
     */
    waitResultTime: 1000,

    init: function() {

        this.bindAction();

        console.log('start...');

        for (var i = 0; i < this.blackList.length; i++) {

            for (var j = 1; j < this.blackLength; j++) {
                var idName = this.blackList[i] + '00' + j;
                var ad;

                if (ad = document.getElementById(idName)) {
                    ad.style.display = 'none';
                }

                console.log(idName, ad);
            }

        }
    },

    bindAction: function() {
        if (!this.actionBinded) {

            this.actionBinded = true;
            var this_ = this;

            // 绑定点击搜索按钮的动作
            document.getElementById('su').addEventListener('click', function(){
                setTimeout(function(){
                    this_.init();
                }, this_.waitResultTime);
            });

            // 绑定enter键的动作
            document.body.addEventListener('keydown', function(e){
                if (e.keyCode == 13) {
                    setTimeout(function(){
                        this_.init();
                    }, this_.waitResultTime);
                }
            });
        }
    }
}

qii404.init();

// end of file Hide.js
