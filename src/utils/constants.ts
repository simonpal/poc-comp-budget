import addDays from 'date-fns/addDays';
import { CookieOptions } from '../types';

export const TOKEN_COOKIE = 'cb-google';
export const SETTINGS_COOKIE = 'cb-settings';
export const SETTINGS_COOKIE_OPTIONS: CookieOptions = {
  path: '/',
  expires: addDays(new Date(), 365),
};
