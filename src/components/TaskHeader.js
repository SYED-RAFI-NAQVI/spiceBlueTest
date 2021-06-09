import './taskHeader.css'
import {useDispatch}from 'react-redux'

import {updateTaskState} from '../features/DataSlice/DataSclice'

const TaskHeader = () =>{
    const dispatch  = useDispatch()

    const handleTaskBody = () =>{
        dispatch(updateTaskState({taskIsHidden : false}))
    }
    return (
        <div className="task_header">
            <h1 style={{padding: "10px"}}>Tasks 0</h1>
            <div>
                <button onClick={handleTaskBody}> + </button>
            </div>
        </div>
    )
}

export default TaskHeader