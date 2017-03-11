(function() {
    angular.module('mechofest', ["ngResource", "ui.router"]);
    angular.module('mechofest')
        .config(function($compileProvider) {
            $compileProvider.preAssignBindingsEnabled(true);
        }).config(['$resourceProvider', function($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]).config(['$httpProvider', function($httpProvider){
          $httpProvider.defaults.headers.common['csrftoken'] = 'dfdkfjdkfj3434343kj';
        }]);
})();

(function() {
    angular
        .module('mechofest')
        .factory(
            'preloader',
            function($q, $rootScope) {
                function Preloader(imageLocations) {
                    this.imageLocations = imageLocations;

                    this.imageCount = this.imageLocations.length;
                    this.loadCount = 0;
                    this.errorCount = 0;
                    this.states = {
                        PENDING: 1,
                        LOADING: 2,
                        RESOLVED: 3,
                        REJECTED: 4
                    };
                    this.state = this.states.PENDING;

                    this.deferred = $q.defer();
                    this.promise = this.deferred.promise;
                }

                Preloader.preloadImages = function(imageLocations) {
                    var preloader = new Preloader(imageLocations);
                    return (preloader.load());
                };

                Preloader.prototype = {
                    constructor: Preloader,

                    isInitiated: function isInitiated() {
                        return (this.state !== this.states.PENDING);
                    },
                    isRejected: function isRejected() {
                        return (this.state === this.states.REJECTED);
                    },
                    isResolved: function isResolved() {
                        return (this.state === this.states.RESOLVED);
                    },
                    load: function load() {
                        if (this.isInitiated()) {
                            return (this.promise);
                        }
                        this.state = this.states.LOADING;
                        for (var i = 0; i < this.imageCount; i++) {
                            this.loadImageLocation(this.imageLocations[i]);
                        }
                        // Return the deferred promise for the load event.
                        return (this.promise);
                    },

                    handleImageError: function handleImageError(imageLocation) {
                        this.errorCount++;
                        // If the preload action has already failed, ignore further action.
                        if (this.isRejected()) {
                            return;
                        }
                        this.state = this.states.REJECTED;
                        this.deferred.reject(imageLocation);
                    },
                    handleImageLoad: function handleImageLoad(imageLocation) {
                        this.loadCount++;
                        if (this.isRejected()) {
                            return;
                        }

                        this.deferred.notify({
                            percent: Math.ceil(this.loadCount / this.imageCount * 100),
                            imageLocation: imageLocation
                        });

                        if (this.loadCount === this.imageCount) {
                            this.state = this.states.RESOLVED;
                            this.deferred.resolve(this.imageLocations);
                        }
                    },

                    loadImageLocation: function loadImageLocation(imageLocation) {
                        var preloader = this;

                        var image = angular.element(new Image())
                            .bind('load', function(event) {
                                // Since the load event is asynchronous, we have to
                                // tell AngularJS that something changed.
                                $rootScope.$apply(
                                    function() {
                                        preloader.handleImageLoad(event.target.src);
                                        // Clean up object reference to help with the
                                        // garbage collection in the closure.
                                        preloader = image = event = null;
                                    }
                                );
                            })
                            .bind('error', function(event) {
                                // Since the load event is asynchronous, we have to
                                // tell AngularJS that something changed.
                                $rootScope.$apply(
                                    function() {
                                        preloader.handleImageError(event.target.src);
                                        // Clean up object reference to help with the
                                        // garbage collection in the closure.
                                        preloader = image = event = null;
                                    }
                                );
                            })
                            .attr('src', imageLocation);
                    }
                };
                // Return the factory instance.
                return (Preloader);
            }
        );



})();

;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider, $urlRouterProvider, mfConstants) {
        $urlRouterProvider.otherwise('/');
    }

    angular
        .module('mechofest')
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
        }]);

})();

