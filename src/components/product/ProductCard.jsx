"use client";

import { useState } from "react";
import { IconShoppingCart, IconHeart, IconBolt } from "@tabler/icons-react";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

// Sample data (photo from Unsplash) - replace with real product data later
const sampleProduct = {
  name: "Premium Kanchipuram Silk Saree",
  description: "Handwoven silk saree.",
  image:
    "https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?auto=format&fit=crop&w=800&q=80",
  price: 2499,
  mrp: 3499,
  badge: "Trending",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2";

export default function ProductCard({
  product = sampleProduct,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
}) {
  const [wished, setWished] = useState(false);
  const { name, description, image, price, mrp, badge } = product;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const toggleWishlist = () => {
    const next = !wished;
    setWished(next);
    onToggleWishlist?.(product, next);
  };

  return (
    <article
      className="
        group overflow-hidden rounded-xl
        border border-gray-200 bg-white shadow-sm
        transition-all duration-300
        motion-safe:hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4]  overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="
            object-cover
            transition-transform duration-500
            motion-safe:group-hover:scale-105
          "
        />

        {/* Badge */}
        {badge && (
          <span
            className="
              absolute left-3 top-3 inline-flex items-center gap-1
              rounded-full bg-gray-900 px-3 py-1.5
              text-[11px] font-semibold uppercase tracking-wide text-white
              shadow-sm
            "
          >
            <IconBolt size={13} stroke={2.2} aria-hidden="true" />
            {badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          onClick={toggleWishlist}
          className={`
            absolute right-3 top-3
            flex h-9 w-9 items-center justify-center
            rounded-full bg-white/95 shadow-sm backdrop-blur-sm
            transition-all duration-200
            hover:scale-105 hover:bg-white hover:text-red-500
            ${wished ? "text-red-500" : "text-gray-600"}
            ${focusRing}
          `}
        >
          <IconHeart
            size={19}
            stroke={1.8}
            aria-hidden="true"
            className={wished ? "fill-current" : ""}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">
          {name}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm">
          {description}
        </p>

        {/* Price */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {inr.format(price)}
          </span>

          {discount > 0 && (
            <>
              <del className="text-sm text-gray-400">
                <span className="sr-only">Original price </span>
                {inr.format(mrp)}
              </del>

              <span className="rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-semibold text-green-700">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className={`
              inline-flex items-center justify-center gap-2
              rounded-lg border border-gray-900 px-3 py-2.5
              text-xs font-semibold text-gray-900
              transition-all duration-200
              hover:bg-gray-900 hover:text-white
              active:scale-[0.98] sm:text-sm
              ${focusRing}
            `}
          >
            <IconShoppingCart size={17} stroke={1.9} aria-hidden="true" />
            Add to Cart
          </button>

          <button
            type="button"
            onClick={() => onBuyNow?.(product)}
            className={`
              inline-flex items-center justify-center
              rounded-lg bg-gray-900 px-3 py-2.5
              text-xs font-semibold text-white
              transition-all duration-200
              hover:bg-gray-800
              active:scale-[0.98] sm:text-sm
              ${focusRing}
            `}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
