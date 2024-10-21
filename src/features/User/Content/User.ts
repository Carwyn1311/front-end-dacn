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

  // Example method to check if user is an admin
  isAdmin(): boolean {
    return this.role === 'Admin';
  }

  // Store user in session or local storage
  static storeUserData(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Retrieve user from storage
  static getUserData(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // Clear user data from storage
  static clearUserData(): void {
    localStorage.removeItem('user');
  }
}
