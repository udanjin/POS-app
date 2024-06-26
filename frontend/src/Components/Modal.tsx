
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

interface ModalProps {
  title?: string;
  text?: string;
  iconHtml?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  show?: boolean;
}
const Modal: React.FC<ModalProps> = (props) => {
    const {
      title,
      text,
      iconHtml,
      confirmButtonText,
      cancelButtonText,
      onConfirm,
      onCancel,
      show,
    } = props;
  
    const handleConfirm = () => {
      MySwal.fire({
        title,
        text,
        iconHtml,
        confirmButtonText,
        cancelButtonText,
      }).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm();
        }
      });
    };
  
    const handleCancel = () => {
      MySwal.fire({
        title,
        text,
        iconHtml,
        confirmButtonText,
        cancelButtonText,
        showCancelButton: true,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
          onCancel();
        }
      });
    };
  
    return (
      <>
        {/* {show && (
          <button onClick={handleConfirm}>
            Show Confirmation Modal
          </button>
        )}
        {show && (
          <button onClick={handleCancel}>
            Show Cancel Modal
          </button>
        )} */}
      </>
    );
  };
  export default Modal;