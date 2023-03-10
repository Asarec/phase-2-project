import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function ModalForm({ handleModal, addClient }) {
  const [open, setOpen] = useState(true);
  const [client, setClient] = useState("");
  const [submitMessage, setSubmitMessage] = useState(false);

  function handleModalForm() {
    handleModal(true);
    setOpen(open => !open);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newClient = {
      name: event.target[0].value,
      tasks: []
    };

    if (event.target[0].value) {
      fetch("http://localhost:3000/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient)
      })
      .then(response => response.json())
      .then(data => addClient(data));
    }

    handleModal(true);
    setOpen(false);
  }

  function handleMessage(event) {
    event.preventDefault();
    setClient(event.target.value);

    if (event.target.value) {
      setSubmitMessage(true);
    } else {
      setSubmitMessage(false);
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleModalForm}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <PlusCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Add New Client
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-2">
                  <form onSubmit={event => handleSubmit(event)}>
                    <input
                      type="text"
                      className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Client's Name"
                      value={client}
                      onChange={event => handleMessage(event)}
                    />
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    >
                      {submitMessage ? "Add Client" : "Go Back to Dashboard"}
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalForm;