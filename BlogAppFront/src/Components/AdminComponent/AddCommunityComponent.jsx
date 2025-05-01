import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddCommunityComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!name || !description || !imageBase64) {
      setMessage("❌ Tüm alanları doldurduğunuzdan emin olun.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:7291/api/Communities/addCommunity",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            communityId: uuidv4(),
            image: imageBase64,
            name,
            description,
            createdAt: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error("Sunucu hatası: " + response.status);

      setMessage("✅ Topluluk başarıyla eklendi!");
      setName("");
      setDescription("");
      setImageBase64("");
    } catch (error) {
      setMessage("❌ Hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[1270px] h-auto bg-gray-200 mt-4 select-none ml-[200px] border shadow-lg rounded-lg p-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Yeni Topluluk Ekle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Topluluk Adı
          </label>
          <input
            type="text"
            className="w-full p-2 rounded border border-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Açıklama
          </label>
          <textarea
            className="w-full p-2 rounded border border-gray-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Görsel Seç (Base64)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block"
            required
          />
          {imageBase64 && (
            <img
              src={`data:image/jpeg;base64,${imageBase64}`}
              alt="Görsel Önizleme"
              className="mt-4 w-48 h-32 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Ekleniyor..." : "Topluluk Ekle"}
        </button>

        {message && <p className="mt-4 font-medium text-gray-800">{message}</p>}
      </form>
    </div>
  );
};

export default AddCommunityComponent;
