import ProductCard from "../product/ProductCard";
import {
  IconArrowNarrowLeftDashed,
  IconArrowNarrowRightDashed,
} from "@tabler/icons-react";

export default function Products() {
  return (
    <section className="mt-5 w-full">
      <div className="tracking-wide py-3 text-xl font-bold flex justify-center items-center gap-2">
        <span>
          <IconArrowNarrowLeftDashed stroke={2} />
        </span>
        <span>OUR PRODUCTS</span>
        <span>
          <IconArrowNarrowRightDashed stroke={2} />
        </span>
      </div>
      <div
        className="
    grid
    grid-cols-2
    gap-3
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-4
    2xl:grid-cols-5
    sm:gap-4
    lg:gap-6
  "
      >
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
}
