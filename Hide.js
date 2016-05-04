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

    init: function(){

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
    }
}

qii404.init();

// end of file Hide.js
