OpenCode

OpenCode is an open-source AI coding agent that helps you explore codebases, implement features, fix bugs, run commands, and work with your projects through a web interface.

This Runtipi app runs OpenCode as a persistent web service. Its configuration, authentication data, sessions, and workspace are stored in the application's data directory.
Access

Open the application URL provided by Runtipi and authenticate with the following HTTP Basic Auth credentials:

    Username: opencode

    Password: the password configured during installation

Workspace

Your projects are stored in the persistent workspace directory:

text
${APP_DATA_DIR}/data/workspace

Only put repositories in this directory that you explicitly want OpenCode to read or modify.
Configuration and data

OpenCode data is persisted under:

text
${APP_DATA_DIR}/data/home

This includes OpenCode configuration, provider authentication, conversations, local data, and snapshots.
Security

OpenCode can run commands and modify files in its workspace. Do not expose the application publicly without proper access protection. Use a strong password and preferably restrict access through a VPN, Tailscale, or an authentication proxy.

This app does not mount the Docker socket, so OpenCode cannot control Docker containers on the host.
Provider setup

After opening OpenCode, use the /connect command to authenticate with a supported AI provider, or configure provider API keys through the application's environment variables if you add them to the app configuration.
OpenCode

OpenCode est un agent de code IA open source qui aide à explorer des bases de code, implémenter des fonctionnalités, corriger des bugs, exécuter des commandes et travailler sur vos projets depuis une interface web.

Cette application Runtipi exécute OpenCode comme un service web persistant. Sa configuration, ses données d'authentification, ses sessions et son espace de travail sont stockés dans le dossier de données de l'application.
Accès

Ouvrez l'URL de l'application fournie par Runtipi, puis authentifiez-vous avec les identifiants HTTP Basic suivants :

    Utilisateur : opencode

    Mot de passe : celui défini lors de l'installation

Espace de travail

Vos projets sont stockés dans le dossier de travail persistant :

text
${APP_DATA_DIR}/data/workspace

Placez uniquement dans ce dossier les dépôts qu'OpenCode est explicitement autorisé à lire ou modifier.
Configuration et données

Les données OpenCode sont persistées dans :

text
${APP_DATA_DIR}/data/home

Cela inclut la configuration OpenCode, l'authentification des fournisseurs IA, les conversations, les données locales et les snapshots.
Sécurité

OpenCode peut exécuter des commandes et modifier les fichiers de son espace de travail. N'exposez pas l'application publiquement sans protection d'accès adéquate. Utilisez un mot de passe robuste et, de préférence, limitez l'accès avec un VPN, Tailscale ou un proxy d'authentification.

Cette application ne monte pas le socket Docker : OpenCode ne peut donc pas contrôler les conteneurs Docker de l'hôte.
Configuration du fournisseur IA

Après avoir ouvert OpenCode, utilisez la commande /connect pour vous authentifier auprès d'un fournisseur IA pris en charge, ou configurez les clés API des fournisseurs via les variables d'environnement de l'application si vous les ajoutez à sa configuration.