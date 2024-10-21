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

  // Lưu thông tin người dùng vào sessionStorage (dữ liệu chỉ tồn tại trong phiên trình duyệt)
  static storeUserData(user: User): void {
    const userData = JSON.stringify(user);
    sessionStorage.setItem('user', userData);  // Lưu vào sessionStorage
  }

  // Lấy thông tin người dùng từ sessionStorage
  static getUserData(): User | null {
    const userData = sessionStorage.getItem('user');
    return userData ? Object.assign(new User(0, '', '', '', ''), JSON.parse(userData)) : null;
  }

  // Xóa thông tin người dùng khỏi sessionStorage
  static clearUserData(): void {
    sessionStorage.removeItem('user');
  }

  // Cập nhật thông tin người dùng đã lưu trong sessionStorage
  static updateUserData(newUserData: Partial<User>): void {
    const currentUser = this.getUserData();
    if (currentUser) {
      const updatedUser = Object.assign(currentUser, newUserData); // Kết hợp dữ liệu mới với đối tượng User hiện tại
      this.storeUserData(updatedUser);
    }
  }
}
