import React, { useState } from "react";
import { Modal, Input, Button, Upload, message } from "antd";
import { PlusOutlined, UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { toast } from "react-fox-toast";

const { TextArea } = Input;

const AddPostModal = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleOk = async () => {
    if (!title || !content) {
      message.error("Başlık ve içerik boş bırakılamaz.");
      return;
    }

    const userId = getUserFromToken();
    if (!userId) {
      toast.error("Giriş yapılmamış!");
      return;
    }

    let base64Image = null;
    if (file) {
      base64Image = await convertToBase64(file);
    }

    try {
      const res = await fetch(
        `https://localhost:7291/api/Posts/add?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: title,
            description: content,
            image: base64Image || "null",
          }),
        }
      );

      if (res.ok) {
        toast.success("Gönderi başarıyla paylaşıldı!");
        onClose();
        setTitle("");
        setContent("");
        setFile(null);
        window.location.reload();
      } else {
        toast.error("Gönderi paylaşılırken hata oluştu.");
      }
    } catch (error) {
      toast.error("Bir hata oluştu!", error.message);
    }
  };
  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.id;
    } catch (err) {
      console.error("JWT decode hatası:", err);
      return null;
    }
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // sadece saf base64
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <Modal
      title={
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Yeni Gönderi</span>
          <CloseOutlined
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-red-500"
          />
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="space-y-4 mt-4">
        <Input
          placeholder="Gönderi Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="İçeriği buraya yaz..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Upload
          beforeUpload={(file) => {
            const isImage =
              file.type === "image/jpeg" ||
              file.type === "image/png" ||
              file.type === "image/jpg";
            if (!isImage) {
              message.error("Sadece JPG ve PNG formatları destekleniyor.");
              return Upload.LIST_IGNORE;
            }
            setFile(file);
            return false;
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Resim Ekle</Button>
        </Upload>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOk}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Gönderiyi Paylaş
        </Button>
      </div>
    </Modal>
  );
};

export default AddPostModal;