angular.module('mechofest').run(['$templateCache', function($templateCache) {$templateCache.put('source/js/components/about/about.html','<div class="mecho-fest fest-about">\n    <mf-header></mf-header>\n    <mf-banner page="about"></mf-banner>\n    <div class="fest-about-content">\n        <div class="about-photo">\n            <img src="files/person/person1.png" />\n        </div>\n        <div class="about-name">\u2018Cavalier\u2019 Dr. M.S.Mathivaanan M.Com., M.A., D.I.E.M., H.G.D.M.(LON).,F.T.A., M.Phil., Ph.D.,</div>\n        <div class="about-designation">CHAIRMAN</div>\n        <div class="about-detail">\n            <p>\u2018Cavalier\u2019 Dr. M.S.Mathivaanan, chairman of SSM Group of Institutions, is a versatile and multifaceted facility. Basically an industrialist hailing from Komarapalayam town, he has achieved many milestones. He has to his credit a vast experience\n                in managing educational institutions and is the forerunner in the establishment of SSM College Of Engineering, SSM College Of Arts & Science and other institutions of SSM Group. He has presented Numerous papers in International conferences\n                of which a paper on \u2018Engineering Management Education & Social and Philosophical Aspects of technology & its impact on Modern Society\u2019 at UNESCO International centre for Engineering Education is a notable one</p>\n            <p>He is the member of Apex-body of the Textile association (India), Confederation of India Weaving Industries, Power loom Development and Export Promotion Council, South India Textile Manufacture\u2019s Association and Nodal Centre for upgradation\n                of Textile Education, to name a few. He received the fellowship of \u2018World Academy of Productivity Science\u2019 at Shenyang in china.\n            </p>\n            <p>He is also an active and constructive social leader who has been a signatory of the convention of the Rights of the child at the United Nations and 2nd Don Black Belt in Karate by Kyokushin karate International. He is the first Indian and\n                first non-christian in the world to receive the grand cross \u2018Cavalier\u2019 title at the Royal Palace, Italy by his Royal Highness, Italy for promoting the rights of Child at United Nations.\n            </p>\n        </div>\n    </div>\n    <div class="fest-about-content">\n        <div class="about-photo">\n            <img src="files/person/person2.png" />\n        </div>\n        <div class="about-name">Mr. Indarjith Mathivaanan</div>\n        <div class="about-designation">VICE CHAIRMAN</div>\n        <div class="about-detail">\n            <p>Mr. Indarjith Mathivaanan is the Vice-Chairman of SSM Group of Institutions. He studied at Montfort school and completed his Bachelor of Engineering in Honors with Business Studies at University of Southampton, United Kingdom. He holds several\n                decisive positions such as</p>\n            <ul>\n                <li>Chief Executive Officer of SSM International Academy</li>\n                <li>Managing Director of Tanext Chemicals</li>\n                <li>Chief Executive Officer of Caliber Corporation, Belgium</li>\n                <li>Director of Cavery Clothing Company & Trustee of SSM Educational Trust</li>\n            </ul>\n            <p>With a vision to enhance overall development of Individual and Institution, he has undertaken visits abroad for promotional activities of SSM Group of Institutions. </p>\n            <p>Inspired by the \u2018Tom shoes\u2019 activities, he has commenced a business venture with a social cause called \u201CDevalan\u201D which means clothing the world. \u201CDevalan\u201D produces High quality polo T-shirts and Denim jeans to be sold in the market. The concept\n                of Develan is \u2018For every product sold, Devalan gives a similar product to a child in need\u2019. That is YOU buy one and WE give one to a child in need </p>\n        </div>\n    </div>\n    <div class="fest-about-content">\n        <div class="about-photo">\n            <img src="files/person/person3.png" />\n        </div>\n        <div class="about-name">Dr. C. Kumar Charlie Paul</div>\n        <div class="about-designation">PRINCIPAL</div>\n        <div class="about-detail">\n            <p>Dr. C. KUMAR Charlie paul, He did his Bachelor in Electronics & Communication Engineering at Karunya University, Coimbatore and his master of Engineering in Applied Electronics at Government College of technology, Coimbatore. He completed\n                his Doctor of Philosophy in \u2018Embedded Systems\u2019 at Magadh University, Bihar in the year of 2009. He served as Dean, Director and Principal at various Educational Institutions and has total teaching experience of 26 years. Until now, he\n                published 45 Technical papers in Internationals Journals and 30 papers in National Journals. He organized several Workshops, National & International symposiums and National & International Conferences. He penned 15 Books on \u2018Information\n                & Communication Engineering\u2019 and all these books were published by leading Book Publishing Agencies in India.\n            </p>\n        </div>\n    </div>\n    <div class="fest-about-content">\n        <div class="about-photo">\n            <img src="files/person/person4.png" />\n        </div>\n        <div class="about-name">P.R. MANIKANDAN</div>\n        <div class="about-designation">HOD</div>\n        <div class="about-detail">\n            <p>Mr.P.R.Manikandan completed his post graduation, M.E (Industrial Engineering), from the Anna University Chennai in the year 1997 with Gold medal. He is in the teaching field for the past 17 years and 2years of industrial experience. Gave guest\n                lecture at various Engineering colleges on \u201CRenewable Energy Sources\u201D. He is a resource person for the workshops preparation & delivery skills in Effective teaching at various occasions.\n            </p>\n        </div>\n    </div>\n    <div class="fest-about-content">\n        <div class="about-photo">\n            <img src="files/person/person5.png" />\n        </div>\n        <div class="about-name">Professor G.KATHIRESAN</div>\n        <div class="about-designation">CO-ORDINATOR</div>\n        <div class="about-detail">\n            <p>Prof. G. Kathiresan , did his bachelor of Engineering in Mechanical Engineering at K.S.R. College of Technology Periyar University, Salem and his Master of Engineering IN (CAD/CAM) at Karunya University, Coimbatore. He pursuing his Doctor\n                of philosophy in Mechanical Engineering at Anna University, Chennai. He is having total teaching experience of 13 years. Until now, he published 4 Technical papers in International Journal & 4 Technical papers in International Conferences.\n                He organized several workshops, & symposium\n            </p>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('source/js/components/event/event.html','<div class="mecho-fest mecho-fest-events">\n    <mf-header></mf-header>\n\n    <mf-banner page="event"></mf-banner>\n    <div class="event-header">\n        <h2>Events</h2>\n        <p>\n            <span class="event-title">Date:</span>\n            <span class="event-value">24 - March - 2017</span>\n        </p>\n        <p>\n            <span class="event-title">Venue:</span>\n            <span class="event-value">SSM COLLEGE OF ENGINEERING</span>\n        </p>\n    </div>\n    <mf-events model="event.model" ng-if="!event.model.activeEvent"></mf-events>\n    <mf-event-view model="event.model" ng-if="event.model.activeEvent"></mf-events-view>\n</div>\n');
$templateCache.put('source/js/components/index/index.html','<div class="mecho-fest mf-page">\n    <mf-header></mf-header>\n    <div ng-if="home.imageLoaded">\n      <mf-banner></mf-banner>\n      <div class="home-content">\n          <div class="home-photo">\n              <img src="files/header/college.png" />\n          </div>\n          <div class="home-name">SSM COLLEGE OF ENGINEERING</div>\n          <div class="home-detail">\n              <p>SSM College of Engineering was established in 1998 through the persistent efforts of \u2018Gnanathandhai\u2019 SSM Subramaniam, an industrial conglomerate.</p>\n              <p>SSM College of Engineering headed by the Chairman \'Cavalier\u2019 Dr. M. S. Mathivaanan and having placed in the highly industrialized zone of South India, is recognized as one of the best engineering colleges in South India.Our students have prospects\n                  of taking part in a noteworthy range of activities through academic courses taught by renowned professors, research and public service opportunities, and an extraordinary breadth of extracurricular activities.</p>\n          </div>\n      </div>\n      <div class="home-title">\n          <h2>Past Year Memories</h2>\n      </div>\n      <div class="home-images" ng-switch="home.activeIndex">\n          <div class="home-image-content" ng-switch-when="1">\n              <img src="files/history/1.jpg" alt="">\n          </div>\n          <div class="home-image-content" ng-switch-when="2">\n              <img src="files/history/2.jpg" alt="">\n          </div>\n          <div class="home-image-content" ng-switch-when="3">\n              <img src="files/history/3.jpg" alt="">\n          </div>\n          <div class="home-image-content" ng-switch-when="4">\n              <img src="files/history/4.jpg" alt="">\n          </div>\n          <div class="home-image-content" ng-switch-when="5">\n              <img src="files/history/5.jpg" alt="">\n          </div>\n          <div class="home-image-content" ng-switch-when="6">\n              <img src="files/history/6.jpg" alt="">\n          </div>\n      </div>\n      <div class="home-title">\n          <h2>Events</h2>\n      </div>\n      <mf-events></mf-events>\n    </div>\n    <div ng-if="!home.imageLoaded">\n      Loading....\n    </div>\n    <!-- <mf-about></mf-about> -->\n    <!-- <mf-event-view></mf-event-view> -->\n\n    <mf-footer></mf-footer>\n</div>\n');
$templateCache.put('source/js/components/register/register.html','<div class="mecho-fest mf-register mf-page">\n    <mf-header></mf-header>\n    <mf-banner page="register"></mf-banner>\n\n\n    <div class="fest-register">\n        <div class="fest-register-content">\n            <div class="fest-register-title"> Register </div>\n            <div class="fest-register-form">\n                <p class="row-success" ng-if="register.success">Registered successfully.</p>\n                <p class="row-warning" ng-if="register.warningMessage">{{register.warningMessage}}</p>\n\n                <form novalidate class="simple-form" name="register.registerForm" ng-if="!register.success">\n                    <div class="form-row">\n                        <div class="form-label">Name</div>\n                        <div class="form-field">\n                            <input type="text" ng-model="register.model.ParticipantName" name="ParticipantName" required/>\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-label">Gender</div>\n                        <div class="form-field">\n                            <div class="form-field-radio">\n                                <input type="radio" ng-model="register.model.ParticipantGender" value="M" required> <span>Male</span>\n                            </div>\n                            <div class="form-field-radio">\n                                <input type="radio" ng-model="register.model.ParticipantGender" value="F" required> <span>Female</span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-label">College</div>\n                        <div class="form-field">\n                            <input type="text" ng-model="register.model.ParticipantCollege" name="ParticipantCollege" required/>\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-label">Events</div>\n                        <div class="form-field">\n                            <div class="form-field-radio">\n                                <input type="checkbox" ng-model="register.model.paper" value="M"> <span>Paper Presentation</span>\n                            </div>\n                            <div class="form-field-radio">\n                                <input type="checkbox" ng-model="register.model.aqua" value="F"> <span>Aqua Missile</span>\n                            </div>\n                            <div class="form-field-radio">\n                                <input type="checkbox" ng-model="register.model.quiz" value="F"> <span>Technical Quiz</span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-row" ng-if="register.model.paper">\n                        <div class="form-label">Presentation Topic</div>\n                        <div class="form-field">\n                            <input type="text" ng-model="register.model.PresentationTopic" name="PresentationTopic" required/>\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-label">Year</div>\n                        <div class="form-field">\n                            <div class="form-field-radio">\n                                <input type="radio" ng-model="register.model.Year" value="2012"> <span>2012</span> &nbsp;\n                                <input type="radio" ng-model="register.model.Year" value="2013"> <span>2013</span> &nbsp;\n                                <input type="radio" ng-model="register.model.Year" value="2014"> <span>2014</span> &nbsp;\n                                <input type="radio" ng-model="register.model.Year" value="2015"> <span>2015</span> &nbsp;\n                                <input type="radio" ng-model="register.model.Year" value="2015"> <span>2016</span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-label">Department</div>\n                        <div class="form-field">\n                            <input type="text" ng-model="register.model.Department" name="Department" required/>\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-label">Email</div>\n                        <div class="form-field">\n                            <input type="email" ng-model="register.model.ParticipantEmail" name="Email" required/>\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-label">Phone</div>\n                        <div class="form-field">\n                            <input type="text" ng-model="register.model.ParticipantPhone" ng-pattern=/^\\+?\\d{10}$/ name="Phone" required/>\n                        </div>\n                    </div>\n                    <div class="form-row form-footer">\n                      <input class="form-button" ng-disabled="register.registerForm.$invalid" type="submit" value="SUBMIT" ng-click="register.stateChange()" />\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n\n    <mf-footer></mf-footer>\n</div>\n');
$templateCache.put('source/js/directives/banner/about.html','<div class="fest-banner fest-banner-about">\n    <div class="fest-banner-content">\n        <div class="fest-banner-name"></div>\n        <div class="fest-banner-about-name"></div>\n    </div>\n</div>\n');
$templateCache.put('source/js/directives/banner/banner.html','<div class="fest-banner">\r\n    <div class="fest-banner-content">\r\n        <div class="fest-banner-colgname"></div>\r\n        <div class="fest-banner-name"></div>\r\n        <div class="fest-gear-box">\r\n            <div class="gear gear1"></div>\r\n            <div class="gear gear2"></div>\r\n            <div class="gear gear3"></div>\r\n            <div class="gear gear6"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('source/js/directives/banner/event.html','<div class="fest-banner fest-banner-event">\r\n    <div class="fest-banner-content">\r\n        <div class="fest-banner-name"></div>\r\n        <div class="fest-banner-event-name"></div>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('source/js/directives/banner/register.html','<div class="fest-banner fest-banner-about">\r\n    <div class="fest-banner-content">\r\n        <div class="fest-banner-name"></div>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('source/js/directives/events/events.html','<div class="mecho-fest fest-events">\r\n    <div class="fest-event-block">\r\n        <div class="fest-event-item">\r\n            <img src="files/events/eventbg.png"/>\r\n            <div class="event-item-content">\r\n                <h3>Paper</h3>\r\n                <h3>Presentation</h3>\r\n            </div>\r\n            <div class="event-item-action" ng-click="events.stateChange(\'paper\')">\r\n                <div class="event-button"></div>\r\n            </div>\r\n        </div>\r\n        <div class="fest-event-item">\r\n            <img src="files/events/eventbg.png"/>\r\n            <div class="event-item-content">\r\n                <h3>Aqua</h3>\r\n                <h3>Missile</h3>\r\n            </div>\r\n            <div class="event-item-action" ng-click="events.stateChange(\'aqua\')">\r\n                <div class="event-button"></div>\r\n            </div>\r\n        </div>\r\n        <div class="fest-event-item">\r\n            <img src="files/events/eventbg.png"/>\r\n            <div class="event-item-content">\r\n                <h3>Technical</h3>\r\n                <h3>Quiz</h3>\r\n            </div>\r\n            <div class="event-item-action" ng-click="events.stateChange(\'quiz\')">\r\n                <div class="event-button"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('source/js/directives/eventview/eventview.html','<div class="mecho-fest event-view">\n\n    <div class="event-view-content" ng-if="eventView.model.activeEvent === \'paper\'">\n\n        <div class="event-view-title">\n\n            Paper Presentation\n\n        </div>\n\n        <div class="event-view-topics">\n\n            <h4>Possible Topics to pick:</h4>\n\n            <ul>\n\n                <li>ROBOTICS</li>\n\n                <li>THERMAL ENGINEERING</li>\n\n                <li>DESIGN / CAD/CAM</li>\n\n                <li>ADVANCED TECHNOLOGIES  IN AUTOMOBILE ENGINEERING</li>\n\n                <li>SUPPLY CHAIN MANAGEMENT</li>\n\n                <li>COMPOSITE MATERIALS</li>\n\n                <li>PRODUCTION TECHNOLOGY </li>\n\n            </ul>\n\n        </div>\n\n        <div class="event-view-rules">\n\n            <h4>Instructions to follow:</h4>\n\n            <ul>\n\n                <li>Only two members are permitted per team.</li>\n\n                <li>The students must carry valid student ID cards of their college which they will be required to produce at the time of registration.</li>\n\n                <li>Any student from a recognized institute/college can participate in this event.</li>\n\n                <li>Each talk is 15 minutes long. It is recommended to use 12 minutes to present and 3 minutes to discuss.</li>\n\n                <li>Ensure that you are available at least 30 minutes before the session starts on the day of the conference.</li>\n\n                <li>The equipment available will be PC and Data Projector.</li>\n\n                <li>The recommended software to be used is PowerPoint.</li>\n\n            </ul>\n\n        </div>\n\n    </div>\n\n    <div class="event-view-content" ng-if="eventView.model.activeEvent === \'aqua\'">\n\n        <div class="event-view-title">Aqua Missile</div>\n\n        <div class="event-view-rules">\n\n            <h4>Instructions to follow:</h4>\n\n            <ul>\n\n                <li>A team should not exceed more than 2 members.</li>\n\n                <li>The students must carry valid student ID cards of their college which they will be required to produce at the time of registration.</li>\n\n                <li>Any student from a recognized institute/College can participate in this event.</li>\n\n                <li>Participants will be allowed to launch their model only 1 time in first round. This will count the total distance of flight of model.</li>\n\n                <li>In the second round 2 chances will be provided, both chances will be considered for judging.</li>\n\n            </ul>\n\n        </div>\n\n    </div>\n\n    <div class="event-view-content"  ng-if="eventView.model.activeEvent === \'quiz\'">\n\n        <div class="event-view-title">Technical Quiz</div>\n\n        <div class="event-view-rules">\n\n            <h4>Instructions to follow:</h4>\n\n            <ul>\n                <li>Only team entries are eligible.</li>\n                <li>A team shall consist of max two persons</li>\n                <li>The students must carry valid student ID cards\n                    of their college which they will be required to produce at the time of registration.</li>\n                <li>Any student from a recognized institute/college can participate in this event.</li>\n                <li>The decision of the quiz-master will be final and will not be subjected to any change.</li>\n                <li>The participants shall not be allowed to use mobile or other electronic instruments.</li>\n                <li>The questions shall be in the form of multiple choice, True / False statement, Specific-answer etc.</li>\n                <li>Audience shall not give any hints or clues to the competitors.</li>\n                <li>Replacement of any participant of a team is not allowed after registration.</li>\n            </ul>\n        </div>\n    </div>\n\n    <div class="event-contact">\n\n        <h2>Contact Details:</h2>\n\n        <p>MUTHURAMAN M</p>\n\n        <p>EVENT CO-ORDINATOR</p>\n\n        <p>FINAL YEAR MECHANICAL ENGINEERING</p>\n\n        <p>Mobile: 9976945213</p>\n\n        <p>Email: muthummr2396@gmail.com</p>\n\n    </div>\n\n</div>\n');
$templateCache.put('source/js/directives/footer/footer.html','<footer>\n  <h1></h1>\n</footer>\n');
$templateCache.put('source/js/directives/header/header.html','<div class="mecho-fest fest-headr">\n    <div class="fest-headr-logo">\n        <a href="#">\n            <img src="files/header/fest_logo.png" alt="Mecho Fest" />\n        </a>\n    </div>\n    <div class="fest-headr-menu">\n        <ul>\n            <li>\n                <span ng-click="header.stateChange(\'index\')">Home</a>\n            </li>\n            <li>\n                <span ng-click="header.stateChange(\'event\')">Event</span>\n            </li>\n            <li>\n                <span ng-click="header.stateChange(\'about\')">About us</span>\n            </li>\n            <li>\n                <span ng-click="header.stateChange(\'register\')">Register</span>\n            </li>\n        </ul>\n    </div>\n</div>\n');}]);
;
(function() {
    angular
        .module('mechofest')
        .constant('mfConstants', {

          'base_url': '/',
          'base_app_url': '/MechoFest/app',
          'base_app_service_url': '/MechoFest/app/admin',

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

(function() {
    angular.module('mechofest')
        .factory('httpUtil', function($q, $resource) {

          var service = {};
          service.get = get;
          service.post = post;

          return service;


          function get(url, opts) {
            var defer = $q.defer();

            var req = $resource(url);

            opts = opts || {};

            var resp = req.get(opts, function(){
              defer.resolve(resp);
            }, function(){
              defer.resolve(resp);
            });

            return defer.promise;
          }

          function post(url, opts, postBody) {
            var defer = $q.defer();

            var req = $resource(url);

            opts = opts || {};

            var resp = req.save(opts, function(){
              defer.resolve(resp);
            }, function(){
              defer.resolve(resp);
            });

            return defer.promise;
          }

        });
})();

;
(function() {
    angular
        .module('mechofest')
        .directive('mfAbout', mfAbout);

    function mfAbout() {
        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'source/js/components/about/about.html',
            controller: MfAbout,
            controllerAs: 'about',
            bindToController: true
        };
    }

    function MfAbout() {

    }
})();

;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                template: '<mf-about></mf-about>',
                params: {
                    model: null,
                    active: null
                }
            });
    }

})();

;
(function() {
    angular
        .module('mechofest')
        .directive('mfEvent', mfEvent);

    function mfEvent() {
        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'source/js/components/event/event.html',
            controller: MfEvent,
            controllerAs: 'event',
            bindToController: true
        };
    }

    function MfEvent($state) {

        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {
            vm.activeEvent = null;
            vm.model = $state.params.model || {};
            if($state.params.active) {
                vm.model.activeEvent = $state.params.active;
            }
        }

        function stateChange(event) {

        }
    }
})();

