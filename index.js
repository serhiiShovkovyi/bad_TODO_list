// ________STATE________

const state = {
  listOfItems: []
};

//_______Initialization________

const buttton = document.getElementById("add"),
  ul = document.querySelector(".list-of-elems"),
  clear = document.querySelector(".clear"),
  addButton = document.getElementById("add-item"),
  nameInp = document.querySelector(".name"),
  descInp = document.querySelector(".desc"),
  priorityInp = document.querySelector(".priority"),
  dateTime = document.querySelector(".date");

const editName = document.querySelector(".name-edit"),
  editDesc = document.querySelector(".desc-edit"),
  editPriority = document.querySelector(".priority-edit"),
  editDate = document.querySelector(".date-edit"),
  exitBtn = document.querySelector(".exit"),
  btnEdit = document.querySelector(".btn-edit");

const div = document.createElement("div");
div.className += "style-of-text obj bordered";
const br = document.createElement("br");
const hr = document.createElement("hr");
let li = document.createElement("li");
let listItem = document.createElement("div");
listItem.className += "d-block border absolute";

//______Rendering items after window loaded_______

const renderingAllListItem = res => {
  if (res.length > 0) {
    for (let i = 0; i < res.length; i++) {
      state.listOfItems.push(res[i]);
      ul.innerHTML += renderItem(res[i]);
    }
  }
};

window.onload = () => {
  const arr = localStorage.getItem("0");
  const res = JSON.parse(arr);
  renderingAllListItem(res);
};

const editItem = event => {
  const id = event.target.getAttribute("key");

  const item = JSON.parse(localStorage.getItem("0"))[id];
  const { name, description, priority, date, key } = item;
  editName.value = name;
  editDesc.value = description;
  editPriority.value = priority;
  editDate.value = date;
  const error = document.querySelector(".error");
  error.className += " d-none";
  error.classList.remove("d-block");
  const editDialog = document.querySelector(".edit-dialog");
  editDialog.className += " d-block";
  editDialog.classList.remove("d-none");
  btnEdit.setAttribute("key", key);
};

const deleteItem = event => {
  const id = event.target.getAttribute("key");
  console.log(id);

  if (state.listOfItems.length <= 1) {
    state.listOfItems.splice(0);
  } else {
    state.listOfItems.splice(id, 1);
  }

  for (let i = 0; i < state.listOfItems.length; i++) {
    state.listOfItems[i].key = i;
    ul.children[i].key = i;
  }
  state.listOfItems.sort((a, b) => a.key - b.key);
  localStorage.setItem("0", JSON.stringify(state.listOfItems));
  ul.removeChild(document.querySelector(`[key="${id}"]`));
};
const tickItem = event => {
  const id = event.target.getAttribute("key");
  !state.listOfItems[id].checked
    ? (state.listOfItems[id].checked = true)
    : (state.listOfItems[id].checked = false);

  localStorage.setItem("0", JSON.stringify(state.listOfItems));
  ul.removeChild(document.querySelector(`p[key="${id}"]`));
  ul.innerHTML += renderItem(state.listOfItems[id]);
};
// _________Helpful function which helps to have marked up element__________

const renderItem = ({ name, description, priority, date, key, checked }) => {
  const str = checked ? "done" : "";
  return `
       <p key="${key}" class="${str}">
       
          Name: <span class="name">${name}</span>
          <br/> Descriprion: <span class="desc">${description}</span>
          <br /> Priority: <span class="priority">${priority}</span> 
          <br /> Date: <span class="date">${date}</span>
          <img onclick={deleteItem(event)} key="${key}" id="del" src="delete.svg" width="25" height="25" alt="" />
          <img onclick={tickItem(event)} key="${key}" id="tick" src="tick.svg" width="25" height="25" alt="" />
          <img onclick={editItem(event)} key="${key}" id="edit" src="edit.svg" width="25" height="25" alt="" />
      </p>
`;
};

//______hide or show dialog function______

const hideDialog = event => {
  event.preventDefault();
  const dialogAdd = document.querySelector(".dialog-add");
  dialogAdd.className += " d-none";
  dialogAdd.classList.remove("d-block");
};
const exitEdit = event => {
  event.preventDefault();
  const editDialog = document.querySelector(".edit-dialog");
  editDialog.className += " d-none";
  editDialog.classList.remove("d-block");
};
//_____hide/show event listener____

