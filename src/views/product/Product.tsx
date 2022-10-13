import React from "react";
//components
import Container from "../../components/Container";

interface Props {
  product: any;
}

const Product = ({ product }: Props) => {
  return (
    <Container>
      {" "}
      <div>{product ? product.name : "nic"}</div>{" "}
    </Container>
  );
};

export default Product;
