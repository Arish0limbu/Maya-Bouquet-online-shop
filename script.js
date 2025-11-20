const bouquets = [
  { name: "Rose Premium Bouquet", price: 1500, img: "https://i.imgur.com/uZCcaKo.jpeg" },
  { name: "Tulip Fresh Mix", price: 1200, img: "https://i.imgur.com/xUl1GJk.jpeg" },
  { name: "Sunflower Charm", price: 1000, img: "https://i.imgur.com/gbODKc3.jpeg" },
  { name: "Orchid Luxury", price: 2500, img: "https://i.imgur.com/zTtIYxL.jpeg" }
];

const list = document.getElementById("bouquetList");
const popup = document.getElementById("popupBox");

bouquets.forEach((item, index) => {
  list.innerHTML += `
    <div class="card">
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: Rs. ${item.price}</p>

      <div class="qty-box">
        <label>Qty:</label>
        <input type="number" id="qty${index}" value="1" min="1">
      </div>

      <button class="btn" onclick="addToCart(${index})">Add to Cart</button>
    </div>
  `;
});

function addToCart(index) {
  let qty = document.getElementById(`qty${index}`).value;
  popup.innerHTML = `${qty} × ${bouquets[index].name} added! 🎉`;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}
