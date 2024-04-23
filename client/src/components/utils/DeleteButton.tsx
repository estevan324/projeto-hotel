/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { confirmAlert } from "react-confirm-alert";
import { FaTrash } from "react-icons/fa";

interface DeleteConfirmAlertProps {
  onClose: () => void;
  handleDelete: () => void;
}

function DeleteConfirmAlert({
  onClose,
  handleDelete,
}: DeleteConfirmAlertProps) {
  return (
    <div className="custom-confirm-box modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirmação</h5>
        </div>
        <div className="modal-body">
          <p>Você tem certeza que gostaria de excluir este item?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onClose();
              handleDelete();
            }}
          >
            Sim
          </button>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={onClose}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}

interface DeleteButtonProps {
  handleDelete: () => void;
}

function DeleteButton({ handleDelete }: DeleteButtonProps) {
  const handleClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <DeleteConfirmAlert onClose={onClose} handleDelete={handleDelete} />
      ),
    });
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleClick}>
      <FaTrash />
    </button>
  );
}

export default DeleteButton;
