\# PHPMyAdmin 🖥️💾



PHPMyAdmin is a web interface to manage MySQL and MariaDB databases visually. Browse databases, tables, users, and permissions with a clean graphical interface.



\## Connecting to other Docker containers / networks 🔗



\- \*\*Server field in phpMyAdmin 📝:\*\*  

&nbsp; - Enter the \*\*IP address of the database container\*\* you want to connect to.  

&nbsp; - Use the database \*\*username\*\* and \*\*password\*\*.  

&nbsp; - Specify the \*\*port\*\* if it is different from the default `3306`.  



\- \*\*Connect networks together 🌐:\*\*  

&nbsp; - If the database container is on a different Docker network, you must connect the networks.  

&nbsp; - \*\*Via SSH 🔑:\*\* Log in to the host system where Docker runs and execute:  

&nbsp;   ```bash

&nbsp;   docker network connect <phpmyadmin-network> <database-container>

&nbsp;   ```

&nbsp; - \*\*Via Portainer 🛠️:\*\* Use the network management interface to attach the phpMyAdmin container to the target database network.  



\*\*Tip 💡:\*\* Knowing the container’s IP, port, and credentials is enough to connect phpMyAdmin to any database, even across networks.



---



\# PHPMyAdmin 🖥️💾 (Français)



PHPMyAdmin est une interface web pour gérer visuellement des bases MySQL et MariaDB. Parcourez bases, tables, utilisateurs et permissions via une interface graphique claire et intuitive.



\## Se connecter à d’autres containers / réseaux Docker 🔗



\- \*\*Champ “Server” dans phpMyAdmin 📝 :\*\*  

&nbsp; - Saisissez l’\*\*adresse IP du container de base de données\*\* auquel vous voulez vous connecter.  

&nbsp; - Entrez le \*\*nom d’utilisateur\*\* et le \*\*mot de passe\*\*.  

&nbsp; - Indiquez le \*\*port\*\* si ce n’est pas le port par défaut `3306`.  



\- \*\*Connecter les réseaux entre eux 🌐 :\*\*  

&nbsp; - Si le container de base est sur un réseau Docker différent, il faut connecter les réseaux.  

&nbsp; - \*\*Via SSH 🔑 :\*\* Connectez-vous à l’hôte Docker et exécutez :  

&nbsp;   ```bash

&nbsp;   docker network connect <réseau-de-phpmyadmin> <container-de-la-base>

&nbsp;   ```

&nbsp; - \*\*Via Portainer 🛠️ :\*\* Utilisez l’interface de gestion des réseaux pour attacher le container phpMyAdmin au réseau du container de base.  



\*\*Astuce 💡 :\*\* Avec l’adresse IP, le port et les identifiants, phpMyAdmin peut se connecter à n’importe quelle base, même sur un autre réseau Docker.



