const reviewInput = document.getElementById('text-review');
const inputForm = document.getElementById('review-form');
const allReviews = document.getElementById('all-reviews');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');
const inputBtn = document.getElementById('input-btn');
const formBtn = document.querySelector('button');
let isEditMode = false;

const addReview = (e) => {
  e.preventDefault();

  let userReview = reviewInput.value;
  if (reviewInput.value === '') {
    alert('Enter a review');
  }

  addToDOM(userReview);
  addToLocalStorage(userReview);
  reviewInput.value = '';
};

// Add review to DOM
const addToDOM = (review) => {
  // create the paragraph
  const textParagraph = document.createElement('p');

  //Add text to the paragraph
  textParagraph.appendChild(document.createTextNode(review));
  // Create a div element
  const holderDiv = document.createElement('div');
  const otherBtns = document.createElement('div');
  const editBtn = document.createElement('button');
  editBtn.setAttribute('id', 'edit-btn');
  editBtn.classList.add('edit-review');

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('id', 'delete-btn');
  deleteBtn.classList.add('remove-review');

  editBtn.appendChild(document.createTextNode('Edit'));
  deleteBtn.appendChild(document.createTextNode('Delete'));
  otherBtns.appendChild(editBtn);
  otherBtns.appendChild(deleteBtn);
  otherBtns.classList.add('other-buttons');

  //Add the paragraph to the div
  holderDiv.appendChild(textParagraph);
  holderDiv.appendChild(otherBtns);

  // Add the requisite classes to the div
  holderDiv.classList.add('review-display');

  allReviews.appendChild(holderDiv);
};

const displayReviewsFromLocalStorage = () => {
  const reviews = getReviewFromLocalStorage();
  reviews.forEach((review) => addToDOM(review));
};

const addToLocalStorage = (review) => {
  let reviewsFromLocalStorage = getReviewFromLocalStorage();

  reviewsFromLocalStorage.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviewsFromLocalStorage));
};

const getReviewFromLocalStorage = () => {
  let reviewsFromLocalStorage;
  if (localStorage.getItem('reviews') === null) {
    reviewsFromLocalStorage = [];
  } else {
    reviewsFromLocalStorage = JSON.parse(localStorage.getItem('reviews'));
  }
  return reviewsFromLocalStorage;
};

function removeReviewFromStorage(review) {
  let reviewsFromStorage = getReviewFromLocalStorage();
  reviewsFromStorage = reviewsFromStorage.filter((rev) => rev !== review);

  localStorage.setItem('reviews', JSON.stringify(reviewsFromStorage));
}

const editReview = (review) => {
  isEditMode = true;

  allReviews
    .querySelectorAll('div')
    .forEach((i) => i.classList.remove('.edit-mode'));

  formBtn.innerHTML = 'Update Review';
  formBtn.style.backgroundColor = '#228B22';
  formBtn.style.color = '#fff';
  reviewInput.value = review;
};

const del = (review) => {
  if (confirm('Are you sure you want to delete review?')) {
    review.remove();
    removeReviewFromStorage(review.children[0].innerHTML);
  }
};

const deleteReview = (e) => {
  if (e.target.classList.contains('remove-review')) {
    del(e.target.parentElement.parentElement);
  } else {
    editReview(e.target.parentElement.parentElement.children[0].innerHTML);
  }
};

displayReviewsFromLocalStorage();

inputForm.addEventListener('submit', addReview);
allReviews.addEventListener('click', deleteReview);
