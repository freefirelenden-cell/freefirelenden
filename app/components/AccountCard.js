"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountCard(account) {
  const [currentImage] = useState(0);
  const { isFeatured, title, images, rank, price, stats } = account
  const router = useRouter()


  //   // Rank colors
  const rankColors = {
    Bronze: "bg-amber-800",
    Silver: "bg-gray-500",
    Gold: "bg-yellow-500",
    Platinum: "bg-blue-500",
    Diamond: "bg-purple-600",
    Heroic: "bg-red-600",
    Grandmaster: "bg-pink-600",
  };

  // Format price
  const formatPrice = (price) => {
    return `PKR ${price.toLocaleString()}`;
  };

  const handleClick = () => {
    router.push(`shop/${account._id}`)
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {images.length != 0 && images[currentImage]?.url ?
          (
             <Image
            src={images[currentImage].url}
            alt={title}
            fill
            className="object-cover"
            unoptimized={true} // temporary fix for external images to avoid 504
          />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">🎮</span>
            </div>
          )}

        {isFeatured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            FEATURED
          </div>
        )}

        <div className="absolute top-3 right-3">
          <div className={`${rankColors[rank] || "bg-gray-600"} text-white text-sm font-bold px-3 py-1 rounded-full`}>
            {rank}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>

        <div className="text-2xl font-bold text-blue-600 mb-3">
          {formatPrice(price)}
        </div>

        {/* <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="text-center">
            <div className="font-bold">Level</div>
            <div>{stats?.level || 0}</div>
          </div>
          <div className="text-center">
            <div className="font-bold">KDR</div>
            <div>{stats?.kdr || 0}</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Status</div>
            <div className="text-green-600 font-bold">✓</div>
          </div>
        </div> */}

        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">
          View Details
        </button>
      </div>
    </div>
  );
}