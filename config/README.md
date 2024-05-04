# configディレクトリについて

Nextで環境変数を扱う際には簡易なやり方があるが、local, development, productionしかサポートされていない。

そこで、環境変数の切り替えはprocess.env.APP_ENVを利用して、next.config.js内で独自に行う。

[https://zenn.dev/jj/articles/next-js-env-best-practice](https://zenn.dev/jj/articles/next-js-env-best-practice)
