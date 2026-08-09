# Temple Baptist Church Wichita — Public Website

Public marketing / visitor site for **tbcwichita.com**.

This repository is **separate** from the member church app (`TBC-APP`) so deploys do not affect each other.

## Pages
- `index.html` — Home
- `visit.html` — Service times & directions
- `about.html` — About & statement of faith
- `sermons.html` — YouTube / livestreams
- `give.html` — Online giving
- `contact.html` — Contact info
- `privacy.html` — Privacy policy (needed for app stores later)

## Deploy (Cloudflare Pages)
1. Cloudflare Dashboard → Workers & Pages → Create → Pages
2. Connect this GitHub repo (`jacobreese95/TBC-Website`)
3. Build settings: framework preset **None**, output directory `/` (or leave default for static)
4. Deploy
5. Later: attach custom domain `tbcwichita.com` (and optionally `www`)

## Member app
Link the **Church App** button to your live app URL when ready (currently placeholder `https://tbc-app.pages.dev` — update to your real Workers/Pages URL).

## Domain later
When `tbcwichita.com` is transferred, point DNS to Cloudflare and add the custom domain on this Pages project. No rebuild of the member app is required.
