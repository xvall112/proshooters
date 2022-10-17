import { isEmpty } from "lodash";
//materialUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const Price = ({ regularPrice = 0, salesPrice }) => {
  const theme = useTheme();
  if (isEmpty(salesPrice)) {
    return (
      <Box sx={{ color: theme.palette.text.primary }} fontWeight="bold">
        <div dangerouslySetInnerHTML={{ __html: regularPrice }} />
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
    console.log(regularPrice);

    const RegularPrice = regularPrice.split(`&nbsp;`);
    const formattedRegularPrice = parseInt(RegularPrice[0]);
    const SalesPrice = salesPrice.split(`&nbsp;`);
    const formattedSalesPrice = parseInt(SalesPrice[0]);

    console.log(formattedRegularPrice, formattedSalesPrice);
    const discountPercent =
      ((formattedRegularPrice - formattedSalesPrice) / formattedRegularPrice) *
      100;

    return {
      discountPercent:
        formattedSalesPrice !== formattedRegularPrice
          ? `(${discountPercent.toFixed(0)}%)`
          : null,
    };
  };

  const productMeta = discountPercent(regularPrice, salesPrice);

  return (
    <>
      {/* Regular price */}
      {productMeta?.discountPercent ? (
        <Box sx={{ color: theme.palette.primary.main }} fontWeight="bold">
          <div dangerouslySetInnerHTML={{ __html: salesPrice }} />
        </Box>
      ) : null}

      {/* Discounted price */}
      <Box
        px={1}
        sx={{
          color: theme.palette.text.secondary,
          textDecorationLine: "line-through",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: regularPrice }} />
      </Box>

      {/* Discount percent */}
      <Box sx={{ color: theme.palette.primary.main }}>
        {productMeta?.discountPercent}
      </Box>
    </>
  );
};

export default Price;
