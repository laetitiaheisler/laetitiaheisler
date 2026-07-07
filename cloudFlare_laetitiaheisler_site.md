# Cloudflare - Site Laetitia Heisler

## État actuel (07/07/2026)

### Ce qui a été fait

- [x] Site HTML local prêt dans `/site_code_replique/`
- [x] Images Squarespace remplacées par chemins locaux (`images/`)
- [x] Dépot GitHub créé : https://github.com/laetitiaheisler/laetitiaheisler
- [x] Compte Cloudflare créé
- [x] Domaine `laetitiaheisler.com` ajouté à Cloudflare (plan Free)
- [x] Nameservers Squarespace → Cloudflare :
  - `ivan.ns.cloudflare.com`
  - `kehlani.ns.cloudflare.com`
- [x] DNS scannés : MX records Google Workspace importés (email préservé)
- [x] Decap CMS installé (`admin/index.html` + `admin/config.yml`)
- [x] Contenu extrait dans `_content/` (about.json, contact.json, workshops.json, works/*.md, news/*.md)
- [x] Projet Cloudflare Pages déployé (Worker URL temporaire)
- [x] Notice utilisateur : `NOTICE_UTILISATION.md` (locale uniquement, .gitignore)
- [x] Doc de suivi : `cloudFlare_laetitiaheisler_site.md`

### Comptes

| Service | Identifiant | URL |
|---|---|---|
| GitHub | laetitiaheisler | https://github.com/laetitiaheisler/laetitiaheisler |
| Cloudflare | laetitia-cassouheisler.workers.dev | https://dash.cloudflare.com |
| Squarespace | (domaine + email) | https://account.squarespace.com |
| Email | Google Workspace (MX: aspmx.l.google.com) | Préservé |

### À faire

- [ ] Uploader les 8 photos dans `images/` sur GitHub
- [ ] Finaliser le custom domain dans Cloudflare Pages
- [ ] Résilier l'abonnement Squarespace site (garder domaine + email)

### Structure du projet

```
/site_code_replique/
├── index.html          # Page d'accueil (Works)
├── about.html          # À propos
├── calendar.html       # Calendrier/CV
├── news.html           # Actualités
├── workshops.html      # Workshops
├── contact.html        # Contact
├── css/style.css       # Design
├── js/
│   ├── script.js       # Menu mobile + animations
│   └── content-loader.js  # Charge le contenu depuis _content/
├── admin/
│   ├── index.html      # Interface Decap CMS
│   └── config.yml      # Configuration du CMS
├── _content/
│   ├── about.json      # Bio modifiable via admin
│   ├── contact.json    # Contact modifiable via admin
│   ├── workshops.json  # Intro workshops modifiable
│   ├── works/          # 8 œuvres (markdown)
│   └── news/           # 5 actualités (markdown)
├── images/             # Photos du site
├── NOTICE_UTILISATION.md   # Locale uniquement (.gitignore)
└── cloudFlare_laetitiaheisler_site.md
```

### Coûts actuels

| Service | Prix |
|---|---|
| Domaine (Squarespace) | ~30€/an |
| Google Workspace (email) | ~23€/mois |
| Cloudflare Pages | **0€** |
| **Total** | **~23€/mois** |

### Pour aller plus loin

- Remplacer Google Workspace (23€/mois) par Zoho Mail (1€/mois)
- Ajouter des pages (Expositions, Projets, etc.)
- Ajouter une galerie avec filtre
- Améliorer le design
