export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;  // "USER" or "ADMIN"
  active: boolean;
  activationCode: string;
  resetToken: string;

  constructor(userData: Partial<User> = {}) {
    this.id = userData.id || '';
    this.username = userData.username || '';
    this.email = userData.email || '';
    this.password = userData.password || '';
    
    // Kiểm tra role: nếu là 'ADMIN' hoặc roleAsNumber = 1 thì gán 'ADMIN', ngược lại gán 'USER'
    if (userData.role === 'ADMIN' || userData.role === 'USER') {
      this.role = userData.role;
    } else if (userData.role as unknown as number === 1) {
      this.role = 'ADMIN';
    } else {
      this.role = 'USER';
    }

    this.active = userData.active !== undefined ? userData.active : true;
    this.activationCode = userData.activationCode || '';
    this.resetToken = userData.resetToken || '';
  }

  // Method to check if the user is an Admin (role = "ADMIN")
  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  // Method to check if the user's account is active
  isActive(): boolean {
    return this.active;
  }

  // Get role as a number: return 1 if "ADMIN", 0 if "USER"
  getRoleAsNumber(): number {
    return this.role === 'ADMIN' ? 1 : 0;
  }

  // Set role from a number: set to "ADMIN" if 1, "USER" if 0
  setRoleFromNumber(roleNumber: number): void {
    this.role = roleNumber === 1 ? 'ADMIN' : 'USER';
  }

  // Store user data and token in sessionStorage
  static storeUserData(user: User, token: string): void {
    const userData = JSON.stringify(user);
    sessionStorage.setItem('user', userData);
    sessionStorage.setItem('token', token);
  }

  // Store token in cookies
  static storeTokenInCookie(token: string, expireDays: number = 1): void {
    const date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `token=${token};${expires};path=/`;
  }

  // Retrieve user data from sessionStorage
  static getUserData(): User | null {
    const userData = sessionStorage.getItem('user');
    return userData ? Object.assign(new User(), JSON.parse(userData)) : null;
  }

  // Retrieve token from sessionStorage
  static getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Retrieve token from cookies
  static getTokenFromCookie(): string | null {
    const name = "token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodedCookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      let c = cookieArr[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  // Clear user data and token from sessionStorage
  static clearUserData(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  // Clear token from cookies
  static clearTokenFromCookie(): void {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // Update stored user data in sessionStorage
  static updateUserData(newUserData: Partial<User>): void {
    const currentUser = this.getUserData();
    if (currentUser) {
      const updatedUser = Object.assign(currentUser, newUserData);
      this.storeUserData(updatedUser, this.getToken() || '');
    }
  }
}
