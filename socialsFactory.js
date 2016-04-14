/**
 *   Created by: Yuri Borovik
 *   Email: yuri.borovik@gmail.com
 *   Date: 25.03.2016
 *   Time: 12:08
 *
 */
/// <reference path="../../typings/angularjs/angular.d.ts" />;
var SocialsModule;
(function (SocialsModule) {
    var Socials = (function () {
        function Socials($window) {
            var socials = {
                platforms: {
                    facebook: {
                        app: 'facebook',
                        icon: 'facebook',
                        id: 'facebook-menu-icon',
                        image: 'facebook-box-white.png',
                        title: 'Facebook'
                    },
                    google: {
                        app: 'google',
                        icon: 'google-plus',
                        id: 'google-menu-icon',
                        image: 'google-plus-box-white.png',
                        title: 'Google+'
                    },
                    vkontakte: {
                        app: 'vkontakte',
                        icon: 'vk',
                        id: 'vkontakte-menu-icon',
                        image: 'google-plus-box-white.png',
                        title: 'Вконтакте'
                    }
                },
                share: {
                    facebook: function () {
                        socials.share.url = 'http://www.facebook.com/sharer.php?s=100';
                        socials.share.url += '&p[t]=' + encodeURIComponent(socials.share.shareTitle);
                        socials.share.url += '&p[summary]=' + encodeURIComponent(socials.share.shareDescription);
                        socials.share.url += '&p[url]=' + encodeURIComponent(socials.share.shareUrl);
                        socials.share.url += '&p[images][0]=' + encodeURIComponent(socials.share.shareImage);
                        socials.share.popup(socials.share.url);
                    },
                    google: function () {
                        socials.share.url = 'https://plus.google.com/share?';
                        socials.share.url += 'url=' + encodeURIComponent(socials.share.shareUrl);
                        socials.share.popup(socials.share.url);
                    },
                    popup: function (url) {
                        var windowParams = {
                            winHeight: $window.innerHeight,
                            winLeft: (screen.width / 2) - (600 / 2),
                            winTop: (screen.height / 2) - (600 / 2),
                            winWidth: $window.innerWidth
                        };
                        window.open(url, '', 'toolbar=0,status=0,width=626,height=436,left=' + windowParams.winLeft + ',top=' + windowParams.winTop + '');
                    },
                    shareDescription: '{{YOUR}}',
                    shareImage: '{{YOUR}}',
                    shareTitle: '{{YOUR}}',
                    shareUrl: '{{YOUR}}',
                    twitter: function () {
                        socials.share.url = 'http://twitter.com/share?';
                        socials.share.url += 'text=' + encodeURIComponent(socials.share.shareTitle);
                        socials.share.url += '&url=' + encodeURIComponent(socials.share.shareUrl);
                        socials.share.url += '&counturl=' + encodeURIComponent(socials.share.shareUrl);
                        socials.share.popup(socials.share.url);
                    },
                    url: '',
                    vkontakte: function () {
                        socials.share.url = 'http://vkontakte.ru/share.php?';
                        socials.share.url += 'url=' + encodeURIComponent(socials.share.shareUrl);
                        socials.share.url += '&title=' + encodeURIComponent(socials.share.shareTitle);
                        socials.share.url += '&description=' + encodeURIComponent(socials.share.shareDescription);
                        socials.share.url += '&image=' + encodeURIComponent(socials.share.shareImage);
                        socials.share.url += '&noparse=true';
                        socials.share.popup(socials.share.url);
                    }
                }
            };
            return socials;
        }
        Socials.$inject = [
            '$window'
        ];
        return Socials;
    }());
    SocialsModule.Socials = Socials;
    angular.module('app.components')
        .factory('socialsFactory', Socials);
})(SocialsModule || (SocialsModule = {}));
//# sourceMappingURL=socialsFactory.js.map