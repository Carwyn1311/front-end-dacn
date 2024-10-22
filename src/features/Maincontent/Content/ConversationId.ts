export class ConversationId {
  conversationId: string;

  constructor(conversationId: string) {
    this.conversationId = conversationId;
  }

  // Lưu conversationId vào sessionStorage
  static storeConversationId(conversationId: string): void {
    sessionStorage.setItem('conversationId', conversationId);
  }

  // Lấy conversationId từ sessionStorage
  static getConversationId(): string | null {
    return sessionStorage.getItem('conversationId');
  }

  // Xóa conversationId khỏi sessionStorage
  static clearConversationId(): void {
    sessionStorage.removeItem('conversationId');
  }
}
