const db = {
addedShorts: 0
}

const url = 'https://corsproxy.org/?' + encodeURIComponent('https://fransdata.iceiy.com/ytdata.php');
fetch(url)
.then((response) => {
return response.json();
})
.then((data) => {
db.shorts = data.videos;
addShorts();
});

const subcountnr = document.querySelector(".subcountnr");
fetch("https://invidious.fdn.fr/api/v1/channels/UCirU0aVy-_PUnsdRDJb2NQQ?fields=subCount")
.then((response) => {
return response.json();
})
.then((data) => {
subcountnr.innerHTML = data.subCount;
});

const shortsdiv = document.querySelector(".shortsdiv");
const morevids = document.querySelector(".morevids");
morevids.addEventListener("click", addShorts);

function addShorts() {
for (let i = 0; i < 3; i++) {
let nr = db.shorts.length - db.addedShorts - 1;
if (nr < 0) { return }
db.addedShorts += 1;

let div = document.createElement("div");
div.addEventListener("click", () => {
playVid(db.shorts[nr].videoId);
});

div.classList.add("flex");
div.style.backgroundImage = `url('https://i3.ytimg.com/vi/${db.shorts[nr].videoId}/maxresdefault.jpg')`;
div.innerHTML += `<div class="playbtn flex"><div></div></div>`;
shortsdiv.appendChild(div);
}
}

const shortView = document.querySelector(".shortView");
const sviFrame = shortView.querySelector("iframe");

function playVid(x) {
sviFrame.src = `https://www.youtube.com/embed/${x}?autoplay=1&controls=0`;
sviFrame.style.animation = "short-out 0.6s";
shortView.style.display = "flex";
}

function hideBigShort() {
sviFrame.src = "";
shortView.style.display = "none";
}

