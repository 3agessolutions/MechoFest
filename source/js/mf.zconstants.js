;
(function() {
    angular
        .module('mechofest')
        .constant('mfConstants', {

          'baseUrl': '/',
          'baseAppUrl': window.location.href && window.location.href.indexOf('mechofest2k17') > -1 ? '/' : '/MechoFest/app',
          'baseAppServiceUrl': window.location.href && window.location.href.indexOf('mechofest2k17') > -1 ? '/admin' : '/MechoFest/app/admin',

          'imageLocations': [
                'files/events/eventbg.png',
                'files/header/college.png',
                'files/header/fest_logo.png',
                'files/history/1.jpg',
                'files/history/2.jpg',
                'files/history/3.jpg',
                'files/history/4.jpg',
                'files/history/5.jpg',
                'files/history/6.jpg',
                'files/person/person1.png',
                'files/person/person2.png',
                'files/person/person3.png',
                'files/person/person4.png',
                'files/person/person5.png'
            ]
        });


})();
