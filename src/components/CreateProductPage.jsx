import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from './SuccessMessage';
import WarningMessage from './WarningMessage';

function CreateProductPage() {
  const [newProduct, setNewProduct] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const navigate = useNavigate();
  const productsCollectionRef = collection(db, 'products');

  const createProduct = async () => {
    if (newProduct.trim() === '' || newQuantity <= 0) {
      setShowWarningMessage(true);
      return;
    }

    await addDoc(productsCollectionRef, {
      name: newProduct,
      quantity: Number(newQuantity),
    });

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/list');
    }, 1500);
  };

  return (
    <div className="container mt-5">
      <h2>Create Product</h2>
      <form>
        {/* Use the WarningMessage component */}
        {showWarningMessage && <WarningMessage />}

        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Enter product name"
            value={newProduct}
            onChange={(event) => setNewProduct(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="productQuantity"
            placeholder="Enter quantity"
            value={newQuantity}
            onChange={(event) => setNewQuantity(event.target.value)}
            min={1}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={createProduct}>
          Create Product
        </button>
      </form>

      {showSuccessMessage && <SuccessMessage onClose={() => setShowSuccessMessage(false)} />}
    </div>
  );
}

export default CreateProductPage;
