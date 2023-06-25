import { catsData } from "./data.js";

const emotionRadiosEl = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadiosEl.addEventListener("change", highlightCheckedOption);
memeCloseBtn.addEventListener("click", closeModal);
getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
  const radioEls = document.getElementsByClassName("radio");
  for (let radioEl of radioEls) {
    radioEl.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
  memeModal.style.display = "none";
}

function renderCat() {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `<img 
  class="cat-img" 
  src="./images/${catObject.image}"
  alt="${catObject.alt}"
  >`;
  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 1) return catsArray[0];
  else {
    let randomNo = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNo];
  }
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      else return cat.emotionTags.includes(selectedEmotion);
    });
    return matchingCatsArray;
  }
}

function getEmotionsArray(cats) {
  let emotionsArray = [];

  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats);
  let emotionRadios = "";

  for (let emotion of emotions) {
    emotion = `<div class="radio">

    <label for="${emotion}">${emotion}</label>

    <input 
    type="radio" 
    id="${emotion}"
    value="${emotion}"
    name="emotion"/>

 </div>`;

    emotionRadios += emotion;
  }
  emotionRadiosEl.innerHTML = emotionRadios;
}

renderEmotionsRadios(catsData);
