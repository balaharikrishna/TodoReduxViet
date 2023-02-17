import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AddTask.scss";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch ,useSelector} from "react-redux";
import { add_Task } from "../../Redux/actions";
import { update_Task } from "../../Redux/actions";
import ICommonTypes from "../CommonTypes/CommonTypes";

interface IAddTaskObj {
  showAddTask : boolean, 
  changeShowStateTask :()=> void,
  editTaskId : number,
  listId : number,
  getEditTaskId :(id:number) => void
}

const AddTask = ({
  showAddTask,
  changeShowStateTask,
  editTaskId,
  listId,
  getEditTaskId,
}: IAddTaskObj) => {
  const localData: any = useSelector<ICommonTypes>((state) => state.localData);
  const [taskName, setTaskName] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (listId == 0 || listId == undefined || listId == null) {
      listId = localData ? localData[0].id : "";
      let listDataIndex = localData
        ? localData.findIndex((x: { id: number }) => x.id == listId)
        : "";
      let task = localData
        ? localData[listDataIndex].tasks.find(
            (x: { id: number }) => x.id == editTaskId
          )
        : "";
      setTaskName(task ? task.taskName : "");
      setPriority(task ? task.priority : "");
    } else if (listId && editTaskId == 0) {
      setTaskName("");
      setPriority("");
    } else if (listId && editTaskId !== 0) {
      let listDataIndex = localData.findIndex(
        (x: { id: number }) => x.id == listId
      );
      let task = localData[listDataIndex].tasks.find(
        (x: { id: number }) => x.id == editTaskId
      );
      setTaskName(task ? task.taskName : "");
      setPriority(task ? task.priority : "");
    }
  }, [listId, editTaskId]);

  const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setTaskName(value);
  };

  const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value;
    setPriority(value);
  };

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (listId == 0 || listId == undefined) {
      listId = localData[0].id;
    }
    dispatch(
      add_Task({
        listId: listId,
        taskName: taskName,
        priority: priority ? priority : "P3",
        isChecked: false,
      })
    );
    setTaskName("");
    setPriority("P3");
    notify("Task Added Successfully");
  };

  const updateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (listId == 0 || listId == undefined || listId == null) {
      listId = localData[0].id;
    }
    dispatch(
      update_Task({
        listId: listId,
        editTaskId: editTaskId,
        taskName: taskName,
        priority: priority,
      })
    );
    notify("Task Updated Successfully");
    getEditTaskId(0);
  };

  const notify = (note: string) => {
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
  };

  return (
    <div className="container">
      <Modal show={showAddTask} onHide={changeShowStateTask}>
        <form onSubmit={editTaskId > 0 ? updateTask : addTask}>
          <Modal.Header closeButton className="addTaskHeader">
            <Modal.Title className="addTaskHeading">
              {editTaskId > 0 ? "Update Task" : "Add Task"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-3 ">
                <label className="nameLabel">Task Name:</label>
              </div>
              <div className="col-7 ">
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={taskName}
                  onChange={handleTask}
                  className="taskNameInputBox"
                  placeholder="Please Enter Task Name"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="row priorityField">
              <div className="col-3 ">
                <label className="priorityLabel">Priority:</label>
              </div>
              <div className="col-7 ">
                <select
                  name="priority"
                  value={priority}
                  onChange={handlePriority}
                >
                  <option value="P3">P3</option>
                  <option value="P2">P2</option>
                  <option value="P1">P1</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer-addTask">
            <Button variant="secondary" onClick={changeShowStateTask}>
              <i className="fa fa-times" aria-hidden="true">
                &nbsp;Close
              </i>
            </Button>
            <Button
              variant="success"
              type="submit"
              onClick={taskName.length > 0 ? changeShowStateTask : () => {}}
            >
              {editTaskId > 0 ? (
                <i className="fa fa-pencil" aria-hidden="true">
                  &nbsp;Update
                </i>
              ) : (
                <i className="fa fa-plus" aria-hidden="true">
                  &nbsp;Add
                </i>
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
