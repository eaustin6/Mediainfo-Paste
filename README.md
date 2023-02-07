<h1>Introduction</h1>
<p><b>Mediainfo Viewer</b> is a static website to view nicely formatted mediainfo&nbsp;&nbsp;

<a href="https://go.deta.dev/deploy?repo=https://github.com/BioHazard786/Mediainfo-viewer">
    <img src="https://button.deta.dev/1/svg" alt="Deploy" height="26">
</a>

## Installing

It can be deployed on deta or you need node v16.13.0 or later and also need deta's project key if not deploying on deta.

### Configuration

- Set `HOST` and `PORT` in environment variables or in arguments. Default it will listen on `127.0.0.1:8000`.
- Set `DETA_PROJECT_KEY` in environment varibales.

### Deployment

- Install dependencies using `npm`

```
npm install
```

- Run it using `node`

```
node index.js
```

### Copyright & License

Copyright (©) 2022 by [Adnan Ahmad](https://github.com/BioHazard786).
Licensed under the terms of the [MIT](./LICENSE)
