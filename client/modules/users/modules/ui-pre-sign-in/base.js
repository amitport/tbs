import angular from 'angular';

import 'angular-material';
import 'angular-messages';

import 'angular-translate';

import 'angular-route';
import flashModule from '../../../flash';
import authModule from '../auth';

export default angular.module('amitport.users.ui-pre-sign-in',
    ['ngMaterial', 'pascalprecht.translate', 'ngRoute', 'ngMessages', flashModule, authModule]);
