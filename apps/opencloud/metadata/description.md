# OpenCloud

> **⚠️ Beta Testing Phase**: This application is currently in testing. **Do not use in production environments.** I welcome your feedback! If you encounter any issues or have suggestions for improvements, please report them to help me enhance OpenCloud on runtipi.

> **🌐 Domain Required**: This application must be exposed through a domain name. Local IP access is disabled.

> **⚠️ Phase de Test Beta**: Cette application est actuellement en test. **Ne pas utiliser en environnement de production.** J'accueille vos retours ! Si vous rencontrez des problèmes ou avez des suggestions d'amélioration, veuillez les signaler pour m'aider à améliorer OpenCloud sur runtipi.

> **🌐 Domaine Requis**: Cette application doit obligatoirement être exposée via un nom de domaine. L'accès par IP locale est désactivé.

## 🌐 Overview

OpenCloud is a powerful, open-source cloud storage solution that puts you in complete control of your data. Built as a fork of ownCloud Infinite Scale, it delivers enterprise-grade performance with the privacy and security of self-hosted infrastructure.

## ✨ Key Features

- **🔒 Privacy First**: Keep your data under your control with self-hosted architecture
- **⚡ High Performance**: Built on modern microservices architecture for exceptional speed and scalability
- **🔄 Seamless Collaboration**: Share files and collaborate with advanced permission management
- **🐳 Easy Deployment**: Deploy in minutes using Docker with multi-architecture support
- **📱 Cross-Platform**: Modern web interface with full mobile support

## 💡 Perfect For

- Personal cloud storage and file synchronization
- Team collaboration and file sharing
- Enterprise document management
- Educational institutions
- Anyone who values data privacy and control

## ⬆️ Upgrading to OpenCloud 7.x

Since version 7.x.x, OpenCloud requires a service account configured for the `sharing` service. Starting from this app update, the required `OC_SERVICE_ACCOUNT_ID` and `OC_SERVICE_ACCOUNT_SECRET` values are **automatically generated and injected** at update time — no manual action is required for most users.

⏳ **First startup after the upgrade**: OpenCloud migrates existing Space memberships to a new backend format in the background. Depending on the number of Spaces and members, this can take several minutes. During this time, Space member lists may be incomplete, and creating/deleting Spaces or modifying shares may be temporarily unavailable. Do not restart the container during this migration — just wait until it completes.

### If OpenCloud fails to start after the update

If your instance was previously configured manually and container logs show an error like `The service account id has not been configured for sharing`, follow the official patch procedure:

1. Stop the app from the Runtipi dashboard.
2. Open a temporary shell mounted on your config volume:
   ```
   docker run --rm -it --entrypoint /bin/sh \
     -v "<path-to-app-data>/data/config:/etc/opencloud" \
     opencloudeu/opencloud:7.2.2
   ```
3. Generate the configuration diff:
   ```
   opencloud init --diff
   ```
4. Verify and apply the patch:
   ```
   cd /etc/opencloud
   patch --dry-run opencloud.yaml < opencloud.config.patch
   patch opencloud.yaml < opencloud.config.patch
   ```
5. Exit the container (`exit`) and restart the app from Runtipi.

Full reference: [OpenCloud official upgrade guide](https://docs.opencloud.eu/docs/next/admin/maintenance/upgrade/upgrade-7.x.x/).

---

## 🌐 Présentation

OpenCloud est une solution de stockage cloud open-source puissante qui vous donne le contrôle total de vos données. Construit comme un fork d'ownCloud Infinite Scale, il offre des performances de niveau entreprise avec la confidentialité et la sécurité d'une infrastructure auto-hébergée.

## ✨ Fonctionnalités Clés

- **🔒 Confidentialité Avant Tout**: Gardez vos données sous votre contrôle avec une architecture auto-hébergée
- **⚡ Hautes Performances**: Construit sur une architecture microservices moderne pour une vitesse et une évolutivité exceptionnelles
- **🔄 Collaboration Transparente**: Partagez des fichiers et collaborez avec une gestion avancée des permissions
- **🐳 Déploiement Facile**: Déployez en quelques minutes avec Docker et support multi-architecture
- **📱 Multi-Plateformes**: Interface web moderne avec support mobile complet

## 💡 Parfait Pour

- Stockage cloud personnel et synchronisation de fichiers
- Collaboration d'équipe et partage de fichiers
- Gestion documentaire d'entreprise
- Institutions éducatives
- Toute personne qui valorise la confidentialité et le contrôle des données

## ⬆️ Migration vers OpenCloud 7.x

Depuis la version 7.x.x, OpenCloud nécessite un compte de service configuré pour le service `sharing`. À partir de cette mise à jour de l'app, les valeurs requises `OC_SERVICE_ACCOUNT_ID` et `OC_SERVICE_ACCOUNT_SECRET` sont **générées et injectées automatiquement** lors de la mise à jour — aucune action manuelle n'est requise pour la majorité des utilisateurs.

⏳ **Premier démarrage après la mise à jour** : OpenCloud migre en arrière-plan les informations de membres des Spaces vers un nouveau format. Selon le nombre de Spaces et de membres, cela peut prendre plusieurs minutes. Pendant ce temps, les listes de membres peuvent être incomplètes, et la création/suppression de Spaces ou la modification de partages peuvent être temporairement indisponibles. Ne redémarrez pas le conteneur pendant cette migration — attendez simplement qu'elle se termine.

### Si OpenCloud ne démarre pas après la mise à jour

Si votre instance a été configurée manuellement auparavant et que les logs du conteneur affichent une erreur du type `The service account id has not been configured for sharing`, suivez la procédure officielle de patch :

1. Arrêtez l'application depuis le tableau de bord Runtipi.
2. Ouvrez un shell temporaire monté sur votre volume de configuration :
   ```
   docker run --rm -it --entrypoint /bin/sh \
     -v "<chemin-vers-app-data>/data/config:/etc/opencloud" \
     opencloudeu/opencloud:7.2.2
   ```
3. Générez le diff de configuration :
   ```
   opencloud init --diff
   ```
4. Vérifiez puis appliquez le patch :
   ```
   cd /etc/opencloud
   patch --dry-run opencloud.yaml < opencloud.config.patch
   patch opencloud.yaml < opencloud.config.patch
   ```
5. Quittez le conteneur (`exit`) puis redémarrez l'application depuis Runtipi.

Référence complète : [guide officiel de mise à jour OpenCloud](https://docs.opencloud.eu/docs/next/admin/maintenance/upgrade/upgrade-7.x.x/).
