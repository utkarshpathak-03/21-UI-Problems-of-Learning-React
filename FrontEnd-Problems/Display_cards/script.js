const fetchData = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      throw new Error("Error in fetching product data");
    }
    //Converting JSON into JS object
    const data = await res.json();
    //Creating function to create cards and insert into root Container .
    displayCards(data);
  } catch (error) {
    console.log("An error has occurred => ", error);
  }
};

const displayCards = (products) => {
  const rootContainer = document.getElementById("rootContainer");
  // Writing a forEach function to extract data from products obj
  // and create multiple cards
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = product.price;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = product.description;
    //Append the elements to the card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(description);
    //Append the cards to the rootContainer
    rootContainer.appendChild(card);
  });
};

fetchData();
