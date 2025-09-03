let number = 0;
let data = []; // store data after first fetch

const button = document.getElementById('btn');
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");

function getData(callback) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      data = request.response; // saves fetched data
      callback(); // changes logic after data is available
    }
  };
  request.open("GET", "ajax.json");
  request.responseType = "json";
  request.send(null);
}

function updateContent() {
  if (data.length > 0) {
    titleArea.innerHTML = data[number].title;
    contentArea.innerHTML = data[number].content;
    videoArea.setAttribute("src", data[number].url);
    number = (number + 1) % data.length; // cycles through videos
  }
}

function shuffleVideo() {
  button.addEventListener('click', () => {
    if (data.length === 0) {
      // Fetch only the first time
      getData(updateContent);
    } else {
      // Reuse cached data
      updateContent();
    }
  });
}

window.onload = shuffleVideo;
