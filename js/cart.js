// import {booksData} from './app.js'
let tbody = document.querySelector('tbody')
let totalItems = document.querySelector('#totalItems')
let totalPrice = document.querySelector('#totalPrice')

// let bookImg = localStorage.getItem('bookImg')
// let bookName = localStorage.getItem('bookName')
// let bookDesc = localStorage.getItem('bookDesc')
// let bookPrice = localStorage.getItem('bookPrice')
// let bookUrl = localStorage.getItem('bookUrl')
// console.log(bookName);

let bookInfo = localStorage.getItem('bookInfo')
bookInfo = JSON.parse(bookInfo)
bookInfo.forEach(el => {
  console.log(el);
  let num = 1
  num++
  let tr = document.createElement('tr')
  tr.innerHTML = `
      <tr>
      <th scope="row">${num}</th>
        <td><img src="${el.img}" alt="image" width="120px"></td>
        <td class="fw-bolder">${el.name}</td>
        <td>${el.desc}</td>
        <td>${el.price}</td>
        <td><a href="${el.link}" target="_blank">Link</a></td>
      </tr>
  `;
  
  tbody.appendChild(tr)
  
  let bookPrice = +el.price.slice(1);
  totalPrice.innerHTML = bookPrice
  
  totalItems.innerHTML = bookInfo.length;
});

