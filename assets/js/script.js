let playerName = document.getElementById("playerName");
let photosrc = document.getElementById("photosrc");
let position = document.getElementById("position");
let nationality = document.getElementById("nationality");
let nationalitytext = document.getElementById('flag');
let pace = document.getElementById("pace")
let shooting = document.getElementById("shooting")
let passing = document.getElementById("passing")
let dribbling = document.getElementById("dribbling")
let defending = document.getElementById("defending")
let physical = document.getElementById("physical")
let clup = document.getElementById("clup")
let Photo_du_Joueur = document.getElementById("Photo_du_Joueur");
let carousel_cards = document.getElementById('carousel-cards');
let tablue_players = JSON.parse(localStorage.getItem("players")) || [];


async function fetchPlayers() {
  try {
    const response = await fetch("https://mohamedmoustir.github.io/api.p/");
    const data = await response.json();
    const photoContainer = document.getElementById("Photo_du_Joueur");
    let ALphoto = data.players;
    ALphoto.forEach(src => {
      photoContainer.innerHTML += `
        <img 
          onclick="showPlayerInfo('${src.photo}', '${src.name}', '${src.flag}', '${src.logo}', '${src.nationality}', '${src.position}', this)" 
          src="${src.photo}" 
          alt="${src.name}" 
          style="cursor: pointer; width: 120px; margin: 10px;">
      `;
    });
  } catch (error) {
    console.error("An error occurred while fetching players:", error);
  }
}
fetchPlayers();

function showPlayerInfo(photo, name, flag, logo, nationalityt, position_get, targat) {
  photosrc.value = photo;
  playerName.value = name;
  nationality.value = flag;
  clup.value = logo;
  nationalitytext.value = nationalityt;
  position.value = position_get;
}

function setFormation(p) {
  if (p == "4141") {
    document.getElementById("CDM").classList.add("-top-[330px]");
    document.getElementById("CM").classList.add("-top-[80px]", "gap-[100px]");
    document.getElementById("GK").classList.add("-top-[800px]");
    document.getElementsByClassName("round")[0].classList.add("lg:left-[57%]");
    document.getElementsByClassName("roundone")[0].classList.add("lg:left-[42%]");

  } else {
    document.getElementById("CM").scrollBehavior = "smooth"
    document.getElementById("CDM").classList.remove("-top-[330px]");
    document.getElementById("CM").classList.remove("-top-[80px]", "gap-[100px]");
    document.getElementsByClassName("round")[0].classList.remove("lg:left-[57%] ");
    document.getElementsByClassName("roundone")[0].classList.remove("lg:left-[42%]");
  }

}

// close form ajoute
document.getElementById("closeButton").onclick = function () {
  document.getElementById("pop_up_ajoute").classList.toggle("hidden")
  Photo_du_Joueur.classList.toggle("hidden")

}

// open navbar
document.getElementById("closemenu").onclick = function () {
  document.getElementById("menu").classList.toggle("hidden")

}

