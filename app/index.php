<!doctype html>
<html>
<head>
  <title>MechoFest</title>
  <meta charset=utf-8>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- bower:css -->
  <link rel="stylesheet" href="../bower_components/angular-datepicker/dist/angular-datepicker.css">
  <!-- endinject -->
  <!-- style:css -->
  <link rel="stylesheet" href="../app/css/style.css">
  <!-- endinject -->
</head>
<body>
  <div ng-app="mechofest">
    <div ui-view></div>

  </div>
  <!-- bower:js -->
  <script src="../bower_components/angular/angular.js"></script>
  <script src="../bower_components/moment/moment.js"></script>
  <script src="../bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js"></script>
  <script src="../bower_components/angular-ui-router/release/angular-ui-router.js"></script>
  <script src="../bower_components/angular-datepicker/dist/angular-datepicker.js"></script>
  <!-- endinject -->

  <!-- script:js -->
  <script src="../app/js/mf.module.js"></script>
  <script src="../app/js/mf.route.js"></script>
  <script src="../app/js/mf.template.js"></script>
  <script src="../app/js/components/home/home.js"></script>
  <script src="../app/js/components/home/home.route.js"></script>
  <script src="../app/js/components/contact/contact.js"></script>
  <script src="../app/js/components/contact/contact.route.js"></script>
  <script src="../app/js/directives/footer/footer.js"></script>
  <script src="../app/js/directives/header/header.js"></script>
  <!-- endinject -->
</body>
</html>
