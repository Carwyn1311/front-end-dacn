export class User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;

  constructor(id: number, name: string, email: string, role: string, status: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.status = status;
  }

  // Phương thức kiểm tra nếu người dùng là Admin
  isAdmin(): boolean {
    return this.role.toLowerCase() === 'admin';
  }

  // Lưu thông tin người dùng vào localStorage hoặc sessionStorage
  static storeUserData(user: User, useSessionStorage: boolean = false): void {
    const userData = JSON.stringify(user);
    if (useSessionStorage) {
      sessionStorage.setItem('user', userData);
    } else {
      localStorage.setItem('user', userData);
    }
  }

  // Lấy thông tin người dùng từ localStorage hoặc sessionStorage
  static getUserData(useSessionStorage: boolean = false): User | null {
    const userData = useSessionStorage 
      ? sessionStorage.getItem('user') 
      : localStorage.getItem('user');
    return userData ? Object.assign(new User(0, '', '', '', ''), JSON.parse(userData)) : null;
  }

  // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage
  static clearUserData(useSessionStorage: boolean = false): void {
    if (useSessionStorage) {
      sessionStorage.removeItem('user');
    } else {
      localStorage.removeItem('user');
    }
  }

  // Cập nhật thông tin người dùng đã lưu
  static updateUserData(newUserData: Partial<User>, useSessionStorage: boolean = false): void {
    const currentUser = this.getUserData(useSessionStorage);
    if (currentUser) {
      const updatedUser = Object.assign(currentUser, newUserData); // Kết hợp dữ liệu mới với đối tượng User hiện tại
      this.storeUserData(updatedUser, useSessionStorage);
    }
  }
}