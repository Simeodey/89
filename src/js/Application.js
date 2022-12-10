import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }
 static #url = "https://swapi.boom.dev/api/planets";
  constructor() {
    super();
   
    this._loading  = document.querySelector(" .progress");
    this._startLoading();
    this._load();
    this._stopLoading();

    document.body.querySelector(".main").appendChild(box);

    this.emit(Application.events.READY);
  }

  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
async _load(){
  let url = this.#url
  while(url){
    const response = await fetch(url);
    const objectResponse = await response.json();
    objectResponse.results.map(result => ({name: result.name, terrain: result.terrain, population: result.population}))
  .forEach(element => {
      this._create(element)
    });
  }
}


_create(planet){
  const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = this._render({
      name: planet.name,
      terrain: planet.terrain,
      population: planet.population,
    });

    document.body.querySelector(".main").appendChild(box);
}
_startLoading(){
this._loading.style.visibility = "visible";
}
_stopLoading(){
this._loading.style.visibility = "hidden";
}
}