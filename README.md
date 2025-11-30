# README

A website builder for 'Beauty of Clay' hosted at <https://www.beautyofclay.co.uk/>

## Local development

Run `npm i` to install dependencies (note: ensure you have a valid non-expired Github Personal Access Token present in GITHUB_TOKEN env variable to authenticate and successfully download the packages from privately-hosted @fishion repository)

`npm run build` To generate the site to docs folder
`npm run serve` Run local server to serve site from docs folder

## Publishing

Site is hosted in Github Pages. On commit & push to github repo, github pages publish the new version from the docs folder.
