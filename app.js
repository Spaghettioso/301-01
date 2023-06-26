"use strict";

const productsSection = document.querySelector("section");

const image1 = document.querySelector("section img:first-child");
const image2 = document.querySelector("section img:nth-child(2)");
const image3 = document.querySelector("section img:nth-child(3)");

let clicks = 0;
const maxClicksAllowed = 5;
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
  let product1 = randomNumberGenerator();
  let product2 = randomNumberGenerator();
  let product3 = randomNumberGenerator();

  while (product1 === product2 || product1 === product3) {
    product1 = randomNumberGenerator();
    product2 = randomNumberGenerator();
    product3 = randomNumberGenerator();
  }
}
