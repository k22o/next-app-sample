# Next-app-sample

Nextのディレクトリ構成やインストールするもの、サンプルコードなどを蓄える (予定)

## setup

```
$ npm install
```

## 作り方

- sass
- jest
- storybook


```
$ npx create-next-app@latest
$ npm install --save-dev sass 
$ npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
$ npm init jest@latest
$ npm install --save-dev @storybook/nextjs
$ npx storybook@latest init
```

参考

- https://nextjs.org/docs/getting-started/installation
- https://nextjs.org/docs/app/building-your-application/styling/sass
- https://nextjs.org/docs/app/building-your-application/testing/jest

- https://storybook.js.org/docs/get-started/nextjs

## 起動

```
$ npm run dev
```