import React, { useState } from 'react';
import Image from 'next/image';

const LogoImage: React.FC<{ logo: string | undefined; title: string }>  = ({ logo, title }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    if (!logo) {
        return (
            <Image
                width={40}
                height={40}
                className="bg-gray-300 rounded-full"
                src="/images/logo-wordmark--light.svg"
                alt={title}
            />
        );
    }

    const fileExtension = logo?.split('.').pop()?.toLowerCase() ?? '';
    const logoUrl = `https://example.com/${logo}`;  // Replace with your actual logo URL

    if (fileExtension === 'svg') {
        return (
            <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                {imageError ? (
                    <img src="/images/logo-wordmark--light.svg" alt={title} />
                ) : (
                    <img src={logoUrl} alt={title} onError={handleImageError} />
                )}
            </div>
        );
    }

    return (
        <Image
            width={40}
            height={40}
            className="bg-gray-300 rounded-full"
            src={imageError ? '/images/logo-wordmark--light.svg' : logoUrl}
            alt={title}
            onError={handleImageError}
        />
    );
};

export default LogoImage;
