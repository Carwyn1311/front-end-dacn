export class User { 
  id: string;
  username: string;
  email: string;
  password: string;
  role: number;  // 0 for user, 1 for admin
  active: boolean;
  activationCode: string;
  resetToken: string;

  constructor(userData: Partial<User> = {}) {
    this.id = userData.id || ''; // Giá trị mặc định là chuỗi rỗng nếu không có
    this.username = userData.username || ''; // Giá trị mặc định là chuỗi rỗng nếu không có
    this.email = userData.email || ''; // Giá trị mặc định là chuỗi rỗng nếu không có
    this.password = userData.password || ''; // Giá trị mặc định là chuỗi rỗng nếu không có
    this.role = userData.role !== undefined ? userData.role : 0; // Mặc định là user (0)
    this.active = userData.active !== undefined ? userData.active : true; // Mặc định là tài khoản kích hoạt (true)
    this.activationCode = userData.activationCode || ''; // Giá trị mặc định là chuỗi rỗng nếu không có
    this.resetToken = userData.resetToken || ''; // Giá trị mặc định là chuỗi rỗng nếu không có
  }

  // Phương thức kiểm tra nếu người dùng là Admin (role = 1)
  isAdmin(): boolean {
    return this.role === 1;
  }

  // Phương thức kiểm tra nếu tài khoản người dùng đã kích hoạt
  isActive(): boolean {
    return this.active;
  }

  // Lưu thông tin người dùng và token vào sessionStorage
  static storeUserData(user: User, token: string): void {
    const userData = JSON.stringify(user);
    sessionStorage.setItem('user', userData);  // Lưu vào sessionStorage
    sessionStorage.setItem('token', token);  // Lưu token vào sessionStorage
  }

  // Lưu token vào cookies
  static storeTokenInCookie(token: string, expireDays: number = 1): void {
    const date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000)); // Cookie hết hạn sau số ngày đã cho
    const expires = "expires=" + date.toUTCString();
    document.cookie = `token=${token};${expires};path=/`; // Lưu token vào cookie
  }

  // Lấy thông tin người dùng từ sessionStorage
  static getUserData(): User | null {
    const userData = sessionStorage.getItem('user');
    return userData ? Object.assign(new User(), JSON.parse(userData)) : null;
  }

  // Lấy token từ sessionStorage
  static getToken(): string | null {
    return sessionStorage.getItem('token');
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

  // Xóa thông tin người dùng và token khỏi sessionStorage
  static clearUserData(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token'); // Xóa token khỏi sessionStorage
  }

  // Xóa token khỏi cookies
  static clearTokenFromCookie(): void {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // Cập nhật thông tin người dùng đã lưu trong sessionStorage
  static updateUserData(newUserData: Partial<User>): void {
    const currentUser = this.getUserData();
    if (currentUser) {
      const updatedUser = Object.assign(currentUser, newUserData); // Kết hợp dữ liệu mới với đối tượng User hiện tại
      this.storeUserData(updatedUser, this.getToken() || ''); // Cập nhật dữ liệu với token hiện tại
    }
  }
}
