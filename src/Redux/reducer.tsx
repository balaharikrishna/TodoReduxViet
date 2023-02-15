let retrievedData = localStorage.getItem("tododata");
let parsedData;
if (retrievedData !== null) {
  parsedData = JSON.parse(retrievedData);
}
const initialData = {
  localData: parsedData
};

const reducer = (state = initialData, action:any) => {

  switch (action.type) {
    case "ADD_LIST":
      const { id, listName, tasks } = action.payload;
      if (state.localData?.length >= 0) {
        let addListResult= {
          ...state,
          localData: [
            ...state.localData,
            {
              listName: listName,
              id: id + 1,
              tasks: tasks,
            },
          ],
        }
        localStorage.setItem("tododata", JSON.stringify(addListResult.localData));
        return addListResult;

      } else {
        let addListResult =  {
          localData: [
            {
              listName: listName,
              id: id + 1,
              tasks: tasks,
            },
          ],
        };
        localStorage.setItem("tododata", JSON.stringify(addListResult.localData));
        return addListResult;
      }

    case "UPDATE_LIST":
      const { editListId, updatedListName } = action.payload;
      const index = state.localData.findIndex((x: { id: number; }) => x.id == editListId);
      const newArray = [...state.localData];
      newArray[index].listName = updatedListName;
      let updateListResult = {
        ...state,
        localData: newArray,
      };
      localStorage.setItem("tododata", JSON.stringify(updateListResult.localData));
      return updateListResult;

    case "DELETE_LIST":
      const filteredList = state.localData.filter(
        (x: { id: number; }) => x.id !== action.payload.deleteListId
      );
      let deleteListResult = {
        ...state,
        localData: filteredList,
      };
      localStorage.setItem("tododata", JSON.stringify(deleteListResult.localData));
      return deleteListResult;
    case "ADD_TASK":
      const { listId, taskName, priority, isChecked } = action.payload;
      var listDataIndex = state.localData.findIndex((x: { id: number; }) => x.id == listId);
      const taskId = state.localData[listDataIndex].tasks[
        state.localData[listDataIndex].tasks.length - 1
      ]
        ? state.localData[listDataIndex].tasks[
            state.localData[listDataIndex].tasks.length - 1
          ].id + 1
        : 1;
      const newListArray = [...state.localData];
      const newTask = [
        ...state.localData[listDataIndex].tasks,
        {
          id: taskId,
          taskName: taskName,
          priority: priority ? priority : "P3",
          isChecked: isChecked,
        },
      ];
      newListArray[listDataIndex].tasks = newTask;
      let addTaskResult = {
        ...state,
        localData: newListArray,
      };
      localStorage.setItem("tododata", JSON.stringify(addTaskResult.localData));
      return addTaskResult;

    case "UPDATE_TASK":
      const { updateListId, editTaskId, updateTaskName, updatePriority } =
        action.payload;
      let UpdateListDataIndex = state.localData.findIndex(
        (x: { id: number; }) => x.id == updateListId
      );
      let taskIndex = state.localData[UpdateListDataIndex].tasks.findIndex(
        (x: { id: number; }) => x.id == editTaskId
      );
      const updateListArray = [...state.localData];
      updateListArray[UpdateListDataIndex].tasks[taskIndex].taskName =
        updateTaskName;
      updateListArray[UpdateListDataIndex].tasks[taskIndex].priority =
        updatePriority;
      let updateTaskResult = {
        ...state,
        localData: updateListArray,
      };
      localStorage.setItem("tododata", JSON.stringify(updateTaskResult.localData));
      return updateTaskResult;

    case "DELETE_TASK":
      const { deletelistId, deleteTaskId } = action.payload;
      let listIndex = state.localData.findIndex((x: { id: number; }) => x.id == deletelistId);
      const deleteListArray = [...state.localData];
      deleteListArray[listIndex].tasks = deleteListArray[
        listIndex
      ].tasks.filter((i: { id: number; }) => i.id !== deleteTaskId);
      let deleteTaskResult = {
        ...state,
        localData: deleteListArray,
      };
      localStorage.setItem("tododata", JSON.stringify(deleteTaskResult.localData));
      return deleteTaskResult;

    case "COMPLETED_TASK":
      const completedListArray = [...state.localData];
      completedListArray.forEach((list) => {
        list.tasks.forEach((task: { id: number; isChecked: boolean; }) => {
          if (task.id == action.payload.taskId) {
            task.isChecked = true;
          }
        });
      });
      console.log(action.payload, completedListArray);
      let completedTaskResult = {
        ...state,
        localData: completedListArray,
      };
      localStorage.setItem("tododata", JSON.stringify(completedTaskResult.localData));
      return completedTaskResult;

    case "UNDO_COMPLETED_TASK":
      const { undoCompletedTaskListId, undoCompletedTaskId } = action.payload;
      const completedlistIndex = state.localData.findIndex(
        (x: { id: number; }) => x.id == undoCompletedTaskListId
      );
      const CompletedtaskIndex = state.localData[
        completedlistIndex
      ].tasks.findIndex((x: { id: number; }) => x.id == undoCompletedTaskId);
      const undoCompletedListArray = [...state.localData];
      undoCompletedListArray[completedlistIndex].tasks[
        CompletedtaskIndex
      ].isChecked = false;
      let undoCompletedTaskResult = {
        ...state,
        localData: undoCompletedListArray,
      };
      localStorage.setItem("tododata", JSON.stringify(undoCompletedTaskResult.localData));
      return undoCompletedTaskResult;
      
    case "EMPTY_STORE":
      let emptyArray = null;
      console.log("hitted empry store reducer");
      let emptyStoreResult = {
        ...state,
        localData: emptyArray,
      };
      localStorage.setItem("tododata", JSON.stringify(emptyStoreResult.localData));
      return emptyStoreResult;

    default:
      return state;
  }
};

export default reducer;
