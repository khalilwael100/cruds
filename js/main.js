let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let create = document.querySelector(".create");
let delAll = document.querySelector(".del-all");
let search = document.querySelector(".search");

let tbody = document.getElementById("tbody");
let index;

// Get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

// Create data
let arrData;
if (localStorage.products != null) {
  arrData = JSON.parse(localStorage.products);
} else {
  arrData = [];
}

create.onclick = function (e) {
  let newData = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (create.innerHTML == "Create") {
    // Validation count
    if (count.value > 1) {
      for (let i = 0; i < count.value; i++) {
        arrData.push(newData);
        count.style.outline = "none";
        count.setAttribute("placeholder", "Count");
      }
    } else if (count.value == 1 || count.value == "") {
      arrData.push(newData);
      count.style.outline = "none";
      count.setAttribute("placeholder", "Count");
    } else if (count.value < 0) {
      count.style.outline = "1px solid red";
      count.focus();
      count.setAttribute("placeholder", "Please enter a number > 0");
      e.preventDefault();
    }
  } else {
    arrData[index] = newData;
    create.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("products", JSON.stringify(arrData));
  getTotal();
  creatTable();
  clearData();
};

// Clear data
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Create table
function creatTable() {
  let table = "";
  for (let i = 0; i < arrData.length; i++) {
    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${arrData[i].title}</td>
                <td>${arrData[i].price}</td>
                <td>${arrData[i].taxes}</td>
                <td>${arrData[i].ads}</td>
                <td>${arrData[i].discount}</td>
                <td>${arrData[i].total}</td>
                <td>${arrData[i].category}</td>
                <td><button onclick="updateData(${i})" class="update">Update</button></td>
                <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
            </tr>
        `;
  }

  deleteAll();
  getTotal();
  tbody.innerHTML = table;
}
creatTable();

// Delete data
function deleteData(i) {
  arrData.splice(i, 1);
  localStorage.products = JSON.stringify(arrData);
  creatTable();
}

// Delete all
function deleteAll() {
  if (arrData.length > 0) {
    delAll.style.display = "block";
    delAll.innerHTML = `Delete all (${arrData.length})`;
  } else {
    delAll.style.display = "none";
  }
}

delAll.onclick = function () {
  localStorage.clear();
  arrData.splice(0);
  creatTable();
};

// Update data
function updateData(i) {
  title.value = arrData[i].title;
  price.value = arrData[i].price;
  taxes.value = arrData[i].taxes;
  ads.value = arrData[i].ads;
  discount.value = arrData[i].discount;
  category.value = arrData[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  index = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}

// Search
let searchMood = "Title";
function searchBy(id) {
  if (id == "searchTitle") {
    searchMood = "Title";
  } else if (id == "searchCategory") {
    searchMood = "Category";
  }
  search.placeholder = "Search By " + searchMood;
  search.value = "";
  search.focus();

  creatTable();
}

search.onkeyup = function () {
  let table = "";

  if (searchMood === "title") {
    for (i = 0; i < arrData.length; i++) {
      if (arrData[i].title.includes(this.value)) {
        table += `
                <th scope="row">${i + 1}</th>
                <td>${arrData[i].title}</td>
                <td>${arrData[i].price}</td>
                <td>${arrData[i].taxes}</td>
                <td>${arrData[i].ads}</td>
                <td>${arrData[i].discount}</td>
                <td>${arrData[i].total}</td>
                <td>${arrData[i].category}</td>
                <td><button type="button" class="btn btn-success p-0 form-control" onclick="updateData(${i})" id="update"> Update </button></td>
                <td><button type="button" class="btn btn-danger p-0 form-control" onclick="deleteData(${i})" id="delete"> Delete </button></td>
                </tr>
            `;
      }
    }
  } else {
    for (i = 0; i < arrData.length; i++) {
      if (arrData[i].category.includes(this.value)) {
        table += `
                <th scope="row">${i + 1}</th>
                <td>${arrData[i].title}</td>
                <td>${arrData[i].price}</td>
                <td>${arrData[i].taxes}</td>
                <td>${arrData[i].ads}</td>
                <td>${arrData[i].discount}</td>
                <td>${arrData[i].total}</td>
                <td>${arrData[i].category}</td>
                <td><button type="button" class="btn btn-success p-0 form-control" onclick="updateData(${i})" id="update"> Update </button></td>
                <td><button type="button" class="btn btn-danger p-0 form-control" onclick="deleteData(${i})" id="delete"> Delete </button></td>
                </tr>
            `;
      }
    }
  }

  tbody.innerHTML = table;
};
