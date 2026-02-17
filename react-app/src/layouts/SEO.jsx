import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    const baseTitle = "Typing Master | Tactical Training Platform";
    const fullTitle = title ? `${title} | Typing Master` : baseTitle;
    const defaultDesc = "Elite tactical typing training platform. Master speed, accuracy, and reflex through gamified operations.";

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords || "typing, speed test, fast typing, touch typing, learn typing, typing game"} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:image" content="/pwa-512x512.png" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description || defaultDesc} />
            <meta property="twitter:image" content="/pwa-512x512.png" />

            <link rel="canonical" href={window.location.href} />
        </Helmet>
    );
};

export default SEO;
