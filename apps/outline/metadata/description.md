# Outline

**Open-source team knowledge base** for team documentation with real-time collaboration.

##  Configurable Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OUTLINE_PG_PASSWORD` | Database password (auto-generated) | Yes |
| `OUTLINE_SECRET_KEY` | Secret key (auto-generated, 64 chars) | Yes |
| `OUTLINE_UTILS_SECRET` | Utils secret (auto-generated) | Yes |
| `OUTLINE_DEFAULT_LANGUAGE` | Interface language, e.g. `fr_FR` | No |
| `OUTLINE_SMTP_HOST` | SMTP server (magic-link sign-in) | No |
| `OUTLINE_SMTP_PORT` | SMTP port (587/465) | No |
| `OUTLINE_SMTP_USER` | SMTP Username | No |
| `OUTLINE_SMTP_PASSWORD` | SMTP Password | No |
| `OUTLINE_SMTP_FROM` | Sender email for Outline emails | No |
| `OUTLINE_OIDC_CLIENT_ID` | OIDC Client ID (Authentik, Keycloak…) | No |
| `OUTLINE_OIDC_CLIENT_SECRET` | OIDC Client Secret | No |
| `OUTLINE_OIDC_AUTH_URI` | OIDC Authorization URI | No |
| `OUTLINE_OIDC_TOKEN_URI` | OIDC Token URI | No |
| `OUTLINE_OIDC_USERINFO_URI` | OIDC UserInfo URI | No |

##  Key Features

- **Real-time collaboration**: Multi-player editing with live cursors
- **Markdown editor**: Clean writing experience, slash commands, templates
- **Collections & sharing**: Public shared links, nested collections
- **Search**: Full-text search with filters and recent documents
- **Version history**: Keep track of all document changes
- **Integrations**: Slack, GitHub, Figma, Linear, Notion import
- **Auth**: SMTP magic-link, Google, Slack, Discord or any OIDC provider
- **Local storage**: attachments stored in the app data directory

---

# Outline — Wiki et base de connaissances open source

**Base de connaissances open source** pour la documentation d'équipe avec collaboration en temps réel.

##  Variables configurables

| Variable | Description | Requis |
|----------|-------------|--------|
| `OUTLINE_PG_PASSWORD` | Mot de passe base de données (auto-généré) | Oui |
| `OUTLINE_SECRET_KEY` | Clé secrète (auto-générée, 64 caractères) | Oui |
| `OUTLINE_UTILS_SECRET` | Secret utils (auto-généré) | Oui |
| `OUTLINE_DEFAULT_LANGUAGE` | Langue de l'interface, ex. `fr_FR` | Non |
| `OUTLINE_SMTP_HOST` | Serveur SMTP (connexion par magic-link) | Non |
| `OUTLINE_SMTP_PORT` | Port SMTP (587/465) | Non |
| `OUTLINE_SMTP_USER` | Utilisateur SMTP | Non |
| `OUTLINE_SMTP_PASSWORD` | Mot de passe SMTP | Non |
| `OUTLINE_SMTP_FROM` | Email d'envoi des mails Outline | Non |
| `OUTLINE_OIDC_CLIENT_ID` | Client ID OIDC (Authentik, Keycloak…) | Non |
| `OUTLINE_OIDC_CLIENT_SECRET` | Client Secret OIDC | Non |
| `OUTLINE_OIDC_AUTH_URI` | URI d'autorisation OIDC | Non |
| `OUTLINE_OIDC_TOKEN_URI` | URI de jeton OIDC | Non |
| `OUTLINE_OIDC_USERINFO_URI` | URI UserInfo OIDC | Non |

##  Fonctionnalités clés

- **Collaboration en temps réel** : édition rapide avec curseurs live
- **Éditeur Markdown** : écriture épurée, commandes slash, maths
- **Documents & partage** : liens privés de partage, collections
- **Recherche** : recherche plein-texte avec documents récents
- **Historique des versions** : suivi de toutes les modifications
- **Intégrations** : Slack, Discord, Figma, Notion
- **Authentification** : SMTP magic-link, Google/Slack/Azure ou tout provider OIDC
- **Stockage local** : fichiers stockés dans le dossier de données de l'app