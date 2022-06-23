import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
//import laptop from "../../images/laptop.png";
//import  Link  from "next/link";
import  Link  from "next/link";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // destructure
  const { images, name, desc, id } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length && images[0].image }
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link href={`/product/${id}`}><a ><EyeOutlined className="text-warning" />View Product
       </a></Link>,
        <>
          <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
        </>,
      ]}
    >
      <Meta
        title={name}
        description={`${desc && desc.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
