import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
//components
import Product from "./Product";

const ProductSliderSimilar = ({ similarProducts }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 10,
      spacing: 15,
    },
  });
  return (
    <div ref={ref} className="keen-slider">
      {similarProducts.map((similarProduct) => (
        <Product product={similarProduct} />
      ))}
    </div>
  );
};

export default ProductSliderSimilar;
