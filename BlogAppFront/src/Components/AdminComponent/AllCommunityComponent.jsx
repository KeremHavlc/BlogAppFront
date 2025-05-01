import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Upload } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { toast } from "react-fox-toast";

const AllCommunityComponent = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageBase64, setEditImageBase64] = useState("");

  const fetchCommunities = async () => {
    try {
      const response = await fetch(
        "https://localhost:7291/api/Communities/getAllCommunities"
      );
      const data = await response.json();
      setCommunities(data);
    } catch (error) {
      console.error("Topluluklar çekilemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleEditClick = (community) => {
    setSelectedCommunity(community);
    setEditName(community.name);
    setEditDescription(community.description);
    setEditImageBase64(community.image);
    setEditModalVisible(true);
  };

  const handleDeleteClick = async (communityId) => {
    try {
      const response = await fetch(
        `https://localhost:7291/api/Communities/deleteCommunity?id=${communityId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Topluluk silindi");
        fetchCommunities();
      } else {
        toast.error("Silme işlemi başarısız");
      }
    } catch (error) {
      toast.error("Sunucu hatası");
    }
  };

  const handleUpdate = async () => {
    const updatedCommunity = {
      communityId: selectedCommunity.communityId,
      name: editName,
      description: editDescription,
      image: editImageBase64,
      createdAt: selectedCommunity.createdAt,
    };

    try {
      const response = await fetch(
        `https://localhost:7291/api/Communities/updateCommunity?communityId=${selectedCommunity.communityId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCommunity),
        }
      );

      if (response.ok) {
        toast.success("Topluluk güncellendi");
        setEditModalVisible(false);
        fetchCommunities();
      } else {
        toast.error("Güncelleme başarısız");
      }
    } catch (error) {
      toast.error("Sunucu hatası");
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setEditImageBase64(base64);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const columns = [
    {
      title: "Görsel",
      dataIndex: "image",
      render: (img) => (
        <img
          src={`data:image/jpeg;base64,${img}`}
          alt="community"
          className="w-20 h-16 object-cover rounded"
        />
      ),
    },
    {
      title: "Ad",
      dataIndex: "name",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
    },
    {
      title: "İşlemler",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          >
            Düzenle
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteClick(record.communityId)}
          >
            Sil
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-[1270px] bg-gray-200 mt-4 select-none ml-[200px] border shadow-lg rounded-lg p-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Tüm Topluluklar
      </h2>
      <Table
        dataSource={communities}
        columns={columns}
        rowKey="communityId"
        loading={loading}
        pagination={{ pageSize: 4 }}
      />

      <Modal
        title="Topluluğu Düzenle"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleUpdate}
        okText="Güncelle"
      >
        <Input
          placeholder="Ad"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="mb-3"
        />
        <Input.TextArea
          placeholder="Açıklama"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="mb-3"
        />
        <Upload
          beforeUpload={handleImageUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Görsel Seç</Button>
        </Upload>
        {editImageBase64 && (
          <img
            src={`data:image/jpeg;base64,${editImageBase64}`}
            alt="önizleme"
            className="mt-3 w-32 h-20 object-cover rounded"
          />
        )}
      </Modal>
    </div>
  );
};

export default AllCommunityComponent;
