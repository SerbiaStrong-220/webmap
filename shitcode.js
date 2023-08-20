// (c) ДОЛБОЁБ КОДИНГ ИНКОРПОРЕЙТЕД

import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const mapLayer = new TileLayer();
const maps = {
  delta: {image: "delta.webp", name: "Delta"},
  box: {image: "box.webp", name: "Box"},
  frankenstein: {image: "frankenstein.webp", name: "Frankenstein"}
}

const map = new Map({
  target: 'map',
  layers: [
    mapLayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 4,
    maxZoom: 7
  })
});

function setmap(mapid)
{
  sBtn_text.innerText = maps[mapid].name;
  mapLayer.setSource(new XYZ({
    url: "./map_data/" + maps[mapid].image,
    maxZoom: 0,
    interpolate: false,
    wrapX: false
  }));
}

//Spinny thing when map loads
map.on('loadstart', function () {
  map.getTargetElement().classList.add('spinner');
});

map.on('loadend', function () {
  map.getTargetElement().classList.remove('spinner');
});

// PARALLAX
var IsMoving = false;
// const parallax1 = document.getElementById("layer1")
const parallax2 = document.getElementById("layer2")
const parallax3 = document.getElementById("layer3")

function updateParallax() {
  var x = map.getView().getCenter()[0] / 10000;
  var y = map.getView().getCenter()[1] / 10000;

  parallax2.style.backgroundPosition = (-x/3).toString() + "px " + (y/3).toString() + "px"
  parallax3.style.backgroundPosition = (-x/2).toString() + "px " + (y/2).toString() + "px"

  if (IsMoving)
    window.requestAnimationFrame(updateParallax);
}

map.on('movestart', function (event) {
  IsMoving = true
  updateParallax()
})

map.on('moveend', function (event) {
  IsMoving = false
})

// ояебу
const optTmpl = document.getElementById("opt-tmpl")
for (const [key, value] of Object.entries(maps)) {
  var newbutton = optTmpl.cloneNode(true);
  optTmpl.before(newbutton);
  newbutton.querySelector(".option-text").innerText = value.name
  newbutton.dataset.mapid = key
}
optTmpl.remove();

const optionMenu = document.querySelector(".select-menu"),
       selectBtn = optionMenu.querySelector(".select-btn"),
         options = optionMenu.querySelectorAll(".option"),
       sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
  option.addEventListener("click", () => {
    setmap(option.dataset.mapid)
  })
});

// init (load first map in dict)
setmap(Object.keys(maps)[0]);