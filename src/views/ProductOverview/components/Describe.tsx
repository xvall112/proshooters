import React from "react";
//materialUi
import Typography from "@mui/material/Typography";

const Describe = ({ description }) => {
  return (
    <>
      <Typography variant={"h5"} fontWeight={700}>
        Popis
      </Typography>
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    </>
  );
};

export default Describe;
