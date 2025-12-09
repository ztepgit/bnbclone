import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ChevronLeft,
  Share2,
  Heart,
  Users,
  Home,
  Bed,
  Bath,
  Wifi,
  Waves,
  Utensils,
  Wind,
  Car,
  Flame,
  Menu,
  Globe,
  User
} from 'lucide-react';
import { mockListings } from '../data/mockListings';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-6 h-6" />,
  'Pool': <Waves className="w-6 h-6" />,
  'Kitchen': <Utensils className="w-6 h-6" />,
  'Air conditioning': <Wind className="w-6 h-6" />,
  'Free parking': <Car className="w-6 h-6" />,
  'Fireplace': <Flame className="w-6 h-6" />,
  'Heating': <Flame className="w-6 h-6" />,
};

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const listing = mockListings.find((l) => l.id === id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Property not found</h2>
          <Link to="/" className="text-rose-500 hover:underline">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();
  const subtotal = nights * listing.price;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + serviceFee;

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    alert(`Reservation confirmed!\n\nProperty: ${listing.title}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nTotal: $${total}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <svg className="w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.5c-1.6 0-3.2.7-4.2 2L1.5 12l1.4 1.4L9.2 7c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8l-6.3 6.3 1.4 1.4L13.4 11c1.6-1.6 1.6-4.2 0-5.8-1-1.3-2.6-2-4.2-2zm7.8 9.5l-6.3 6.3c-.8.8-2 .8-2.8 0-.8-.8-.8-2 0-2.8l6.3-6.3-1.4-1.4-6.3 6.3c-1.6 1.6-1.6 4.2 0 5.8 1 1 2.3 1.5 3.5 1.5s2.5-.5 3.5-1.5l6.3-6.3-1.4-1.4z"/>
              </svg>
              <span className="ml-2 text-xl font-bold text-rose-500">staybnb</span>
            </Link>

            <div className="flex items-center gap-2">
              <button className="hidden md:block px-4 py-2 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium">
                Become a Host
              </button>
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                <Globe className="w-4 h-4" />
              </button>
              <div className="relative">
                <button
                  onClick={() => user ? setShowUserMenu(!showUserMenu) : setAuthModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow"
                >
                  <Menu className="w-4 h-4" />
                  <User className="w-5 h-5" />
                </button>
                {user && showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to listings</span>
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-2">{listing.title}</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{listing.rating}</span>
              <span className="text-gray-600">({listing.reviewCount} reviews)</span>
            </div>
            <span className="text-gray-600">{listing.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden mb-12 h-96">
          <div className="col-span-4 md:col-span-2 row-span-2">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover hover:brightness-95 transition-all cursor-pointer"
            />
          </div>
          {listing.images.slice(1, 5).map((image, index) => (
            <div key={index} className="hidden md:block">
              <img
                src={image}
                alt={`${listing.title} ${index + 2}`}
                className="w-full h-full object-cover hover:brightness-95 transition-all cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">
                {listing.type} hosted by {listing.host.name}
              </h2>
              <div className="flex items-center gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{listing.guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  <span>{listing.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5" />
                  <span>{listing.beds} beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5" />
                  <span>{listing.baths} baths</span>
                </div>
              </div>
            </div>

            <div className="py-8 border-b border-gray-200">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed">{listing.description}</p>
            </div>

            <div className="py-8 border-b border-gray-200">
              <h3 className="text-xl font-semibold mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-gray-700">
                      {amenityIcons[amenity] || <Star className="w-6 h-6" />}
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-8">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={listing.host.avatar}
                  alt={listing.host.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">Hosted by {listing.host.name}</h3>
                  <p className="text-gray-600 text-sm">Joined in {listing.host.joinedDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="border border-gray-300 rounded-xl p-6 shadow-xl">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-semibold">${listing.price}</span>
                  <span className="text-gray-600">night</span>
                </div>

                <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="border-r border-b border-gray-300 p-3">
                      <label className="block text-xs font-semibold mb-1">CHECK-IN</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full text-sm focus:outline-none"
                      />
                    </div>
                    <div className="border-b border-gray-300 p-3">
                      <label className="block text-xs font-semibold mb-1">CHECK-OUT</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-semibold mb-1">GUESTS</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full text-sm focus:outline-none"
                    >
                      {Array.from({ length: listing.guests }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleReserve}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
                >
                  Reserve
                </button>

                <p className="text-center text-sm text-gray-600 mb-4">
                  You won't be charged yet
                </p>

                {nights > 0 && (
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="underline">${listing.price} x {nights} nights</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Service fee</span>
                      <span>${serviceFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-4">
                <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
                <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
