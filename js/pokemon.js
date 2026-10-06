class Pokemon {

    // (1)
    static activePokemon = null

    // (2)
    static keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false
    }

    constructor(name, sprite) {
        this.name = name;
        this.sprite = sprite;
        this.element = this.createElement();
        this.addEventListeners();
    }
    
    createElement() {
      // (3)
      const img = document.createElement('img');
      img.src = this.sprite;
      img.style.position = 'absolute';
      img.style.top = Math.cell(Math.random()*100) + 'px';
      img.style.left = Math.cell(Math.random()*100) + 'px';
    }
    
    addEventListeners() {   
      // (4)
      this.element.addEventListener('click', () => {
        Pokemon.activePokemon = this;
      })
      
    }
    
    move(step) { 
    	// (5)
      let top = parseInt(this.element.style.top);
      let left = parseInt(this.element.style.left);

      if(Pokemon.keys.ArrowUp)
        this.element.style.top = (top - step) + 'px';
      if(Pokemon.keys.ArrowDown)
        this.element.style.top = (top + step) + 'px';
      if(Pokemon.keys.ArrowLeft)
        this.element.style.left = (left - step) + 'px';
      if(Pokemon.keys.ArrowRight)
        this.element.style.left = (left + step) + 'px';
    }
} // end of Pokemon class


document.addEventListener('keydown', function (event) {
  
   // (6)
  Pokemon.keys[event.key] = true;

});

document.addEventListener('keyup', function (event) {
   
  // (7)
  Pokemon.keys[event.key] = false;

});

function moveActivePokemon() {
   
  // (8) 
  const step = 5;

  if(Pokemon.activePokemon){
    Pokemon.activePokemon.move(step);
  }
}

setInterval(moveActivePokemon, 10);

// Instantiate Pokémon
const pokemonNames = ['pikachu', 'bulbasaur', 'charmander', 'squirtle'];

function cargarJuego () {
  
  // llamar a loadImage
  
  // Cargar los Pokemon de pokemonNames con Promise.all (NO usar forEach):
  // se lanzan todas las peticiones en paralelo y se espera a que terminen todas.
  fetch('https://pokeapi.co/')
  .then(res => res.json())
  .then(poke => Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/$%7bpokemon_name%7d').then( r => r.json()),
  ]))



}

function loadImage (url) {
  /// desarrolla la promesa
  return new Promise((resolve, reject) => 
   {
    const imagen = new Image()
    imagen.onload = () => resolve(imagen);
    imagen.onerror = () => reject(new Error("No se pudo cargar la imagen"));
    imagen.src = url;
   }
  )
}
