import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  updateTaskState,
  editTask,
  getTaskState,
} from "../features/DataSlice/DataSclice";

const Tasks = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(getTaskState);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjMxNTk1NzEsIm5iZiI6MTYyMzE1OTU3MSwianRpIjoiYjFjYzIxMTItNTc2My00MDM5LTk5NTYtOTAxZThiZDg4YzFlIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.6VhLutgONj-7U33y6nHGHxnRTlvAIxMl401KBxueqpc";
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) =>
        setData(
          data.data.results
            .filter((item) => taskState.taskIds.includes(item.id))
            .reverse()
        )
      )
      .catch((e) => console.log(e));
  }, [taskState.taskIsHidden]);

  console.log(data);
  const handleEdit = (item) => {
    dispatch(updateTaskState({ taskIsHidden: false }));
    dispatch(editTask({ editTaskData: item }));
  };

  const handleDone = (item) => {
    let item1 = {
      is_completed: 1,
      assigned_user: item.assigned_user,
      task_date: item.task_date,
      task_time: item.task_time,
      task_msg: item.task_msg,
      time_zone: item.time_zone,
    };
    console.log({ ...item });
    axios
      .put(
        `https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${item.id}`,
        item1,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {data &&
        data.map((item) => (
          <div>
            <p>{item.task_msg}</p>
            <p>{item.task_date}</p>
            <div>
              <button
                style={{
                  height: "20px",
                  width: "40px",
                  backgroundColor: "black",
                  color: "white",
                }}
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                style={{
                  height: "20px",
                  width: "50px",
                  backgroundColor: "black",
                  color: "white",
                }}
                onClick={() => handleDone(item)}
              >
                Done
              </button>
            </div>

            <br />
            <br />
            <br />
          </div>
        ))}
    </div>
  );
};

export default Tasks;
