import { fetchWithCache } from "./repositoryBase";

type SampleData = {
    id: number;
    name: string;
}

export async function fetchSampleData(): Promise<SampleData[] | undefined> {
    const url = 'https://api.example.com/sample';
    const response = await fetchWithCache(url) as SampleData[];
    return response;
}
