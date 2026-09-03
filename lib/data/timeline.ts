export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  images: string[];
  link?: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'salon',
    date: 'August 2026',
    title: 'THE SALON',
    description: 'Arundhati De-Sheth opens the doors to her first-ever space, The Salon, an intimate setting for private viewings and an exclusive jewellery experience.',
    images: []
  },
  {
    id: 'decodent',
    date: 'January 21-22, 2026',
    title: 'DECODENT',
    description: 'A refined ode to a century of Art Deco, where Bombay’s architectural legacy meets sculptural geometry, exquisite gemstones, and exceptional craftsmanship.',
    images: ['/timeline/timeline-pc1-3594.jpg']
  },
  {
    id: 'shadow-games-2',
    date: 'May - June 2025',
    title: 'Shadow Games',
    description: 'A collection of fine jewels that could be the perfect accompaniment of your sunny escapade... and a perfect ally for life. Game! Set! Match!',
    images: []
  },
  {
    id: 'masaba-amrapali',
    date: 'February 2025',
    title: 'Masaba X Amrapali',
    description: 'An exclusive first look at the Masaba X Amrapali Jaipur Collection, hosted by Arundhati De-Sheth.',
    images: ['/timeline/timeline-ads-masaba-amrapali.jpg']
  },
  {
    id: 'prismatic',
    date: 'Sept / Oct 2024',
    title: 'Prismatic Show',
    description: 'Notice the beauty, colours, flaws, perfections and imperfections of natural gemstones and diamonds. (Juhu & Hyderabad)',
    images: ['/timeline/timeline-prismatic-mumbai.jpg', '/timeline/timeline-prismatic-1.jpg']
  },
  {
    id: 'in-house',
    date: 'April 2024',
    title: 'In-House Jewellery Line',
    description: 'Arundhati De-Sheth begins unveiling her in-house jewellery line through her webshop, introducing a distinctive world of refined design and modern luxury.',
    images: []
  },
  {
    id: 'kamyen',
    date: 'April 2024',
    title: 'ADS X Kamyen',
    description: 'A mélange of unusual-shaped, distinctive, natural diamonds and natural emeralds with the most beautiful lustre and transparency.',
    images: ['/timeline/timeline-kamyen.jpg']
  },
  {
    id: 'only-natural-diamonds',
    date: 'September 2023',
    title: 'Only Natural Diamonds',
    description: 'Jewellery journey & inspiration of diamond diva Arundhati De-Sheth.',
    images: ['/timeline/timeline-only-natural-diamonds.jpg'],
    link: 'https://www.naturaldiamonds.com/in/lovediamonds/jewellery-journey-inspiration-ofdiamond-diva-arundhati-de-sheth/'
  },
  {
    id: 'gilded-age',
    date: 'September 2023',
    title: 'Gilded Age',
    description: 'Featuring Contemporary cool, Bridal, Important Gemstones, Indian Heritage and Vintage.',
    images: [
      '/timeline/timeline-gilded-age-1.jpg',
      '/timeline/timeline-gilded-age-2.jpg',
      '/timeline/timeline-gilded-age-3.jpg',
      '/timeline/timeline-gilded-age-bom.jpg'
    ]
  },
  {
    id: 'call-for-cocktails',
    date: 'January 2023',
    title: 'Call for Cocktails',
    description: 'A capsule of modern and fresh fine jewels to wear during the holidays and beyond!',
    images: ['/timeline/timeline-call-for-cocktails-1.jpeg', '/timeline/timeline-call-for-cocktails-2.jpeg']
  },
  {
    id: 'lightness-of-being',
    date: 'October 2022',
    title: 'Lightness of Being',
    description: 'A sale of JewelArt - fine jewelry selected by Arundhati De-Sheth from a host of jewelry talent across the country.',
    images: ['/timeline/timeline-lightness-of-being.jpg', '/timeline/timeline-lightness-of-being-2.jpg', '/timeline/timeline-lightness-of-being-3.jpg']
  },
  {
    id: 'shadow-games',
    date: 'May 2022',
    title: 'Shadow Games',
    description: 'An Eclectic mix of fine jewellery to be worn often. You will find jewels featuring interesting precious gemstones, materials, textures and colours.',
    images: ['/timeline/timeline-shadow-games.jpg', '/timeline/timeline-shadow-games-22-1.jpg', '/timeline/timeline-shadow-games-22-2.jpg']
  },
  {
    id: 'artisan-award',
    date: 'April 2022',
    title: 'Artisan Award GJEPC 2022',
    description: 'Arundhati De-Sheth was featured as one of the Industry experts and a jury member for the Artisan Awards 2022, bringing her expertise as a jewellery curator and connoisseur to the panel.',
    images: []
  },
  {
    id: 'wave-after-wave',
    date: 'October 2021',
    title: 'Wave After Wave',
    description: 'A show of 200 jewels, hand-picked by Arundhati De-Sheth from all over India featuring a myriad of contemporary styles and genres.',
    images: []
  },
  {
    id: 'british-vogue',
    date: 'February 2021',
    title: 'British Vogue Article',
    description: 'Featured in British Vogue: Engagement Ring Concierge.',
    images: ['/timeline/timeline-british-vogue.webp'],
    link: 'https://www.vogue.co.uk/fashion/article/engagement-ring-concierge'
  },
  {
    id: 'but-a-dream',
    date: 'November 2020',
    title: 'It Was All Just But A Dream',
    description: 'Arundhati’s jewellery tribute to mark a most unusual time - the covid pandemic. A digital show and sale of fine jewels not meant for your locker - a mix of effortless, iconic jewels from a host of makers including pieces by Hanut Singh, Her Story (Maison Aneka) and Tallin; to name a few.',
    images: ['/timeline/timeline-but-a-dream.jpeg']
  },
  {
    id: 'ficci-flow',
    date: 'February 2020',
    title: 'FICCI Flow Ahmedabad',
    description: 'Arundhati joined Swapna Mehta and Pramod Kumar on the dais to discuss the changing landscape of fine jewels in India.',
    images: ['/timeline/timeline-ficci-flow.jpg']
  },
  {
    id: 'remarkable-women',
    date: 'December 2019',
    title: 'Remarkable Women',
    description: 'Just like we have 9 celestial bodies in our universe, 9 remarkable women came together for an epic shoot displaying Arundhati’s distinct style.',
    images: [
      '/timeline/timeline-remarkable-women-2019.jpg',
      '/timeline/timeline-remarkable-women-1.jpg',
      '/timeline/timeline-remarkable-women-2.jpg'
    ]
  },
  {
    id: 'hindu-article',
    date: 'November 2019',
    title: 'The Hindu Article',
    description: 'Meet Arundhati De-Sheth, the bespoke jewellery consultant.',
    images: ['/timeline/timeline-hindu-article.jpg'],
    link: 'https://www.thehindu.com/life-and-style/luxury/meetarundhati-de-sheth-the-bespoke-jewelleryconsultant/article30050420.ece'
  },
  {
    id: 'le-mill',
    date: 'Oct 2018 & Oct 2019',
    title: 'Arundhati De-Sheth at Le Mill',
    description: 'Le Mill is India’s first international fashion and lifestyle destination store. Arundhati designs and hosts her first and second annual Fine Jewellery show at Le Mill. This showcase of contemporary fine jewels made by independent jewellery artists from various parts of India. And the message is clear - Fine jewels not meant for your locker!',
    images: ['/timeline/timeline-le-mill.jpg', '/timeline/timeline-le-mill-2.jpeg']
  },
  {
    id: 'jewellery-advisor',
    date: 'August 2018',
    title: 'Independent Jewellery Advisor',
    description: 'Fuelled with nearly 7+ years of High Jewellery sales expertise within India and abroad; Arundhati ventures into her own journey as a Fine Jewellery Advisor to individuals looking to add the right jewels to their own collection.',
    images: ['/timeline/timeline-jewellery-advisor.jpg']
  }
];
