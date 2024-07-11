import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
// import { HttpsProxyAgent } from 'https-proxy-agent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const openai = new OpenAI({
                apiKey: process.env['OPENAI_API_KEY'],
                // httpAgent: new HttpsProxyAgent(process.env.HTTP_PROXY!),
            });
            const search = req.body.search;
            const embeddingResponse = await openai.embeddings.create({
                input: search,
                model: 'text-embedding-3-small',
                encoding_format: "float",
                dimensions: 512,
            });
            const embedding = embeddingResponse.data[0].embedding;
            res.status(200).json({ embedding });
        } catch (error) {
            res.status(500).json({ error: 'Error processing your request' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
