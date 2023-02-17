import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./DeletePopup.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { delete_List, delete_Task,empty_Store } from "../../Redux/actions";
import ICommonTypes from "../CommonTypes/CommonTypes";

interface IDeletePopupObj {
  showDelete: boolean;
  changeShowDelete: (id: number) => void;
  deleteListId: number;
  deleteTaskId: number;
  listId: number;
  getListId: (id: number) => void;
  getUpdatedActiveListId: (id: number) => void;
  getDeleteTaskId: (id: number) => void;
}
const DeletePopup = ({showDelete,changeShowDelete,deleteListId,deleteTaskId,listId,getListId,getUpdatedActiveListId,getDeleteTaskId} :IDeletePopupObj ) =>{
  const localData:any = useSelector<ICommonTypes>((state) => state.localData);
  const dispatch = useDispatch();

  if(listId==0){
    listId = localData && localData.length >0 ? localData[0].id : 0;
  }

  const deleteList = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(localData.length==1){
      dispatch(empty_Store());
      getListId(0);
      getUpdatedActiveListId(Math.random())
      localStorage.clear()
    }else{
      dispatch(delete_List({deleteListId}))
      getListId(localData && localData.length >0 ? localData[0].id : 0);
      getUpdatedActiveListId(Math.random());
    }
    notify("List Deleted Succesfully");
    changeShowDelete(0);
  };

  const deleteTask = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    if (listId == 0) {
      listId = localData[0].id;
    }
    dispatch(delete_Task({listId:listId,deleteTaskId:deleteTaskId}))
    notify("Task Deleted Succesfully");
    getDeleteTaskId(0);
    changeShowDelete(0);
  }

  const clearDeleteTaskId=()=>{
    getDeleteTaskId(0);
    changeShowDelete(0);
  }
 
  const notify = (note:string) => {
    toast(note, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
  }

  return(<div className="container">
  <Modal show={showDelete} onHide={clearDeleteTaskId} className="deleteModel">
    <form >
      <Modal.Body className="modalBody">
        <div className="row">
          <div className="col-12 ">
           <label className="namelabel">Delete {deleteListId > 0 && deleteTaskId < 0 ? localData.find((x: { id: number; }) => x.id == deleteListId).listName : "" } Permanently?</label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={clearDeleteTaskId} >
        <i className="fa fa-times" aria-hidden="true"></i> Close
        </Button>
        <Button variant="danger" type="submit" onClick={ listId > 0  && deleteTaskId > 0 ? deleteTask : deleteList } >
        <i className="fa fa-trash" aria-hidden="true"></i> Delete
        </Button>
      </Modal.Footer>
    </form>
  </Modal>
</div>);
}
export default DeletePopup