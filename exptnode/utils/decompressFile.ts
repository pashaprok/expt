import { unzipSync } from 'zlib'
import axios from "axios";

export async function decompressFromUrl(urlstr: string): Promise<any[]> {
    const owmCitiesRes = await axios.get(urlstr, {
            responseType: 'arraybuffer',
            decompress: true,
        },
    );

    const inflatedBuf = unzipSync(owmCitiesRes.data);
    const strJson = inflatedBuf.toString();
    return JSON.parse(strJson);
}
