import Head from 'next/head'
import React, {useState} from 'react'
import Layout from '~/components/Layout'
import ItemsTileGrid from '~/components/ItemsTileGrid'
import SectionContainer from '~/components/SectionContainer'
import supabase from '~/lib/supabase'
import {Items} from '~/types/items'

interface Props {
    items: Items[]
}

function normalizeSearch(search:string) {
    let result = search.substring(0, 256).replace(/[\p{P}\p{S}]/gu, ' ').toLowerCase();
    result = result.trim().replace(/\s+/g, ' ');
    return result;
}

async function embeddingSearch(search:string) {
    try {
        const response = await fetch('/api/embedding_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search }),
        });

        if (response.ok) {
            const embeddingData = await response.json();
            const searchEmbedding = embeddingData.embedding;
            const { error: matchError, data: embeddingItems } = await supabase.rpc(
                'match_items',
                {
                    query_embedding: searchEmbedding,
                    match_threshold: 0,  // Fill in an appropriate value based on your requirements
                    match_count: 10,  // Fill in an appropriate value based on your requirements
                }
            );

            if (matchError) {
                return [];
            } else {
                return embeddingItems;
            }
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

async function ftsSearch(search:string) {
    const { error: matchError, data: FTSitems } = await supabase.rpc(
        'fts_match_items_ranked', {
            query_string: search.replace(/ /g, ' & '),  // Modify the query string as needed
            match_count: 10,  // Fill in an appropriate value based on your requirements
        })
    if (matchError) {
        return [];
    } else {
        return FTSitems;
    }
}

function asyncFunctionWithTimeout(asyncFunction: (...args: any[]) => Promise<any>, timeout:number, ...args :any[]) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Async function timed out'));
        }, timeout);
    });

    return Promise.race([asyncFunction(...args), timeoutPromise]);
}

function dedupeSortedItemsByDomain(sortedItems: Items[]): Items[] {
    const uniqueDomains = new Set();
    return sortedItems.filter((item) => {
        const url = new URL(item.url);
        const domain = url.hostname;
        if (uniqueDomains.has(domain)) {
            return false;
        } else {
            uniqueDomains.add(domain);
            return true;
        }
    });
}


function Home(props: Props) {
    const [items, setItems] = useState<Items[]>([])

    const metaTitle = 'Your meta title'
    const metaDescription = `Your meta description`

    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [afterSearch, setAfterSearch] = useState(false)

    const handleSearchSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (search.trim() === '') {
            setIsSearching(false)
            setItems([])
            return
        }

        setIsSearching(true);

        const normalizedSearch = normalizeSearch(search);

        const [embeddingResult, ftsResult] = await Promise.allSettled([
            asyncFunctionWithTimeout(embeddingSearch, 3000, normalizedSearch),
            asyncFunctionWithTimeout(ftsSearch, 3000, normalizedSearch),
        ]);

        const embeddingItems = embeddingResult.status === 'fulfilled' ? embeddingResult.value : [];
        const FTSitems = ftsResult.status === 'fulfilled' ? ftsResult.value : [];

        // Modify the scoring function according to your requirements.
        function calculateScore(item: any, isFTS: boolean, isEmbedding: boolean) {
            const keywordMatchScore = isFTS ? item.rank : 0;
            const semanticMatchScore = isEmbedding ? item.similarity : 0;
            const trafficScore = Math.log10(item.visitstotalcount > 5000 ? item.visitstotalcount : 2500);
            return trafficScore * (semanticMatchScore + keywordMatchScore);
        }

        const mergedItemsMap = new Map();

        embeddingItems.forEach((item:Items) => {
            mergedItemsMap.set(item.url, { ...item, score: calculateScore(item, false, true) });
        });

        FTSitems.forEach((item:Items) => {
            if (mergedItemsMap.has(item.url)) {
                const existingItem = mergedItemsMap.get(item.url);
                const updatedItem = { ...existingItem, rank: item.rank };
                updatedItem.score = calculateScore(updatedItem, true, true);
                mergedItemsMap.set(item.url, updatedItem);
            } else {
                mergedItemsMap.set(item.url, { ...item, score: calculateScore(item, true, false) });
            }
        });

        const sortedItems = Array.from(mergedItemsMap.values()).sort((a, b) => b.score - a.score)
        const dedupedSortedItems = dedupeSortedItemsByDomain(sortedItems);
        const page1 = dedupedSortedItems.slice(0, 100);

        if (page1) {
            setItems(page1)
        }

        setIsSearching(false)
        setAfterSearch(true)

    };

    return (
        <>
            <Head>
                <title>{`${metaTitle} | Your Product's Name`}</title>
                <meta name="description" content={metaDescription}></meta>
                <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
            </Head>
            <Layout>
                <SectionContainer className="space-y-4">
                        <div className="text-center">
                            <h1 className="h1">
                                {metaTitle}
                                <div className="mt-4">
                                    <span className="text-blue-500">{metaDescription}</span>
                                </div>
                            </h1>
                        </div>

                        <form className="md:w-2/3 mx-auto" onSubmit={handleSearchSubmit}>
                            <label
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                htmlFor="search"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-600 dark:text-gray-400"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                        />
                                    </svg>
                                </div>
                                <input
                                    className="block w-full bg-gray-50 p-2 ps-10 text-md text-gray-900 placeholder-gray-500 border border-gray-500 rounded-lg ring-1 ring-transparent focus:outline-none focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="search"
                                    autoComplete="off"
                                    placeholder="Search..."
                                    required
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </form>
                        {isSearching ? (
                            <div className="flex justify-center pt-16">
                                <img src="/images/blocks-wave.svg" className="h-16 w-16" alt="Loading..." />
                            </div>
                        ) : (
                            <div className="grid space-y-0 md:gap-8 lg:grid-cols-12 lg:gap-16 lg:space-y-0 xl:gap-16">
                                <div className="lg:col-start-3 lg:col-span-8 xl:col-start-3 xl:col-span-8">
                                    <div className="text-xs">
                                        {afterSearch && (
                                            <p>About {items.length} results</p>
                                        )}
                                    </div>
                                    <div className="grid space-y-10">
                                        {items.length ? (
                                            <ItemsTileGrid searchResults={items}/>
                                        ) : (
                                            afterSearch ? (
                                                <h3 className="h3">No results found, please try another keyword.</h3>
                                            ):null
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                </SectionContainer>
            </Layout>
        </>
    )
}

export default Home