;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('event', {
                url: '/event',
                template: '<mf-event></mf-event>',
                params: {
                    model: null,
                    active: null
                }
            });
    }

})();

;
(function() {
    angular
        .module('mechofest')
        .directive('mfIndex', mfIndex)
        .controller('MfIndexController', MfIndexController);

    function mfIndex() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/index/index.html',
            controller: MfIndexController,
            controllerAs: 'home',
            bindToController: true
        };
    }

    function MfIndexController($state, httpUtil, mfConstants, preloader, $interval) {

        var vm = this;

        vm.imageLoaded = false;

        vm.stateChange = stateChange;


        init();

        function init() {
            preloader
              .preloadImages(mfConstants.imageLocations)
              .then(function() {
                  process();
                  vm.imageLoaded = true;
              },
              function() {
                  process();
                  vm.imageLoaded = true;
              });
        }

        function process() {
            vm.activeIndex = 1;
            $interval(function() {
                if (vm.activeIndex === 6) {
                    vm.activeIndex = 1;
                } else {
                    vm.activeIndex++;
                }
            }, 10000);
        }

        function stateChange(type) {
            $state.go('home.' + type);
        }

    }
})();

;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                template: '<mf-index></mf-index>',
                params: {
                    model: null
                }
            });
    }

})();

