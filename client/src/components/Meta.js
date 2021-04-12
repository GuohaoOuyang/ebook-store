import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Fair | Online Book Store",
  description: "Fair help you discover more of your inner world",
  keywords: "Fair, ebook merchandise, unique merchandise, snack time",
};

export default Meta;
