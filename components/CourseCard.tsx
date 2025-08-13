import React from "react";

interface CourseCardProps {
  title: string;
  image: string;
  badges: string[];
  discountLabel: string;
  price: string;
  originalPrice: string;
  discount: string;
  features: string[];
  buttonText: string;
}

const badgeColors = [
  "bg-red-600 text-white",
  "bg-neutral-700 text-white",
  "bg-blue-600 text-white",
  "bg-emerald-600 text-white",
];

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  image,
  badges,
  discountLabel,
  price,
  originalPrice,
  discount,
  features,
  buttonText,
}) => (
  <div className="bg-neutral-900 rounded-3xl shadow-xl flex flex-col min-h-[600px] border border-neutral-800 overflow-hidden">
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-t-3xl"
    />
    <div className="flex flex-col flex-1 p-6">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <div className="flex gap-2 mb-4 flex-wrap">
        {badges.map((badge, i) => (
          <span
            key={i}
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              badgeColors[i % badgeColors.length]
            }`}
          >
            {badge}
          </span>
        ))}
      </div>
      <div className="text-emerald-400 font-bold text-base mb-1">
        {discountLabel}
      </div>
      <div className="flex items-end gap-2 mb-4 flex-wrap">
        <span className="text-2xl font-bold text-white">{price}</span>
        <span className="text-sm text-neutral-400">(+ GST)</span>
        <span className="text-lg text-neutral-500 line-through">
          {originalPrice}
        </span>
        <span className="bg-emerald-600 text-xs text-white px-2 py-1 rounded font-semibold">
          {discount}
        </span>
      </div>
      <ul className="text-sm text-neutral-400 mb-4 space-y-1 flex-1">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <a
        href="#"
        className="mt-auto w-full bg-[#2FEAAA] text-neutral-900 text-lg font-semibold py-3 rounded-full text-center hover:opacity-90 transition"
      >
        {buttonText}
      </a>
    </div>
  </div>
);
