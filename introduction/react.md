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
