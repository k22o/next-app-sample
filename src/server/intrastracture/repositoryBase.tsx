

async function fetchWithNoCache(url: string) {

    const result = await fetch(url, { cache: 'force-cache' });
    return result.json;

}

async function fetchWithCache(url:string, duration: number = 30) {

    const result = await fetch(url, { next: { revalidate: duration } })
    return result.json;
    
}