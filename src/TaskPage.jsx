import TaskModalForm from "./TaskModalForm";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function TaskPage({ clients }) {
  const clientName = useParams();
  const [modalStatus, setModalStatus] = useState(false);

  function handleModalStatus() {
    setModalStatus(modalStatus => !modalStatus);
  }

  return (
    <div className="flex flex-col pl-64">
      <main className="flex-1">
        <div className="flex border-b border-gray-200 px-8 py-4 items-center">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-medium leading-6 text-gray-900">{clientName.id !== undefined ? `${clientName.id.replace("-", " ")}` : "Home"}</h1>
          </div>
          <div className="flex">
            <Link to={`/dashboard/${clientName.id === undefined ? "" : clientName.id + "/"}new-task`}>
              <button
                type="button"
                className="order-0 inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onClick={handleModalStatus}
              >
                New Task
                {modalStatus ? <TaskModalForm clients={clients} clientName={clientName.id} /> : ""}
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TaskPage;