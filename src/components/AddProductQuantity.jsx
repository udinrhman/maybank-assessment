import React from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

function AddProductQuantity({ id, quantity, onQuantityUpdated }) {
  const addProductQuantity = async () => {
    const productDoc = doc(db, 'products', id);
    const newQuantity = quantity + 1;

    try {
      await updateDoc(productDoc, { quantity: newQuantity });
      onQuantityUpdated(newQuantity); // Notify the parent component of the updated quantity
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <button className="btn btn-secondary" onClick={addProductQuantity} style={{ marginRight: '10px', width: '40px' }}>+</button>
  );
}

export default AddProductQuantity;