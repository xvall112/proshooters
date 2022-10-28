import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import LoadingButton from "@mui/lab/LoadingButton";
//types
import { CartContextType } from "../types/appContext";

const AddToCart = (props: any) => {
  const { product } = props;
  const { handleAddToCartClick, addToCartLoading } = useContext(
    AppContext
  ) as CartContextType;

  return (
    <div>
      {/*	Check if its an external product then put its external buy link */}
      {/* {"ExternalProduct" === product.__typename ? (
                    <a href={product?.externalUrl ?? '/'} target="_blank"
                       className="px-3 py-1 rounded-sm mr-3 text-sm border-solid border border-current inline-block hover:bg-purple-600 hover:text-white hover:border-purple-600">
						Buy now
                    </a>
                ) : */}
      <LoadingButton
        loading={addToCartLoading}
        loadingPosition="start"
        onClick={() => handleAddToCartClick(product.productId)}
        variant={"contained"}
        color={"primary"}
        size={"large"}
        fullWidth
        startIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width={20}
            height={20}
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        }
      >
        Do košíku
      </LoadingButton>

      {/* } */}
    </div>
  );
};

export default AddToCart;
