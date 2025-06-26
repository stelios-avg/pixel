import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Pixel Studio | Custom Web Projects',
  description: 'Designing impactful digital experiences. Let Pixel Studio build your next project.',
  keywords: ['Pixel Studio', 'web design', 'creative projects', 'UI/UX', 'Next.js', 'portfolio'],
  openGraph: {
    title: 'Pixel Studio | Custom Web Projects',
    description: 'Designing impactful digital experiences.',
    url: 'https://pixel-studio.design',
    siteName: 'Pixel Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pixel Studio Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixel Studio',
    description: 'Designing impactful digital experiences.',
    images: ['/og-image.jpg'],
  },
  metadataBase: new URL('https://pixel-studio.design'),
};

export default metadata;
