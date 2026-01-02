export type ServiceProvider = {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  reputationScore: number;
  avatarUrl: string;
  galleryUrls: string[];
  portfolio: { title: string; description: string }[];
  location: {
    lat: number;
    lng: number;
  };
};

export type ServiceRequest = {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  urgency: 'ASAP' | 'Within a week' | 'Flexible';
  postedBy: string;
  location: string;
  status: 'Open' | 'In Progress' | 'Completed';
  escrowStatus: 'Unfunded' | 'Funded' | 'Released' | 'Refunded';
};

export type Bid = {
  id: string;
  requestId: string;
  providerId: string;
  amount: number;
  message: string;
  timestamp: Date;
};

export const serviceProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'John the Plumber',
    service: 'Plumbing',
    rating: 4.8,
    reviews: 125,
    reputationScore: 95,
    avatarUrl: 'https://picsum.photos/seed/101/200/200',
    galleryUrls: [
      'https://picsum.photos/seed/201/600/400',
      'https://picsum.photos/seed/202/600/400',
      'https://picsum.photos/seed/203/600/400',
    ],
    portfolio: [
        { title: 'Full Bathroom Remodel', description: 'Complete overhaul of a master bathroom, including new pipes, shower, and vanity.'},
        { title: 'Emergency Pipe Burst Repair', description: 'Responded within an hour to fix a major pipe burst, preventing water damage.'},
    ],
    location: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: '2',
    name: 'Jane the Electrician',
    service: 'Electrical',
    rating: 4.9,
    reviews: 210,
    reputationScore: 98,
    avatarUrl: 'https://picsum.photos/seed/102/200/200',
    galleryUrls: [
      'https://picsum.photos/seed/204/600/400',
      'https://picsum.photos/seed/205/600/400',
      'https://picsum.photos/seed/206/600/400',
    ],
    portfolio: [
        { title: 'Whole-Home Rewiring', description: 'Upgraded old aluminum wiring to modern copper for an entire 3-bedroom house.'},
        { title: 'Custom Lighting Installation', description: 'Installed custom LED track lighting and smart home controls in a media room.'},
    ],
    location: { lat: 34.06, lng: -118.25 },
  },
  {
    id: '3',
    name: "Bob's Handyman Services",
    service: 'Handyman',
    rating: 4.7,
    reviews: 88,
    reputationScore: 92,
    avatarUrl: 'https://picsum.photos/seed/103/200/200',
    galleryUrls: [],
    portfolio: [],
    location: { lat: 34.04, lng: -118.23 },
  },
    {
    id: '4',
    name: 'Green Thumb Landscaping',
    service: 'Landscaping',
    rating: 4.8,
    reviews: 150,
    reputationScore: 96,
    avatarUrl: 'https://picsum.photos/seed/104/200/200',
    galleryUrls: [],
    portfolio: [],
    location: { lat: 34.07, lng: -118.26 },
  },
];

export const serviceRequests: ServiceRequest[] = [
  {
    id: '1',
    title: 'Fix Leaky Kitchen Faucet',
    description: 'The faucet in my kitchen sink is constantly dripping. It seems to be coming from the base. Need someone to diagnose and fix it.',
    category: 'Plumbing',
    budget: 150,
    urgency: 'Within a week',
    postedBy: 'Alice',
    location: 'Downtown LA',
    status: 'Open',
    escrowStatus: 'Unfunded',
  },
  {
    id: '2',
    title: 'Install a new ceiling fan',
    description: 'I have a new ceiling fan that needs to be installed in my bedroom. The wiring is already there from a previous light fixture.',
    category: 'Electrical',
    budget: 200,
    urgency: 'ASAP',
    postedBy: 'Bob',
    location: 'Santa Monica',
    status: 'In Progress',
    escrowStatus: 'Funded',
  },
];

export const bids: Bid[] = [
  {
    id: '1',
    requestId: '1',
    providerId: '1',
    amount: 120,
    message: "I can take a look this Wednesday. It's usually a simple fix. My bid covers labor and standard small parts.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '2',
    requestId: '1',
    providerId: '3',
    amount: 100,
    message: "I'm in the area and can get it done tomorrow morning. $100 flat rate.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    id: '3',
    requestId: '2',
    providerId: '2',
    amount: 180,
    message: "I'm a licensed electrician and can ensure it's installed safely and up to code. Available tomorrow afternoon.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
];

export const serviceCategories = [
    { name: "Plumbing", icon: "Wrench" },
    { name: "Electrical", icon: "Zap" },
    { name: "Handyman", icon: "Hammer" },
    { name: "Landscaping", icon: "Flower" },
    { name: "Cleaning", icon: "Sparkles" },
    { name: "Moving", icon: "Truck" },
    { name: "Painting", icon: "PaintRoller" },
];
