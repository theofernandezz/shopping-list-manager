const saveToLocalStorage = (items) => {
  localStorage.setItem("shoppingList", JSON.stringify(items));
};

const getFromLocalStorage = () => {
  const items = localStorage.getItem("shoppingList");
  return items ? JSON.parse(items) : [];
};

// Load items from localStorage when page loads
const loadItems = () => {
  const items = getFromLocalStorage();
  items.forEach((itemText) => {
    createListItem(itemText);
  });
  itemCounter.textContent = itemsList.children.length;
};

// Create a separate function to create list items
const createListItem = (text) => {
  const item = document.createElement("li");
  const itemText = document.createElement("span");
  const buttonsContainer = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");

  itemText.textContent = text;
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";
  editBtn.innerHTML = '<i class="bx bx-edit"></i>';
  editBtn.className = "edit-btn";
  buttonsContainer.className = "buttons-container";

  item.appendChild(itemText);
  buttonsContainer.appendChild(editBtn);
  buttonsContainer.appendChild(deleteBtn);
  item.appendChild(buttonsContainer);
  itemsList.appendChild(item);

  deleteBtn.addEventListener("click", () => {
    item.remove();
    itemCounter.textContent = itemsList.children.length;
    updateLocalStorage();
  });

  editBtn.addEventListener("click", () => {
    const newItem = prompt("Edit Item", itemText.textContent);
    if (newItem !== null) {
      itemText.textContent = newItem;
      updateLocalStorage();
    }
  });
};

// Function to update localStorage with current items
const updateLocalStorage = () => {
  const items = Array.from(itemsList.querySelectorAll("li span")).map(
    (span) => span.textContent
  );
  saveToLocalStorage(items);
};

// selecting elements
const itemInput = document.querySelector("#itemInput");
const addBtn = document.querySelector("#addItemBtn");
const itemsList = document.querySelector("#itemList");
const clearBtn = document.querySelector("#clearAll");
const itemCounter = document.querySelector("#itemCounter");

// Move clear button event listener outside
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    itemsList.innerHTML = "";
    itemCounter.textContent = "0";
    localStorage.removeItem("shoppingList");
  });
}

// Modify existing click event listener
if (itemInput && addBtn && itemsList && itemCounter) {
  // Load items when page loads
  loadItems();

  addBtn.addEventListener("click", () => {
    if (itemInput.value === "") {
      alert("Please enter a valid Item");
      return;
    }

    createListItem(itemInput.value);
    updateLocalStorage();

    itemInput.value = "";
    itemInput.focus();
    itemCounter.textContent = itemsList.children.length;
  });
}
