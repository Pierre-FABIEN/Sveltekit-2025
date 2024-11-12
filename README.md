# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


A installer:
threlte
Loader
0auth
sitemap


Ne peut être :
multiLang
PWA



Options supplémentaires
svelte-sitemap offre plusieurs options pour personnaliser votre sitemap :

--out-dir, -o : Spécifie le dossier de sortie si différent de build.

bash
Copier le code
npx svelte-sitemap --domain https://votredomaine.com --out-dir dist
--ignore, -i : Ignore des fichiers ou des dossiers spécifiques.

bash
Copier le code
npx svelte-sitemap --domain https://votredomaine.com --ignore '**/admin/**' --ignore 'pages/secret-page'
--trailing-slashes, -t : Ajoute des slashes à la fin des URLs.

bash
Copier le code
npx svelte-sitemap --domain https://votredomaine.com --trailing-slashes
--reset-time, -r : Définit lastModified à la date et l'heure actuelles.

bash
Copier le code
npx svelte-sitemap --domain https://votredomaine.com --reset-time
--change-freq, -c : Définit la fréquence de changement des pages.

bash
Copier le code
npx svelte-sitemap --domain https://votredomaine.com --change-freq daily
