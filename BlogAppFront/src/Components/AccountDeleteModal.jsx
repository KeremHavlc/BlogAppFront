import React from "react";

const AccountDeleteModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-red-600">Hesabı Sil</h2>
        <p className="mb-4 text-gray-600">
          Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Vazgeç
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Evet, Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteModal;
