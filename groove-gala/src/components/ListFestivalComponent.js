import "../styles/ListItemStyles.css";
import edit from "../data/edit_black.svg";
import del from "../data/delete_black.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./dialogs/DeleteDialog";

function ListComponent({ cluster, data, index, onDelete }) {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    const data2 = { status: data, cluster: cluster };
    navigate("/newFestPage", { state: data2 });
  };
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete(index);
    setShowDeleteDialog(false);
  };

  const handleCloseDialog = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div className='item-list-dd'>
      {showDeleteDialog && (
        <>
          <div className='dd-backdrop' onClick={handleCloseDialog}></div>
          <DeleteDialog
            text={data.naziv}
            type={"FESTIVAL"}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
      <div className='icons-dd'>
        <img
          src={edit}
          className='icon-dd'
          onClick={handleBtnClick}
          alt='Edit'
        />
        <img
          src={del}
          className='icon-dd'
          onClick={handleDeleteClick}
          alt='Delete'
        />
      </div>
      <div className='fest-heading-dd'>
        <p className='heading-dd'>{data.naziv}</p>
      </div>
    </div>
  );
}

export default ListComponent;
