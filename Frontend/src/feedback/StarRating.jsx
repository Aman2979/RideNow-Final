import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`text-4xl transition-all duration-200 focus:outline-none
            ${star <= (hovered || rating)
              ? "text-yellow-400 scale-125"
              : "text-gray-300 scale-100"
            }`}
        >
          ★
        </button>
      ))}
      {rating > 0 && (
        <span className="text-sm text-gray-500 ml-1 font-medium">
          {rating} / 5
        </span>
      )}
    </div>
  );
}