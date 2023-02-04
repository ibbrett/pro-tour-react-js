# ReactJS App

## Setup Steps

### initialize app

```shell
nvm use 18.0.0
npx create-react-app pro-tour-react-js
cd pro-tour-react-js
npm i
```

### add modules, config VSCode to keep the code clean/consistent

1. add/enable eslint extension to VSCode
2. create [.eslintrc](../.eslintrc)

```js
{"extends": "react-app"}
```

3. add/enable Prettier extension to VSCode
4. install modules

```shell
npm i prettier eslint-config-prettier eslint-plugin-prettier --save
```

5. created [workspace vscode settings file](../.vscode/settings.json)

### add style modules

```shell
npm install styled-components --save-dev
npm install react-icons --save
```

#### <-- back to [readme](../README.md)
