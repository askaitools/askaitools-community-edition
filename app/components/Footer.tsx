import GitHubButton from 'react-github-btn'

const Footer = () => {
    return (
            <footer className="flex flex-col items-center justify-center w-full border-t bg-scale-300 p-4 text-sm">
                <div className="text-gray-700 mb-2">Powered by
                    <a href="https://github.com/askaitools/askaitools-community-edition" target="_blank" rel="noopener" className="text-blue-500 underline ml-1">AskAITools</a>
                </div>
                <GitHubButton href="https://github.com/askaitools/askaitools-community-edition" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="small" data-show-count="true" aria-label="Star askaitools/askaitools-community-edition on GitHub">Star</GitHubButton>
            </footer>
    )
}

export default Footer
