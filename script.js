// Variables du jeu
let compteur = 0;
let amelio = 1;
let achatAjoute1 = 0;
let achatAjoute2 = 0;
let achatAjoute3 = 0;
let achatAjoute4 = 0;
const objectif = 1000000000;

// Sélection des éléments HTML
const cookieBtn = document.getElementById("cookie-btn");
const counterDisplay = document.getElementById("cookie-counter");
const shopBtn = document.getElementById("shop-btn");
const shop = document.getElementById("shop");
const closeShop = document.getElementById("close-shop");
const alertMessage = document.getElementById("alert-message");
const bonusMessage = document.getElementById("bonus-message");

// Fonction pour afficher les messages d'alerte
function showMessage(element, message) {
  element.textContent = message;
  element.classList.add("visible");

  setTimeout(() => {
    element.classList.remove("visible");
  }, 2000);
}

// Fonction pour mettre à jour les affichages des prix et achats
function updateShopDisplay() {
  const upgrades = [
    {
      id: "price-click",
      countId: "count-click",
      basePrice: 50,
      level: achatAjoute1,
    },
    {
      id: "price-multiplier",
      countId: "count-multiplier",
      basePrice: 200,
      level: achatAjoute2,
    },
    {
      id: "price-bonus",
      countId: "count-bonus",
      basePrice: 1000,
      level: achatAjoute3,
    },
    {
      id: "price-bonus-amount",
      countId: "count-bonus-amount",
      basePrice: 2000,
      level: achatAjoute4,
    },
  ];

  upgrades.forEach((upgrade) => {
    document.getElementById(upgrade.id).textContent =
      (upgrade.level + 1) * upgrade.basePrice * (upgrade.level + 1);
    document.getElementById(upgrade.countId).textContent = upgrade.level;
  });
}

// Interaction : clic sur le cookie
cookieBtn.addEventListener("click", () => {
  if (Math.random() * 100 <= achatAjoute3) {
    compteur += amelio * (achatAjoute4 + 1);
    showMessage(bonusMessage, `🍪 Cookies bonus x${achatAjoute4 + 1} !!`);
  }

  compteur += amelio;
  counterDisplay.textContent = `Cookies : ${compteur}`;

  if (compteur >= objectif) {
    function showVictoryScreen() {
      document.getElementById("victory-screen").classList.remove("hidden");

      setTimeout(() => {
        document.getElementById("victory-screen").classList.add("hidden"); // Cache après 5 sec
      }, 5000);
    }

    // Modification de la condition de victoire
    if (compteur >= objectif) {
      showVictoryScreen(); // Affiche l'écran de victoire
    }
  }
});

// Ouverture et fermeture de la boutique
shopBtn.addEventListener("click", () => shop.classList.toggle("hidden"));
closeShop.addEventListener("click", () => shop.classList.add("hidden"));

// Gestion des améliorations
document.querySelectorAll("#shop button[data-type]").forEach((button) => {
  button.addEventListener("click", () => {
    let type = button.getAttribute("data-type");

    const upgrades = {
      click: {
        price: (achatAjoute1 + 1) * 50 * (achatAjoute1 + 1),
        action: () => (amelio += 1),
        level: () => achatAjoute1++,
      },
      multiplier: {
        price: (achatAjoute2 + 1) * 200 * (achatAjoute2 + 1),
        action: () => (amelio *= 2),
        level: () => achatAjoute2++,
      },
      bonus: {
        price: (achatAjoute3 + 1) * 1000 * (achatAjoute3 + 1),
        action: () => achatAjoute3++,
        level: () => achatAjoute3++,
      },
      "bonus-amount": {
        price: (achatAjoute4 + 1) * 2000 * (achatAjoute4 + 1),
        action: () => achatAjoute4++,
        level: () => achatAjoute4++,
      },
    };

    if (compteur >= upgrades[type].price) {
      compteur -= upgrades[type].price;
      upgrades[type].action();
      upgrades[type].level();
    } else {
      showMessage(alertMessage, "❌ Pas assez de cookies !");
    }

    updateShopDisplay();
    counterDisplay.textContent = `Cookies : ${compteur}`;
  });
});

// Mise à jour initiale de la boutique
updateShopDisplay();

function updateBackground() {
  let progression = Math.min(compteur / objectif, 1); // Valeur entre 0 et 1

  let r = Math.round(255 - progression * (255 - 139)); // Transition du blanc vers le marron
  let g = Math.round(248 - progression * (248 - 69));
  let b = Math.round(220 - progression * (220 - 19));

  document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
}

// Appelle cette fonction à chaque mise à jour du compteur
cookieBtn.addEventListener("click", () => {
  compteur += amelio;
  updateBackground(); // Met à jour la couleur du fond
  counterDisplay.textContent = `Cookies : ${compteur}`;

  if (compteur >= objectif) {
  }
});

function showVictoryScreen() {
  const victoryScreen = document.getElementById("victory-screen");
  victoryScreen.classList.remove("hidden"); // Affiche l'écran de victoire

  setTimeout(() => {
    victoryScreen.classList.add("hidden"); // Cache l'écran après 5 sec
  }, 5000);
}

// Vérifie que l'objectif est atteint
if (compteur >= objectif) {
  showVictoryScreen(); // Affiche l'écran de victoire
}
