import React from 'react';
import { List, Avatar, Input, Button } from 'antd';

interface CommentsSectionProps {
  comments: string[];
  newComment: string;
  setNewComment: (value: string) => void;
  handleAddComment: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, newComment, setNewComment, handleAddComment }) => (
  <div className="comments-section">
    <h2>Bình luận</h2>
    <List
      className="comment-list"
      header={`${comments.length} bình luận`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(comment, index) => (
        <li key={index}>
          <Avatar src="https://via.placeholder.com/40" alt="User Avatar" />
          {comment}
        </li>
      )}
    />
    <div className="comment-input">
      <Input.TextArea
        rows={4}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Nhập bình luận của bạn"
      />
      <Button type="primary" onClick={handleAddComment} style={{ marginTop: '10px' }}>
        Thêm bình luận
      </Button>
    </div>
  </div>
);

export default CommentsSection;
