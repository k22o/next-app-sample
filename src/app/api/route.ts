import { headers } from "next/headers"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  const headersList = headers()
  const referer = headersList.get('referer')

  const data = {
    query: query,
    referer: referer
  };
  
  // デフォルトなら、単純に
  //return data

  // CORSの設定ありver
  // CORSの設定は、next.config.mjsに書いてもいい
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })

}