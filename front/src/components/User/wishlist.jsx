import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Navbarwishlist from '../navwishlist';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [cookies, setCookie] = useCookies(['wishlist']);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.wishlist) {
      setCookie('wishlist', [], { path: '/', maxAge: 30 * 24 * 60 * 60 });
    }
    console.log("Cookies Wishlist:", cookies.wishlist);
    setWishlist(cookies.wishlist || []);
  }, [cookies.wishlist, setCookie]);

  const removeFromWishlist = (bikeId) => {
    const updatedWishlist = wishlist.filter((bike) => bike._id !== bikeId);
    setWishlist(updatedWishlist);
    setCookie('wishlist', updatedWishlist, { path: '/', maxAge: 30 * 24 * 60 * 60 });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgb(5, 12, 82), #1e1e1e, rgb(11, 4, 64))', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbarwishlist />
      <h2 style={{ color: 'yellow', textAlign: 'center' }}>Your Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <p style={{ color: 'gray' }}>Your wishlist is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          {wishlist.map((bike) => (
            <div key={bike._id} style={{ position: 'relative', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '15px', padding: '15px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', width: '250px', textAlign: 'center' }}>
              <button
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: 'red', fontSize: '20px', cursor: 'pointer' }}
                onClick={() => removeFromWishlist(bike._id)}
              >
                ❌
              </button>
              <img src={bike.bikeImage} alt={bike.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'yellow', marginTop: '10px' }}>{bike.name}</h3>
              <p><strong>Model:</strong> {bike.model}</p>
              <p><strong>Engine:</strong> {bike.engine}</p>
              <p><strong>Power:</strong> {bike.power}</p>
              <p><strong>Mileage:</strong> {bike.mileage}</p>
              <button
                style={{ marginTop: '10px', background: 'transparent', border: '2px solid yellow', color: 'yellow', padding: '10px', borderRadius: '8px', width: '100%', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.3s, color 0.3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'yellow'; e.currentTarget.style.color = 'black'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'yellow'; }}
                onClick={() => navigate(`/address?bikeId=${bike._id}`)}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
