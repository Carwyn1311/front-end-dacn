import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Tag, Form, message } from 'antd';
import './Profile.css';

const Profile = () => {
  // Quản lý trạng thái của người dùng
  const [userInfo, setUserInfo] = useState({
    fullName: 'Lê Trọng Phúc',
    email: 'phuc.letrong@ncc.asia',
    phone: '0904752033',
    dob: '13/11/2003',
    address: 'SG',
    bank: 'Techcombank',
    bankAccount: '1118888999',
    taxCode: '123456789',
    emergencyContact: 'Nguyen Van A',
    emergencyPhone: '0901234567',
    insuranceStatus: 'NONE',
    identify: '082203004740',
    origin: 'Ấp Mỹ Nghĩa 2, Mỹ Đức Tây, Cái Bè, Tiền Giang',
    residence: 'Ấp Mỹ Nghĩa 2, Mỹ Đức Tây, Cái Bè, Tiền Giang',
    currentAddress: '22/8 Hẻm 56, Đường 339, Phường Phước Long B, Thủ Đức, TP.HCM',
    dateOfIssue: '19/07/2022',
    issuedBy: 'Cục Cảnh Sát QLHC về TTXH'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = () => {
    // Xử lý logic lưu thông tin
    message.success('Thông tin của bạn đã được lưu!');
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Hồ sơ người dùng</h1>

      {/* Phần thông tin cá nhân */}
      <Row gutter={16} className="profile-top">
        <Col span={8}>
          <Card className="profile-card">
            <div className="profile-avatar-container">
              <img
                className="profile-avatar"
                src="https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp"
                alt="Profile"
              />
            </div>
            <h2 className="profile-name">{userInfo.fullName}</h2>
            <p className="profile-email">{userInfo.email}</p>
            <p className="profile-phone">{userInfo.phone}</p>
            {/* Thẻ thông tin */}
            <div className="profile-tags">
              <Tag color="orange">{userInfo.address}</Tag>
            </div>
          </Card>
        </Col>

        <Col span={16}>
          <Card className="profile-info-card">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Full Name">
                    <Input name="fullName" value={userInfo.fullName} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input name="email" value={userInfo.email} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Date of Birth">
                    <Input name="dob" value={userInfo.dob} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Address">
                    <Input name="address" value={userInfo.address} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className="profile-actions" style={{ marginTop: '10px', textAlign: 'right' }}>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button type="default">Request change info</Button>
          </div>
        </Col>
      </Row>

      {/* Phần thông tin chi tiết khác */}
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card className="profile-detail-card">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Bank">
                    <Input name="bank" value={userInfo.bank} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Bank account">
                    <Input name="bankAccount" value={userInfo.bankAccount} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Tax code">
                    <Input name="taxCode" value={userInfo.taxCode} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Emergency Contact">
                    <Input name="emergencyContact" value={userInfo.emergencyContact} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Insurance status">
                    <Input name="insuranceStatus" value={userInfo.insuranceStatus} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Identify">
                    <Input name="identify" value={userInfo.identify} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Place of origin">
                    <Input name="origin" value={userInfo.origin} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Place of residence">
                    <Input name="residence" value={userInfo.residence} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Current Address">
                    <Input name="currentAddress" value={userInfo.currentAddress} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Emergency Contact Phone">
                    <Input name="emergencyPhone" value={userInfo.emergencyPhone} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Date of issue">
                    <Input name="dateOfIssue" value={userInfo.dateOfIssue} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Issued By">
                    <Input name="issuedBy" value={userInfo.issuedBy} onChange={handleInputChange} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
