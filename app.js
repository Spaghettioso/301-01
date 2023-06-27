"use strict";

const productsSection = document.querySelector("section");

const image1 = document.querySelector("section img:first-child");
const image2 = document.querySelector("section img:nth-child(2)");
const image3 = document.querySelector("section img:nth-child(3)");

let clicks = 0;
const maxClicksAllowed = 5;
//creating an empty array that we push our list of products into later on
let allProducts = [];

function randomNumberGenerator() {
  return Math.floor(Math.random() * allProducts.length);
}

function Product(name, src, timesShown) {
  this.name = name;
  this.src = src;
  this.timesShown = timesShown;
  allProducts.push(this);
}

function renderProducts() {
  //assigning values to the 3 products that will be displayed on page
  let product1 = randomNumberGenerator();
  let product2 = randomNumberGenerator();
  let product3 = randomNumberGenerator();
  //while loop to prevent getting the same number twice, if any are the same, it runs random number function again
  while (
    product1 === product2 ||
    product1 === product3 ||
    product2 === product3
  ) {
    product1 = randomNumberGenerator();
    product2 = randomNumberGenerator();
    product3 = randomNumberGenerator();
  }
  //giving attributes to image1,2,3 using the details from the images
  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image2.src = allProducts[product3].src;
  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;
  //when function is run we are adding 1 to the views
  allProducts[product1].views++;
  allProducts[product2].views++;
  allProducts[product3].views++;
}

function handleProductClick(event) {
  if (event.target === productsSection) {
    alert("Please click on an image");
  } else {
    clicks++;
    let clickedProduct = event.target.alt;
    for (let i = o; i < allProducts.length; i++) {
      if (clickedProduct === allProducts[i].name) {
        allProducts[i].clicks++;
        break;
      }
    }
    if (clicks === maxClicksAllowed) {
      productsSection.removeEventListener("click", handleProductClick);
      productsSection.className = "no-voting";
      resultsButton.addEventListener("click", renderResults);
      resultsButton.className = "clicks-allowed";
    } else {
      renderProducts();
    }
  }
}

function renderResults() {
  let ul = document.createElement("ul");
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement("li");
    li.textContent =
      "${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.";
    ul.appendChild(li);
  }
}

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "sweep",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

renderProducts();

for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `imgs/${productNames[i]}.jpg`);
}

productsSection.addEventListener("click", handleProductClick);
