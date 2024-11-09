import React, { useState } from 'react';
import { Button, Input, List, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import '../.css/MyComponent.css';

interface Post {
    id: number;
    title: string;
    content: string;
}

const PostManagement: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newTitle, setNewTitle] = useState<string>('');
    const [newContent, setNewContent] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState<string>('');
    const [editContent, setEditContent] = useState<string>('');

    const handleAddPost = () => {
        if (newTitle.trim() !== '' && newContent.trim() !== '') {
            setPosts([...posts, { id: Date.now(), title: newTitle, content: newContent }]);
            setNewTitle('');
            setNewContent('');
        }
    };

    const handleDeletePost = (id: number) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    const handleEditPost = (post: Post) => {
        setIsEditing(true);
        setEditingIndex(post.id);
        setEditTitle(post.title);
        setEditContent(post.content);
    };

    const handleSaveEdit = () => {
        setPosts(posts.map(post => 
            (post.id === editingIndex ? { ...post, title: editTitle, content: editContent } : post)
        ));
        setIsEditing(false);
        setEditTitle('');
        setEditContent('');
        setEditingIndex(null);
    };

    return (
        <div className="post-management-container">
            <h1>Quản lý bài viết</h1>
            <div>
                <Input
                    placeholder="Nhập tiêu đề bài viết"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                <Input.TextArea
                    placeholder="Nhập nội dung bài viết"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                    rows={4}
                />
                <Button type="primary" onClick={handleAddPost} icon={<PlusOutlined />} style={{ marginBottom: '20px' }}>
                    Thêm bài viết
                </Button>
            </div>
            <List
                bordered
                dataSource={posts}
                renderItem={(post) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                icon={<EditOutlined />}
                                onClick={() => handleEditPost(post)}
                            >
                                Sửa
                            </Button>,
                            <Button
                                type="link"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeletePost(post.id)}
                            >
                                Xóa
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={post.title}
                            description={post.content}
                        />
                    </List.Item>
                )}
            />

            <Modal
                title="Chỉnh sửa bài viết"
                visible={isEditing}
                onOk={handleSaveEdit}
                onCancel={() => setIsEditing(false)}
            >
                <Input
                    placeholder="Chỉnh sửa tiêu đề"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                <Input.TextArea
                    placeholder="Chỉnh sửa nội dung"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                    rows={4}
                />
            </Modal>
        </div>
    );
};

export default PostManagement;
