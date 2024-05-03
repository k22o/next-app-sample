# React

## 基本的な記述方法
- xxx.jsx (xxx.tsx) は、jsを拡張して、js中に直接htmlを書き込める。これによって、htmlにjsからコンポーネントを流し込んでいく。
- 実際には、jsxがビルドツールによってjsに変換され、それをhtmlが読み出す、というごく一般的な処理プロセスになる。
- Reactは仮想DOMを保有しており、仮想DOMの差分だけを修正していくので、処理が高速になる。

## React要素とReact Component
jsxに記載される`<div>`などの要素は、React要素と呼ばれ、基本的にはhtmlなどとほぼかわらないが、以下のような記述ができる。

```
const name = "world";
<span> Hello, {name} </span>
```

見た目や動作を一緒にした、UI上の1部品をReact Componentとよび、関数やクラスを用いて定義される(関数/クラスComponent)。
名称は、アッパーキャメルケースで記述する必要がある。

```
const Message = (props: {name: string}) { // propsで指定した値を親から引き継ぐ
    const { name } = props:
    return <p> Hello, {name} </p>
}

```

厳密には、任意のオブジェクトをpropsとして受け取り、JSX.element型を返す。

## Context
変数をの渡し方には、propsとContextがある。propsは親から子に変数を毎回渡すが、contextはその必要がない。
1. `React.createContext` で変数を生成する
2. `Provider` で値を設定・更新する
3. `Consumer` で値を参照する

## React Hook
Hookによって、関数コンポーネント中で状態やライフサイクルを扱う仕組み。クラスと同等の機能を実現できる。
デフォルトで複数種類のHookがあり、それらを組み合わせたカスタムHookも作成できる。

### UseEffect
- 関数コンポーネント内で副作用をじっこうできる。
- レンダリング後にDOMを逐次更新するのに利用
- EventListener的な使い方をするためのもの
- useEffect(`第一引数(ラムダ関数)`, `第二引数`)
    - 第二が空 `[]` -> 初期render時にのみ、関数を実行
    - 第二に値あり -> 初回 + 指定した値に変化があった場合に関数を実行



# Next.js

ここに書いてあるのは古い情報なので、更新したい。

## レンダリング手法
- Static Site Generator (SSG)
    - あらかじめサーバー側でhtmlを作成し保存する
    - 外部データを利用する場合 (APIなど) には、getStaticPropsを利用する
    - build時に、自動でgetStaticPropsが呼ばれる
- Client Side Rendering (CSR)
    - もとのReactに近い形。
    - 時間がかかるのであまりSEO的には有効ではなく、SSG, SSR, ISRを組み合わせて使う
    - useEffectやSWRなどのHookで実現
- Server Side Rendering (SSR)
    - SSGのように保存はしておかず、client側に呼び出された後に非同期でデータを取得する
    - asyncメソッドである、getServerSidePropsのメソッド内でAPIのデータを取得する
- Increment Static Regeneration (ISR)
    - SSGに基本的には同じ
    - 一定時間が経過すると、再度GetStaticPropsが自動で動き、保存データを更新する

## ファイル構成
- `hoge` というディレクトリに `index.ts`がある場合は、import時に `hoge` を指定すると`index.ts` が利用される。
- Componentsの要素は大文字パスカルケース、他はケバブのことが多い
- `pages/_app.tsx` は、その他ページの親に該当し、Componentが他のページで置き換えられる

## Routing
https://nextjs-ja-translation-docs.vercel.app/docs/routing/introduction

- pages以下、indexというファイルをルートとして認識する
    - `pages/index.tsx` -> `/`
    - `pages/abc/index.tsx` -> `/abc`
- ファイル名にあわせてルーティングする
    - `pages/abc/def.tsx` -> `/abc/def`
- ページ間の遷移には、`Link` というReactComponentを利用する
- リダイレクトには、後述する`useRouter.push()` を使う
- `hoge/[id].js` とすると、`hoge/1`や `hoge/2` を受け取れる
- `huga/[...slug].js` とすると、なんでも、すなわち`huga/abc` や `huga/abc/def` を受け取れる
- クエリパラメータを扱う場合
    - js側なら`useRouter.query`
    - client側なら getServerSidePropsの引数contextについて、`context.query`

## 特殊なページ
- 404
    - 設定する必要なく、自動でデフォルトに遷移する
    - カスタマイズしたページが必要なら、 `pages/404.tsx` を作成すればよい
- 500
    - 設定する必要なく、自動でデフォルトに遷移する
    - カスタマイズしたページが必要なら、 `pages/500.tsx` を作成すればよい
    - 明確にエラーハンドリングを実現したいなら、``pages/_error.tsx` を作成する
    - https://nextjs-ja-translation-docs.vercel.app/docs/advanced-features/custom-error-page

## CSS
https://nextjs-ja-translation-docs.vercel.app/docs/basic-features/built-in-css-support
- `_app.js` に読み込んだスタイルシートのみ、globalに読み込まれる。
- `[name].module.css` を利用することで、コンポーネントごとに読み込んでも衝突しない。

## NextのAPI
### router
- nextでは、routerオブジェクトに現在のルートやパスの情報が含まれている。
- この情報を取得したい場合は、`useRouter`というフックを利用する。
- next/Linkでは実現できない遷移は、`useRouter.push()`で行う
- `useRouter.query`でクエリパラメータを取得できる
### image
- imageタグの代わりに用いる。パフォーマンスが優れている。
- `<Image src="xxx"></Image>` の感じ