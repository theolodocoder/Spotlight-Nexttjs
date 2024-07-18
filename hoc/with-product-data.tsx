/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProductDetails } from "@/hooks/api/use-product-data";

const withProductData = (WrappedComponent: any) => {
  const HOC = (props: any) => {
    const { productData, isLoading, error } = useProductDetails();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <WrappedComponent
        {...props}
        item={productData}
        _item={productData || props.fallbackData}
      />
    );
  };

  HOC.displayName = `withProductData(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return HOC;
};

export default withProductData;
