import React, { useState } from 'react';
import { Button, Input, List, Modal, Upload, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import '../.css/PostManagement.css';
import '../.css/AntDesignOverrides.css';

interface Post {
    id: number;
    title: string;
    content: string;
    date: string; // Thêm thuộc tính ngày cho bài viết (YYYY-MM-DD format)
    imageUrl?: string | null;
    imageName?: string | null;
}

const PostManagement: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newTitle, setNewTitle] = useState<string>('');
    const [newContent, setNewContent] = useState<string>('');
    const [newImage, setNewImage] = useState<string | null>(null);
    const [newImageName, setNewImageName] = useState<string | null>(null);
    const [newDate, setNewDate] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState<string>('');
    const [editContent, setEditContent] = useState<string>('');
    const [editImage, setEditImage] = useState<string | null>(null);
    const [editImageName, setEditImageName] = useState<string | null>(null);
    const [editDate, setEditDate] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortType, setSortType] = useState<'az' | 'za' | 'dateAsc' | 'dateDesc'>('az');
    const [filterDate, setFilterDate] = useState<string>('');

    const handleAddPost = () => {
        if (newTitle.trim() !== '' && newContent.trim() !== '' && newDate !== '') {
            setPosts([...posts, {
                id: Date.now(),
                title: newTitle,
                content: newContent,
                date: newDate,
                imageUrl: newImage,
                imageName: newImageName,
            }]);
            setNewTitle('');
            setNewContent('');
            setNewImage(null);
            setNewImageName(null);
            setNewDate('');
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
        setEditImage(post.imageUrl || null);
        setEditImageName(post.imageName || null);
        setEditDate(post.date);
    };

    const handleSaveEdit = () => {
        setPosts(posts.map(post => 
            (post.id === editingIndex ? { ...post, title: editTitle, content: editContent, date: editDate, imageUrl: editImage, imageName: editImageName } : post)
        ));
        setIsEditing(false);
        setEditTitle('');
        setEditContent('');
        setEditImage(null);
        setEditImageName(null);
        setEditDate('');
        setEditingIndex(null);
    };

    const handleUploadChange = (info: any, setImage: (url: string | null) => void, setImageName: (name: string | null) => void) => {
        if (info.file.status === 'done' || info.file.status === 'uploading') {
            const imageUrl = URL.createObjectURL(info.file.originFileObj);
            setImage(imageUrl);
            setImageName(info.file.name);
        }
    };

    const handleSort = (type: 'az' | 'za' | 'dateAsc' | 'dateDesc') => {
        setSortType(type);
    };

    const filteredPosts = posts
        .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(post => (filterDate ? post.date === filterDate : true))
        .sort((a, b) => {
            if (sortType === 'az') return a.title.localeCompare(b.title);
            if (sortType === 'za') return b.title.localeCompare(a.title);
            if (sortType === 'dateAsc') return new Date(a.date).getTime() - new Date(b.date).getTime();
            if (sortType === 'dateDesc') return new Date(b.date).getTime() - new Date(a.date).getTime();
            return 0;
        });

    return (
        <div className="post-management-container">
            <h1>Quản lý bài viết</h1>
            <div>
                <Input
                    placeholder="Tìm kiếm bài viết"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <Button onClick={() => handleSort('az')}>Sắp xếp A-Z</Button>
                    <Button onClick={() => handleSort('za')}>Sắp xếp Z-A</Button>
                    <Button onClick={() => handleSort('dateAsc')}>Ngày tăng dần</Button>
                    <Button onClick={() => handleSort('dateDesc')}>Ngày giảm dần</Button>
                </div>
                <DatePicker
                    placeholder="Lọc theo ngày"
                    onChange={(date, dateString) => setFilterDate(dateString as string)}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                {/* Input và các nút thêm bài viết */}
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
                <DatePicker
                    placeholder="Chọn ngày"
                    onChange={(date, dateString) => setNewDate(dateString as string)}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                <Upload
                    beforeUpload={() => false}
                    onChange={(info) => handleUploadChange(info, setNewImage, setNewImageName)}
                >
                    <Button icon={<UploadOutlined />}>Gắn ảnh</Button>
                </Upload>
                {newImageName && <p style={{ marginTop: '5px' }}>📎 {newImageName}</p>}
                {newImage && <img src={newImage} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px', display: 'block' }} />}
                <Button type="primary" onClick={handleAddPost} icon={<PlusOutlined />} style={{ marginTop: '10px' }}>
                    Thêm bài viết
                </Button>
            </div>
            <List
                bordered
                dataSource={filteredPosts}
                renderItem={(post) => (
                    <List.Item
                        actions={[
                            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditPost(post)}>
                                Sửa
                            </Button>,
                            <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDeletePost(post.id)}>
                                Xóa
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={post.title}
                            description={
                                <>
                                    <p>{post.content}</p>
                                    <small>Ngày: {post.date}</small>
                                    {post.imageName && <p>📎 {post.imageName}</p>}
                                    {post.imageUrl && <img src={post.imageUrl} alt="Post" style={{ maxHeight: '100px', display: 'block', marginTop: '10px' }} />}
                                </>
                            }
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
                <DatePicker
                    placeholder="Chỉnh sửa ngày"
                    value={editDate ? new Date(editDate) : null}
                    onChange={(date, dateString) => setEditDate(dateString as string)}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                <Upload
                    beforeUpload={() => false}
                    onChange={(info) => handleUploadChange(info, setEditImage, setEditImageName)}
                >
                    <Button icon={<UploadOutlined />}>Chỉnh sửa ảnh</Button>
                </Upload>
                {editImageName && <p style={{ marginTop: '5px' }}>📎 {editImageName}</p>}
                {editImage && <img src={editImage} alt="Edit Preview" style={{ marginTop: '10px', maxHeight: '200px', display: 'block' }} />}
            </Modal>
        </div>
    );
};

export default PostManagement;
