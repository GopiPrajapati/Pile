import { DEVELOPMENT_URL, PRODUCTION_URL, STAGING_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from 'axios';
import { Platform } from 'react-native';
import { endpoints } from './endpoints';

export const BASE_URL = {
  DEVELOPMENT: `${PRODUCTION_URL}/projects/plie-api/public/api`, // For Release.
  STAGING: `${DEVELOPMENT_URL}/projects/plie-api/public/api`, // For development.
  PRODUCTION: `${STAGING_URL}/projects/plie-api/public/api`, // For staging.
};

export const DevelopmentMode = {
  DEVELOPMENT: 'DEVELOPMENT',
  STAGING: 'STAGING',
  PRODUCTION: 'PRODUCTION',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
};

const axios = httpClient.create({ timeout: 60000 });

/**
 * Singleton API client.
 *
 * Kept from the old NetworkService: singleton instance, base-URL switching
 * per environment, a response interceptor, request/response logging.
 *
 * Dropped (not needed for this practical / this API):
 * - Redux + persistor purge on logout (no redux dependency for auth)
 * - Refresh-token flow (this API hands back a static Sanctum-style token,
 *   there's no /token refresh endpoint in the collection)
 * - Hard-coded navigation import inside the service (tight coupling).
 *   Instead, call `API.setOnUnauthorized(callback)` once from app root and
 *   the service will call it on a 401 — the service no longer needs to know
 *   about your navigator or your routes.
 */
class NetworkService {
  static _instance = null;

  constructor() {
    if (NetworkService._instance) {
      return NetworkService._instance;
    }
    this.baseURL = BASE_URL.DEVELOPMENT;
    this.onUnauthorized = null;
    this._setupResponseInterceptor();
    NetworkService._instance = this;
  }

  static getInstance() {
    if (!NetworkService._instance) {
      NetworkService._instance = new NetworkService();
    }
    return NetworkService._instance;
  }

  /** Call once at app startup, e.g. NetworkService.getInstance().init(DevelopmentMode.STAGING) */
  init(mode = DevelopmentMode.DEVELOPMENT) {
    this.baseURL = BASE_URL[mode] || BASE_URL.DEVELOPMENT;
    return this;
  }

  /** Register a callback to run on 401 (e.g. navigate to login). Keeps this file navigation-agnostic. */
  setOnUnauthorized(callback) {
    this.onUnauthorized = callback;
  }

  // ---------------- token handling ----------------

  async setAuthToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  async clearAuthToken() {
    delete axios.defaults.headers.common.Authorization;
    await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /** Call once at app startup to re-attach a saved token after a fresh app launch. */
  async restoreAuthToken() {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    return token;
  }

  _setupResponseInterceptor() {
    axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          await this.clearAuthToken();
          if (typeof this.onUnauthorized === 'function') {
            this.onUnauthorized();
          }
        }
        return Promise.reject(error);
      },
    );
  }

  _log(tag, payload) {
    if (__DEV__) {
      console.log(tag, JSON.stringify(payload, null, 2));
    }
  }

  _toFormData(data = {}) {
    const form = new FormData();
    Object.keys(data).forEach(key => form.append(key, data[key]));
    return form;
  }

  // ---------------- generic request ----------------

  /**
   * @param {{endpoint: string, method: string}} endpointConfig - from endpoints.js
   * @param {{data?: object, params?: object, headers?: object, isFormData?: boolean}} options
   */
  async request(endpointConfig, { data, params, headers, isFormData } = {}) {
    const { method, endpoint } = endpointConfig;
    const url = this.baseURL + endpoint;

    const requestHeaders = {
      platform: Platform.OS,
      ...(isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }),
      ...headers,
    };

    const body = isFormData ? this._toFormData(data) : data;

    this._log('REQUEST', { url, method, params, data });

    try {
      const response = await axios({
        url,
        method,
        params,
        headers: requestHeaders,
        data: method === Method.GET ? undefined : body,
      });
      this._log('RESPONSE', response.data);
      return response.data;
    } catch (error) {
      this._log('ERROR', error?.response?.data || error.message);
      throw error?.response?.data || error;
    }
  }

  // ---------------- endpoint wrappers for this project ----------------

  async login(email, password) {
    const response = await this.request(endpoints.login, {
      data: { email, password },
      isFormData: true, // Postman collection sends login as form-data
    });

    // NOTE: confirm the exact key once you see a real response body and
    // adjust this line — e.g. response.data.token vs response.token.
    const token = response?.data?.token || response?.token;
    if (token) {
      await this.setAuthToken(token);
    }
    return response;
  }

  async getEventsListing(params) {
    return this.request(endpoints.eventListing, { params });
  }

  async logout() {
    await this.clearAuthToken();
  }
}

export default NetworkService.getInstance();
