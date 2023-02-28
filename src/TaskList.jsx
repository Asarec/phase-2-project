function TaskList({ clients, handleTaskStatus }) {
  function onComplete(clientId, taskId) {
    const theClient = clients.filter(client => client.id === clientId);
    const theTasks = theClient[0].tasks.filter(task => task.id === taskId);
    const updatedTask = {
      "title": theTasks[0].title,
      "completed": !theTasks[0].completed,
      "id": theTasks[0].id
    }
    const updatedList = [
      ...theClient[0].tasks.filter(task => task.id !== taskId),
      updatedTask
    ]

    fetch(`http://localhost:3000/clients/${clientId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: theClient[0].name,
        tasks: [
          ...updatedList
        ],
        id: clientId
      })
    })
    .then(response => response.json())
    .then(data => handleTaskStatus(data));
  }

  return (
    <div className="flex flex-col pl-64">
      <div className="inline-block min-w-full border-b border-gray-200 align-middle">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th
                className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              />
              <th
                className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                <span className="pl-2">Task Name</span>
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Client
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {clients.map(client => (
              client.tasks.map(task => (
                <tr key={task.id}>
                  <td className="w-12 pl-6 py-3 text-left">
                    <input
                      className="rounded-sm border-gray-400 hover:border-gray-600"
                      type="checkbox"
                      onChange={_ => onComplete(client.id, task.id)}
                      disabled={task.completed ? true : false}
                      defaultChecked={task.completed}
                    />
                  </td>
                  <td className="w-1/2 max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 pl-2">
                      <span className={task.completed ? "line-through text-gray-500" : ""}>
                        {task.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="flex-shrink-0 text-xs font-medium leading-5">
                        {client.name}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TaskList;