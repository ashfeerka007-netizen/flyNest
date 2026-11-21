import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HostLayout } from '../../components/host/HostLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PropertyCategory } from '../../types/property';
import { BRAND } from '../../config/brand';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Building,
  MapPin,
  Users,
  Bed,
  Bath,
  CheckCircle2,
  Image,
  DollarSign,
  Calendar,
  ShieldAlert,
} from 'lucide-react';

const CATEGORIES: PropertyCategory[] = [
  'Villas',
  'Resorts',
  'Unique Stays',
  'Eco Stays',
  'Homestays',
  'Cottages',
  'Hotels',
  'Farm Stays',
  'Apartments',
  'Private Rooms',
  'Guest Houses',
  'Hostels',
];

const ALL_AMENITIES = [
  { id: 'wifi', label: 'High-speed Fiber Wi-Fi' },
  { id: 'private_pool', label: 'Private Swimming / Plunge Pool' },
  { id: 'mountain_view', label: 'Panoramic Ridge & Valley View' },
  { id: 'fireplace', label: 'Wood-burning Fireplace' },
  { id: 'kitchen', label: 'Artisan Chef Kitchen' },
  { id: 'breakfast', label: 'Farm-to-Table Breakfast' },
  { id: 'sea_view', label: 'Ocean / Coastal Front' },
  { id: 'organic_garden', label: 'Botanical & Organic Herb Garden' },
  { id: 'binoculars', label: 'Avian Observatory & Binoculars Kit' },
  { id: 'yoga_shala', label: 'Open-air Yoga & Meditation Deck' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'free_parking', label: 'Complimentary Parking on Premises' },
];

