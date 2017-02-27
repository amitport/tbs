import angular from 'angular';
import 'angular-route';

import 'angular-material';
// import 'angular-material/angular-material.min.css';

import 'angular-translate';

import authModule from '../auth';
import uiPreSignInModule from '../ui-pre-sign-in';

export default angular.module('ui',
    ['ngRoute',
     'ngMaterial',
     'pascalprecht.translate',
     authModule,
     uiPreSignInModule]);
