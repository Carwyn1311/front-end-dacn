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
    } else if ((userData.role as unknown as number) === 1) {
      this.role = 'ADMIN';
    } else {
      this.role = 'USER';
    }

    this.active = userData.active !== undefined ? userData.active : true;
    this.activationCode = userData.activationCode || '';
    this.resetToken = userData.resetToken || '';
  }

  // Kiểm tra nếu người dùng là Admin
  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  // Kiểm tra nếu tài khoản người dùng đang hoạt động
  isActive(): boolean {
    return this.active;
  }

  // Lấy role dưới dạng số: trả về 1 nếu "ADMIN", 0 nếu "USER"
  getRoleAsNumber(): number {
    return this.role === 'ADMIN' ? 1 : 0;
  }

  // Đặt role từ số: đặt thành "ADMIN" nếu 1, "USER" nếu 0
  setRoleFromNumber(roleNumber: number): void {
    this.role = roleNumber === 1 ? 'ADMIN' : 'USER';
  }

  // Lưu dữ liệu người dùng và token vào sessionStorage hoặc localStorage dựa vào rememberMe
  static storeUserData(user: User, token: string, rememberMe: boolean): void {
    const userData = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem('user', userData);
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('user', userData);
      sessionStorage.setItem('token', token);
    }
  }

  // Lưu token vào cookies với thời gian hết hạn tùy chọn
  static storeTokenInCookie(token: string, expireDays: number = 1): void {
    const date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `token=${token};${expires};path=/`;
  }

  // Lấy dữ liệu người dùng từ sessionStorage hoặc localStorage
  static getUserData(): User | null {
    const userData = sessionStorage.getItem('user') || localStorage.getItem('user');
    return userData ? Object.assign(new User(), JSON.parse(userData)) : null;
  }

  // Lấy token từ sessionStorage hoặc localStorage
  static getToken(): string | null {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  // Lấy token từ cookies
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

  // Xóa dữ liệu người dùng và token khỏi sessionStorage và localStorage
  static clearUserData(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  // Xóa token khỏi cookies
  static clearTokenFromCookie(): void {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // Cập nhật dữ liệu người dùng đã lưu trong sessionStorage hoặc localStorage
  static updateUserData(newUserData: Partial<User>): void {
    const currentUser = this.getUserData();
    if (currentUser) {
      const updatedUser = Object.assign(currentUser, newUserData);
      this.storeUserData(updatedUser, this.getToken() || '', localStorage.getItem('user') !== null);
    }
  }
}
