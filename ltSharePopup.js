/**
 *   Created by: Yuri Borovik
 *   Email: yuri.borovik@gmail.com
 *   Date: 23.03.2016
 *   Time: 16:11
 *
 */
(function (angular, app) {
	'use strict';
	app.directive('ltShare', ['$window','$document','socialsFactory',function ($window,$document, socialsFactory) {
		return {
			restrict: 'AE',
			controller: [function () {
				var ltShare= this;
				// DESCRIPTION APP: OVERRIDE FOR FIREFOX AND IE DUE TO DIFFERENT VIEWPORT MEASURE WITH SCROLLBAR
				ltShare.browserOverride=0;
				if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)||/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
					ltShare.browserOverride=20;
				} else {
					ltShare.browserOverride=0;
				}

				ltShare.windowParams={
					winWidth: $window.innerWidth,
					winHeight: $window.innerHeight,
					winTop: (screen.height / 2) - (600 / 2),
					winLeft: (screen.width / 2) - (600 / 2)
				};
				ltShare.share=socialsFactory.share;
				ltShare.registerMenu=function(menu) {
					ltShare.menu=menu;
				};
				ltShare.Analytics=function (what) {
					// DESCRIPTION APP: SEND ANALYTICS CODE HERE
				};

			}],
			controllerAs: 'ltShare',
			transclude: true,
			bindToController: true,
			template: '<div ng-transclude></div>',
			link: function (scope, elem, attrs, ltShare) {
				ltShare.height = 0;
				ltShare.menuParams={
					topPos : 0,
					leftPos: 0,
					rightPos: ltShare.windowParams.windowWidth - ltShare.leftPos,
					menuHeight: ltShare.menu.outerHeight(),
					menuWidth: ltShare.menu.outerWidth()
				};

				ltShare.positionMenu=function(top,right) {
					ltShare.menu.velocity(
						{
							right: right,
							top: top
						});

				};
				ltShare.toggle = function () {
					ltShare.isOpen = ltShare.isOpen != true;
					if (ltShare.isOpen) {
						ltShare.openMenu();
					} else {
						ltShare.closeMenu();
					}
				};

				ltShare.closeMenu=function() {
					ltShare.menu.velocity(
						{
							height: 0,
							width:0,
							opacity: 0
						},
						{
							duration: 350,
							easing:  'easeOutQuint',
							complete: function () {
								$document.unbind('click',ltShare.closeMenu);
								//console.log(menu,lastHeight);
								ltShare.menu[0].style.height=ltShare.menuParams.menuHeight;
								ltShare.isOpen=false;
							}
						});
				};

				ltShare.openMenu=function() {
					ltShare.menuParams.topPos=elem.offset().top;
					ltShare.menuParams.rightPos=$window.innerWidth-(elem.offset().left+30);
					ltShare.positionMenu(elem.offset().top,$window.innerWidth-(elem.offset().left+30));
					ltShare.menu.velocity(
						{
							opacity: 1,
							height: ltShare.menuParams.menuHeight + 'px',
							width: ltShare.menuParams.menuWidth+ 'px',
							right: ltShare.menuParams.rightPos,
							top: ltShare.menuParams.topPos
						}, {
							display: 'block',
							duration: 350,
							easing:  'easeOutQuint',
							complete: function () {
								$document.bind('click',ltShare.closeMenu);

							}
						});
				};
				ltShare.menuParams.topPos=elem.offset().top;
				ltShare.menuParams.rightPos=ltShare.windowParams.winWidth-(elem[0].offsetLeft+30);
				ltShare.positionMenu(ltShare.menuParams.topPos,ltShare.menuParams.rightPos);

			}
		};
	}]);
	app.directive('ltShareTrigger', [function () {
		return {
			restrict: 'AE',
			require: '^ltShare',
			trancslude: true,
			bindToController: true,
			template: '<div class="share-menu-trigger" ng-click="ltShare.toggle()"><i class="mdi mdi-share-variant"></i></div>'
		};

	}]);
	app.directive('ltSharePopup', [function () {
		return {
			restrict: 'AE',
			templateUrl: 'ui/ltSocialPopup/ltSharePopup.html',
			require: '^ltShare',
			bindToController: true,
			replace:true,
			link: function (scope, elem, attrs, ctrl) {
				ctrl.registerMenu(elem);
			}
		};
	}]);

})(window.angular, window.angular.module('app.ui'));
