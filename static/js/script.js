// main.js

async function loadProducts() {
  const response = await fetch('products.html');
  const productsHtml = await response.text();

  // Extract only the products section from productsHtml
  const parser = new DOMParser();
  const doc = parser.parseFromString(productsHtml, 'text/html');
  const productsSection = doc.getElementById('products').innerHTML;

  // Inject the extracted products section into the current page
  document.getElementById('products').innerHTML = productsSection;
}

window.addEventListener('DOMContentLoaded', (event) => {
  loadProducts();
});

  



// image slider - Inspiration rooms

  const slider_image = document.querySelector(".slider_image"),
firstImg = slider_image.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = slider_image.scrollWidth - slider_image.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = slider_image.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = slider_image.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        slider_image.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});
const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(slider_image.scrollLeft - (slider_image.scrollWidth - slider_image.clientWidth) > -1 || slider_image.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(slider_image.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return slider_image.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    slider_image.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider_image.scrollLeft;
}
const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slider_image.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider_image.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}
const dragStop = () => {
    isDragStart = false;
    slider_image.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}
slider_image.addEventListener("mousedown", dragStart);
slider_image.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
slider_image.addEventListener("touchmove", dragging);
document.addEventListener("mouseup", dragStop);
slider_image.addEventListener("touchend", dragStop);








// script.js

let startX;
let currentX;

document.querySelector('.gallery').addEventListener('touchstart', touchStart, false);
document.querySelector('.gallery').addEventListener('touchmove', touchMove, false);

function touchStart(event) {
  startX = event.touches[0].clientX;
}

function touchMove(event) {
  currentX = event.touches[0].clientX;
  handleGesture();
}

function handleGesture() {
  // Calculate the distance moved
  let distance = startX - currentX;

  // Adjust this value based on the sensitivity of the swipe
  if (Math.abs(distance) < 40) return;

  if (distance > 0) {
    // Swipe left, scroll to the right
    document.querySelector('.gallery').scrollBy({
      left: 300, // Adjust scroll amount as needed
      behavior: 'smooth'
    });
  } else {
    // Swipe right, scroll to the left
    document.querySelector('.gallery').scrollBy({
      left: -300, // Adjust scroll amount as needed
      behavior: 'smooth'
    });
  }
}


// script.js

document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', () => {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
      lightbox.style.display = 'block';
      lightboxImg.src = image.src;
    });
  });
  
  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
  });
  

  // Function to open the About Us modal when About link is clicked
  document.getElementById('aboutUsLink').addEventListener('click', function() {
    var myModal = new bootstrap.Modal(document.getElementById('aboutUsModal'));
    myModal.show();
  });


  // Example: Handle form submission
  document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle form submission logic here (e.g., send payment request to server)
    alert('Payment processed successfully!');
    // Redirect or perform further actions as needed
  });