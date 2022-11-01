import { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import GET_CART from "../utils/gql/queries/get-cart";
import ADD_TO_CART from "../utils/gql/mutations/add-to-cart";
import { AppContext } from "../context/AppContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { v4 } from "uuid";

//types
import { CartContextType } from "../types/appContext";

const AddToCart = (props: any) => {
  const { product } = props;
  const { setMessage } = useContext(AppContext) as CartContextType;

  //po stisknuti tlacitka pridat do kosiku
  const handleAddToCartClick = async (productId: string) => {
    await addToCart({
      variables: {
        input: {
          clientMutationId: v4(), // Generate a unique id.
          productId: productId,
        },
      },
    });
  };

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    refetchQueries: [
      { query: GET_CART }, // DocumentNode object parsed with gql
      "GET_CART", // Query name
    ],
    onCompleted: () => {
      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      /* refetch();
      console.log("addtocart cal refetch"); */
      // 2. Show View Cart Button

      setMessage("success", `Produkt ${product.name} byl přidán do košíku`);
    },
    onError: (error) => {
      setMessage("error", `${error.message}`);
    },
  });

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
        loading={addToCartLoading && product.productId}
        loadingPosition="start"
        onClick={() => {
          handleAddToCartClick(product.productId);
        }}
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
