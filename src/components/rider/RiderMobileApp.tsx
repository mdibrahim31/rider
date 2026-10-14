import React, { useState } from 'react';
import { useDelivery } from '../../context/DeliveryContext';
import { Bike, Navigation, MapPin, DollarSign, User, LogOut, CheckCircle2, ShieldCheck, Store } from 'lucide-react';

export const RiderMobileApp: React.FC = () => {
  const { 
    riders, 
    currentRider, 
    setCurrentRider, 
    toggleRiderOnline, 
    orders, 
    riderAcceptOrder,
    completeRiderRegistration
  } = useDelivery();

  const [activeTab, setActiveTab] = useState<'orders' | 'earnings' | 'profile'>('orders');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState<'Motorcycle' | 'Bicycle' | 'Scooter'>('Motorcycle');
  const [zone, setZone] = useState('Chawkbazar Zone');

  const rider = currentRider || riders[0];
  const isOnline = Boolean(rider?.is_online);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = riders.find(r => r.phone === phone);
    if (found) {
      setCurrentRider(found);
    } else {
      alert('Rider not found with this phone number. Please register.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await completeRiderRegistration({
      name: name.trim(),
      phone: phone.trim(),
      password: password || '123456',
      vehicle_type: vehicle,
      zone
    });
    if (res.success) {
      alert('✅ Rider Registration Successful!');
    } else {
      alert('❌ ' + res.message);
    }
  };

  if (!rider || !rider.id) {
    return (
      <div className="min-h-screen bg-amber-600 flex flex-col justify-center px-4 py-12">
        <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Bike className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">FoodHub Rider App</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Mobile Delivery Companion (Android / iOS)</p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl uppercase tracking-wider transition-all ${
                authMode === 'login' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl uppercase tracking-wider transition-all ${
                authMode === 'register' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600'
              }`}
            >
              Register
            </button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Rider Phone Number</label>
                <input 
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01700000000"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Password / PIN</label>
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-lg shadow-amber-600/20 transition-all"
              >
                Login as Rider
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahim Ahmed"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01700000000"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Password</label>
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Vehicle</label>
                  <select 
                    value={vehicle}
                    onChange={(e: any) => setVehicle(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:outline-none"
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Scooter">Scooter</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Zone</label>
                  <select 
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:outline-none"
                  >
                    <option value="Chawkbazar Zone">Chawkbazar Zone</option>
                    <option value="GEC Circle Zone">GEC Circle Zone</option>
                    <option value="Agrabad Zone">Agrabad Zone</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-lg shadow-amber-600/20 transition-all"
              >
                Register & Start Delivery
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans max-w-md mx-auto shadow-2xl relative">
      {/* Mobile Header */}
      <header className="bg-amber-600 text-white px-4 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold">
            <Bike className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tight">{rider.name}</h2>
            <p className="text-[10px] text-amber-100 font-bold uppercase tracking-wider">{rider.zone || 'Chawkbazar'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleRiderOnline(rider.id, !isOnline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black tracking-wider transition-all ${
              isOnline ? 'bg-emerald-500 text-white shadow-md' : 'bg-rose-500 text-white shadow-md'
            }`}
          >
            {isOnline ? '🟢 ONLINE' : '🔴 OFFLINE'}
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 p-4 pb-24 space-y-4 overflow-y-auto">
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today's Deliveries</p>
                <h3 className="text-lg font-black text-slate-900">Orders Ready</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cash Held</p>
                <h3 className="text-lg font-black text-amber-600">৳{rider.cash_in_hand || 0}</h3>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Available & Active Orders ({orders.length})</h4>
              {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl text-center text-slate-400 font-bold text-xs space-y-2 border border-slate-200">
                  <MapPin className="w-8 h-8 mx-auto text-slate-300" />
                  <p>No orders nearby right now. Stay online to receive deliveries!</p>
                </div>
              ) : (
                orders.map((order: any) => (
                  <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-black text-amber-600">#{order.id.slice(-6)}</span>
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-lg uppercase">
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-start space-x-2">
                        <Store className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900">{order.restaurant_name || 'Restaurant'}</p>
                          <p className="text-[11px] text-slate-500">{order.restaurant_address || 'Address'}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900">{order.customer_name || 'Customer'}</p>
                          <p className="text-[11px] text-slate-500">{order.delivery_address || 'Delivery Address'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Delivery Fee</p>
                        <p className="text-sm font-black text-slate-900">৳{order.delivery_fee || 50}</p>
                      </div>
                      {order.status === 'pending' || order.status === 'ready_for_pickup' ? (
                        <button
                          onClick={() => riderAcceptOrder(order.id, rider.id)}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl shadow-md transition-all"
                        >
                          Accept Order
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Assigned to You
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <div className="bg-amber-600 text-white p-6 rounded-3xl shadow-lg space-y-3">
              <p className="text-xs font-bold text-amber-100 uppercase tracking-widest">Cash in Hand</p>
              <h2 className="text-3xl font-black">৳{rider.cash_in_hand || 0}</h2>
              <div className="pt-3 border-t border-amber-500/40 flex justify-between text-xs font-bold">
                <span>Vehicle: {rider.vehicle_type}</span>
                <span>Zone: {rider.zone}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Earnings History</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-bold text-slate-800">Delivery Commission</span>
                  <span className="font-black text-emerald-600">+৳65</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
                {rider.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{rider.name}</h3>
                <p className="text-xs text-slate-500 font-bold">{rider.phone}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black">
                <ShieldCheck className="w-4 h-4" /> Verified Rider ({rider.vehicle_type})
              </div>
            </div>

            <button
              onClick={() => setCurrentRider(null as any)}
              className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-rose-100"
            >
              <LogOut className="w-4 h-4" /> Logout from Mobile App
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center z-40 shadow-lg">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'orders' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-wider">Orders</span>
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'earnings' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <DollarSign className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-wider">Earnings</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-wider">Profile</span>
        </button>
      </nav>
    </div>
  );
};
