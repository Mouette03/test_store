# RaspAP — App Description

***

## English

### Short Description

Wireless access point and router manager for Debian-based devices.

### Full Description

RaspAP is a feature-rich, open-source wireless router software designed for Raspberry Pi and other Debian-based devices. It provides a clean, intuitive web interface to configure and manage a WiFi access point directly from your browser — no command-line expertise required.

**Key features:**

- **WiFi Access Point** — Create and manage a wireless hotspot using `hostapd`
- **DHCP & DNS management** — Full control over `dnsmasq` for IP assignment and local DNS
- **VPN support** — Built-in OpenVPN and WireGuard client/server configuration
- **Ad blocking** — Integrated ad and tracker blocking via local DNS
- **Traffic monitoring** — Real-time bandwidth usage and connected clients overview
- **Multiple interfaces** — Manage `wlan0`, `wlan1`, `eth0` and more
- **Network modes** — AP, AP+STA (simultaneous hotspot and client), and bridged modes
- **Responsive UI** — Mobile-friendly web dashboard accessible from any device on the network

RaspAP is ideal for home labs, travel routers, IoT gateways, and privacy-focused networking setups. The Docker image runs with host networking and requires privileged access to manage WiFi hardware directly.

> **Note:** A physical WiFi adapter (e.g., Raspberry Pi built-in or USB WiFi dongle) must be accessible to the host for the access point functionality to work.

***

## Français

### Description courte

Gestionnaire de point d'accès sans fil et de routeur pour les appareils basés sur Debian.

### Description complète

RaspAP est un logiciel de routeur sans fil open-source riche en fonctionnalités, conçu pour le Raspberry Pi et les autres appareils basés sur Debian. Il propose une interface web claire et intuitive pour configurer et gérer un point d'accès WiFi directement depuis votre navigateur — sans nécessiter de compétences en ligne de commande.

**Fonctionnalités principales :**

- **Point d'accès WiFi** — Création et gestion d'un hotspot sans fil via `hostapd`
- **Gestion DHCP & DNS** — Contrôle complet de `dnsmasq` pour l'attribution d'adresses IP et le DNS local
- **Support VPN** — Configuration intégrée de clients/serveurs OpenVPN et WireGuard
- **Blocage des publicités** — Blocage des publicités et traceurs via DNS local
- **Surveillance du trafic** — Aperçu en temps réel de la bande passante utilisée et des clients connectés
- **Interfaces multiples** — Gestion de `wlan0`, `wlan1`, `eth0` et d'autres interfaces réseau
- **Modes réseau** — AP, AP+STA (hotspot et client simultanés), et modes bridge
- **Interface responsive** — Tableau de bord web adapté au mobile, accessible depuis n'importe quel appareil sur le réseau

RaspAP est idéal pour les home labs, les routeurs de voyage, les passerelles IoT et les configurations réseau axées sur la confidentialité. L'image Docker fonctionne avec le réseau hôte et nécessite un accès privilégié pour gérer directement le matériel WiFi.

> **Remarque :** Un adaptateur WiFi physique (ex. : WiFi intégré du Raspberry Pi ou dongle USB WiFi) doit être accessible par l'hôte pour que la fonctionnalité de point d'accès soit opérationnelle.