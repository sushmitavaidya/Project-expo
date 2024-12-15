import React, { useState } from "react";
import { Input, Button, Form, Upload, message, Card } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null); // State for profile photo
  const { user } = useSelector(state => state.users);
  const onEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSave = () => {
    form.validateFields()
      .then((values) => {
        console.log("Saved Data:", values);
        setIsEditing(false);
      })
      .catch((errorInfo) => console.error(errorInfo));
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result); // Set the uploaded image URL
        message.success("Photo uploaded successfully!");
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const deletePhoto = () => {
    setImageUrl(null); // Remove the uploaded image
    message.info("Photo deleted!");
  };

  

  return (
    <Card style={{ width: "100%", maxWidth: "400px", margin: "auto", marginTop: "20px", padding: "20px" ,border: "3px solid #0004"}}>
      <div className="text-center">
        {/* Display profile photo */}
        <div className="mb-3">
          {imageUrl ? (
            <div className="position-relative">
              <img
                src={imageUrl}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              {isEditing && (
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={deletePhoto}
                  className="position-absolute"
                  style={{ top: "0", right: "0", padding: "0 5px", borderRadius: "50%" }}
                />
              )}
            </div>
          ) : (
            <div className="rounded-circle d-flex justify-content-center align-items-center bg-light" style={{ width: "100px", height: "100px", color: "#aaa" }}>
              Default
            </div>
          )}
        </div>

        {isEditing && !imageUrl && (
          <Upload
            showUploadList={false}
            beforeUpload={(file) => file.type.startsWith("image/")}
            onChange={handleImageUpload}
          >
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          </Upload>
        )}
      </div>

      <div className="mt-4">
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" initialValue={user?.name} >
            <Input disabled={!isEditing} />
          </Form.Item>
          <Form.Item label="Email" name="email" initialValue={user?.email}>
            <Input disabled={!isEditing} />
          </Form.Item>
          <Form.Item label="Phone" name="phone" initialValue=" ">
            <Input disabled={!isEditing} />
          </Form.Item>
          <Form.Item
            label="Car Plate Number"
            name="carPlate"
            initialValue=" "
          >
            <Input disabled={!isEditing} />
          </Form.Item>
        </Form>
        <div className="text-center">
          {isEditing ? (
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          ) : (
            <Button type="default" onClick={onEdit}>
              Edit
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