;
(function() {
    angular
        .module('mechofest')
        .directive('mfRegister', mfRegister)
        .controller('MfRegisterController', MfRegisterController);

    function mfRegister() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/register/register.html',
            controller: MfRegisterController,
            controllerAs: 'register',
            bindToController: true
        };
    }

    function MfRegisterController($state, httpUtil, mfConstants) {

        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {
          vm.model = vm.model || {};
          vm.success = false;
        }

        function stateChange() {
          var selectedEvents = '';
          vm.success = false;

          if(vm.model.paper) {
            selectedEvents += getEventTopic(true, false, false);
          }
          if(vm.model.aqua) {
            selectedEvents += ',' + getEventTopic(false, true, false);
          }
          if(vm.model.quiz) {
            selectedEvents += ',' + getEventTopic(false, false, true);
          }

          if(selectedEvents === '') {
            vm.warningMessage = 'Please select atleast one event';
            return false;
          }

          vm.model.ParticipantEvents = selectedEvents;
          if(!vm.model.PresentationTopic) {
          	vm.model.PresentationTopic = '-';
          }
          httpUtil.post(mfConstants.base_app_service_url + '/register', vm.model).then(function(resp){
            vm.success = resp.Success;
            vm.warningMessage = '';
          }, function(error){
            vm.success = false;
            vm.warningMessage = error.ErrorMessage;
          });
        }

        function getEventTopic(isPaper, isAqua, isQuiz) {
          if(isPaper) {
            return 'Paper Presentation';
          } else if(isAqua) {
            return 'Aqua Missile';
          } else if(isQuiz) {
            return 'Technical Quiz';
          }
        }

    }
})();

