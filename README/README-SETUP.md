# ReactJS App

## Setup Steps

### initialize app

```shell
nvm use 18.0.0
npx create-react-app pro-tour-react-js
cd pro-tour-react-js
npm i
```

### add modules to keep the code clean/consistent

```shell
npm install eslint --save-dev
npx eslint --init
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev
nano .prettierrc
```

(sample) contents of .prettierrc

```js
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "jsxBracketSameLine": true,
  "arrowParens": "always"
}
```

### add style modules

```shell
npm install styled-components --save-dev
npm install react-icons --save
```

#### <-- back to [readme](../README.md)
