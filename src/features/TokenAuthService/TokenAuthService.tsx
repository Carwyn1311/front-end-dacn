// src/services/TokenAuthService.tsx

export const TokenAuthService = {
  // Lấy token từ localStorage
  getToken (): string | null {
    return localStorage.getItem('token');
  },

  // Lưu token vào localStorage
  setToken (token: string): void {
    localStorage.setItem('token', token);
  },

  // Xóa token khỏi localStorage
  removeToken (): void {
    localStorage.removeItem('token');
  },

  // Xóa toàn bộ dữ liệu trong localStorage
  clearStorage (): void {
    localStorage.clear();
  },

  // Lưu dữ liệu vào sessionStorage
  setSessionData (key: string, value: string): void {
    sessionStorage.setItem(key, value);
  },

  // Lấy dữ liệu từ sessionStorage
  getSessionData (key: string): string | null {
    return sessionStorage.getItem(key);
  },

  // Xóa dữ liệu khỏi sessionStorage
  removeSessionData (key: string): void {
    sessionStorage.removeItem(key);
  },

  // Xóa toàn bộ sessionStorage
  clearSessionStorage (): void {
    sessionStorage.clear();
  },

  // Lưu cookie
  setCookie (name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  },

  // Lấy cookie
  getCookie (name: string): string | null {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      const cookie = cookiesArray[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  },

  // Xóa cookie
  removeCookie (name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },

  // Xóa toàn bộ cookie
  clearCookies (): void {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }
};
