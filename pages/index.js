const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const cardSection = document.querySelector(".elements");
const likeButton = document.querySelector(".elements__like");

const popupProfile = document.querySelector(".popup_profile");
const popupElements = document.querySelector(".popup_elements");
const popupElement = document.querySelector(".popup_element");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profilePopupCloseButton = popupProfile.querySelector(
  ".popup__close-button"
);
const elementsPopupCloseButton = popupElements.querySelector(
  ".popup__close-button"
);
const elementPopupCloseButton = popupElement.querySelector(
  ".popup__close-button"
);
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const formProfile = popupProfile.querySelector(".form");
const formElements = popupElements.querySelector(".form");
const buttonSubmitProfile = popupProfile.querySelector(".form__button");
const nameInput = popupProfile.querySelector('input[name="name"]');
const jobInput = popupProfile.querySelector('input[name="job"]');
const placeInput = popupElements.querySelector('input[name="name"]');
const linkInput = popupElements.querySelector('input[name="link"]');

// закрытия и открытия popup-ов
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

profilePopupCloseButton.addEventListener("click", () =>
  closePopup(popupProfile)
);
elementsPopupCloseButton.addEventListener("click", () =>
  closePopup(popupElements)
);
elementPopupCloseButton.addEventListener("click", () =>
  closePopup(popupElement)
);

profileAddButton.addEventListener("click", () => openPopup(popupElements));
profileEditButton.addEventListener("click", () => openPopup(popupProfile));

// редактирование профиля
function saveProfile() {
  if (nameInput.value.length === 0 || jobInput.value.length === 0) {
    return;
  }
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

formProfile.addEventListener("submit", submitFormProfile);

function submitFormProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}
buttonSubmitProfile.addEventListener("click", () => saveProfile(formProfile));

//Создание карточки
function createCard(name, link) {
  const templateElements = document.querySelector(
    "#elements__template"
  ).content;
  const itemElement = templateElements
    .querySelector(".elements__item")
    .cloneNode(true);
  const cardImage = itemElement.querySelector(".elements__image");
  cardImage.src = link;
  cardImage.alt = name;
  itemElement.querySelector(".elements__title").textContent = name;

  itemElement
    .querySelector(".elements__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".elements__item").remove();
    });

  itemElement
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });

  itemElement
    .querySelector(".elements__image")
    .addEventListener("click", (evt) => {
      openImagePopup(evt.target.src, name);
    });

  return itemElement;
}

//Просмотр картинки
function openImagePopup(link, name) {
  openPopup(popupElement);
  popupElement.querySelector(".popup__image").src = link;
  popupElement.querySelector(".popup__title").textContent = name;
  popupElement.querySelector(".popup__image").setAttribute("alt", name);
}

//Исходные карточки
function createInitialCards(cards) {
  document.querySelector(".elements").innerHTML = "";

  for (let i = 0; i < cards.length; i++) {
    document
      .querySelector(".elements")
      .append(createCard(cards[i].name, cards[i].link));
  }
}
createInitialCards(initialCards);

//Добавление карточки из формы

formElements.addEventListener("submit", submitNewElement);

function submitNewElement(evt) {
  evt.preventDefault();
  renderCard(createCard(placeInput.value, linkInput.value));
  placeInput.value = "";
  linkInput.value = "";
  closePopup(popupElements);
}
function renderCard(card) {
  cardSection.prepend(card);
}