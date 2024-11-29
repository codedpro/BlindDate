import React from "react";

interface UserImagesProps {
  images: (string | null)[];
}

const UserImages: React.FC<UserImagesProps> = ({ images }) => {
  return (
    <div className="w-full flex flex-col gap-2 p-4">
      {images.map((img, index) =>
        img ? (
          <img key={index} src={img} alt={`User image ${index + 1}`} className="w-full uploaded-img" />
        ) : null
      )}
    </div>
  );
};

export default UserImages;
