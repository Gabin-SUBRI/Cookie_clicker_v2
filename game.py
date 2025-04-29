# Imports of this program for Windows
# import msvcrt
import random
import time

# Imports of this program for Linux
import sys
import tty
import termios

def getch():
    file_descriptor = sys.stdin.fileno()
    old_settings = termios.tcgetattr(file_descriptor)
    try:
        tty.setraw(file_descriptor)
        char = sys.stdin.read(1)
    finally:
        termios.tcsetattr(file_descriptor, termios.TCSADRAIN, old_settings)
    return char


# Variables initialization
compteur = 0
touche = ""
amélio = 1
achat_ajoute1 = 0
achat_ajoute2 = 0
achat_ajoute3 = 0
achat_ajoute4 = 0
objectif = 1000000000

# Function to display the shop menu and handle purchases
def boutique(compteur, amélio, achat_ajoute1, achat_ajoute2,achat_ajoute3,achat_ajoute4):
    print("\n######################################################################################################\n#                                                                                                    #")
    print("#                                   Bienvenue à la boutique !                                        #\n#                                                                                                    #")
    print(f"#                                          Tu as {compteur} cookies.                                          #\n#                                                                                                    #")    
    print(f"#             1. Amélioration de click (+1) : {(achat_ajoute1 +1) *50 *(achat_ajoute1 + 1)} cookies (Acheté {achat_ajoute1} fois)                             #")
    print(f"#             2. Amélioration de click (*2) : {(achat_ajoute2 + 1) * 200* (achat_ajoute2+1)} cookies (Acheté {achat_ajoute2} fois)                            #")
    print(f"#             3. Augmente ta chance d'avoir un cookie bonus : {(achat_ajoute3 + 1) * 1000 *(achat_ajoute3 + 1)} cookies (Acheté {achat_ajoute3} fois)           #")
    print(f"#             4. Augmente ta quantité de cookie bonus : {(achat_ajoute4 + 1) * 2000*(achat_ajoute4 + 1)} cookies (Acheté {achat_ajoute4} fois)                 # \n#                                                                                                    #")
    print("#   Appuie sur 'q' pour quitter la boutique.                                                         #")
    print("#                                                                                                    #\n######################################################################################################\n")

# Shop interaction loop
    while True:
        choix = termios.tcgetattr().decode("utf-8")
        if choix == "1" and compteur >= (achat_ajoute1 +1) *50 *(achat_ajoute1 + 1):
            # Handle click improvement purchase (+1)
            amélio += 1
            compteur -= (achat_ajoute1 +1) *50 *(achat_ajoute1 + 1)
            achat_ajoute1 += 1
            print(f"Amélioration de click achetée ! 🚀 {achat_ajoute1}")
        elif choix == "2" and compteur >= (achat_ajoute2 + 1) * 200* (achat_ajoute2+1):
            # Handle click improvement purchase (*2)
            amélio *= 2
            compteur -= (achat_ajoute2 + 1) * 200* (achat_ajoute2+1)
            achat_ajoute2 += 1
            print(f"Amélioration de click achetée ! 🚀 {achat_ajoute2}")
        elif choix == "3" and compteur >= (achat_ajoute3 +1) * 1000 *(achat_ajoute3 + 1):
            # Handle bonus chance improvement purchase
            compteur -= (achat_ajoute3 +1) *1000*(achat_ajoute3 + 1)
            achat_ajoute3 += 1
            print(f"Amélioration de chance élevé à {achat_ajoute3}%")
        elif choix == "4" and compteur >= (achat_ajoute4 +1) * 2000*(achat_ajoute4 + 1):
            # Handle bonus quantity improvement purchase
            compteur -= (achat_ajoute4 +1) *2000*(achat_ajoute4 + 1)
            achat_ajoute4 += 1
            print(f"Amélioration de cookie bonus à x{achat_ajoute4+2}")
        elif choix == "q":
            # Exit the shop
            print("Merci pour ta visite !\n")
            break
        else:
            # Handle invalid input or insufficient cookies
            print("Option invalide ou pas assez de cookies.")
    return compteur, amélio, achat_ajoute1, achat_ajoute2, achat_ajoute3, achat_ajoute4

# Main menu instructions
print("\nAppuie sur 'Espace' pour miner des cookies. \n"
    "Appuie sur 'b' pour accéder à la boutique.\n"
    "Appuie sur 'q' pour quitter.")
start_time = time.time() # Start the timer

# Main game loop
while touche != "q":
    touche = termios.tcgetattr().decode("utf-8")
    if touche == " ":
        if random.randint(1,100) <= achat_ajoute3 :
            compteur += amélio * (achat_ajoute4 + 1)
            print(f"Cookies bonus x{achat_ajoute4+1} !!")
        compteur += amélio
        print(f"Cookies : {compteur}")
    if touche == "b":
        compteur,amélio,achat_ajoute1,achat_ajoute2,achat_ajoute3, achat_ajoute4 = boutique(compteur,amélio,achat_ajoute1,achat_ajoute2, achat_ajoute3, achat_ajoute4)
    if touche == "p":        
        elapsed_time = time.time() - start_time  # Time elapsed in seconds
        minutes = int(elapsed_time // 60)
        seconds = int(elapsed_time % 60)
        print(f"{minutes}min {seconds}s")
    if compteur >= objectif:
        # Check for winning condition
        print("\n🎉 Félicitations ! Tu as atteint l'objectif de 1 000 000 000 cookies ! 🎉")
        print (f"Tu as améilorer {achat_ajoute1} fois l'amélioration 1")
        print (f"Tu as améilorer {achat_ajoute2} fois l'amélioration 2")
        print (f"Tu as améilorer {achat_ajoute3} fois l'amélioration 3")
        print (f"Tu as améilorer {achat_ajoute4} fois l'amélioration 4")
        elapsed_time = time.time() - start_time  
        minutes = int(elapsed_time // 60)
        seconds = int(elapsed_time % 60)
        print(f"Temps total de jeu : {minutes} min {seconds} sec")
        print("Tu peux relancer le jeu pour essayer de battre ton score.")
        print ("quelquun l'a fait en 1min et 12s")
        break 
    if touche == "q":
        # Handle quitting early
        print("Le défi était trop haut pour toi ?")
print("Fin du programme.")