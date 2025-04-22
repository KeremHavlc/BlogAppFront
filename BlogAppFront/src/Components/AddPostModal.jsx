import React, { useState } from "react";
import { Modal, Input, Button, Upload, message } from "antd";
import { PlusOutlined, UploadOutlined, CloseOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AddPostModal = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleOk = () => {
    if (!title || !content) {
      message.error("Başlık ve içerik boş bırakılamaz.");
      return;
    }

    onSubmit({ title, content, file });
    onClose();
    setTitle("");
    setContent("");
    setFile(null);
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
