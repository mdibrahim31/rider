import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

// In-Memory Database Store for FoodHub Delivery Platform
// Allows the entire multi-portal system to operate seamlessly without external DB
const initialZones = [
  {
    id: 'zone-chawkbazar',
    name: 'Chawkbazar Zone',
    bn_name: 'চকবাজার জোন',
    center_latitude: 22.3590,
    center_longitude: 91.8380,
    radius_km: 3.0,
    color: '#E11D48',
    is_active: true,
  },
  {
    id: 'zone-gec',
    name: 'GEC Zone',
    bn_name: 'জিইসি জোন',
    center_latitude: 22.3585,
    center_longitude: 91.8215,
    radius_km: 3.0,
    color: '#2563EB',
    is_active: true,
  },
  {
    id: 'zone-agrabad',
    name: 'Agrabad Zone',
    bn_name: 'আগ্রাবাদ জোন',
    center_latitude: 22.3255,
    center_longitude: 91.8120,
    radius_km: 3.5,
    color: '#059669',
    is_active: true,
  },
  {
    id: 'zone-banani',
    name: 'Banani & Gulshan Zone',
    bn_name: 'বনানী ও গুলশান জোন',
    center_latitude: 23.7937,
    center_longitude: 90.4043,
    radius_km: 4.0,
    color: '#D97706',
    is_active: true,
  }
];

const initialVendors = [
  {
    id: 'vnd-1001',
    unique_id: 'VND-1001',
    name: "Sultan's Dine",
    cuisine: 'Biryani & Kebab',
    phone: '01811223344',
    address: 'GEC Circle, Chattogram',
    zone: 'GEC Zone',
    latitude: 22.3585,
    longitude: 91.8215,
    rating: 4.8,
    estimated_prep_time_minutes: 20,
    is_active: true,
    is_paused: false,
    vendor_type: 'restaurant',
    cover_image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    logo_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 'vnd-1002',
    unique_id: 'VND-1002',
    name: 'Burger Lab Express',
    cuisine: 'Burger & Fast Food',
    phone: '01722334455',
    address: 'Chawkbazar Moor, Chattogram',
    zone: 'Chawkbazar Zone',
    latitude: 22.3590,
    longitude: 91.8380,
    rating: 4.9,
    estimated_prep_time_minutes: 15,
    is_active: true,
    is_paused: false,
    vendor_type: 'restaurant',
    cover_image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    logo_url: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 'vnd-1003',
    unique_id: 'VND-1003',
    name: 'Bella Italia Pizza',
    cuisine: 'Pizza & Pasta',
    phone: '01933445566',
    address: 'Agrabad Commercial Area, Chattogram',
    zone: 'Agrabad Zone',
    latitude: 22.3255,
    longitude: 91.8120,
    rating: 4.7,
    estimated_prep_time_minutes: 25,
    is_active: true,
    is_paused: false,
    vendor_type: 'restaurant',
    cover_image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    logo_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=120&h=120&q=80',
  }
];

const initialMenuItems = [
  {
    id: 'menu-1',
    vendor_id: 'vnd-1001',
    name: 'Kacchi Biryani Feast',
    description: 'Aromatic basmati rice cooked with tender mutton and authentic spiced potatoes',
    price: 380,
    category: 'Biryani',
    image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80',
    is_available: true,
  },
  {
    id: 'menu-2',
    vendor_id: 'vnd-1002',
    name: 'Signature Double Beef Burger',
    description: 'Juicy smashed double patties, cheddar cheese, caramelized onions and house sauce',
    price: 260,
    category: 'Burger',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    is_available: true,
  },
  {
    id: 'menu-3',
    vendor_id: 'vnd-1003',
    name: 'Wood-Fired Pepperoni Pizza',
    description: 'Crispy thin crust topped with mozzarella, spicy pepperoni slices, and fresh basil',
    price: 680,
    category: 'Pizza',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    is_available: true,
  }
];

const initialRiders = [
  {
    id: 'rider-1001',
    name: 'Karim Ahmed',
    phone: '01700000000',
    password: 'password123',
    is_password_set: true,
    vehicle_type: 'Motorcycle',
    zone: 'Chawkbazar Zone',
    is_online: true,
    is_paused: false,
    is_approved: true,
    current_latitude: 22.3590,
    current_longitude: 91.8380,
    cash_in_hand: 1200,
  }
];

const initialBanners = [
  {
    id: 'ban-1',
    title: '50% Off First Delivery!',
    subtitle: 'Taste the best dishes in town delivered hot & fresh to your doorstep',
    action_text: 'Explore Deals',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    order_index: 0
  }
];

let zonesStore = [...initialZones];
let vendorsStore = [...initialVendors];
let menuItemsStore = [...initialMenuItems];
let ridersStore = [...initialRiders];
let ordersStore: any[] = [];
let reviewsStore: any[] = [];
let foodCategoriesStore: any[] = [];
let bannersStore = [...initialBanners];
let customersStore: any[] = [];