;
(function() {
    angular
        .module('mechofest')
        .config(mfConfig);

    function mfConfig($stateProvider) {
        $stateProvider
            .state('register', {
                url: '/register',
                template: '<mf-register></mf-register>',
                params: {
                    model: null
                }
            });
    }

})();

;
(function() {
    angular
        .module('mechofest')
        .directive('mfBanner', mfBanner);

    function mfBanner() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                page: '=?'
            },
            templateUrl: function(element, attrs) {
                var url = 'source/js/directives/banner/banner.html';
                if (attrs.page === 'event') {
                    url = 'source/js/directives/banner/event.html';
                } else if (attrs.page === 'about') {
                    url = 'source/js/directives/banner/about.html';
                } else if (attrs.page === 'register') {
                    url = 'source/js/directives/banner/register.html';
                }
                return url;
            },
            controller: MfBanner,
            controllerAs: 'banner',
            bindToController: true
        };
    }

    function MfBanner() {

    }
})();

;
(function() {
    angular
        .module('mechofest')
        .directive('mfEvents', mfEvents);

    function mfEvents() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: 'source/js/directives/events/events.html',
            controller: MfEvents,
            controllerAs: 'events',
            bindToController: true
        };
    }

    function MfEvents($state) {
        var vm = this;
        vm.stateChange = stateChange;

        init();

        function init() {

        }

        function stateChange(eventType) {
            console.log(eventType);
            $state.go('event', {
                model: vm.model,
                active: eventType
            });
        }
    }
})();

