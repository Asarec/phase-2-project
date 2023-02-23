import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ModalForm from "./ModalForm";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from "@heroicons/react/20/solid";

function Sidebar({ clients, handleIsLoggedIn, addClient }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearch(event.target.value);
  }

  function handleModal() {
    setShowModal(showModal => !showModal);
  }

  return (
    <div className="fixed inset-y-0 flex w-64 flex-col border-r border-gray-200 bg-gray-100 pt-5 pb-4">
      <div className="flex flex-shrink-0 items-center px-6">
        <img
          className="h-8 w-auto"
          src="https://via.placeholder.com/160"
          alt="Placeholder Logo"
        />
      </div>
      <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
        <Menu as="div" className="relative inline-block px-3 text-left">
          <div>
            <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              <span className="flex w-full items-center justify-between">
                <span className="flex min-w-0 items-center justify-between space-x-3">
                  <img
                    className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                    src="https://images.unsplash.com/photo-1579264688258-c0ebf8c7942a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&fit=facearea&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-gray-900">Alfredo Garcia</span>
                    <span className="truncate text-sm text-gray-500">@agarcia</span>
                  </span>
                </span>
                <ChevronUpDownIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={"/"}
                      onClick={_ => handleIsLoggedIn(false)}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Logout
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="mt-5 px-3 flex items-center">
          <label className="sr-only">
            Search
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              aria-hidden="true"
            >
              <MagnifyingGlassIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search"
              value={search}
              onChange={event => handleSearch(event)}
            />
          </div>
          <button onClick={handleModal}>
            <PlusIcon className="h-6 w-6 text-gray-700 ml-1" />
            {showModal ? <ModalForm handleModal={handleModal} addClient={addClient} /> : ""}
          </button>
        </div>
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {clients.filter(client => client.name.toLowerCase().includes(search.toLowerCase())).map(client => (
              <Link
                key={client.name}
                to={`/dashboard/${client.name.replace(/\s+/g, '-')}`}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <ChevronRightIcon
                  className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {client.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;