import Link from 'next/link'
import {Items} from '~/types/items'
import LogoImage from './LogoImage';

export default function PartnerTileGrid({
                                            searchResults
                                        }: {
    searchResults: Items[]
}) {

    function formatVisitsCount(countNumber : bigint, language = 'en_US') {
        const count = Number(countNumber);
        if (count < 1_000) {
            return count.toString();
        } else if (count < 1_000_000) {
            return (count / 1_000).toFixed(1) + 'K';
        } else if (count < 1_000_000_000) {
            return (count / 1_000_000).toFixed(1) + 'M';
        } else {
            return (count / 1_000_000_000).toFixed(1) + 'B';
        }
    }

    return (
        <>
            <div className="not-prose space-y-0">
                <div className="grid gap-2 grid-cols-1 md:grid-cols-1 lg:max-w-none">
                    {searchResults.map((p) => (
                        <a key={p.id} href={p.url} target="_blank" rel="noopener dofollow">
                            <div
                                className="bg-[#fcfcfc]
                                hover:bg-gray-100 hover:dark:bg-scale-400
                                group flex flex-col w-full h-full px-5 py-1 transition-all
                                border rounded-l
                                shadow
                                hover:shadow-lg"
                            >
                                <div className="flex w-full items-center space-x-4">
                                    <div className="flex-none transition-all group-hover:scale-110">
                                        <LogoImage logo={p.logo} title={p.title} />
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <h3 className="text-sm font-bold transition-colors group-hover:text-blue-500 whitespace-nowrap overflow-hidden text-ellipsis  mt-0"
                                            title={p.url}
                                        >
                                            {p.title}
                                        </h3>
                                        <p
                                            className="text-xs whitespace-nowrap overflow-hidden text-ellipsis mb-1"
                                            title={p.brief}
                                        >
                                            {p.brief}
                                        </p>
                                        <div className="flex flex-wrap items-center mt-0">
                                            {p.visitstotalcount&& (
                                                <span
                                                    className="text-xs text-gray-600 mr-2 mb-1"
                                                >
                                                    👥 {formatVisitsCount(p.visitstotalcount)}
                                                </span>
                                            )}
                                            {p.visitsavgdurationformatted && (
                                                <span
                                                    className="text-xs text-gray-600 mr-2 mb-1"
                                                >
                                                    ⏱️ {p.visitsavgdurationformatted.startsWith("00:")
                                                    ? p.visitsavgdurationformatted.substring(3)
                                                    : p.visitsavgdurationformatted}
                                                </span>
                                            )}
                                            {p.bouncerate && (
                                                <span
                                                    className="text-xs text-gray-600 mb-1"
                                                >
                                                    🤝 {Math.round((1 - p.bouncerate) * 100)}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}