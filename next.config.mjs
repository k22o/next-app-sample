/** @type {import('next').NextConfig} */

// 環境変数の設定
import { readFile } from "fs/promises"
const fileName = `./config/${process.env.APP_ENV || 'local'}.json`;
const envData = JSON.parse(await readFile(fileName));

const nextConfig = {
    env: envData
};

export default nextConfig;
