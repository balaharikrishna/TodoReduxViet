import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CompletedTasks.scss";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { undoCompleted_Task } from "../../Redux/actions";
import ICommonTypes from "../CommonTypes/CommonTypes";

interface ICompletedTasksObj {
  listId : number,
  showSubmittedTasks : boolean,
  changeShowSubmittedTasks :() => void
}
const CompletedTasks = ({listId ,showSubmittedTasks,changeShowSubmittedTasks}:ICompletedTasksObj) =>{
  const [finishedTasks, setFinishedTasks] = useState<[]>([]);
  const [listName,setListName] = useState<string>();
  const dispatch = useDispatch();
  const localData:any = useSelector<ICommonTypes>(state => state.localData);

  if (listId == 0 || listId == undefined) {
    listId = localData?.length>0 ? localData[0].id : 0;
  }
  let listIndex = localData ? localData.findIndex((x: { id: number; }) => x.id == listId) : 0;
  
  useEffect(() => {
    if(localData && localData !== null ){
      setFinishedTasks(
        localData[listIndex]?.tasks?.filter((i: { isChecked: boolean; }) => i.isChecked === true)
      );
      setListName(localData.find((x: { id: number; }) => x.id == listId).listName);
    }
  }, [listId,localData]);

  const undoTask = (taskId: number) => {
   dispatch(undoCompleted_Task({listId,taskId}))
    setFinishedTasks(
      localData[listIndex]?.tasks?.filter((i: { isChecked: boolean; }) => i.isChecked === true)
    );
    changeShowSubmittedTasks();
    notify();
  };

  const notify = () => {
    toast("Task Undo Successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
  };

  type TaskColorsTypes = { [key: string]: string };

  const taskColors : TaskColorsTypes = {
    P1: "lightpink",
    P2: "#F7DC6F",
    P3: "#FFFACD",
  };

  function tasksCompare(a: { priority: string; }, b: { priority: string; }) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }

  return (
    <div className="container mainDiv">
      <Modal
        show={showSubmittedTasks}
        onHide={changeShowSubmittedTasks}
        className="modalSubmittedTasks"
      >
        <Modal.Header closeButton className="completedTasksHeader">
          <Modal.Title className="completedTasksHeading">
            {finishedTasks?.length > 0 ? (
              <p className="submitTasksMainHeading">
                <div className="row">
                  <div className="col-6">
                    <span className="submittedTaskHeading">Tasks</span>
                  </div>
                  <div className="col-3">
                    <span className="submittedPriorityHeading">Priority</span>
                  </div>
                  <div className="col-3">
                    <span className="submittedTasksActions">Actions</span>
                  </div>
                </div>
              </p>
            ) : (
              <p className="submitTasksHeading">Submitted Tasks</p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="submittedTasksBody" id="submittedTasksBody">
          <div>
            {listId > 0 &&
            localData &&
            localData[localData.findIndex((x: { id: number; }) => x.id == listId)]?.tasks
              .length > 0 &&
            finishedTasks?.length != 0 ? (
              <div>
                {finishedTasks?.length > 0 &&
                  finishedTasks?.sort(tasksCompare).map((x:any) => {
                    return (
                      <div
                        className="card taskCardSubmitted"
                        style={{ backgroundColor: taskColors[x.priority] }}
                      >
                        <div className="card-body ">
                          <div className="row">
                            <div className="col-6 col-sm-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                              <p className="card-title">{x.taskName}</p>
                            </div>
                            <div className="col-3 col-sm-4 col-lg-4 col-md-4 col-xl-4 col-xxl-4">
                              <p className="card-title">{x.priority}</p>
                            </div>
                            <div className="col-3 col-sm-2 col-lg-2 col-md-2 col-xl-2 col-xxl-2">
                              <button
                                type="button"
                                className="btn  completedTasksButton"
                                onClick={() => undoTask(x.id)}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Undo"
                              >
                                <i
                                  className="fa fa-undo"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="row">
                <div className="alert noTasksSubmitted" role="alert">
                  {listName
                    ? `No Completed Tasks Available for ${listName}...`
                    : "No Tasks Available.."}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footerCompletedTasks">
          <Button variant="secondary" onClick={changeShowSubmittedTasks}>
            <i className="fa fa-times" aria-hidden="true">
              &nbsp;Close
            </i>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompletedTasks