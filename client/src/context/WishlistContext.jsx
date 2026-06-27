import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const authHeaders = () => ({
    headers: { Authorization: `Bearer ${user?.token}` },
  });

  const fetchWishlist = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await api.get('/wishlist', authHeaders());
      setWishlist(data);
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const toggleWishlist = async (productId) => {
    if (!user) {
      throw new Error('Please log in to use wishlist');
    }
    const { data } = await api.post('/wishlist/toggle', { productId }, authHeaders());
    setWishlist(data);
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};