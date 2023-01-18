// import {booksData} from './app.js'
let tbody = document.querySelector("tbody");
let totalItems = document.querySelector("#totalItems");
let totalPrice = document.querySelector("#totalPrice");
let clearCart = document.querySelector("#clearCart");

// let bookImg = localStorage.getItem('bookImg')
// let bookName = localStorage.getItem('bookName')
// let bookDesc = localStorage.getItem('bookDesc')
// let bookPrice = localStorage.getItem('bookPrice')
// let bookUrl = localStorage.getItem('bookUrl')
// console.log(bookName);

let bookInfo = localStorage.getItem("bookInfo");
bookInfo = JSON.parse(bookInfo);
bookInfo.forEach((el) => {
  let num = 1;
  num++;
  let tr = document.createElement("tr");
  tr.innerHTML = `
      <tr>
      <td><img src="${el.img}" alt="image" width="120px"></td>
      <td class="fw-bolder">${el.name}</td>
      <td>${el.desc}</td>
      <td class="h5"><span class="badge bg-primary">${el.price}</span></td>
      <td><a href="${el.link}" target="_blank">Link</a></td>
      <th scope="row"><i  class="fa-solid fa-trash text-danger fs-3" style="cursor:pointer;"</i></th>
      </tr>
  `;

  tbody.appendChild(tr);

  totalItems.innerHTML = bookInfo.length;
});

let price = [];
bookInfo.map((el) => {
  let bookPrice = +el.price.slice(1);
  price.push(bookPrice);

  const initialValue = 0;
  const sum = price.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  totalPrice.innerHTML = sum.toFixed(3);
});

clearCart.addEventListener('click', e=>{
  if(confirm('Are you sure remove all the items?')){
    localStorage.clear();
    location.reload();
  }
})
