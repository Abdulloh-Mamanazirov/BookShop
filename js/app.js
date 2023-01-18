import kitoblar from './booksData.js'

let cardsElement = document.querySelector(".cards");
let search = document.querySelector("#searchBox");
let myCart = document.querySelector("#myCart");

const getProducts = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => booksData(data));
};
getProducts("https://api.itbook.store/1.0/search/html");

function booksData(books) {
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
    addCart.addEventListener("click", (e) => {
      let Info = {
        img: e.composedPath()[2].childNodes[1].currentSrc,
        name: e.composedPath()[2].childNodes[3].innerText,
        desc: e.composedPath()[2].childNodes[5].innerText,
        price: e.composedPath()[2].childNodes[7].innerText,
        link: e.composedPath()[2].childNodes[9].childNodes[0].href,
      };
      let bookInfo = JSON.parse(localStorage.bookInfo || "[]");
      bookInfo.push(Info);
      console.log(bookInfo);
      localStorage.bookInfo = JSON.stringify(bookInfo);
    });
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