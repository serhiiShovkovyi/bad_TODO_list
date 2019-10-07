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



const deleteItem = event => {
  const id = event.target.getAttribute("key");
  console.log(id);

  if (state.listOfItems.length <=1) {
    state.listOfItems.splice(0);
  } else {
    state.listOfItems.splice(id, 1);
  }

  for (let i = 0; i < state.listOfItems.length; i++) {
    state.listOfItems[i].key = i;
    ul.children[i].key = i;
  }
  state.listOfItems.sort((a,b)=>a.key - b.key);
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

//_____hide/show event listener____

clear.addEventListener("click", hideDialog);
//___Event listener to show dialog___

buttton.addEventListener(
  "click",
  () => {
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
console.log('add')

  if (
    nameInp.value.length > 0 &&
    dateTime.value.length > 0
  ) {
    console.log('add')
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
  }
};

//____event listener to set an item______
addButton.addEventListener("click", addItem, false);
