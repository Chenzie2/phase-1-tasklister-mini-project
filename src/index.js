document.addEventListener("DOMContentLoaded", () => {
  // Select form and tasks list
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const tasks = []; // Array to store task objects

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Select input fields and get values
    const taskInput = document.getElementById("new-task-description");
    const taskDescription = taskInput.value.trim();
    const priorityValue = document.getElementById("priority").value;
    const userValue = document.getElementById("user").value.trim();
    const durationValue = document.getElementById("duration").value.trim();

    if (taskDescription !== "") {
      tasks.push({ text: taskDescription, priority: priorityValue, user: userValue, duration: durationValue });

      // Sort tasks by priority
      tasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      // Render updated task list
      renderTasks();

      // Clear input fields
      form.reset();
    }
  });

  function renderTasks() {
    taskList.innerHTML = ""; // Clear existing tasks

    tasks.forEach(task => {
      const taskElement = document.createElement("li");
      taskElement.textContent = task.text; // Ensure only the task description is displayed for tests

      // Set color based on priority
      taskElement.style.color = task.priority === "high" ? "red" :
                                task.priority === "medium" ? "orange" : "green";

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";
      deleteButton.className = "delete-btn";
      deleteButton.addEventListener("click", () => {
        tasks.splice(tasks.indexOf(task), 1);
        renderTasks();
      });

      // Add edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => enableEditing(taskElement, task));

      // Append buttons and add task to list
      taskElement.appendChild(deleteButton);
      taskElement.appendChild(editButton);
      taskList.appendChild(taskElement);
    });
  }

  function enableEditing(taskElement, task) {
    // Create input fields for editing
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = task.text;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      task.text = editInput.value;
      renderTasks();
    });

    // Clear task element and add new inputs
    taskElement.innerHTML = "";
    taskElement.appendChild(editInput);
    taskElement.appendChild(saveButton);
  }
});