// open modle form
function ajoutePlayers(positio) {

  playerName.removeAttribute("disabled");
  clup.removeAttribute("disabled");
  nationality.removeAttribute("disabled");
  photosrc.removeAttribute("disabled");
  nationalitytext.removeAttribute("disabled");
  passing.removeAttribute("disabled");
  dribbling.removeAttribute("disabled");
  defending.removeAttribute("disabled");
  physical.removeAttribute("disabled");
  pace.removeAttribute("disabled");
  shooting.removeAttribute("disabled");

  Photo_du_Joueur.classList.toggle("hidden")
  document.getElementById("pop_up_ajoute").classList.toggle("hidden")


  // add data in local 
  document.getElementById("btnajout").onclick = function () {

    // rejex
    const validateInput = (input, regex) => regex.test(input);
    const isPlayerNameValid = validateInput(playerName.value, /^[a-zA-Z\s]{3,20}/);
    const isphotosrcValid = validateInput(photosrc.value, /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/);
    const isNationalityValid = validateInput(nationality.value, /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/);
    const isclupValid = validateInput(clup.value, /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/);
    const isPaceValid = validateInput(pace.value, /^\d{1,2}$/);

    if (!isPlayerNameValid || !isNationalityValid || !isPaceValid || !isphotosrcValid || !isclupValid) {

      document.getElementById("alert_Danger").classList.toggle("hidden")
      setTimeout(() => {
        document.getElementById("alert_Danger").classList.toggle("hidden")
      }, 5000)
    } else {

      document.getElementById("pop_up_ajoute").classList.toggle("hidden")
      Photo_du_Joueur.classList.toggle("hidden")

      let players = {
        id: Math.random() * 100,
        name: playerName.value,
        photo: photosrc.value,
        position: position.value,
        nationality: nationality.value,
        nationalitytext: nationalitytext.value,
        flag: shooting.value,
        club: clup.value,
        passing: passing.value,
        dribbling: dribbling.value,
        defending: defending.value,
        physical: physical.value
      }

      const found_position = tablue_players.some(element => element.position === position.value);
      const namePlayer = tablue_players.some(nam => nam.name === playerName.value);

      if (found_position || namePlayer) {
        document.getElementById("alert_Danger").classList.toggle("hidden")
        setTimeout(() => {
          document.getElementById("alert_Danger").classList.toggle("hidden")
        }, 5000)
      } else {
        tablue_players.push(players)
        localStorage.setItem("players", JSON.stringify(tablue_players));
        afficheJoueurs();
        clearFields();

        document.getElementById("Success_alert").classList.toggle("hidden")
        setTimeout(() => {
          document.getElementById("Success_alert").classList.toggle("hidden")
        }, 5000)

      }


    }
  }
}

function clearFields() {
  playerName.value = "";
  photosrc.value = "";
  position.value = "";
  nationality.value = "";
  pace.value = "";
}

function changer_lesstats(position) {

  if (position === "player-GK") {

    document.getElementsByClassName("pace")[0].innerText = "rating*"
    document.getElementsByClassName("shooting")[0].innerText = "diving*"
    document.getElementsByClassName("passing")[0].innerText = "handling*"
    document.getElementsByClassName("dribbling")[0].innerText = "kicking*"
    document.getElementsByClassName("defending")[0].innerText = "reflexes*"
    document.getElementsByClassName("physical")[0].innerText = "speed*"

  } else {
    document.getElementsByClassName("pace")[0].innerText = "Vitesse(PAC)*"
    document.getElementsByClassName("shooting")[0].innerText = "divingTir(SHO)*"
    document.getElementsByClassName("passing")[0].innerText = "Passes(PAS)*"
    document.getElementsByClassName("dribbling")[0].innerText = "Dribble(DRI)*"
    document.getElementsByClassName("defending")[0].innerText = "Défense(DEF)*"
    document.getElementsByClassName("physical")[0].innerText = "Physique(PHY)*"
  }

}

