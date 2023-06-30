"use strict";

const productsSection = document.querySelector("section");

const image1 = document.getElementById("image1");
const resultsButton = document.getElementById("viewResults");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

let clicks = 0;
const maxClicksAllowed = 10;
//creating an empty array that we push our list of products into later on
let allProducts = [];

function randomNumberGenerator() {
  return Math.floor(Math.random() * allProducts.length);
}

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
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
    product2 = randomNumberGenerator();
    product3 = randomNumberGenerator();
  }
  //giving attributes to image1,2,3 using the details from the images
  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image3.src = allProducts[product3].src;
  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;

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
    for (let i = 0; i < allProducts.length; i++) {
      if (clickedProduct === allProducts[i].name) {
        allProducts[i].clicks++;
        break;
      }
    }
    if (clicks === maxClicksAllowed) {
      productsSection.removeEventListener("click", handleProductClick);
      productsSection.className = "no-voting";
      resultsButton.addEventListener("click", renderChart);
      resultsButton.className = "clicks-allowed";
    } else {
      renderProducts();
    }
  }
}

// function renderResults() {
//   let ul = document.querySelector("ul");
//   for (let i = 0; i < allProducts.length; i++) {
//     let li = document.createElement("li");
//     li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
//     ul.appendChild(li);
//   }
// }

const banana = new Product("banana", "images/banana.jpg");
const bag = new Product("bag", "images/banana.jpg");

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
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

for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `images/${productNames[i]}.jpg`);
}

renderProducts();

function renderChart() {
  //create 3 empty arrays for productnames on x axis and productviews and productclicks on the y axis
  const productNames = [];
  const productViews = [];
  const productVotes = [];

  // As we've already pushed names, views and clicks into the allProducts object array, we just need to recall these now and push all the values into the 3 arrays using a loop

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productVotes.push(allProducts[i].clicks);
    console.log(productViews);
  }

  const data = {
    labels: productNames,

    datasets: [
      {
        label: "Votes",
        data: productVotes,
        backgroundColor: "blue",
      },
      {
        label: "Views",
        data: productViews,
        backgroundColor: "red",
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
  };

  const productChart = document.getElementById("productChart");
  const newChart = new Chart(productChart, config);
}
productsSection.addEventListener("click", handleProductClick);