;
(function() {
    angular
        .module('mechofest')
        .directive('mfEventView', mfEventView);

    function mfEventView() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: 'source/js/directives/eventview/eventview.html',
            controller: MfEventView,
            controllerAs: 'eventView',
            bindToController: true
        };
    }

    function MfEventView() {
        var vm = this;

        vm.stateChange = stateChange;

        init();

        function init() {

        }

        function stateChange() {
            
        }
    }
})();

;
(function() {
    angular
        .module('mechofest')
        .directive('mfFooter', mfFooter);

    function mfFooter() {
        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'source/js/directives/footer/footer.html',
            controller: MfFooter,
            controllerAs: 'footer',
            bindToController: true
        };
    }

    function MfFooter() {

    }
})();

;
(function() {
    angular
        .module('mechofest')
        .directive('mfHeader', mfHeader);

    function mfHeader() {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                atr: '@'
            },
            templateUrl: 'source/js/directives/header/header.html',
            controller: MfHeader,
            controllerAs: 'header',
            bindToController: true
        };
        return directive;
    }

    function MfHeader($state) {

        var vm = this;

        vm.stateChange = stateChange;
        activate();

        function activate() {

        }

        function stateChange(type) {
            $state.go(type, {
                active: null,
                model: null
            });
        }
    }
})();