/** @type {import('next').NextConfig} */

// 環境変数の設定
import { readFile } from "fs/promises"
const fileName = `./config/${process.env.APP_ENV || 'local'}.json`;
const envData = JSON.parse(await readFile(fileName));

const nextConfig = {
    env: envData,
    compress: true, // gzip圧縮の有効化。デフォルトでtrueだがわかりやすいように明示しておく
    headers: async () => {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'max-age=30',
                    },
                    {
                        key: 'x-custom-header',
                        value: 'custom-value',
                    }
                ]
            }
        ]
    }
};


export default nextConfig;
