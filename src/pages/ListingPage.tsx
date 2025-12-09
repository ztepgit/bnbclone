import { useState } from 'react';
import { Search, Menu, Globe, User } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import FilterPanel, { FilterState } from '../components/FilterPanel';
import AuthModal from '../components/AuthModal';
import { mockListings } from '../data/mockListings';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ListingPage() {
  const { user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    locations: [],
    checkIn: '',
    checkOut: '',
    amenities: [],
  });

  const filteredListings = mockListings.filter((listing) => {
    if (filters.locations.length > 0 && !filters.locations.includes(listing.location)) {
      return false;
    }

    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        listing.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    return true;
  });

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

            <div className="hidden md:flex items-center gap-4 px-6 py-2 border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <span className="text-sm font-medium">Anywhere</span>
              <div className="w-px h-6 bg-gray-300"></div>
              <span className="text-sm font-medium">Any week</span>
              <div className="w-px h-6 bg-gray-300"></div>
              <span className="text-sm text-gray-600">Add guests</span>
              <div className="bg-rose-500 p-2 rounded-full">
                <Search className="w-4 h-4 text-white" />
              </div>
            </div>

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

      <FilterPanel onFilterChange={setFilters} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {filteredListings.length > 0
              ? `${filteredListings.length} stays available`
              : 'No stays match your filters'}
          </h1>
          <p className="text-gray-600">
            {filteredListings.length > 0
              ? 'Discover entire homes and rooms perfect for any trip'
              : 'Try adjusting your filters to find more options'}
          </p>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Try changing your filters to see more options</p>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:underline cursor-pointer">Help Center</li>
                <li className="hover:underline cursor-pointer">Safety information</li>
                <li className="hover:underline cursor-pointer">Cancellation options</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:underline cursor-pointer">Support Afghan refugees</li>
                <li className="hover:underline cursor-pointer">Combating discrimination</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hosting</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:underline cursor-pointer">Try hosting</li>
                <li className="hover:underline cursor-pointer">Responsible hosting</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2024 Staybnb, Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span className="hover:underline cursor-pointer">Terms</span>
              <span className="hover:underline cursor-pointer">Sitemap</span>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
