import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

function DeleteProductButton({ id, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    // Show the delete confirmation modal
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation modal
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    // Close the delete confirmation modal
    setShowDeleteModal(false);

    const productDoc = doc(db, 'products', id);

    try {
      await deleteDoc(productDoc);
      // Notify the parent component to remove the deleted product
      onDelete(id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <button onClick={handleDeleteClick} className="btn btn-danger">
        Delete
      </button>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered className="modal-sm">
        <Modal.Header closeButton style={{ backgroundColor: 'red', color: 'white' }}>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProductButton;
