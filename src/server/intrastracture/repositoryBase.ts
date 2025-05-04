export async function fetchWithNoCache(url: string): Promise<any | undefined> {

    try {
        const result = await fetch(url, { cache: 'force-cache' });
        return await result.json();
    } catch (error) {
        console.error(error);
        return undefined;
    }

}

export async function fetchWithCache(url:string, duration: number = 30): Promise<any | undefined> {

    try {
        const result = await fetch(url, { next: { revalidate: duration } })
        return await result.json();
    } catch (error) {
        console.error(error);
        return undefined;
    }
    
}