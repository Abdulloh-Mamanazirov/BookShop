let kitoblar = [
  {
    title: "MongoDB in Action, 2nd Edition",
    subtitle: "Covers MongoDB version 3.0",
    isbn13: "9781617291609",
    price: "$19.99",
    image: "https://itbook.store/img/books/9781617291609.png",
    url: "https://itbook.store/books/9781617291609",
  },
  {
    title: "Practical MongoDB",
    subtitle: "Architecting, Developing, and Administering MongoDB",
    isbn13: "9781484206485",
    price: "$41.65",
    image: "https://itbook.store/img/books/9781484206485.png",
    url: "https://itbook.store/books/9781484206485",
  },
  {
    title: "The Definitive Guide to MongoDB, 3rd Edition",
    subtitle: "A complete guide to dealing with Big Data using MongoDB",
    isbn13: "9781484211830",
    price: "$49.99",
    image: "https://itbook.store/img/books/9781484211830.png",
    url: "https://itbook.store/books/9781484211830",
  },
  {
    title: "MongoDB Performance Tuning",
    subtitle: "Optimizing MongoDB Databases and their Applications",
    isbn13: "9781484268780",
    price: "$34.74",
    image: "https://itbook.store/img/books/9781484268780.png",
    url: "https://itbook.store/books/9781484268780",
  },
  {
    title: "Pentaho Analytics for MongoDB",
    subtitle:
      "Combine Pentaho Analytics and MongoDB to create powerful analysis and reporting solutions",
    isbn13: "9781782168355",
    price: "$16.99",
    image: "https://itbook.store/img/books/9781782168355.png",
    url: "https://itbook.store/books/9781782168355",
  },
  {
    title: "Pentaho Analytics for MongoDB Cookbook",
    subtitle:
      "Over 50 recipes to learn how to use Pentaho Analytics and MongoDB to create powerful analysis and reporting solutions",
    isbn13: "9781783553273",
    price: "$44.99",
    image: "https://itbook.store/img/books/9781783553273.png",
    url: "https://itbook.store/books/9781783553273",
  },
  {
    title: "Web Development with MongoDB and NodeJS, 2nd Edition",
    subtitle:
      "Build an interactive and full-featured web application from scratch using Node.js and MongoDB",
    isbn13: "9781785287527",
    price: "$39.99",
    image: "https://itbook.store/img/books/9781785287527.png",
    url: "https://itbook.store/books/9781785287527",
  },
  {
    title: "MongoDB Cookbook, 2nd Edition",
    subtitle:
      "Harness the latest features of MongoDB 3 with this collection of 80 recipes - from managing cloud platforms to app development, this book is a vital resource",
    isbn13: "9781785289989",
    price: "$44.99",
    image: "https://itbook.store/img/books/9781785289989.png",
    url: "https://itbook.store/books/9781785289989",
  },
  {
    title: "The Little MongoDB Book",
    subtitle: "",
    isbn13: "1001592208320",
    price: "$0.00",
    image: "https://itbook.store/img/books/1001592208320.png",
    url: "https://itbook.store/books/1001592208320",
  },
  {
    title: "Learning MongoDB",
    subtitle: "",
    isbn13: "1001629462276",
    price: "$0.00",
    image: "https://itbook.store/img/books/1001629462276.png",
    url: "https://itbook.store/books/1001629462276",
  },
];

let cardsElement = document.querySelector(".cards");
let search = document.querySelector("#searchBox");

const getProducts = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => booksData(data));
};
getProducts("https://api.itbook.store/1.0/search/mongodb");

function booksData(books) {
  console.log(books.books);
  kitoblar.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("my-2");
    card.classList.add("p-2");
    card.style.width = "312px";
    card.style.height = "600px";
    card.innerHTML = `
        <img src="${element.image}" alt="${element.title}">
        <h6 class='fs-5 fw-bolder' id='title'>${element.title}</h6>
        <p class="overflow-auto" style='height:60px;'>${element.subtitle}</p>
        <p><span class="badge text-bg-primary fs-6">${element.price}</span></p>
        `;

    let btnGroup = document.createElement("div");
    btnGroup.classList.add("d-flex");
    btnGroup.classList.add("justify-content-between");

    let moreLink = document.createElement("a");
    moreLink.classList.add("btn");
    moreLink.classList.add("btn-info");
    moreLink.setAttribute("target", "_blank");
    moreLink.href = `${element.url}`;
    moreLink.style.width = "70%";
    moreLink.textContent = "More";
    let addCart = document.createElement("button");
    addCart.classList.add("btn");
    addCart.classList.add("btn-warning");
    addCart.style.width = "25%";
    addCart.textContent = "🛒";

    btnGroup.appendChild(moreLink);
    btnGroup.appendChild(addCart);
    card.appendChild(btnGroup);
    cardsElement.appendChild(card);
  });
}

search.addEventListener("keyup", (e) => {
  let searchText = e.target.value.toUpperCase();
  let allBooks = document.querySelector(".cards");
  let card = document.querySelectorAll(".card");
  let name = allBooks.getElementsByTagName("h6");

  for (let i = 0; i <= name.length; i++) {
    let match = card[i].getElementsByTagName("h6")[0];

    if (match) {
      let textvalue = match.textContent || match.innerHTML;

      if (textvalue.toUpperCase().indexOf(searchText) > -1) {
        card[i].style.display = "";
      } else {
        card[i].style.display = "none";
      }
    }
    if (e.target.value) {
      document.querySelector(".fa-search").setAttribute("hidden", true);
      search.classList.remove("ps-5");
    } else {
      document.querySelector(".fa-search").removeAttribute("hidden");
      search.classList.add("ps-5");
    }
  }
});

if ("webkitSpeechRecognition" in window) {
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-En";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const diagnostic = document.querySelector(".output");
  let mic = document.querySelector(".fa-microphone");
  mic.onclick = () => {
    recognition.start();
    mic.classList.add("text-danger-emphasis");
  };

  recognition.onresult = (e) => {
    const result = e.results[0][0].transcript;
    diagnostic.value = `${result}`;
    e.target.value = `${result}`;
    
    mic.classList.remove("text-danger-emphasis");

    let searchText = e.target.value.toUpperCase();
    let allBooks = document.querySelector(".cards");
    let card = document.querySelectorAll(".card");
    let name = allBooks.getElementsByTagName("h6");

    for (let i = 0; i <= name.length; i++) {
      let match = card[i].getElementsByTagName("h6")[0];

      if (match) {
        let textvalue = match.textContent || match.innerHTML;

        if (textvalue.toUpperCase().indexOf(searchText) > -1) {
          card[i].style.display = "";
        } else {
          card[i].style.display = "none";
        }
      }
      if (e.target.value) {
        document.querySelector(".fa-search").setAttribute("hidden", true);
        search.classList.remove("ps-5");
      } else {
        document.querySelector(".fa-search").removeAttribute("hidden");
        search.classList.add("ps-5");
      }
    }
  };
} else {
  console.log("Speech Recognition Not Available");
}
