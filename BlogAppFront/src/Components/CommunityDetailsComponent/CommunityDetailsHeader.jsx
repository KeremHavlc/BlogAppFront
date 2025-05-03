import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import CreatePostButton from "./CreatePostButton";
import JoinCommunityButton from "./JoinCommunityButton";

const CommunityDetailsHeader = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);

  const fetchCommunityById = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/Communities/getCommunityById?id=${communityId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        setCommunity(data);
      } else {
        console.error("Topluluk verisi alınamadı.");
      }
    } catch (error) {
      console.error("Fetch hatası:", error);
    }
  };

  useEffect(() => {
    if (communityId) {
      fetchCommunityById();
    }
  }, [communityId]);

  return (
    <div className="w-[1000px] ml-[120px] mt-[30px] relative rounded-2xl overflow-hidden shadow-xl select-none">
      {/* Banner arka plan */}
      <div className="relative h-[200px] bg-gray-200">
        {community?.image && (
          <img
            src={`data:image/png;base64,${community.image}`}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* İçerik kısmı */}
      <div className="absolute bottom-[10px] left-10 flex items-center gap-4 bg-gray-200 rounded-xl px-6 py-4 shadow-lg">
        <Image
          width={80}
          height={80}
          src={
            community?.image
              ? `data:image/png;base64,${community.image}`
              : "/placeholder.png"
          }
          alt="Community Avatar"
          className="rounded-full border-4 border-white shadow-md object-cover"
          style={{ borderRadius: "9999px", objectFit: "cover" }}
          preview={{
            mask: <span style={{ color: "white" }}>Büyüt</span>,
          }}
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {community?.name}
          </h1>
          <p className="text-sm text-gray-500 max-w-[500px] truncate">
            {community?.description}
          </p>
        </div>
      </div>

      {/* Alt boşluk ve butonlar */}
      <div className="h-[60px] bg-white flex items-center justify-end gap-4 px-6">
        <CreatePostButton />
        <JoinCommunityButton />
      </div>
    </div>
  );
};

export default CommunityDetailsHeader;
