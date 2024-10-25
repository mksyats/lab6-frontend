const getButton = document.getElementById('getButton');
const processMessage = document.getElementById('processMessage');
const usersContainer = document.getElementById('usersContainer');

getButton.addEventListener('click', async () => {
  processMessage.style.visibility = 'visible';
  processMessage.textContent = 'Отримання даних...';
  try {
    await generateNewUsers(5);
    processMessage.textContent = 'Дані успішно отримано!';
  } catch (error) {
    processMessage.textContent = `Сталася помилка: ${error}`;
  }
});

const addUser = (imgSrc, ...textData) => {
  const userContainer = document.createElement('div');
  userContainer.className = 'user';
  const picture = document.createElement('img');
  picture.src = imgSrc;
  userContainer.appendChild(picture);
  textData.forEach((text) => addTextElToContainer(text, userContainer));
  return userContainer;
};

const addTextElToContainer = (text, container) => {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  container.appendChild(paragraph);
};

const generateUser = async () => {
  const response = await fetch('https://randomuser.me/api');
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return {
    picture: data.results[0].picture.large,
    postcode: data.results[0].location.postcode,
    coordinates: data.results[0].location.coordinates,
    email: data.results[0].email,
    city: data.results[0].location.city,
  };
};

const generateNewUsers = async (count) => {
  const users = [];
  for (let i = count; i > 0; i--) {
    const { picture, postcode, coordinates, email, city } = await generateUser();
    users.push(
      addUser(
        picture,
        `Поштовий код: ${postcode}`,
        `Координати: довгота: ${coordinates.longitude}; широта: ${coordinates.latitude}`,
        `E-mail: ${email}`,
        `Місто: ${city}`,
      ),
    );
  }
  usersContainer.replaceChildren(...users);
};
