import { isEmpty } from "lodash";
//materialUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import theme from "../../../theme";

const Price = ({ regularPrice = 0, salesPrice }) => {
  if (isEmpty(salesPrice)) {
    return (
      <Box sx={{ color: theme.palette.text.primary }} fontWeight="bold">
        {regularPrice}
      </Box>
    );
  }

  /**
   * Get discount percent.
   *
   * @param {String} regularPrice
   * @param {String} salesPrice
   */
  const discountPercent = (regularPrice, salesPrice) => {
    if (isEmpty(regularPrice) || isEmpty(salesPrice)) {
      return null;
    }

    const formattedRegularPrice = parseInt(regularPrice?.substring(1));
    const formattedSalesPrice = parseInt(salesPrice?.substring(1));

    const discountPercent =
      ((formattedRegularPrice - formattedSalesPrice) / formattedRegularPrice) *
      100;

    return {
      discountPercent:
        formattedSalesPrice !== formattedRegularPrice
          ? `(${discountPercent.toFixed(2)}%)`
          : null,
    };
  };

  const productMeta = discountPercent(regularPrice, salesPrice);

  return (
    <>
      {/* Regular price */}
      {productMeta?.discountPercent ? (
        <Box sx={{ color: theme.palette.primary.main }} fontWeight="bold">
          {salesPrice}
        </Box>
      ) : null}

      {/* Discounted price */}
      <Box
        sx={{
          color: theme.palette.text.secondary,
          textDecorationLine: "line-through",
        }}
      >
        {regularPrice}
      </Box>

      {/* Discount percent */}
      <Box sx={{ color: theme.palette.primary.main }}>
        {productMeta?.discountPercent}
      </Box>
    </>
  );
};

export default Price;
