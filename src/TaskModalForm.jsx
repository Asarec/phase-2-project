import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

function TaskModalForm({ clients, clientName }) {
  const [open, setOpen] = useState(true);
  const [currentClient, setCurrentClient] = useState(clients.filter(client => client.name === clientName.replace("-", " ")));

  function handleNewTask(event) {
    event.preventDefault();

    setOpen(open => !open);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}-${day}-${year}`;

    const newTaskData = {
      "title": event.target[0].value,
      "description": event.target[1].value,
      "createdOn": currentDate
    }

    fetch(`http://localhost:3000/clients/${currentClient[0].id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: currentClient[0].name,
        tasks: [
          ...currentClient[0].tasks,
          newTaskData
        ],
        id: currentClient[0].id
      })
    })
    .then(response => response.json())
    .then(data => setCurrentClient(data));
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-5/12 relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all">
                <form onSubmit={event => handleNewTask(event)}>
                  <div className="space-y-6 bg-white px-4 py-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Task Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Task Description
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <textarea
                          rows={4}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus: ring-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Create Task
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default TaskModalForm;