import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { toast } from "react-fox-toast";
import { useParams } from "react-router-dom";

const CreatePostButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { communityId } = useParams();
  const [userId, setUserId] = useState();
  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload?.id);
    } catch (err) {
      console.error("JWT decode hatası:", err);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreatePost = async () => {
    try {
      const values = await form.validateFields();

      const postData = {
        title: values.title,
        description: values.description,
        communityId: communityId,
        userId: userId,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(
        "https://localhost:7291/api/CommunityPosts/addCommunityPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (res.ok) {
        toast.success("Gönderi başarıyla oluşturuldu!");
        setIsModalVisible(false);
        form.resetFields();
        window.location.reload();
      } else {
        toast.error("Gönderi oluşturulurken bir hata oluştu!");
      }
    } catch (error) {
      toast.error("Formda bir hata oluştu!");
    }
  };

  useEffect(() => {
    getUserFromToken();
  }, []);

  return (
    <div>
      {/* Gönderi oluşturma butonu */}
      <button
        className="border font-bold w-[190px] h-[40px] decoration-dotted text-white bg-red-500 rounded-lg shadow-lg transition-colors duration-300 hover:bg-red-600"
        onClick={showModal}
      >
        Gönderi Oluştur
      </button>

      {/* Modal */}
      <Modal
        title="Yeni Gönderi Oluştur"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleCreatePost}
        okText="Oluştur"
        cancelText="İptal"
      >
        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          name="createPostForm"
          initialValues={{
            title: "",
            description: "",
          }}
        >
          <Form.Item
            label="Başlık"
            name="title"
            rules={[{ required: true, message: "Başlık zorunludur!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Açıklama"
            name="description"
            rules={[{ required: true, message: "Açıklama zorunludur!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePostButton;
