import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskIsHidden: true,
  editTaskData: null,
  taskIds: [],
};

const DataSclice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateTaskState: (state, action) => {
      state.taskIsHidden = action.payload.taskIsHidden;
    },
    editTask: (state, action) => {
      state.editTaskData = action.payload.editTaskData;
    },
    setTaskId: (state, action) => {
      state.taskIds.push(action.payload.taskIds);
    },
  },
});

export const getTaskState = (state) => state.global;
export const { updateTaskState, editTask, setTaskId } = DataSclice.actions;
export default DataSclice.reducer;
