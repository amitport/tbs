import angular from 'angular';
import 'angular-route';

import 'angular-material';
import 'angular-material/angular-material.css!';

import 'angular-translate';

import authModule from '../auth/index';
import uiPreSignInModule from '../ui-pre-sign-in/index';

export default angular.module('ui',
    ['ngRoute',
     'ngMaterial',
     'pascalprecht.translate',
     authModule,
     uiPreSignInModule]);