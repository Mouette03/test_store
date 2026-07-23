# AliasVault

AliasVault est un gestionnaire de mots de passe et d'identité auto-hébergé avec prise en charge des alias email.[1]

## Fonctionnalités

- Coffre-fort auto-hébergé pour identifiants et secrets.[1]
- Gestion intégrée des alias email dans la même application.[1]
- Déploiement possible via une image Docker tout-en-un documentée officiellement.[1]

## Accès

Cette intégration Runtipi expose l'application web sur le port interne 80 du conteneur.[1]

## Configuration

Les variables exposées dans cette app suivent l'exemple Docker Compose officiel et se limitent à `FORCE_HTTPS_REDIRECT` et `PUBLIC_REGISTRATION_ENABLED`.[1]

- `FORCE_HTTPS_REDIRECT` : redirige vers HTTPS lorsqu'un proxy TLS est correctement configuré en amont.[1]
- `PUBLIC_REGISTRATION_ENABLED` : autorise ou non l'inscription de nouveaux utilisateurs.[1]

## Stockage

Les données persistantes sont stockées dans les volumes `/database`, `/logs`, `/secrets` et `/certificates` prévus par l'installation Docker Compose officielle.[1]

## Notes

AliasVault propose aussi des ports optionnels pour les fonctionnalités email, mais cette intégration reprend une version minimale centrée sur l'interface web et la structure Runtipi demandée.[1]