const addressesStore = new Map<string, any[]>();
const favoritesStore = new Map<string, string[]>();
const cartStore = new Map<string, any[]>();
const otpSenderStore = new Map<string, any>();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // API Router to handle all frontend calls with mock in-memory state
  const apiRouter = express.Router();

  // Config status
  apiRouter.get('/config', (_req, res) => {
    res.json({
      isConfigured: Boolean(process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY),
      url: process.env.VITE_SUPABASE_URL || '',
    });
  });

  // Zones
  apiRouter.get('/zones', (_req, res) => res.json(zonesStore));
  apiRouter.post('/zones', (req, res) => {
    const item = { ...req.body, id: req.body.id || `zone-${Date.now()}` };
    zonesStore.push(item);
    res.json({ success: true, zone: item });
  });
  apiRouter.put('/zones/:id', (req, res) => {
    zonesStore = zonesStore.map(z => z.id === req.params.id ? { ...z, ...req.body } : z);
    res.json({ success: true });
  });
  apiRouter.delete('/zones/:id', (req, res) => {
    zonesStore = zonesStore.filter(z => z.id !== req.params.id);
    res.json({ success: true });
  });

  // Vendors
  apiRouter.get('/vendors', (_req, res) => res.json(vendorsStore));
  apiRouter.post('/vendors', (req, res) => {
    const vendor = { ...req.body, id: req.body.id || `vnd-${Date.now()}` };
    vendorsStore.push(vendor);
    res.json({ success: true, vendor });
  });
  apiRouter.put('/vendors/:id', (req, res) => {
    vendorsStore = vendorsStore.map(v => v.id === req.params.id ? { ...v, ...req.body } : v);
    res.json({ success: true });
  });
  apiRouter.delete('/vendors/:id', (req, res) => {
    vendorsStore = vendorsStore.filter(v => v.id !== req.params.id);
    res.json({ success: true });
  });

  // Menu Items
  apiRouter.get('/menu-items', (_req, res) => res.json(menuItemsStore));
  apiRouter.post('/menu-items', (req, res) => {
    const item = { ...req.body, id: req.body.id || `menu-${Date.now()}` };
    menuItemsStore.push(item);
    res.json({ success: true, item });
  });
  apiRouter.put('/menu-items/:id', (req, res) => {
    menuItemsStore = menuItemsStore.map(m => m.id === req.params.id ? { ...m, ...req.body } : m);
    res.json({ success: true });
  });
  apiRouter.delete('/menu-items/:id', (req, res) => {
    menuItemsStore = menuItemsStore.filter(m => m.id !== req.params.id);
    res.json({ success: true });
  });

  // Food Categories
  apiRouter.get('/food-categories', (_req, res) => res.json(foodCategoriesStore));
  apiRouter.post('/food-categories', (req, res) => {
    const cat = { ...req.body, id: req.body.id || `cat-${Date.now()}` };
    foodCategoriesStore.push(cat);
    res.json({ success: true, category: cat });
  });
  apiRouter.put('/food-categories/:id', (req, res) => {
    foodCategoriesStore = foodCategoriesStore.map(c => c.id === req.params.id ? { ...c, ...req.body } : c);
    res.json({ success: true });
  });
  apiRouter.delete('/food-categories/:id', (req, res) => {
    foodCategoriesStore = foodCategoriesStore.filter(c => c.id !== req.params.id);
    res.json({ success: true });
  });

  // Riders
  apiRouter.get('/riders', (_req, res) => res.json(ridersStore));
  apiRouter.post('/riders', (req, res) => {
    const rider = { ...req.body, id: req.body.id || `rider-${Date.now()}` };
    const existingIndex = ridersStore.findIndex(r => r.phone === rider.phone);
    if (existingIndex >= 0) {
      ridersStore[existingIndex] = { ...ridersStore[existingIndex], ...rider };
    } else {
      ridersStore.push(rider);
    }
    res.json({ success: true, rider });
  });
  apiRouter.put('/riders/:id', (req, res) => {
    ridersStore = ridersStore.map(r => r.id === req.params.id ? { ...r, ...req.body } : r);
    res.json({ success: true });
  });
  apiRouter.put('/riders/:id/pause', (req, res) => {
    const rider = ridersStore.find(r => r.id === req.params.id);
    if (rider) {
      rider.is_paused = Boolean(req.body.is_paused);
    }
    res.json({ success: true });
  });
  apiRouter.delete('/riders/:id', (req, res) => {
    ridersStore = ridersStore.filter(r => r.id !== req.params.id);
    res.json({ success: true });
  });

  // Orders
  apiRouter.get('/orders', (_req, res) => res.json(ordersStore));
  apiRouter.post('/orders', (req, res) => {
    const order = { ...req.body, id: req.body.id || `ord-${Date.now()}` };
    ordersStore.unshift(order);
    res.json({ success: true, order });
  });
  apiRouter.put('/orders/:id', (req, res) => {
    ordersStore = ordersStore.map(o => o.id === req.params.id ? { ...o, ...req.body } : o);
    res.json({ success: true });
  });
  apiRouter.delete('/orders/:id', (req, res) => {
    ordersStore = ordersStore.filter(o => o.id !== req.params.id);
    res.json({ success: true });
  });

  // Reviews
  apiRouter.get('/reviews', (_req, res) => res.json(reviewsStore));
  apiRouter.post('/reviews', (req, res) => {
    const review = { ...req.body, id: req.body.id || `rev-${Date.now()}`, created_at: new Date().toISOString() };
    reviewsStore.unshift(review);
    res.json({ success: true, review });
  });

  // Banners
  apiRouter.get('/banners', (_req, res) => res.json(bannersStore));
  apiRouter.post('/banners', (req, res) => {
    const banner = { ...req.body, id: req.body.id || `ban-${Date.now()}` };
    bannersStore.push(banner);
    res.json({ success: true, banner });
  });
  apiRouter.put('/banners/:id', (req, res) => {
    bannersStore = bannersStore.map(b => b.id === req.params.id ? { ...b, ...req.body } : b);
    res.json({ success: true });
  });
  apiRouter.delete('/banners/:id', (req, res) => {
    bannersStore = bannersStore.filter(b => b.id !== req.params.id);
    res.json({ success: true });
  });

  // Customers
  apiRouter.get('/customers', (_req, res) => res.json(customersStore));
  apiRouter.post('/customers', (req, res) => {
    const customer = { ...req.body, id: req.body.id || `cust-${Date.now()}` };
    const existingIndex = customersStore.findIndex(c => c.phone === customer.phone);
    if (existingIndex >= 0) {
      customersStore[existingIndex] = { ...customersStore[existingIndex], ...customer };
    } else {
      customersStore.push(customer);
    }
    res.json({ success: true, customer });
  });

  // Customer Addresses
  apiRouter.get('/addresses/:identifier', (req, res) => {
    const id = req.params.identifier;
    res.json({ addresses: addressesStore.get(id) || [] });
  });
  apiRouter.post('/addresses/:identifier', (req, res) => {
    const id = req.params.identifier;
    const current = addressesStore.get(id) || [];
    const newAddr = { ...req.body, id: req.body.id || `addr-${Date.now()}` };
    current.push(newAddr);
    addressesStore.set(id, current);
    res.json({ success: true, address: newAddr });
  });
  apiRouter.put('/addresses/:identifier/:addrId', (req, res) => {
    const { identifier, addrId } = req.params;
    const current = addressesStore.get(identifier) || [];
    addressesStore.set(identifier, current.map(a => a.id === addrId ? { ...a, ...req.body } : a));
    res.json({ success: true });
  });
  apiRouter.put('/addresses/:identifier/:addrId/activate', (req, res) => {
    const { identifier, addrId } = req.params;
    const current = addressesStore.get(identifier) || [];
    addressesStore.set(identifier, current.map(a => ({
      ...a,
      status: a.id === addrId ? 'active' : 'inactive'
    })));
    res.json({ success: true });
  });
  apiRouter.delete('/addresses/:identifier/:addrId', (req, res) => {
    const { identifier, addrId } = req.params;
    const current = addressesStore.get(identifier) || [];
    addressesStore.set(identifier, current.filter(a => a.id !== addrId));
    res.json({ success: true });
  });

  // Favorites
  apiRouter.get('/favorites/:identifier', (req, res) => {
    res.json({ favorites: favoritesStore.get(req.params.identifier) || [] });
  });
  apiRouter.post('/favorites/:identifier', (req, res) => {
    favoritesStore.set(req.params.identifier, req.body.favorites || []);
    res.json({ success: true });
  });

  // Cart
  apiRouter.get('/cart/:key', (req, res) => {
    res.json({ cart: cartStore.get(req.params.key) || [] });
  });
  apiRouter.post('/cart/:key', (req, res) => {
    cartStore.set(req.params.key, req.body.cart || []);
    res.json({ success: true });
  });
  apiRouter.delete('/cart/:key', (req, res) => {
    cartStore.delete(req.params.key);
    res.json({ success: true });
  });

  // OTP Sender
  apiRouter.post('/otp_sender', (req, res) => {
    const key = req.body.id || req.body.phone_number;
    otpSenderStore.set(key, req.body);
    res.json({ success: true });
  });
  apiRouter.get('/otp_sender/:id', (req, res) => {
    const found = otpSenderStore.get(req.params.id) || { otp: '123456', status: 'sent' };
    res.json(found);
  });

  // Upload placeholder
  apiRouter.post('/upload', (req, res) => {
    res.json({ success: true, url: req.body?.dataUrl || '/icons/icon-main-192.png' });
  });
  apiRouter.post('/upload/delete', (_req, res) => {
    res.json({ success: true });
  });

  // Fallback 404 for unknown /api calls to prevent HTML collision
  apiRouter.all('*', (req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
  });

  // Mount API router
  app.use('/api', apiRouter);

  // In production, serve dist folder directly
  const distPath = path.resolve(process.cwd(), 'dist');
  if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // Development mode with Vite SPA middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const PORT = Number(process.env.PORT) || 3000;
  const HOST = '0.0.0.0';

  app.listen(PORT, HOST, () => {
    console.log(`FoodHub Server running at http://${HOST}:${PORT}`);
  });
}

startServer();
