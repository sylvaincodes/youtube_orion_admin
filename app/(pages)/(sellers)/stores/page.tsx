import { UserButton } from '@clerk/nextjs';
import React from 'react';

// Nextjs ISR caching strategy
export const revalidate = false;

export default function page(){
    return (
        <div>
            this is dashboard for sellers
            <UserButton/>
        </div>
    );
};

// Nextjs dynamic metadata
export function generateMetadata() {
    return {
        title: `Page - Title here`,
        description: `Page - Description here`,
        icons: {
            icon: `path to asset file`,
        },
    };
}
