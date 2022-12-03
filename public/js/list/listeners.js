socket.on("add-item", function(item) {
    let categoryContainer = document.getElementById(item.category);

    let newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.id = `${item.category}-${item.item}`;

    let newItemDesc = document.createElement('div');
    newItemDesc.classList.add('item-desc');
    newItemDesc.innerHTML = item.item;
    newItem.appendChild(newItemDesc);

    let newItemDown = document.createElement('IMG');
    newItemDown.src = "/img/icons/decrement.png";
    newItemDown.classList.add('item-qnt-down');
    newItemDown.setAttribute('onclick', `decrement('${item.category}-${item.item}')`);
    newItem.appendChild(newItemDown);

    let newItemQnt = document.createElement('div');
    newItemQnt.classList.add('item-qnt');
    newItemQnt.innerHTML = item.qnt;
    newItem.appendChild(newItemQnt);

    let newItemUp = document.createElement('IMG');
    newItemUp.src = "/img/icons/increment.png";
    newItemUp.classList.add('item-qnt-up');
    newItemUp.setAttribute('onclick', `increment('${item.category}-${item.item}')`);
    newItem.appendChild(newItemUp);

    let newItemDelete = document.createElement('IMG');
    newItemDelete.src = "/img/icons/delete.png";
    newItemDelete.classList.add('item-delete');
    newItemDelete.setAttribute('onclick', `crossOffItem('${item.category}-${item.item}')`);
    newItem.appendChild(newItemDelete);

    categoryContainer.appendChild(newItem);
  });

  socket.on("remove-item", function(item) {
    let itemToRemove = document.getElementById(item);
    itemToRemove.parentElement.removeChild(itemToRemove);
  });

  socket.on("cross-off-item", function(item) {
    let itemToRemove = document.getElementById(`${item.category}-${item.description}`);
    itemToRemove.parentElement.removeChild(itemToRemove);

    if(null === document.getElementById(`${item.category}-${item.description}-${item.quantity}`)) {
      let crossedOffItem = document.createElement('div');
      crossedOffItem.id = `${item.category}-${item.description}-${item.quantity}`;
      crossedOffItem.classList.add('crossed-off-item');

      let itemDescAndQnt = document.createElement('div');
      itemDescAndQnt.classList.add('crossed-off-text');
      itemDescAndQnt.innerHTML = `${item.quantity} - ${item.description}`;
      itemDescAndQnt.setAttribute('onclick', `addBack('${item.category}-${item.description}-${item.quantity}')`);
      crossedOffItem.appendChild(itemDescAndQnt);

      let deleteItem = document.createElement('IMG');
      deleteItem.src = "/img/icons/permDelete.png";
      deleteItem.classList.add("deleteItem");
      deleteItem.setAttribute('onclick', `deleteItem('${item.category}-${item.description}-${item.quantity}')`);
      crossedOffItem.appendChild(deleteItem);

      document.getElementById('crossed-off').appendChild(crossedOffItem);
    }

  });

  socket.on("un-cross-off", function(itemId) {
    let itemToRemove = document.getElementById(itemId);
    itemToRemove.parentElement.removeChild(itemToRemove);
  });

  socket.on("add-category", function(category) {
    document.getElementById("new-category").value = "";

        let newCategoryContainer = document.createElement('div');
        newCategoryContainer.classList.add('category');
        newCategoryContainer.id = category;

        let newCategoryHeader = document.createElement('div');
        newCategoryHeader.classList.add('category-header');

        let categoryDown = document.createElement('div');
        categoryDown.classList.add('move-down');
        categoryDown.innerHTML = '▼';
        categoryDown.setAttribute('onclick', `moveDown('${category}')`);
        
        let categoryUp = document.createElement('div');
        categoryUp.classList.add('move-up');
        categoryUp.innerHTML = '▲';
        categoryUp.setAttribute('onclick', `moveUp('${category}')`);

        let categoryTitle = document.createElement('p');
        categoryTitle.classList.add('category-title');
        categoryTitle.innerHTML = category;

        let deleteCategoryImg = document.createElement('IMG');
        deleteCategoryImg.classList.add('delete-category');
        deleteCategoryImg.src = '/img/delete.png';
        deleteCategoryImg.addEventListener('click', function() {
          deleteCategory(category)
        });

        let addItemSection = document.createElement('div');
        addItemSection.classList.add('new-item');

        let textInput = document.createElement("INPUT");
        textInput.setAttribute("type", "text");
        textInput.classList.add('new-item-text-input')
        textInput.id = `${category}-text`;
        textInput.setAttribute("placeholder", "Item description...")
        addItemSection.appendChild(textInput);

        let addBtn = document.createElement('IMG');
        addBtn.src = '/img/icons/add.png'
        addBtn.classList.add('new-item-btn');
        addBtn.addEventListener('click', function() {
          addItem(category);
        });
        addItemSection.appendChild(addBtn);

        newCategoryHeader.appendChild(categoryDown);
        newCategoryHeader.appendChild(categoryUp);
        newCategoryHeader.appendChild(categoryTitle);
        newCategoryHeader.appendChild(deleteCategoryImg);
        newCategoryContainer.appendChild(newCategoryHeader);
        newCategoryContainer.appendChild(addItemSection);
        document.getElementById('categories').appendChild(newCategoryContainer);
  });

  socket.on("remove-category", function(categoryName) {
    let category = document.getElementById(categoryName);
    category.parentElement.removeChild(category);
  });

  socket.on("move-down", category => {
    let element = document.getElementById(category);

    element.parentNode.insertBefore(element.nextElementSibling, element);
  });

  socket.on("move-up", category => {
    let element = document.getElementById(category);
      
    element.parentNode.insertBefore(element, element.previousElementSibling);
  });

  socket.on("delete-list", () => {
    window.location.replace('/');
  });

  socket.on('decrement', itemId => {
    let qntElement = document.getElementById(itemId).children[2];
    let qnt = qntElement.innerHTML;

    qnt--;
    qntElement.innerHTML = qnt.toString();
  });

  socket.on('increment', itemId => {
    let qntElement = document.getElementById(itemId).children[2];
    let qnt = qntElement.innerHTML;
    qnt++;
    qntElement.innerHTML = qnt.toString();
  });