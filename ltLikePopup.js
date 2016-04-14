/**
 *   Created by: Yuri Borovik
 *   Email: yuri.borovik@gmail.com
 *   Date: 25.03.2016
 *   Time: 14:36
 *
 */
(function (angular, app) {
	'use strict';
	app.directive('ltLike', ['$window','$document',function ($window,$document) {
		return {
			restrict: 'AE',
			controller: [function () {
				var ltLike= this;
				// DESCRIPTION APP: OVERRIDE FOR FIREFOX AND IE DUE TO DIFFERENT VIEWPORT MEASURE WITH SCROLLBAR
				ltLike.browserOverride=0;

				if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)||/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
					ltLike.browserOverride=20;
				} else {
					ltLike.browserOverride=0;
				}

				ltLike.windowParams={
					winWidth: $window.innerWidth,
					winHeight: $window.innerHeight,
					winTop: (screen.height / 2) - (600 / 2),
					winLeft: (screen.width / 2) - (600 / 2)
				};

				
				ltLike.like = {
					facebookUrl:'https://www.facebook.com/{{YOUR}}',
					googleUrl:'https://plus.google.com/{{YOUR}}',
					vkontakteUrl:'http://vk.com/{{YOUR}}'
				};

				ltLike.registerMenu=function(menu) {
					ltLike.menu=menu;
					ltLike.height = 0;

					ltLike.menuParams={
						topPos : 0,
						leftPos: 0,
						rightPos: ltLike.windowParams.windowWidth - ltLike.leftPos,
						menuHeight: ltLike.menu.outerHeight(),
						menuWidth: ltLike.menu.outerWidth()
					};


				};
				ltLike.Analytics=function (what) {
					// DESCRIPTION APP: SEND ANALYTICS CODE HERE
				};
				ltLike.positionMenu=function(top,right) {
					ltLike.menu.css({right:right,top:top});
				};
				ltLike.toggle = function () {
					ltLike.isOpen = ltLike.isOpen != true;
					if (ltLike.isOpen) {
						ltLike.openMenu();
					} else {
						ltLike.closeMenu();
					}
				};

				ltLike.closeMenu=function() {
					ltLike.menu.velocity(
						{
							height: 0,
							width:0,
							opacity: 0
						},
						{
							duration: 350,
							easing:  'easeOutQuint',
							complete: function () {
								$document.unbind('click',ltLike.closeMenu);
								ltLike.menu[0].style.height=ltLike.menuParams.menuHeight;
								ltLike.isOpen=false;
							}
						});
				};
			}],
			controllerAs: 'ltLike',
			transclude: true,
			bindToController: true,
			template: '<div ng-transclude></div>',
			link: function (scope, elem, attrs, ltLike) {
				ltLike.openMenu=function() {
					ltLike.menuParams.topPos=elem.offset().top;
					ltLike.menuParams.rightPos=$window.innerWidth-(elem.offset().left+30+ltLike.browserOverride);
					ltLike.positionMenu(elem.offset().top,$window.innerWidth-(elem[0].offsetLeft+30+ltLike.browserOverride));

					ltLike.menu.velocity(
						{
							opacity: 1,
							height: ltLike.menuParams.menuHeight + 'px',
							width: ltLike.menuParams.menuWidth+ 'px',
							right: ltLike.menuParams.rightPos,
							top: ltLike.menuParams.topPos
						}, {
							display: 'block',
							duration: 350,
							easing:  'easeOutQuint',
							complete: function () {
								$document.bind('click',ltLike.closeMenu);
							}
						});
				};
			}
		};
	}]);
	app.directive('ltLikeTrigger', [function () {
		return {
			restrict: 'AE',
			require: '^ltLike',
			trancslude: true,
			bindToController: true,
			template: '<div class="share-menu-trigger" ng-click="ltLike.toggle()"><i class="mdi mdi-thumb-up"></i></div>'
		};

	}]);
	app.directive('ltLikePopup', [function () {
		return {
			restrict: 'AE',
			templateUrl: 'ui/ltSocialPopup/ltLikePopup.html',
			require: '^ltLike',
			bindToController: true,
			replace:true,
			link: function (scope, elem, attrs, ctrl) {
				ctrl.registerMenu(elem);
			}
		};
	}]);
})(window.angular, window.angular.module('app.ui'));
