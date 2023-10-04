import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import AddProductQuantity from './AddProductQuantity';
import DecreaseProductQuantity from './DecreaseProductQuantity';
import DeleteProductButton from './DeleteProductButton';

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const productsCollectionRef = collection(db, 'products');

  const fetchProducts = async () => {
    const data = await getDocs(productsCollectionRef);
    const productData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const productImagesData = {};
    productData.forEach((product) => {
      productImagesData[product.id] = getRandomImage();
    });

    setProducts(productData);
    setProductImages(productImagesData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getRandomImage = () => {
    const randomImageId = Math.floor(Math.random() * 50);
    return `https://picsum.photos/id/${randomImageId}/200/200`;
  };

  return (
    <div className="container mt-5">
      <h2>Product Listing</h2>
      {products.length === 0 ? (
        <p>No products Yet</p>
      ) : (
        <div className="d-flex flex-wrap">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded m-3 p-3 d-flex flex-column"
              style={{
                flex: '1',
                justifyContent: 'space-between',
                maxWidth: '235px', // Set a max width for each grid item
              }}
            >
              <div>
                <img
                  src={productImages[product.id]}
                  alt="Random Product"
                  width={200}
                  height={200}
                  style={{ marginBottom: '10px' }}
                />
                <h5>Name: {product.name}</h5>
                <h6>Quantity: {product.quantity}</h6>
              </div>
              <div>
                <AddProductQuantity
                  id={product.id}
                  quantity={product.quantity}
                  onQuantityUpdated={(newQuantity) => {
                    const updatedProducts = products.map((p) =>
                      p.id === product.id ? { ...p, quantity: newQuantity } : p
                    );
                    setProducts(updatedProducts);
                  }}
                />
                <DecreaseProductQuantity
                  id={product.id}
                  quantity={product.quantity}
                  onQuantityUpdated={(newQuantity) => {
                    const updatedProducts = products.map((p) =>
                      p.id === product.id ? { ...p, quantity: newQuantity } : p
                    );
                    setProducts(updatedProducts);
                  }}
                />
                {product.quantity === 0 && (
                  <DeleteProductButton
                    id={product.id}
                    onDelete={() => fetchProducts()}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;