function afficheJoueurs() {

  tablue_players.forEach(player => {
    const container = document.getElementById(player.position);
    if (container) {

      const isGK = player.position === "player-GK";
      const stats = {
        pace: isGK ? "RAT" : "PAC",
        shooting: isGK ? "DIV" : "SHO",
        passing: isGK ? "HAN" : "PAS",
        dribbling: isGK ? "KIC" : "DRI",
        defending: isGK ? "REF" : "DEF",
        physical: isGK ? "SPD" : "PHY"
      };

      container.innerHTML = `
            <div class="relative flex px-3  text-[#e9cc74]">
              <div class="absolute leading-[1.5rem] font-light uppercase py-2 overflow-hidden">
                <div class="text-base player-rating"></div>
                <div class="text-xs player-position" ><span>${player.position.slice(7)}</span></div>
                <div class="block w-[1.2rem] h-[12px] my-1 player-nation">
                  <img src="${player.nationality}" alt="Nationalité" class="w-full h-full object-contain"/>
                </div>
                <div class="block w-[1.5rem] h-[25px] player-club">
                  <img src="${player.club}" alt="Club" class="mr-12 w-full h-full object-contain"/>
                </div>
              </div>
              <div class="  relative w-[90px] h-[90px] mx-auto overflow-hidden player-picture">
                <img src="${player.photo}" alt="${player.name}" class=" w-full h-full object-contain"/>
              </div>
            </div>
            <div class="relative">
              <div class="block px-1 text-[#e9cc74] w-[80%] mx-auto">
                <div class="block text-center text-base uppercase pb-1">${player.name.slice(0, 11)}</div>
                <div class="flex justify-center my-1 player-features">
                  <div class="items-center relative bottom-[11px]  border-r border-opacity-10 border-[#e9cc74] px-2">
                    <span class="flex text-xs uppercase">
                      <div class="mr-1 font-bold">${player.flag}</div>
                      <div class="font-light">${stats.pace}</div>
                    </span>
                    <span class="flex text-xs uppercase">
                      <div class="mr-1 font-bold">${player.dribbling
        }</div>
                      <div class="font-light">${stats.shooting}</div>
                    </span>
                    <span class="flex text-xs uppercase">
                      <div class="mr-1 font-bold">${player.passing}</div>
                      <div class="font-light">${stats.passing}</div>
                    </span>
                  </div>

                  <div class="items-center relative bottom-[11px] px-2">
                    <span class="flex text-xs uppercase">
                      <div class="mr-1 font-bold">${player.dribbling}</div>
                      <div class="font-light">${stats.dribbling}</div>
                    </span>
                    <span class="flex text-xs uppercase">
                      <div class="mr-1 font-bold">${player.defending}</div>
                      <div class="font-light">${stats.defending}</div>
                    </span>
                    <span class="flex text-xs uppercase">
                      <div class="mr-1 font-bold">${player.physical}</div>
                      <div class="font-light">${stats.physical}</div>
                    </span>
                  </div>
                </div>
              </div>
          <div >
 <div id="btn" class="  absolute -top-[65%]  left-[120%] transform -translate-x-1/2 justify-between items-center mt-4 space-x-4 ">
    <svg onclick="update(${player.id})" class="absolute right-2   w-6 h-6 text-gray-300 hover:text-[#e9cc74] cursor-pointer transition duration-300 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
      <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
    </svg>
    <svg onclick="removePlayer('${player.position}')" class="absolute right-2 top-8   w-6 h-6 text-gray-300 hover:text-red-500 cursor-pointer transition duration-300 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
    </svg>
  </div>
</div>
 
</div>

         `;

    } else {

      container.innerHTML += `
      
          <svg width="100" height="100" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"
            class="text-green-700 relative left-[62%] top-[27%] -translate-x-1/2">
            <path
              d="M18.6275 41.711L18.3137 41.0298C18.1146 41.1215 17.8854 41.1215 17.6863 41.0298L17.3726 41.711L17.6863 41.0298L1.18627 33.4311C0.920355 33.3087 0.75 33.0427 0.75 32.7499V8.7248C0.75 8.42506 0.928458 8.15411 1.20383 8.03575L17.7038 0.943648C17.8929 0.862375 18.1071 0.862375 18.2962 0.943648L34.7962 8.03575C35.0715 8.15411 35.25 8.42506 35.25 8.7248V32.7499C35.25 33.0427 35.0796 33.3087 34.8137 33.4311L18.3137 41.0298L18.6275 41.711Z"
              stroke="currentColor" stroke-width="1.5" fill="none" />
          </svg>
    
          `
    }

  });

}


