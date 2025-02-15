let counter = 1;

function Delete(index) {
  const el = document.querySelector(`#${index}`);
  el.parentNode.removeChild(el);
}

function addTodo() {
  const inputEl = document.querySelector("input");
  const task = inputEl.value.trim();

  if (task === "") {
    alert("Please enter a task!");
    return;
  }
  const taskId = `todo-${counter}`; // Create a unique ID for the task
  const el = document.createElement("div");
  el.setAttribute("id", taskId);

  // Use template literals to create the task with the delete button
  el.innerHTML = `
    <span>${task}</span>
    <button onclick="Delete('${taskId}')">Delete</button>
  `;

  document.body.appendChild(el);
  inputEl.value = ""; // Clear the input field
  counter += 1; // Increment the counter
}