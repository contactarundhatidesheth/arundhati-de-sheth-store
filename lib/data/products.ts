export interface Specification {
  gold?: string;
  silver?: string;
  gemstones?: string;
  dimensions?: string;
  purity?: string;
  weight?: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: 'Earring' | 'Ring' | 'Pendant' | 'Necklace' | 'Bracelet' | 'Cuff';
  metal: '18K Gold' | '925 Silver' | '14K Gold' | 'Multi-Metal';
  collection: 'EPHEMERALS' | 'PERENNIALS - Gold' | 'PERENNIALS - Silver';
  tags: string[];
  images: string[];
  specs: Specification;
  isNew?: boolean;
  isBespoke?: boolean;
  isPriceOnRequest?: boolean;
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    handle: 'see-shell-pendant',
    title: '"See" Shell Pendant',
    description: 'Specifications : 925 Silver - 3.158 GM. Rock Crystal - 8.86 CT. *This listing is for the pendant only. Chain is not included and can be purchased separately.',
    price: 75000,
    category: 'Pendant',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Pendant'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/6_c8478870-a447-4414-8573-d6acd5bf6859.png?v=1781678688&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/7_4230ef99-d805-4b01-9e16-872814347a46.png?v=1781678687&width=800'
    ],
    specs: {
      silver: '3.158 GM (925 Silver)',
      gemstones: 'Rock Crystal : 8.86 CT'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '2',
    handle: 'eliza-drop-earrings',
    title: 'Eliza Drop Earrings',
    description: 'Specifications : 925 Silver - 2.639 GM. Rock Crystal.',
    price: 20000,
    category: 'Earring',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Earring'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/3_f84cc266-5538-4cb7-8c4a-9f2e152762a4.png?v=1781688736&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/4_01eafdc3-31ca-45c6-841c-21e056a69022.png?v=1781688763&width=800'
    ],
    specs: {
      silver: '2.639 GM (925 Silver)',
      gemstones: 'Rock Crystal'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '3',
    handle: 'amethyst-machli-pendant',
    title: 'Amethyst Machli Pendant',
    description: 'A sculptural pendant featuring amethyst in a distinctive machli (fish) form.',
    price: 96000,
    category: 'Pendant',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Pendant', 'Amethyst'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/3_99e7de20-5162-417e-9902-c5b99ccf4ecb.png?v=1775482649&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/1_a248c2e0-93fc-46d1-a6a0-115d1992d5a9.png?v=1784800251&width=800'
    ],
    specs: {
      silver: '925 Silver',
      gemstones: 'Amethyst'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '4',
    handle: 't-bar-charm-pink-jade',
    title: 'T Bar Charm (Pink Jade)',
    description: 'A delicate T-bar charm crafted in precious metal with pink jade.',
    price: 75000,
    category: 'Pendant',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Charm', 'Jade'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/WhatsApp_Image_2026-08-02_at_12.36.03_PM.jpg?v=1785734287&width=800'
    ],
    specs: {
      silver: '925 Silver',
      gemstones: 'Pink Jade'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '5',
    handle: 'eye-on-you-pendant',
    title: 'EYE ON YOU PENDANT',
    description: 'Bespoke statement pendant featuring natural emerald marquise, baguette diamonds, and luminous mother of pearl set in 18k yellow gold.',
    price: 360000,
    category: 'Pendant',
    metal: '18K Gold',
    collection: 'EPHEMERALS',
    tags: ['EPHEMERALS', 'Emerald', 'Diamond', '18K Gold'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/WhatsAppImage2026-03-24at12.55.32PM.jpg?v=1774337386&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/WhatsAppImage2026-03-24at5.33.15PM.jpg?v=1774354103&width=800'
    ],
    specs: {
      gold: '6.64 GM (18K Gold)',
      gemstones: 'Emerald Marquise 1.38 CT, Emerald Baguette 0.97 CT, Diamond Baguette 0.46 CT, Mother of Pearl 1.87 CT',
      purity: '18K Yellow Gold'
    },
    isNew: true,
    isBespoke: true,
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '6',
    handle: 'citrine-window-eardrops',
    title: 'Citrine Window Eardrops',
    description: 'Architectural eardrops showcasing cushion-cut citrines framed in 18k gold with natural round-cut diamond pave accents.',
    price: 125000,
    category: 'Earring',
    metal: '18K Gold',
    collection: 'PERENNIALS - Gold',
    tags: ['PERENNIALS - GOLD', 'Citrine', '18K Gold'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/HE-6927_49073_A001.jpg?v=1770795680&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/HE-6927_49073_A001-01.jpg?v=1770795680&width=800'
    ],
    specs: {
      gold: '4.230 GM (18K Gold)',
      gemstones: 'Citrine Cushion : 3.10 CT, Natural Round Diamond : 0.40 CT'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '7',
    handle: 'green-amethyst-window-eardrops',
    title: 'Green Amethyst Window Eardrops',
    description: 'Luminous green amethyst cushions suspended within sculpted 18k gold geometric windows.',
    price: 125000,
    category: 'Earring',
    metal: '18K Gold',
    collection: 'PERENNIALS - Gold',
    tags: ['PERENNIALS - GOLD', 'Amethyst', '18K Gold'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/HE-6927_49072_A001.jpg?v=1770795492&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/HE-6927_49072_A001-1.jpg?v=1770795492&width=800'
    ],
    specs: {
      gold: '4.010 GM (18K Gold)',
      gemstones: 'Amethyst Cushion : 2.95 CT, Natural Round Diamond : 0.40 CT'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '8',
    handle: 'ruby-taper-earrings',
    title: 'Ruby Taper Earrings',
    description: 'Elegant taper earrings featuring vibrant rubies.',
    price: 110000,
    category: 'Earring',
    metal: '18K Gold',
    collection: 'PERENNIALS - Gold',
    tags: ['PERENNIALS - GOLD', 'Ruby', 'Earring'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/HE-6752_48671_GP.jpg?v=1770795229&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/HE-6752_48671_GP-1.jpg?v=1770795229&width=800'
    ],
    specs: {
      gold: '18K Gold',
      gemstones: 'Ruby'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '9',
    handle: 'black-taper-earrings',
    title: 'Black Taper Earrings',
    description: 'Sophisticated taper earrings with black gemstone accents.',
    price: 110000,
    category: 'Earring',
    metal: '18K Gold',
    collection: 'PERENNIALS - Gold',
    tags: ['PERENNIALS - GOLD', 'Earring'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/Untitleddesign.png?v=1770795043&width=800'
    ],
    specs: {
      gold: '18K Gold'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '10',
    handle: 'two-way-taper-earrings',
    title: 'Two-Way Taper Earrings',
    description: 'Versatile taper earrings designed to be worn two ways.',
    price: 150000,
    category: 'Earring',
    metal: '18K Gold',
    collection: 'PERENNIALS - Gold',
    tags: ['PERENNIALS - GOLD', 'Earring'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/HE-6985_50428_GP.jpg?v=1770794857&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/HE-6985_50428_GP-2.jpg?v=1770794857&width=800'
    ],
    specs: {
      gold: '18K Gold'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '11',
    handle: 'spectra-choker',
    title: 'Spectra Choker',
    description: 'A bold choker necklace featuring a spectrum of colored gemstones.',
    price: 85000,
    category: 'Necklace',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Choker', 'Necklace'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/40_17ca3ebf-a317-493d-8e73-3be840768944.png?v=1754722208&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/5_0c5ee506-9e0e-45fc-a449-f6a40926dd19.png?v=1784800251&width=800'
    ],
    specs: {
      silver: '925 Silver',
      gemstones: 'Mixed Gemstones'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '12',
    handle: 'jaipur-cuff-with-baroque-pearl',
    title: 'Jaipur Cuff with Baroque Pearl',
    description: 'Sublime 925 silver cuff micron-plated in gold featuring a majestic, organic Baroque Pearl center.',
    price: 70000,
    category: 'Cuff',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Cuff', 'Pearl'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/8_3d4c1065-3512-4dff-af24-e03d430b2836.png?v=1784800253&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/28.png?v=1754721994&width=800'
    ],
    specs: {
      silver: '925 Silver (Gold Micron-Plated) - Gross 47.1 GM',
      gemstones: 'Natural Baroque Pearl'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '13',
    handle: 'victorian-bracelet',
    title: 'Noor Bracelet',
    description: 'Strung on handsome silver rope, featuring an Ethiopian Opal framed by natural blue sapphires and single-cut diamond pave.',
    price: 188000,
    category: 'Bracelet',
    metal: '925 Silver',
    collection: 'EPHEMERALS',
    tags: ['EPHEMERALS', 'Opal', 'Sapphire', 'Diamond'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/17_c0d6df73-96ac-4f0b-bf9d-e4f0483ca162.png?v=1784800253&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/Newimages_3_0945ced6-5a89-46df-b13c-3244f523899c.png?v=1754721014&width=800'
    ],
    specs: {
      silver: '60.598 GM (925 Silver)',
      gemstones: 'Ethiopian Opal : 5.68 CT, Blue Sapphire : 5.9 CT, Diamond : 11.98 CT'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '14',
    handle: 'chalcedony-earring',
    title: 'Moonshine Morganite Ear Pendants',
    description: 'Stunning high jewellery ear pendants featuring ethereal chalcedony and morganite drops with diamond pave in 18k gold.',
    price: 354000,
    category: 'Earring',
    metal: '18K Gold',
    collection: 'EPHEMERALS',
    tags: ['EPHEMERALS', 'Morganite', 'Chalcedony'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/19_62d39958-6d5e-4d16-94a2-7fd33f4d9bf0.png?v=1784800252&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/2_9a30c817-d4ba-4a8e-89ca-574ca1541ebe.png?v=1754653247&width=800'
    ],
    specs: {
      gold: '6.686 GM (18K Gold)',
      gemstones: 'Chalcedony 56.49 CT, Morganite 10.8 CT, Natural Diamond 1.13 CT'
    },
    isBespoke: true,
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '15',
    handle: 'ear-cuff-right',
    title: 'Rockstar Ear Cuff (Right)',
    description: 'Bold ear cuff designed for the right ear.',
    price: 35000,
    category: 'Earring',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Ear Cuff'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/22_2fcc252f-06d4-43e6-ab29-4bd0ae763f01.png?v=1784800251&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/10_4b530a6e-f1c4-42d4-b7b2-496d3c2f5800.png?v=1753433080&width=800'
    ],
    specs: {
      silver: '925 Silver'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '16',
    handle: 'ear-cuff',
    title: 'Rockstar Ear Cuff (Left)',
    description: 'Bold ear cuff designed for the left ear.',
    price: 35000,
    category: 'Earring',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Ear Cuff'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/55_78be91cb-4d00-440f-8c10-a35f6ce12870.png?v=1784800250&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/7_de76a8ce-a20a-44f2-b1ff-3f0448ae8bec.png?v=1753433037&width=800'
    ],
    specs: {
      silver: '925 Silver'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '17',
    handle: 'claw-pendant',
    title: 'Machli Claw Pendant',
    description: 'A striking claw-shaped pendant in the machli design.',
    price: 140000,
    category: 'Pendant',
    metal: '925 Silver',
    collection: 'EPHEMERALS',
    tags: ['EPHEMERALS', 'Pendant'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/57_a6704fb8-bc79-4995-bb56-86e7c0ed31f2.png?v=1784800251&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/20_1a177181-4c47-4e77-8002-fa94e68e1e7c.png?v=1754721132&width=800'
    ],
    specs: {
      silver: '925 Silver',
      gemstones: 'Gemstone details'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '18',
    handle: 'chalcedony-and-tourmaline-ring',
    title: 'Moonshine Tourmaline Ring',
    description: 'An exquisite ring featuring moonstone and tourmaline in 18k gold.',
    price: 275000,
    category: 'Ring',
    metal: '18K Gold',
    collection: 'EPHEMERALS',
    tags: ['EPHEMERALS', 'Ring', 'Tourmaline'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/Calcedonyworn.png?v=1740478413&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/26_d5232521-3e2b-4d11-a585-779d543e26ec.png?v=1784800250&width=800'
    ],
    specs: {
      gold: '18K Gold',
      gemstones: 'Moonstone, Tourmaline'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '19',
    handle: 'vulcan-ear-climbers',
    title: 'Vulcan Ear Climbers',
    description: 'A sculptural composition of Custom Cut Rock Crystal and Silver that powerfully adorn the ear.',
    price: 42000,
    category: 'Earring',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Earring', 'Rock Crystal'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/WhatsApp_Image_2026-08-05_at_12.49.27_PM.jpg?v=1785914886&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/webshop_change_and_update_pieces_1_541ba67d-3336-4f4c-9a6d-3286e329e41a.png?v=1785914845&width=800'
    ],
    specs: {
      silver: '5.860 GMS (925 Silver)',
      gemstones: 'Rock Crystal : 15 CT',
      dimensions: '1.3 × 3.5 cm'
    },
    isNew: true,
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '20',
    handle: 'eliza-2-layered-chain',
    title: 'Eliza Double Necklace',
    description: 'An Elegant Cushion Cut Crystal Rock Layered chain crafted in fine 925 silver.',
    price: 32000,
    category: 'Necklace',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['PERENNIALS - SILVER', 'Necklace'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/WhatsApp_Image_2026-07-24_at_1.30.47_PM.jpg?v=1784880140&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/11_15761e68-18c6-4d2f-8c2e-9a1311c597c9.png?v=1782908764&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/12_cfbc6f8f-be70-4ab2-8982-a696ae26cadd.png?v=1782908861&width=800'
    ],
    specs: {
      silver: '6.006 GM (925 Silver)',
      gemstones: '2 Cushion Cut Rock Crystals : 15.42 CT'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '21',
    handle: 'prism-pendant',
    title: 'Prism Pendant',
    description: 'A Bold neckpiece featuring a custom Cushion Cut Rock Crystal in the centre on an adjustable length satin cord.',
    price: 41000,
    category: 'Pendant',
    metal: '925 Silver',
    collection: 'PERENNIALS - Silver',
    tags: ['Pendant', 'Rock Crystal'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/WhatsApp_Image_2026-07-24_at_1.35.25_PM.jpg?v=1784880414&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/8_bcc625e1-bbed-4e8b-aa40-37da558700e6.png?v=1782900824&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/9_139d61f9-68ce-48dd-ad72-7ed84f941808.png?v=1782900824&width=800'
    ],
    specs: {
      silver: '9.966 GM (925 Silver)',
      gemstones: 'Custom Cushion Cut Crystal : 40.11 CT'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '22',
    handle: 'bella-girandole-earrings',
    title: 'Bella Girandole Earrings',
    description: 'Reminiscent of traditional European Victorian girandole style earrings, custom-cut rock crystals, citrine, and swiss blue topaz set in 925 silver and 18kt gold.',
    price: 115000,
    category: 'Earring',
    metal: 'Multi-Metal',
    collection: 'EPHEMERALS',
    tags: ['Girandole', 'Earring', 'Topaz', 'Citrine'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/webshop_change_and_update_pieces_1.png?v=1785909327&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/71_4622560c-4b4c-4a41-bf37-54b7fe819929.png?v=1784800255&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/72_2f136be2-2c3f-4e24-b0a8-4fe803044579.png?v=1784800253&width=800'
    ],
    specs: {
      silver: '925 Silver & 18K Gold accents',
      gemstones: 'Rock Crystal, Citrine, Swiss Blue Topaz - Total 40.92 CT',
      dimensions: 'Height 4.2 CM'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '23',
    handle: 'eliza-girandole-earrings',
    title: 'Eliza Girandole Earrings',
    description: 'Victorian-inspired girandole earrings showcasing 38.34 CT of custom-cut rock crystals set in 925 silver with 18kt gold highlights.',
    price: 96000,
    category: 'Earring',
    metal: 'Multi-Metal',
    collection: 'PERENNIALS - Silver',
    tags: ['Girandole', 'Earring', 'Rock Crystal'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/73_aed7d98e-491e-463f-ae3a-1ef88c60e7a8.png?v=1784800253&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/74_701c51fd-7070-495c-85b0-28660e78aa58.png?v=1784800254&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/75_1d8c153d-eeef-47e5-834e-087719a1d6ba.png?v=1784800253&width=800'
    ],
    specs: {
      silver: '925 Silver with 18K Gold details',
      gemstones: 'Custom-cut Rock Crystal : 38.34 CT',
      dimensions: 'Height 4.5 CM'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '24',
    handle: 'dice-ring',
    title: 'Dice Ring',
    description: 'Bold 18kt yellow gold statement ring flushed with brilliant-cut natural diamonds in a geometric dice motif.',
    price: 287000,
    category: 'Ring',
    metal: '18K Gold',
    collection: 'PERENNIALS - Gold',
    tags: ['PERENNIALS - GOLD', 'Ring', 'Diamond'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/DICERING4.jpg?v=1709288209&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2026-07-23_162210.png?v=1784803950&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/44_5f602cc5-3331-4992-99f8-b55af9bde8f7.png?v=1784800254&width=800'
    ],
    specs: {
      gold: '15.182 GM (18K Gold)',
      gemstones: 'Natural Brilliant Diamonds : 0.74 CT',
      dimensions: 'Ring Size 7 (Resizing Available)'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '25',
    handle: 'molten-nugget-pendant',
    title: 'Molten Nugget Pendant',
    description: 'Sculptural molten 18kt gold nugget flushed with radiant natural diamonds, suspended on an adjustable satin cord.',
    price: 379000,
    category: 'Pendant',
    metal: '18K Gold',
    collection: 'EPHEMERALS',
    tags: ['EPHEMERALS', '18K Gold', 'Diamond'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/MOLTENNUGGETPENDANT4.jpg?v=1706967224&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/46_bbfd0213-daeb-4cde-ab87-6b70e3581f07.png?v=1784800249&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/47_89dbc232-f2a5-4261-9cd7-dddeb08eec90.png?v=1784800253&width=800'
    ],
    specs: {
      gold: '18K Yellow Gold',
      gemstones: 'Natural Brilliant Cut Diamonds',
      dimensions: 'Height 5.5 cm × Width 3.3 cm'
    },
    isBespoke: true,
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '26',
    handle: 'emerald-drop-dainty-balis',
    title: 'Emerald Drop Dainty Balis',
    description: 'Delicate 14kt yellow gold hoops showcasing pear-shaped natural Zambian emerald drops.',
    price: 87500,
    category: 'Earring',
    metal: '14K Gold',
    collection: 'PERENNIALS - Gold',
    tags: ['PERENNIALS - GOLD', 'Emerald', 'Balis'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/52_25fbafde-a953-4b26-9fcb-468bae1c6102.png?v=1784800250&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/54_8480cb4b-df86-4194-9d28-1d19e35d086a.png?v=1784800253&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/ARUNDHATIPRODUCTSHOOT20-12-20232383.jpg?v=1710149807&width=800'
    ],
    specs: {
      gold: '1.743 GM (14K Yellow Gold)',
      gemstones: 'Natural Zambian Emerald (Pear) : 0.87 CT',
      dimensions: 'Height 2.0 CM'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '27',
    handle: 'pink-tourmaline-drop-dainty-balis',
    title: 'Pink Tourmaline Drop Dainty Balis',
    description: 'Charming 14kt gold hoops with vibrant pear-shaped natural pink tourmaline drops.',
    price: 57500,
    category: 'Earring',
    metal: '14K Gold',
    collection: 'PERENNIALS - Gold',
    tags: ['PERENNIALS - GOLD', 'Tourmaline', 'Balis'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/49_5bcd3cbf-8754-4c87-86e4-9ab22d179538.png?v=1784800249&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/50_75f34694-db97-44a6-9d82-267eef296cfb.png?v=1784800254&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/PINKTOURMALINEDROPDAINTYBALIS4.jpg?v=1710149870&width=800'
    ],
    specs: {
      gold: '1.801 GM (14K Yellow Gold)',
      gemstones: 'Natural Pink Tourmaline (Pear) : 0.94 CT',
      dimensions: 'Height 2.0 CM'
    },
    inStock: true,
    isPriceOnRequest: true
  },
  {
    id: '28',
    handle: 'signature-signet-ring',
    title: 'Signature Signet Ring',
    description: 'Custom-made luxury signet ring designed for the pinky finger. Personalised lettering carved per preference.',
    price: 160000,
    category: 'Ring',
    metal: '18K Gold',
    collection: 'EPHEMERALS',
    tags: ['EPHEMERALS', 'Signet', '18K Gold'],
    images: [
      'https://www.arundhatidesheth.com/cdn/shop/files/40_48f00f99-16f0-4424-bf10-63da9e8283df.png?v=1784800252&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/SIGNETRING4_1.jpg?v=1709287884&width=800',
      'https://www.arundhatidesheth.com/cdn/shop/files/42_66fdfc19-02d5-4c57-8515-45318b64d6da.png?v=1784800253&width=800'
    ],
    specs: {
      gold: '18K Solid Gold',
      purity: '18K Yellow Gold / White Gold / Rose Gold',
      dimensions: 'Custom sizing (Pinky recommended)'
    },
    isBespoke: true,
    isPriceOnRequest: true,
    inStock: true
  }
];

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getProductsByCollection(collection: string): Product[] {
  if (collection === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.collection.toLowerCase().includes(collection.toLowerCase()));
}