clear.addEventListener("click", hideDialog);
exitBtn.addEventListener("click", exitEdit);
//___Event listener to show dialog___

buttton.addEventListener(
  "click",
  () => {
      const error = document.querySelector('.error-d')
      error.className += ' d-none';
      error.classList.remove('d-block');
    dialogAdd = document.querySelector(".dialog-add");
    dialogAdd.className += " d-block";
    dialogAdd.classList.remove("d-none");
  },
  false
);

const addItem = () => {
  let body = {
    name: "",
    description: "",
    priority: "",
    date: "",
    key: 0,
    checked: false
  };

  if (nameInp.value.match(/[A-Za-z0-9]/) &&
    nameInp.value.length > 0 &&
    dateTime.value.length > 0
  ) {
    console.log(nameInp.value.match(/[A-Za-z0-9]/));
    body.name = nameInp.value;
    body.description = descInp.value;
    body.priority = priorityInp.value;
    body.date = dateTime.value;
    let variable = [];
    if (localStorage.length !== 0) {
      variable = state.listOfItems;
    }
    body.key = variable.length;

    state.listOfItems.push(body);
    console.log(state.listOfItems);
    localStorage.setItem("0", JSON.stringify(state.listOfItems));
    ul.innerHTML += renderItem(body);
    const d = document.querySelector(".dialog-add");
    d.className += " d-none";
    d.classList.remove("d-block");
  } else {
    const err = document.querySelector(".error-d");
    err.className += " d-block";
    err.classList.remove("d-none");
  }
};

const confirmEdit = event => {
  const id = event.target.getAttribute("key");

  if (editName.value.match(/[A-Za-z0-9]/)) {
    state.listOfItems[id].name = editName.value;
    state.listOfItems[id].description = editDesc.value;
    state.listOfItems[id].priority = editPriority.value;
    state.listOfItems[id].date = editDate.value;
    localStorage.setItem("0", JSON.stringify(state.listOfItems));
    ul.removeChild(document.querySelector(`p[key="${id}"]`));
    ul.innerHTML += renderItem(state.listOfItems[id]);

    const d = document.querySelector(".edit-dialog");
    d.className += " d-none";
    d.classList.remove("d-block");
  } else {
    const err = document.querySelector(".error");
    err.className += " d-block";
    err.classList.remove("d-none");
  }
};



//____event listener to set an item______
addButton.addEventListener("click", addItem, false);
btnEdit.addEventListener("click", confirmEdit);
nameInp.addEventListener('keydown', () =>{
    const error = document.querySelector('.error-d')
    error.className += ' d-none';
    error.classList.remove('d-block');
}, false);
editName.addEventListener('keydown', () =>{
    const error = document.querySelector('.error');
    error.className += ' d-none';
    error.classList.remove('d-block');
}, false);

const sortBtn = document.querySelector('#sort');

const sortAllItems = () =>{
  state.listOfItems.sort((a,b)=>{
    return +a.priority - (+b.priority)
  });
  state.listOfItems.sort((a,b)=>{
    return Number(a.checked) - Number(b.checked)
  });
  console.log(state.listOfItems);
  for (let i = 0; i < state.listOfItems.length; i++) {
    state.listOfItems[i].key = i;
    ul.children[i].key = i;
  }
  console.log(state.listOfItems);
  localStorage.setItem("0", JSON.stringify(state.listOfItems));
  for (let i = 0; i < state.listOfItems.length; i++){
    ul.removeChild(document.querySelector(`p[key="${i}"]`))
  }
  for (let i = 0; i < state.listOfItems.length; i++){
    ul.innerHTML += renderItem(state.listOfItems[i]);
  }


};

const searchingItems = (event) =>{

  let inp = event.target.value;
  let array = state.listOfItems.filter(item => {
      return item.name.includes(inp)
  });
  for (let i = 0; i < array.length; i++){
    ul.removeChild(document.querySelector(`p[key="${i}"]`))
  }
  for (let i = 0; i < array.length; i++){
    ul.innerHTML += renderItem(array[i]);
  }
};

sortBtn.addEventListener('click', sortAllItems);

const search = document.querySelector('#search');

search.addEventListener('keydown', searchingItems, false);