export const HostNewPropertyPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  const { addProperty } = useMarketplace();
  const { currentUser } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  // Wizard State
  const [category, setCategory] = useState<PropertyCategory>('Unique Stays');
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [destination, setDestination] = useState('Wayanad');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Kerala');
  const [country, setCountry] = useState('India');
  const [address, setAddress] = useState('');
  const [maxGuests, setMaxGuests] = useState(4);
  const [bedrooms, setBedrooms] = useState(2);
  const [beds, setBeds] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['wifi', 'breakfast', 'mountain_view']);
  const [description, setDescription] = useState('');
  const [image1, setImage1] = useState('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80');
  const [image2, setImage2] = useState('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80');
  const [image3, setImage3] = useState('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80');
  const [pricePerNight, setPricePerNight] = useState(8500);
  const [cancellationPolicy, setCancellationPolicy] = useState<'Flexible' | 'Moderate' | 'Strict'>('Moderate');
  const [checkInTime, setCheckInTime] = useState('14:00');
  const [checkOutTime, setCheckOutTime] = useState('11:00');
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(true);
  const [partiesAllowed, setPartiesAllowed] = useState(false);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (currentStep === 2 && (!title.trim() || !tagline.trim())) {
      error('Validation Error', 'Please enter a title and tagline for your sanctuary.');
      return;
    }
    if (currentStep === 3 && (!city.trim() || !address.trim())) {
      error('Validation Error', 'Please enter city and full address.');
      return;
    }
    if (currentStep === 6 && !description.trim()) {
      error('Validation Error', 'Please provide a sanctuary description.');
      return;
    }
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newProperty = addProperty({
      slug,
      title: title || 'Rainforest Whispers Sanctuary',
      tagline: tagline || 'A peaceful resting place along the mountain flight corridor',
      description: description || 'Handcrafted retreat tucked into nature with panoramic views and restorative silence.',
      destination: destination || 'Wayanad',
      location: {
        city: city || 'Wayanad',
        state: state || 'Kerala',
        country: country || 'India',
        address: address || 'High Range Tea Road, Wayanad',
        lat: 11.6854,
        lng: 76.1320,
      },
      category,
      images: [image1, image2, image3].filter(Boolean),
      pricePerNight,
      originalPricePerNight: Math.round(pricePerNight * 1.15),
      rating: 5.0,
      reviewCount: 0,
      maxGuests,
      bedrooms,
      beds,
      bathrooms,
      amenities: selectedAmenities,
      host: {
        id: currentUser?.id || 'user-host-1',
        name: currentUser?.name || 'Tara Varma',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        isSuperhost: true,
        joinedYear: 2024,
        responseRate: '100% within 1 hour',
        bio: currentUser?.bio || 'Sanctuary custodian passionate about architectural preservation and slow tourism.',
      },
      houseRules: {
        checkIn: checkInTime,
        checkOut: checkOutTime,
        smokingAllowed,
        petsAllowed,
        partiesAllowed,
      },
      cancellationPolicy,
      instantBookable: true,
      featured: false,
    });

    success(
      'Listing Submitted for Verification!',
      `"${newProperty.title}" is now awaiting Administrator review.`
    );
    navigate('/host/properties');
  };

  return (
    <HostLayout>
      <div className="max-w-3xl mx-auto space-y-8 text-left pb-16">
        {/* Wizard Header */}
        <div className="border-b border-stone-200 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6BD6]">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs font-semibold text-stone-500">
              {Math.round((currentStep / totalSteps) * 100)}% Completed
            </span>
          </div>

          <div className="w-full h-2 bg-stone-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-[#1B1F4A] transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Step Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs min-h-[420px] flex flex-col justify-between">
          <div>
            {/* Step 1: Category */}
            {currentStep === 1 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                  Which best describes your sanctuary?
                </h2>
                <p className="text-xs text-stone-500 mb-6">
                  Select the category that best matches your architectural and natural environment
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        category === cat
                          ? 'border-[#1B1F4A] bg-[#1B1F4A]/5 text-[#1B1F4A] ring-2 ring-[#1B1F4A]'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <Building className="w-5 h-5 text-[#5B6BD6] mb-2" />
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Basic Info */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                    Sanctuary Title & Headline
                  </h2>
                  <p className="text-xs text-stone-500 mb-4">
                    Catchy, poetic, and highlighting the unique natural experience
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Listing Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Whispering Teak Bamboo Haven"
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Perched 40ft high in ancient rosewood groves"
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Primary Destination Corridor
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-300"
                  >
                    <option value="Wayanad">Wayanad</option>
                    <option value="Munnar">Munnar</option>
                    <option value="Coorg">Coorg</option>
                    <option value="Goa">Goa</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Alleppey">Alleppey</option>
                    <option value="Manali">Manali</option>
                    <option value="Rishikesh">Rishikesh</option>
                    <option value="Darjeeling">Darjeeling</option>
                    <option value="Bali">Bali</option>
                    <option value="Maldives">Maldives</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                    Where is your sanctuary located?
                  </h2>
                  <p className="text-xs text-stone-500 mb-4">
                    Exact address is only shared with confirmed guests
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Meppadi, Wayanad"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Kerala"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="India"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Estate Survey No. 44, Hill Road"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Capacity */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                    Guest Capacity & Sleeping Arrangements
                  </h2>
                  <p className="text-xs text-stone-500 mb-4">
                    Ensure adequate space for restorative comfort
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-2xl text-center">
                    <span className="text-xs font-semibold block text-stone-500">Max Guests</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={maxGuests}
                      onChange={(e) => setMaxGuests(Number(e.target.value))}
                      className="w-16 mx-auto text-xl font-bold text-center mt-2 p-1 border rounded-lg"
                    />
                  </div>

                  <div className="p-4 border rounded-2xl text-center">
                    <span className="text-xs font-semibold block text-stone-500">Bedrooms</span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-16 mx-auto text-xl font-bold text-center mt-2 p-1 border rounded-lg"
                    />
                  </div>

                  <div className="p-4 border rounded-2xl text-center">
                    <span className="text-xs font-semibold block text-stone-500">Total Beds</span>
                    <input
                      type="number"
                      min={1}
                      max={15}
                      value={beds}
                      onChange={(e) => setBeds(Number(e.target.value))}
                      className="w-16 mx-auto text-xl font-bold text-center mt-2 p-1 border rounded-lg"
                    />
                  </div>

                  <div className="p-4 border rounded-2xl text-center">
                    <span className="text-xs font-semibold block text-stone-500">Bathrooms</span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-16 mx-auto text-xl font-bold text-center mt-2 p-1 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Amenities */}
            {currentStep === 5 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                  Sanctuary Amenities
                </h2>
                <p className="text-xs text-stone-500 mb-6">
                  Select all amenities available to migratory travelers
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ALL_AMENITIES.map((a) => {
                    const isChecked = selectedAmenities.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => toggleAmenity(a.id)}
                        className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 border-[#5B6BD6] text-[#1B1F4A] font-semibold'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <span>{a.label}</span>
                        {isChecked && <Check className="w-4 h-4 text-[#5B6BD6]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 6: Description */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                    Describe Your Sanctuary
                  </h2>
                  <p className="text-xs text-stone-500 mb-4">
                    Share the story of the land, wildlife sightings, and craftsmanship
                  </p>
                </div>

                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Awaken to morning mist and birdsong. Handcrafted from reclaimed teak..."
                  className="w-full text-xs p-4 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A] leading-relaxed"
                />
              </div>
            )}

            {/* Step 7: Images */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                    Sanctuary Photography
                  </h2>
                  <p className="text-xs text-stone-500 mb-4">
                    Provide high-resolution image URLs showcasing the landscape and interior
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Interior View URL</label>
                  <input
                    type="url"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Landscape / Deck URL</label>
                  <input
                    type="url"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 font-mono"
                  />
                </div>
              </div>
            )}

            {/* Step 8: Pricing */}
            {currentStep === 8 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                    Pricing & Cancellation
                  </h2>
                  <p className="text-xs text-stone-500 mb-4">
                    Configure standard base nightly rate in {BRAND.currency.symbol}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Base Nightly Rate ({BRAND.currency.symbol})
                  </label>
                  <div className="relative max-w-xs">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-stone-500">
                      {BRAND.currency.symbol}
                    </span>
                    <input
                      type="number"
                      step={100}
                      value={pricePerNight}
                      onChange={(e) => setPricePerNight(Number(e.target.value))}
                      className="w-full text-sm font-bold pl-8 p-3 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cancellation Policy</label>
                  <select
                    value={cancellationPolicy}
                    onChange={(e) => setCancellationPolicy(e.target.value as any)}
                    className="w-full max-w-xs text-xs p-3 rounded-xl border border-stone-300"
                  >
                    <option value="Flexible">Flexible (100% refund up to 1 day prior)</option>
                    <option value="Moderate">Moderate (100% refund up to 5 days prior)</option>
                    <option value="Strict">Strict (50% refund up to 7 days prior)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 9: House Rules */}
            {currentStep === 9 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                    House Rules & Sanctuary Timings
                  </h2>
                  <p className="text-xs text-stone-500 mb-4">
                    Establish quiet hours and arrival schedules
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Check-in After</label>
                    <input
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Check-out Before</label>
                    <input
                      type="time"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={petsAllowed}
                      onChange={(e) => setPetsAllowed(e.target.checked)}
                      className="w-4 h-4 accent-[#1B1F4A]"
                    />
                    <span>Pets permitted with prior notice</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={smokingAllowed}
                      onChange={(e) => setSmokingAllowed(e.target.checked)}
                      className="w-4 h-4 accent-[#1B1F4A]"
                    />
                    <span>Designated smoking areas on property</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 10: Review & Submit */}
            {currentStep === 10 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-1">
                    Review Sanctuary Details
                  </h2>
                  <p className="text-xs text-stone-500 mb-4">
                    Submitting sends this listing to the platform admin console for verification
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EEF0F8] border border-stone-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Title:</span>
                    <strong className="text-[#1B1F4A]">{title || 'Untitled Sanctuary'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Category:</span>
                    <strong>{category}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Location:</span>
                    <strong>{city || 'Wayanad'}, {country}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Capacity:</span>
                    <strong>{maxGuests} Guests • {bedrooms} Beds</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Nightly Rate:</span>
                    <strong className="text-emerald-700">₹{pricePerNight.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    Upon submission, your property status will be marked <strong>Pending Review</strong> until approved by the administrator.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#5B6BD6] hover:bg-[#1B1F4A] text-white text-xs font-semibold px-8 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F0A92E]" />
                <span>Submit Sanctuary for Approval</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </HostLayout>
  );
};
