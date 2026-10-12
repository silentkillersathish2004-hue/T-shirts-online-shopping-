
// Map color names to real t-shirt images
const shirtImages = {
  red:   "Gemini_Generated_Image_pbyjndpbyjndpbyj.png",
  black: "Gemini_Generated_Image_wmeg6rwmeg6rwmeg.png",
  white: "Gemini_Generated_Image_3e51tx3e51tx3e51.png",
  blue:  "Gemini_Generated_Image_eifzrieifzrieifz.png",
  green: "Gemini_Generated_Image_z45ewiz45ewiz45e.png"
};

// Base price per size (₹)
const sizePrices = {
  S:   399,
  M:   449,
  L:   499,
  XL:  549,
  XXL: 599
};

// Logo display size (px) based on shirt size
const logoSizes = {
  S:   110,
  M:   130,
  L:   150,
  XL:  165,
  XXL: 178
};

let shirtColor = "red";
let logoName   = "Spiderman";
let logoPrice  = 120;

function setColor(color) {
  shirtColor = color;
  const imgSrc = shirtImages[color] || shirtImages["white"];
  document.getElementById("shirtImage").src = imgSrc;
}

function setLogo(name, imgFile, price) {
  logoName  = name;
  logoPrice = price;
  document.getElementById("previewLogo").src = imgFile;
  document.getElementById("previewLogo").alt = name;
  updatePrice();
}

function updatePrice() {
  const size      = document.getElementById("size").value;
  const basePrice = sizePrices[size] || 399;
  const perShirt  = basePrice + logoPrice;

  let quantity = Number(document.getElementById("quantity").value);
  if (!Number.isFinite(quantity) || quantity < 1) quantity = 1;
  quantity = Math.min(20, Math.floor(quantity));

  const total = perShirt * quantity;

  // ✅ Resize logo based on selected shirt size
  const logoWidth = logoSizes[size] || 65;
  document.getElementById("previewLogo").style.width = logoWidth + "px";

  // Update live total display
  document.getElementById("total").textContent = "Total: ₹" + total;

  // Show live price breakdown
  document.getElementById("priceBreakdown").innerHTML =
    "Size (<strong>" + size + "</strong>): ₹" + basePrice +
    " &nbsp;+&nbsp; Logo: ₹" + logoPrice +
    " &nbsp;= &nbsp;<strong>₹" + perShirt + " / shirt</strong>";

  return { size, basePrice, perShirt, quantity, total };
}

function placeOrder() {
  const { size, basePrice, perShirt, quantity, total } = updatePrice();

  document.getElementById("orderDetails").innerHTML =
    "<strong>Order Summary</strong><br>" +
    "Size: "    + size + "<br>" +
    "Color: "   + shirtColor.charAt(0).toUpperCase() + shirtColor.slice(1) + "<br>" +
    "Logo: "    + logoName + "<br>" +
    "Base price (size " + size + "): ₹" + basePrice + "<br>" +
    "Logo printing: ₹" + logoPrice + "<br>" +
    "Price per T-shirt: ₹" + perShirt + "<br>" +
    "Quantity: " + quantity + "<br>" +
    "<strong>Total Amount: ₹" + total + "</strong><br>" +
    "<p>Demo order created! Online payment and delivery are not connected yet.</p>";
}

updatePrice();
