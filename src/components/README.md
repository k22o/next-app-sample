# コンポーネントディレクトリについて

App Routerでは、クライアントコンポーネントとサーバーコンポーネントがある。
以下の通り分類する。

- client: クライアントコンポーネントとしてしか使われないもの
  - onclickなどのイベントハンドラがある場合
  - useEffectなどのReact Hooksが使われる場合
- server: サーバーコンポーネントとしてしか使われないもの
  - どちらでも使える、すなわち、呼び出し元に依存する場合は、serverコンポーネントとして記載する
