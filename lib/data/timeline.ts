export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'le-mill',
    date: '2018',
    title: 'Le Mill',
    description: 'Arundhati De-Sheth begins her journey as an Independent Fine Jewellery Advisor.',
    image: '/timeline/timeline-le-mill.jpg'
  },
  {
    id: 'remarkable-women',
    date: 'Dec 2019',
    title: 'Remarkable Women',
    description: 'Celebrating the stories of remarkable women through the lens of fine jewellery.',
    image: '/timeline/timeline-remarkable-women-2019.jpg'
  },
  {
    id: 'shadow-games',
    date: 'May 2022',
    title: 'Shadow Games',
    description: 'An eclectic mix of fine jewellery designed to be worn often and celebrated.',
    image: '/timeline/timeline-shadow-games.jpg'
  },
  {
    id: 'lightness-of-being',
    date: 'Oct 2022',
    title: 'Lightness of Being',
    description: 'A design-led fine jewellery show featuring pieces that embody elegance and sophistication.',
    image: '/timeline/timeline-lightness-of-being.jpg'
  },
  {
    id: 'only-natural-diamonds',
    date: 'Sept 2023',
    title: 'Only Natural Diamonds',
    description: 'A dedicated focus on the unparalleled beauty and legacy of natural diamonds.',
    image: '/timeline/timeline-only-natural-diamonds.jpg'
  },
  {
    id: 'gilded-age',
    date: 'Sept 2023',
    title: 'Gilded Age',
    description: 'Experience the best of jewels that transcend trends, borders and conventions.',
    image: '/timeline/timeline-gilded-age-1.jpg'
  },
  {
    id: 'prismatic',
    date: 'Sept 2024',
    title: 'Prismatic',
    description: 'The 7th edition of the JewelArt show, drawing attention to the beauty of coloured gemstones.',
    image: '/timeline/timeline-prismatic-mumbai.jpg'
  },
  {
    id: 'masaba-amrapali',
    date: 'Feb 2025',
    title: 'Masaba & Amrapali',
    description: 'An exclusive collaborative showcase bringing together bold design and traditional craftsmanship.',
    image: '/timeline/timeline-ads-masaba-amrapali.jpg'
  }
];
