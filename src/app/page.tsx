import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <main>
      <h1>Next.js サンプル</h1>
      <section>
        <h2>Next.jsの機能</h2>
        <ul>
          <li><Link href="/server/123?query=abc">サーバーサイドでの変数の取得方法</Link></li>
          <li><Link href="/client/123?query=abc">クライアントサイドでの変数の取得方法</Link></li>
          <li><Link href="/dummy">404ページ</Link></li>
          <li><Link href="/server/1234?query=abc">500ページ</Link></li>
          <li><Link href="/api?query=q">route handlerのテストページ</Link></li>
        </ul>
      </section>

      <section>
        <h2>Reactのチュートリアル</h2>
        <ul>
          <li><Link href="/react-tutorial/component">組み込みコンポーネント</Link></li>
          <li><Link href="/react-tutorial/hook/effect?type=1">hooks: useEffect</Link></li>
          <li><Link href="/react-tutorial/hook/effect?type=2">hooks: useLayoutEffect</Link></li>
          <li><Link href="/react-tutorial/hook/ref">hooks useRef</Link></li>
          <li>forwardRef, useImperativeHandleは省略 </li>
          <li><Link href="/react-tutorial/hook/reducer">hooks reducer</Link></li>
          <li><Link href="/react-tutorial/hook/context">hooks context</Link></li>
          <li><Link href="/react-tutorial/hook/memo">hooks memo</Link></li>
        </ul>
      </section>
    </main>
  );
}
