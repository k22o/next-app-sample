'use client'

import { lazy, Profiler, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const dynamic = 'force-dynamic';

const sleep = (timeMills: number) => new Promise(resolve => setTimeout(resolve, timeMills));
const LazyPart = lazy(() => sleep(2000).then(() => import("./LazyPart")));

export default function Page() {

  return (
    <main>

      <h1>組み込みコンポーネント</h1>
      
      <section>
        <h2>Suspense</h2>
        <p>suspenseを使って、ローディングを作れる。awaitする必要がある要素に対して効力を発揮する。</p>
        <Suspense fallback={<Loading/>}>
          <LazyPart/>
        </Suspense>
      </section>

      <section>
        <h2>Profiler</h2>
        <Profiler id="profiler" onRender={onRender}>
          <p>パフォーマンスの計測に使える。結果はconsoleに出力</p>
        </Profiler>
      </section>

      <section>
        <h2>Portal</h2>
        <p>ダイアログなど、モジュール化するとdom構造が複雑になってしまう場合に利用する。</p>
        <p>どこにコンポーネントを記載しても、指定したidの位置にモジュールを埋め込むことができる。</p>
        <div id="portal"></div>
        <Portal/>
      </section>

    </main>
  );
}

function Loading() {
  return (
    <p>Loading...</p>
  )
}

function onRender(
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
): void {
  console.log(`actualDuration: ${actualDuration}`);
}

/**
 * ダイアログなど、モジュール化するとdom構造が複雑になってしまう場合に利用する
 */
function Portal() {

  // レンダリングの順序の都合で、useEffectを使って、管理する
  // 普通、ダイアログは表示フラグを持つので、普通はそのフラグがtrueなら表示とかするため、useEffectは不要のはず
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const el = document.getElementById("portal");
    setPortalRoot(el);
  }, []);

  return (
    <>
      {portalRoot && createPortal(
        <p>---- これはPortalで作成された要素です ----</p>,
        portalRoot
      )}
    </>
  )

}