                                          ///List///
export const add_List = (data: { listName: string; id: number; tasks?: object[]; }) => {
  return {
    type: "ADD_LIST",
    payload: {
      id: data.id,
      listName: data.listName,
      tasks: [],
    },
  };
};

export const update_List = (data: { editListId: number; listName: string; }) => {
  return {
    type: "UPDATE_LIST",
    payload: {
      editListId: data.editListId,
      updatedListName: data.listName,
    },
  };
};

export const delete_List = (data: {deleteListId : number ;}) => {
  return {
    type: "DELETE_LIST",
    payload: data,
  };
};

                                           ///Task///
export const add_Task = (data: { listId: number; taskName: string; priority: string; isChecked: boolean; }) => {
  return {
    type: "ADD_TASK",
    payload: {
      listId: data.listId,
      taskName: data.taskName,
      priority: data.priority,
      isChecked: data.isChecked,
    },
  };
};

export const update_Task = (data: { listId: number; editTaskId: number; taskName: string; priority: string; }) => {
  return {
    type: "UPDATE_TASK",
    payload: {
      updateListId: data.listId,
      editTaskId: data.editTaskId,
      updateTaskName: data.taskName,
      updatePriority: data.priority,
    },
  };
};

export const delete_Task = (data: { listId: number; deleteTaskId: number; }) => {
  return {
    type: "DELETE_TASK",
    payload: {
      deletelistId: data.listId,
      deleteTaskId: data.deleteTaskId,
    },
  };
};

export const completed_Task = (data: { taskId: number; }) => {
  return {
    type: "COMPLETED_TASK",
    payload: data,
  };
};

export const undoCompleted_Task = (data: { listId: number; taskId: number; }) => {
  return {
    type: "UNDO_COMPLETED_TASK",
    payload: {
      undoCompletedTaskListId: data.listId,
      undoCompletedTaskId: data.taskId,
    },
  };
};

export const empty_Store = () => {
  return {
    type: "EMPTY_STORE",
  };
};