function update(i) {
 
  Photo_du_Joueur.classList.toggle("hidden")
  document.getElementById("pop_up_ajoute").classList.toggle("hidden")

  const player = tablue_players.find(player => player.id === i);


  if (!player) {
    document.getElementById("alert_Danger").classList.toggle("hidden")
    setTimeout(() => {
      document.getElementById("alert_Danger").classList.toggle("hidden")
    }, 5000)
    return;
  }

  const container = document.getElementById(player.position);

  playerName.setAttribute("disabled", true);
  clup.setAttribute("disabled", true);
  nationality.setAttribute("disabled", true);
  photosrc.setAttribute("disabled", true);
  nationalitytext.setAttribute("disabled", true);
  passing.setAttribute("disabled", true);
  dribbling.setAttribute("disabled", true);
  defending.setAttribute("disabled", true);
  physical.setAttribute("disabled", true);
  pace.setAttribute("disabled", true);
  shooting.setAttribute("disabled", true);

  playerName.value = player.name;
  photosrc.value = player.photo;
  position.value = player.position;
  nationality.value = player.nationality;
  shooting.value = player.flag;
  clup.value = player.club;
  passing.value = player.passing;
  dribbling.value = player.dribbling;
  defending.value = player.defending;
  physical.value = player.physical;
  nationalitytext.value = player.pace;

  document.getElementById("btnajout").innerText = "update";

  document.getElementById("btnajout").onclick = function () {

    const isPositionTaken = tablue_players.some(
      otherPlayer => otherPlayer.position === position.value && otherPlayer.id !== i
    );

    if (isPositionTaken) {
      document.getElementById("alert_Danger").classList.toggle("hidden")
      setTimeout(() => {
        document.getElementById("alert_Danger").classList.toggle("hidden")
      }, 5000)
      return;
    }

    player.position = position.value;

    container.innerHTML = "";
    afficheJoueurs();
    clearFields();
    localStorage.setItem("players", JSON.stringify(tablue_players));
   
    if (container){
      container.innerHTML = `
        <svg width="100" height="100" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" class="text-green-700 relative left-[62%] top-[27%] -translate-x-1/2">
          <path d="M18.6275 41.711L18.3137 41.0298C18.1146 41.1215 17.8854 41.1215 17.6863 41.0298L17.3726 41.711L17.6863 41.0298L1.18627 33.4311C0.920355 33.3087 0.75 33.0427 0.75 32.7499V8.7248C0.75 8.42506 0.928458 8.15411 1.20383 8.03575L17.7038 0.943648C17.8929 0.862375 18.1071 0.862375 18.2962 0.943648L34.7962 8.03575C35.0715 8.15411 35.25 8.42506 35.25 8.7248V32.7499C35.25 33.0427 35.0796 33.3087 34.8137 33.4311L18.3137 41.0298L18.6275 41.711Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>`;

    Photo_du_Joueur.classList.toggle("hidden")

  document.getElementById("pop_up_ajoute").classList.toggle("hidden")
  document.getElementById("Success_alert").classList.toggle("hidden")
  setTimeout(() => {
    document.getElementById("Success_alert").classList.toggle("hidden")
  }, 5000)
    }
  };
}

function removePlayer(i) {
  tablue_players = tablue_players.filter(filter => filter.position !== i)
  localStorage.setItem("players", JSON.stringify(tablue_players));
  const container = document.getElementById(i);
  if (container) {
    container.innerHTML = ` <svg width="100" height="100" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" class="text-green-700 relative left-[62%] top-[27%] -translate-x-1/2">
            <path d="M18.6275 41.711L18.3137 41.0298C18.1146 41.1215 17.8854 41.1215 17.6863 41.0298L17.3726 41.711L17.6863 41.0298L1.18627 33.4311C0.920355 33.3087 0.75 33.0427 0.75 32.7499V8.7248C0.75 8.42506 0.928458 8.15411 1.20383 8.03575L17.7038 0.943648C17.8929 0.862375 18.1071 0.862375 18.2962 0.943648L34.7962 8.03575C35.0715 8.15411 35.25 8.42506 35.25 8.7248V32.7499C35.25 33.0427 35.0796 33.3087 34.8137 33.4311L18.3137 41.0298L18.6275 41.711Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
          </svg> `;
  }

}

afficheJoueurs();
