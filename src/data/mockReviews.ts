export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  quote: string;
  stayTitle: string;
  destination: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Sunita & Rohan Sen',
    role: 'Conservation Architects, Delhi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    quote: 'Staying at the Canopy Nest Treehouse in Wayanad rewired our relationship with travel. Watching Malabar grey hornbills glide past our breakfast deck was a transcendent sanctuary moment.',
    stayTitle: 'Canopy Nest Treehouse',
    destination: 'Wayanad, Kerala',
    rating: 5,
  },
  {
    id: 'test-2',
    author: 'Marcus Lindqvist',
    role: 'Wildlife Filmmaker, Stockholm',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    quote: 'The curation on FlyNest is unlike any other marketplace. You don’t just book a room; you arrive at an ecologically attuned resting place woven into nature.',
    stayTitle: 'Sacred Ganges Bamboo Eco Lodge',
    destination: 'Rishikesh, Uttarakhand',
    rating: 5,
  },
  {
    id: 'test-3',
    author: 'Priya Nambiar',
    role: 'Editorial Director, Singapore',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    quote: 'Our family gathered at the Azure Horizon cliff villa in Goa. Every detail—from the basalt plunge pool to the quiet private cove path—exceeded the highest international luxury standards.',
    stayTitle: 'Azure Horizon Coastal Cliff Villa',
    destination: 'Goa, India',
    rating: 5,
  },
];
