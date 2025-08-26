# PHPMyAdmin 🖥️💾

PHPMyAdmin is a web interface to manage MySQL and MariaDB databases visually. Browse databases, tables, users, and permissions with a clean graphical interface.

## Connecting to other Docker containers / networks 🔗

- **Server field in phpMyAdmin 📝:**  
  - Enter the **IP address of the database container** you want to connect to.  
  - Use the database **username** and **password**.  
  - Specify the **port** if it is different from the default `3306`.  

- **Connect networks together 🌐:**  
  - If the database container is on a different Docker network, you must connect the networks.  
  - **Via SSH 🔑:** Log in to the host system where Docker runs and execute:  
    ```bash
    docker network connect <phpmyadmin-network> <database-container>
    ```
  - **Via Portainer 🛠️:** Use the network management interface to attach the phpMyAdmin container to the target database network.  

**Tip 💡:** Knowing the container’s IP, port, and credentials is enough to connect phpMyAdmin to any database, even across networks.

---

# PHPMyAdmin 🖥️💾 (Français)

PHPMyAdmin est une interface web pour gérer visuellement des bases MySQL et MariaDB. Parcourez bases, tables, utilisateurs et permissions via une interface graphique claire et intuitive.

## Se connecter à d’autres containers / réseaux Docker 🔗

- **Champ “Server” dans phpMyAdmin 📝 :**  
  - Saisissez l’**adresse IP du container de base de données** auquel vous voulez vous connecter.  
  - Entrez le **nom d’utilisateur** et le **mot de passe**.  
  - Indiquez le **port** si ce n’est pas le port par défaut `3306`.  

- **Connecter les réseaux entre eux 🌐 :**  
  - Si le container de base est sur un réseau Docker différent, il faut connecter les réseaux.  
  - **Via SSH 🔑 :** Connectez-vous à l’hôte Docker et exécutez :  
    ```bash
    docker network connect <réseau-de-phpmyadmin> <container-de-la-base>
    ```
  - **Via Portainer 🛠️ :** Utilisez l’interface de gestion des réseaux pour attacher le container phpMyAdmin au réseau du container de base.  

**Astuce 💡 :** Avec l’adresse IP, le port et les identifiants, phpMyAdmin peut se connecter à n’importe quelle base, même sur un autre réseau Docker.
