import angular from 'angular';

import authModule from './modules/auth/index';
import uiPreSignInModule from './modules/ui-pre-sign-in/index';
import uiModule from './modules/ui/index';

import 'angular-translate';

const usersModule = angular.module('amitport.users',
  [authModule, uiPreSignInModule, uiModule, 'pascalprecht.translate']);

usersModule.config(['$translateProvider', function ($translateProvider) {
  $translateProvider
    .translations('en', {
      EMAIL: 'Email',
      SIGNED_IN_AS: 'Signed in as',
      SIGN_OUT_SUCCESS: 'Signed out successfully',
      CONTINUE: 'Next',
      NOT_SUPPORTED: 'not supported',
      GOOGLE: 'Google',
      FACEBOOK: 'Facebook',
      EMAIL_LONG: 'Email address',
      AUTHENTICATE_REQUEST_PREFIX: 'Sign in using',
      INVALID_EMAIL_FIELD: 'invalid email format',
      EMAIL_SENT_TITLE: 'You\'re almost there!',
      EMAIL_SENT_SUB: 'A confirmation link should arrive in your email shortly',
      FINISH: 'Finish',
      REQUIRED_FIELD: 'required field',
      MAX_LENGTH_12: 'please use no more than 12 characters',
      USERNAME_PATTERN: 'please use only english characters, hyphens (-) or spaces as delimiters, and optionally 1 or 2 digits at the end',
      USERNAME_CONFLICT: 'the name is taken, try another one',
      SERVER_ERR_FIELD: 'submission failed, please try again later',
      SELECT_USERENAME_REQUEST: 'Select username',
      REGISTER: 'Welcome!',
      SIGN_IN: 'Sign In',
      SIGN_OUT: 'Sign out',
      USER_PROFILE: 'User profile',
      OPEN_USER_MENU: 'Open user menu'
    })
    .translations('he', {
      EMAIL: 'דוא"ל',
      SIGNED_IN_AS: 'הנך מחובר כ-',
      SIGN_OUT_SUCCESS: 'יצאת בהצלחה',
      CONTINUE: 'המשך',
      NOT_SUPPORTED: 'לא נתמך',
      GOOGLE: 'גוגל',
      FACEBOOK: 'פייסבוק',
      EMAIL_LONG: 'כתובת אימייל',
      AUTHENTICATE_REQUEST_PREFIX: 'אמת זהות באמצעות',
      INVALID_EMAIL_FIELD: 'הכתובת אינה תקינה',
      EMAIL_SENT_TITLE: 'כמעט סיימנו!',
      EMAIL_SENT_SUB: 'לינק אישור נשלח לכתובת המייל שלך',
      FINISH: 'סיים',
      REQUIRED_FIELD: 'שדה נדרש',
      MAX_LENGTH_12: 'בבקשה השתמש בלא יותר מ-12 תווים',
      USERNAME_PATTERN: 'שם המשתמש חייב להיות באנגלית, ניתן להשתמש ברווח או מקף ולסיים עם עד 2 ספרות',
      USERNAME_CONFLICT: 'השם תפוס, נסה אחד אחר',
      SERVER_ERR_FIELD: 'השליחה נכשלה, נא נסה מאוחר יותר',
      SELECT_USERENAME_REQUEST: 'בחר שם משתמש',
      REGISTER: 'ברוך הבא!',
      SIGN_IN: 'כניסה',
      SIGN_OUT: 'יציאה',
      USER_PROFILE: 'פרופיל משתמש',
      OPEN_USER_MENU: 'פתיחת תפריט משתמש'
    })
    .registerAvailableLanguageKeys(['en', 'he'])
    .determinePreferredLanguage()
    .useSanitizeValueStrategy(null);
}]);

export default usersModule.name;
