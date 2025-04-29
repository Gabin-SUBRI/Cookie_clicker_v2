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

// Fonction pour mettre à jour les affichages des prix et achats dans la boutique
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
    alert(`🍪 Cookies bonus x${achatAjoute4 + 1} !!`);
  }
  compteur += amelio;
  counterDisplay.textContent = `Cookies : ${compteur}`;

  if (compteur >= objectif) {
    alert(
      "🎉 Félicitations ! Tu as atteint l'objectif de 1 000 000 000 cookies !"
    );
  }
});

// Ouverture et fermeture de la boutique
shopBtn.addEventListener("click", () => shop.classList.toggle("hidden"));
closeShop.addEventListener("click", () => shop.classList.add("hidden"));

// Gestion des améliorations en boutique
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
      alert("❌ Pas assez de cookies !");
    }

    // Mise à jour des prix et du nombre d’achats
    updateShopDisplay();
    counterDisplay.textContent = `Cookies : ${compteur}`;
  });
});

// Mise à jour initiale de la boutique
updateShopDisplay();

// Ajoute un écouteur d'événement pour fermer la boutique
closeShop.addEventListener("click", () => {
  console.log("Boutique fermé !");
  document.getElementById("shop").classList.add("hidden"); // Ajoute la classe "hidden"
});
