import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, FileText, Receipt, TrendingUp, Calendar, Clock, DollarSign, Building2, Filter, Download, X, ChevronDown, ChevronUp, Edit2, Trash2, Check, AlertCircle } from 'lucide-react';

// Initial locum data from your PDF
const initialLocumData = [
  { id: 1, date: '2025-05-18', week: 20, clinic: 'POLIKLINIK AN-NUR', location: 'BANTING', shift: 'NIGHT', start: '00:00', end: '08:00', hours: 8, rate: null, payable: 250, cash: 0, transfer: 259, total: 259, declare: true, paid: true, paymentDate: '2025-05-21', reference: '000148073', company: 'NORDAYANA BINTI MOHD AZHA' },
  { id: 2, date: '2025-05-21', week: 21, clinic: 'KLINIK MEDIVIRON', location: 'DAMANSARA DAMAI', shift: 'DAY', start: '15:00', end: '21:30', hours: 6.5, rate: 45, payable: 292.5, cash: 295, transfer: 0, total: 295, declare: false, paid: true, paymentDate: '2025-05-21', reference: '', company: '' },
  { id: 3, date: '2025-05-22', week: 21, clinic: 'KLINIK MEDIVIRON', location: 'DAMANSARA DAMAI', shift: 'DAY', start: '08:30', end: '21:30', hours: 13, rate: 45, payable: 585, cash: 585, transfer: 0, total: 585, declare: false, paid: true, paymentDate: '2025-05-22', reference: '', company: '' },
  { id: 4, date: '2025-05-24', week: 21, clinic: 'KELINIK NASIONAL', location: 'SS3', shift: 'DAY', start: '15:00', end: '17:00', hours: 2, rate: 40, payable: 80, cash: 80, transfer: 0, total: 80, declare: false, paid: true, paymentDate: '2025-05-24', reference: '', company: '' },
  { id: 5, date: '2025-05-24', week: 21, clinic: 'POLIKLINIK AN-NUR', location: 'BANTING', shift: 'NIGHT', start: '00:00', end: '08:00', hours: 8, rate: null, payable: 250, cash: 0, transfer: 253, total: 253, declare: true, paid: true, paymentDate: '2025-05-27', reference: '000145633', company: 'NORDAYANA BINTI MOHD AZHA' },
  { id: 6, date: '2025-05-27', week: 22, clinic: 'POLIKLINIK MEDIPRIMA', location: 'SEPANG', shift: 'DAY', start: '17:00', end: '21:00', hours: 4, rate: 40, payable: 160, cash: 161, transfer: 0, total: 161, declare: false, paid: true, paymentDate: '2025-05-27', reference: '', company: '' },
  { id: 7, date: '2025-05-28', week: 22, clinic: 'POLIKLINIK SG BERTEK', location: 'TELUK PULAI', shift: 'DAY', start: '09:00', end: '13:00', hours: 4, rate: 40, payable: 160, cash: 180, transfer: 0, total: 180, declare: false, paid: true, paymentDate: '2025-05-28', reference: '', company: '' },
  { id: 8, date: '2025-05-28', week: 22, clinic: 'KELINIK NASIONAL', location: 'SS3', shift: 'DAY', start: '14:30', end: '17:30', hours: 3, rate: 40, payable: 120, cash: 130, transfer: 0, total: 130, declare: false, paid: true, paymentDate: '2025-05-28', reference: '', company: '' },
  { id: 9, date: '2025-05-29', week: 22, clinic: 'KLINIK MEDIVIRON', location: 'BANTING', shift: 'DAY', start: '09:00', end: '13:00', hours: 4, rate: 40, payable: 160, cash: 177, transfer: 0, total: 177, declare: false, paid: true, paymentDate: '2025-05-29', reference: '', company: '' },
  { id: 10, date: '2025-05-29', week: 22, clinic: 'KLINIK NG DAN SINGH', location: 'BANDAR COUNTRY HOMES', shift: 'DAY', start: '17:00', end: '22:00', hours: 5, rate: 50, payable: 250, cash: 250, transfer: 0, total: 250, declare: false, paid: true, paymentDate: '2025-05-29', reference: '', company: '' },
  { id: 11, date: '2025-06-04', week: 23, clinic: 'MORRAZ MEDICARE', location: 'PUCHONG', shift: 'DAY', start: '18:00', end: '21:00', hours: 3, rate: 40, payable: 120, cash: 0, transfer: 120, total: 120, declare: true, paid: true, paymentDate: '2025-06-09', reference: '000036028', company: 'THIVYASHWINI A/P KOMARAN' },
  { id: 12, date: '2025-06-05', week: 23, clinic: 'QUALITAS HEALTH CLINIC', location: 'SERI PETALING', shift: 'DAY', start: '15:00', end: '22:00', hours: 7, rate: 40, payable: 280, cash: 0, transfer: 280, total: 280, declare: true, paid: true, paymentDate: '2025-06-09', reference: '000048756', company: 'PROFESSIONAL OMEGA SDN' },
  { id: 13, date: '2025-06-06', week: 23, clinic: 'PRIMER CHERANG', location: 'BANDAR SAUJANA PUTRA', shift: 'DAY', start: '10:00', end: '22:00', hours: 12, rate: 40, payable: 480, cash: 0, transfer: 492, total: 492, declare: true, paid: true, paymentDate: '2025-06-06', reference: '000170600', company: 'NIK MUHAMAD ARIFF BIN MOH' },
  { id: 14, date: '2025-06-07', week: 23, clinic: 'KLINIK UTAMA 24 JAM', location: 'PJ NEWTOWN', shift: 'DAY', start: '09:00', end: '00:00', hours: 15, rate: 40, payable: 600, cash: 900, transfer: 0, total: 900, declare: false, paid: true, paymentDate: '2025-06-08', reference: '', company: '' },
  { id: 15, date: '2025-06-09', week: 24, clinic: 'KLINIK WECARE', location: 'PUCHONG', shift: 'DAY', start: '09:00', end: '17:00', hours: 8, rate: 40, payable: 320, cash: 0, transfer: 325, total: 325, declare: true, paid: true, paymentDate: '2025-06-23', reference: '000031709', company: 'WRM INTEGRATED (M) SDN BHD' },
  { id: 16, date: '2025-06-14', week: 24, clinic: 'POLIKLINIK MEDIPRIMA', location: 'BUKIT SENTOSA', shift: 'DAY', start: '13:00', end: '23:00', hours: 10, rate: 45, payable: 450, cash: 450, transfer: 0, total: 450, declare: false, paid: true, paymentDate: '2025-06-14', reference: '', company: 'HEALTH EXPERT ASIA SDN BHD' },
  { id: 17, date: '2025-06-23', week: 26, clinic: 'KLINIK PEARL CITY', location: 'BUKIT JALIL', shift: 'DAY', start: '17:00', end: '21:00', hours: 4, rate: 40, payable: 160, cash: 0, transfer: 160, total: 160, declare: true, paid: true, paymentDate: '2025-06-25', reference: '000174289', company: 'PEARL CITY CLINIC SDN BHD' },
  { id: 18, date: '2025-06-24', week: 26, clinic: 'KLINIK WECARE', location: 'PUCHONG', shift: 'DAY', start: '17:00', end: '22:00', hours: 5, rate: 40, payable: 200, cash: 0, transfer: 205, total: 205, declare: true, paid: true, paymentDate: '2025-07-06', reference: '000067993', company: 'WRM INTEGRATED (M) SDN' },
  { id: 19, date: '2025-06-25', week: 26, clinic: 'SELCARE CLINIC', location: 'PUCHONG', shift: 'DAY', start: '17:00', end: '22:00', hours: 5, rate: 40, payable: 200, cash: 0, transfer: 200, total: 200, declare: true, paid: true, paymentDate: '2025-07-14', reference: '000231150', company: 'SELCARE SDN. BHD.' },
  { id: 20, date: '2025-07-01', week: 27, clinic: 'MEDILINK', location: 'KOTA KEMUNING', shift: 'DAY', start: '09:00', end: '17:00', hours: 7, rate: 40, payable: 280, cash: 0, transfer: 285, total: 285, declare: true, paid: true, paymentDate: '2025-07-10', reference: '000044560', company: 'KLINIK MEDILINK' },
  { id: 21, date: '2025-07-02', week: 27, clinic: 'MEDIC 360', location: 'TAIPAN', shift: 'NIGHT', start: '20:00', end: '08:00', hours: 12, rate: null, payable: 400, cash: 0, transfer: 465, total: 465, declare: true, paid: true, paymentDate: '2025-07-03', reference: '000248439', company: '360 MEDIC USJ TAIPAN' },
  { id: 22, date: '2025-07-03', week: 27, clinic: 'MEDIPRIMA', location: 'BUKIT SENTOSA', shift: 'DAY', start: '16:00', end: '23:00', hours: 7, rate: 45, payable: 315, cash: 325, transfer: 0, total: 325, declare: false, paid: true, paymentDate: '2025-07-03', reference: '', company: 'HEALTH EXPERT ASIA SDN BHD' },
  { id: 23, date: '2025-07-14', week: 29, clinic: 'PEARL CITY', location: 'BUKIT JALIL', shift: 'DAY', start: '17:00', end: '21:00', hours: 4, rate: 40, payable: 160, cash: 0, transfer: 160, total: 160, declare: true, paid: true, paymentDate: '2025-07-18', reference: '000018327', company: 'PEARL CITY CLINIC SDN BHD' },
  { id: 24, date: '2025-08-04', week: 32, clinic: 'SINAR CERIA 24 JAM', location: 'SENTUL', shift: 'NIGHT', start: '22:00', end: '07:00', hours: 9, rate: 27.78, payable: 250, cash: 0, transfer: 309, total: 309, declare: true, paid: true, paymentDate: '2025-08-08', reference: '000092288', company: 'RS HEALTHCARE SDN. BHD.' },
  { id: 25, date: '2025-08-09', week: 32, clinic: 'MEDIPRIMA', location: 'BUKIT SENTOSA', shift: 'DAY', start: '13:00', end: '23:00', hours: 10, rate: 45, payable: 450, cash: 470, transfer: 0, total: 470, declare: false, paid: true, paymentDate: '2025-08-09', reference: '', company: 'HEALTH EXPERT ASIA SDN BHD' },
  { id: 26, date: '2025-08-18', week: 34, clinic: 'PEARL CITY', location: 'BUKIT JALIL', shift: 'DAY', start: '17:00', end: '21:00', hours: 4, rate: 40, payable: 160, cash: 0, transfer: 170, total: 170, declare: true, paid: true, paymentDate: '2025-08-21', reference: '000179269', company: 'PEARL CITY CLINIC SDN BHD' },
  { id: 27, date: '2025-09-07', week: 36, clinic: 'PEARL CITY', location: 'BUKIT JALIL', shift: 'DAY', start: '10:00', end: '18:00', hours: 8, rate: 40, payable: 320, cash: 0, transfer: 364, total: 364, declare: true, paid: true, paymentDate: '2025-09-10', reference: '000006107', company: 'PEARL CITY CLINIC SDN BHD' },
  { id: 28, date: '2025-09-15', week: 38, clinic: 'QUALITAS HEALTH', location: 'PJ NEWTOWN', shift: 'DAY', start: '08:30', end: '16:30', hours: 8, rate: 40, payable: 320, cash: 0, transfer: 320, total: 320, declare: true, paid: true, paymentDate: '2025-09-16', reference: '000015190', company: 'KUMPULAN MEDIC (KL) SDN BHD' },
  { id: 29, date: '2025-10-07', week: 41, clinic: 'SELCARE', location: 'PUCHONG', shift: 'DAY', start: '08:00', end: '22:00', hours: 14, rate: 40, payable: 560, cash: 0, transfer: 560, total: 560, declare: true, paid: true, paymentDate: '2025-10-29', reference: '000166071', company: 'SELCARE CLINIC SDN. BHD.' },
  { id: 30, date: '2025-11-01', week: 44, clinic: 'KM 360', location: 'SERDANG', shift: 'DAY', start: '08:00', end: '20:00', hours: 12, rate: 50, payable: 600, cash: 0, transfer: 600, total: 600, declare: true, paid: true, paymentDate: '2025-11-21', reference: '000286435', company: '360 MEDIC SERDANG' },
  { id: 31, date: '2025-12-01', week: 49, clinic: 'SANCTUARY FAMILY CLINIC', location: 'TELUK PANGLIMA GARANG', shift: 'DAY', start: '09:00', end: '14:00', hours: 5, rate: 45, payable: 225, cash: 0, transfer: 225, total: 225, declare: true, paid: true, paymentDate: '2025-12-01', reference: '000119478', company: 'THE HOLISTIC FAMILY SDN.' },
  { id: 32, date: '2025-12-07', week: 49, clinic: 'KLINIK PEARL CITY', location: 'BUKIT JALIL', shift: 'DAY', start: '10:00', end: '18:00', hours: 8, rate: 40, payable: 320, cash: 0, transfer: 339, total: 339, declare: true, paid: true, paymentDate: '2025-12-12', reference: '000027675', company: 'PEARL CITY CLINIC SDN BHD' },
  { id: 33, date: '2025-12-25', week: 52, clinic: 'POLIKLINIK MEDIPRIMA', location: 'BUKIT SENTOSA', shift: 'DAY', start: '08:00', end: '23:00', hours: 15, rate: 45, payable: 675, cash: 681, transfer: 0, total: 681, declare: false, paid: true, paymentDate: '2025-12-25', reference: '', company: '' },
];

const formatCurrency = (amount) => `RM ${Number(amount || 0).toFixed(2)}`;
const formatDate = (date) => new Date(date).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' });
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function LocumManager() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ month: '', year: '2025', shift: '', clinic: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await window.storage.get('locum-data');
        if (stored && stored.value) {
          setData(JSON.parse(stored.value));
        } else {
          setData(initialLocumData);
          await window.storage.set('locum-data', JSON.stringify(initialLocumData));
        }
      } catch (e) {
        setData(initialLocumData);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      window.storage.set('locum-data', JSON.stringify(data)).catch(() => {});
    }
  }, [data]);

  const uniqueClinics = useMemo(() => [...new Set(data.map(d => d.clinic))].sort(), [data]);

  const filteredData = useMemo(() => {
    return data.filter(entry => {
      const matchesSearch = searchQuery === '' || 
        entry.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.company?.toLowerCase().includes(searchQuery.toLowerCase());
      const entryDate = new Date(entry.date);
      const matchesMonth = !filters.month || entryDate.getMonth() === parseInt(filters.month);
      const matchesYear = !filters.year || entryDate.getFullYear() === parseInt(filters.year);
      const matchesShift = !filters.shift || entry.shift === filters.shift;
      const matchesClinic = !filters.clinic || entry.clinic === filters.clinic;
      return matchesSearch && matchesMonth && matchesYear && matchesShift && matchesClinic;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [data, searchQuery, filters]);

  const stats = useMemo(() => ({
    totalEarnings: data.reduce((sum, d) => sum + (d.total || 0), 0),
    totalHours: data.reduce((sum, d) => sum + (d.hours || 0), 0),
    totalShifts: data.length,
    cashTotal: data.reduce((sum, d) => sum + (d.cash || 0), 0),
    transferTotal: data.reduce((sum, d) => sum + (d.transfer || 0), 0),
    declareTotal: data.filter(d => d.declare).reduce((sum, d) => sum + (d.total || 0), 0),
  }), [data]);

  const monthlyBreakdown = useMemo(() => {
    const breakdown = {};
    data.forEach(entry => {
      const date = new Date(entry.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!breakdown[key]) breakdown[key] = { total: 0, hours: 0, shifts: 0, declare: 0 };
      breakdown[key].total += entry.total || 0;
      breakdown[key].hours += entry.hours || 0;
      breakdown[key].shifts += 1;
      if (entry.declare) breakdown[key].declare += entry.total || 0;
    });
    return Object.entries(breakdown).sort((a, b) => b[0].localeCompare(a[0]));
  }, [data]);

  const handleAddEntry = (newEntry) => {
    setData(prev => [...prev, { ...newEntry, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleUpdateEntry = (updatedEntry) => {
    setData(prev => prev.map(d => d.id === updatedEntry.id ? updatedEntry : d));
    setEditingId(null);
  };

  const handleDeleteEntry = (id) => {
    if (confirm('Delete this entry?')) setData(prev => prev.filter(d => d.id !== id));
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'entries', label: 'Entries', icon: Calendar },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'receipts', label: 'Receipts', icon: Receipt },
  ];

  const baseInput = { padding: '10px 12px', background: 'rgba(13, 27, 42, 0.8)', border: '1px solid rgba(0, 245, 212, 0.2)', borderRadius: '8px', color: '#E0E1DD', fontSize: '14px', outline: 'none' };
  const baseBtn = { padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', color: '#E0E1DD' };
  const iconBtn = { padding: '8px', background: 'rgba(0, 245, 212, 0.1)', border: '1px solid rgba(0, 245, 212, 0.2)', borderRadius: '8px', color: '#00F5D4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #0D1B2A 100%)', fontFamily: 'system-ui, sans-serif', color: '#E0E1DD', padding: '20px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '16px 24px', background: 'rgba(27, 38, 59, 0.6)', borderRadius: '16px', border: '1px solid rgba(0, 245, 212, 0.1)', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', background: 'linear-gradient(90deg, #00F5D4, #00BBF9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>Locum Manager</h1>
          <p style={{ color: '#778DA9', fontSize: '14px' }}>Track shifts, earnings & invoices</p>
        </div>
        <button onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'linear-gradient(135deg, #00F5D4, #00BBF9)', border: 'none', borderRadius: '12px', color: '#0D1B2A', fontWeight: '600', cursor: 'pointer' }}>
          <Plus size={18} /> Add Entry
        </button>
      </header>

      {/* Tabs */}
      <nav style={{ display: 'flex', gap: '8px', marginBottom: '24px', padding: '8px', background: 'rgba(27, 38, 59, 0.4)', borderRadius: '16px', border: '1px solid rgba(0, 245, 212, 0.1)', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: '1 1 auto', minWidth: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 16px', background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(0, 245, 212, 0.2), rgba(0, 187, 249, 0.2))' : 'transparent', border: activeTab === tab.id ? '1px solid rgba(0, 245, 212, 0.3)' : '1px solid transparent', borderRadius: '12px', color: activeTab === tab.id ? '#00F5D4' : '#778DA9', fontWeight: '500', cursor: 'pointer' }}>
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </nav>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {[
              { icon: DollarSign, label: 'Total Earnings', value: formatCurrency(stats.totalEarnings), color: '#00F5D4' },
              { icon: Clock, label: 'Total Hours', value: `${stats.totalHours.toFixed(1)}h`, color: '#00BBF9' },
              { icon: Calendar, label: 'Total Shifts', value: stats.totalShifts, color: '#FEE440' },
              { icon: TrendingUp, label: 'To Declare', value: formatCurrency(stats.declareTotal), color: '#F15BB5' },
            ].map((stat, i) => (
              <div key={i} style={{ padding: '20px', background: 'rgba(27, 38, 59, 0.6)', borderRadius: '16px', border: `1px solid ${stat.color}20` }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <stat.icon size={20} color={stat.color} />
                </div>
                <div style={{ color: '#778DA9', fontSize: '13px', marginBottom: '4px' }}>{stat.label}</div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: stat.color, fontFamily: 'monospace' }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '24px', background: 'rgba(27, 38, 59, 0.6)', borderRadius: '16px', border: '1px solid rgba(0, 245, 212, 0.1)' }}>
              <h3 style={{ color: '#778DA9', fontSize: '14px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Payment Breakdown</h3>
              {[
                { label: 'Cash Received', value: formatCurrency(stats.cashTotal), color: '#00F5D4' },
                { label: 'Bank Transfer', value: formatCurrency(stats.transferTotal), color: '#00BBF9' },
                { label: 'To Declare (Tax)', value: formatCurrency(stats.declareTotal), color: '#FEE440' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: i === 2 ? '1px solid rgba(0, 245, 212, 0.1)' : 'none', marginTop: i === 2 ? '8px' : 0, paddingTop: i === 2 ? '12px' : '8px' }}>
                  <span style={{ color: '#E0E1DD' }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: '600', fontFamily: 'monospace' }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '24px', background: 'rgba(27, 38, 59, 0.6)', borderRadius: '16px', border: '1px solid rgba(0, 245, 212, 0.1)', maxHeight: '300px', overflowY: 'auto' }}>
              <h3 style={{ color: '#778DA9', fontSize: '14px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Summary</h3>
              {monthlyBreakdown.slice(0, 8).map(([month, d]) => (
                <div key={month} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(0, 245, 212, 0.05)', borderRadius: '8px', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>{monthNames[parseInt(month.split('-')[1]) - 1]} {month.split('-')[0]}</div>
                    <div style={{ fontSize: '12px', color: '#778DA9' }}>{d.shifts} shifts • {d.hours.toFixed(1)}h</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: '#00F5D4', fontFamily: 'monospace' }}>{formatCurrency(d.total)}</div>
                    <div style={{ fontSize: '12px', color: '#FEE440' }}>Tax: {formatCurrency(d.declare)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Entries */}
      {activeTab === 'entries' && (
        <div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(27, 38, 59, 0.6)', borderRadius: '12px', border: '1px solid rgba(0, 245, 212, 0.1)' }}>
              <Search size={18} color="#778DA9" />
              <input type="text" placeholder="Search clinics, locations..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', color: '#E0E1DD', fontSize: '14px', outline: 'none' }} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: showFilters ? 'rgba(0, 245, 212, 0.2)' : 'rgba(27, 38, 59, 0.6)', border: '1px solid rgba(0, 245, 212, 0.2)', borderRadius: '12px', color: showFilters ? '#00F5D4' : '#E0E1DD', cursor: 'pointer' }}>
              <Filter size={18} /> Filters
            </button>
          </div>

          {showFilters && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px', padding: '16px', background: 'rgba(27, 38, 59, 0.4)', borderRadius: '12px', border: '1px solid rgba(0, 245, 212, 0.1)' }}>
              <select value={filters.month} onChange={e => setFilters(f => ({ ...f, month: e.target.value }))} style={baseInput}>
                <option value="">All Months</option>
                {monthNames.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
              <select value={filters.year} onChange={e => setFilters(f => ({ ...f, year: e.target.value }))} style={baseInput}>
                <option value="">All Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <select value={filters.shift} onChange={e => setFilters(f => ({ ...f, shift: e.target.value }))} style={baseInput}>
                <option value="">All Shifts</option>
                <option value="DAY">Day</option>
                <option value="NIGHT">Night</option>
              </select>
              <select value={filters.clinic} onChange={e => setFilters(f => ({ ...f, clinic: e.target.value }))} style={baseInput}>
                <option value="">All Clinics</option>
                {uniqueClinics.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={() => setFilters({ month: '', year: '2025', shift: '', clinic: '' })} style={{ padding: '8px 16px', background: 'rgba(241, 91, 181, 0.2)', border: '1px solid rgba(241, 91, 181, 0.3)', borderRadius: '8px', color: '#F15BB5', cursor: 'pointer' }}>Clear</button>
            </div>
          )}

          <div style={{ marginBottom: '16px', color: '#778DA9', fontSize: '14px' }}>Showing {filteredData.length} of {data.length} entries</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredData.map(entry => (
              <div key={entry.id} style={{ padding: '16px 20px', background: 'rgba(27, 38, 59, 0.6)', borderRadius: '16px', border: '1px solid rgba(0, 245, 212, 0.1)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '60px', textAlign: 'center', padding: '8px', background: 'rgba(0, 245, 212, 0.1)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#00F5D4' }}>{new Date(entry.date).getDate()}</div>
                  <div style={{ fontSize: '11px', color: '#778DA9' }}>{monthNames[new Date(entry.date).getMonth()]}</div>
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{entry.clinic}</div>
                  <div style={{ fontSize: '13px', color: '#778DA9' }}>{entry.location}</div>
                  <div style={{ fontSize: '12px', color: '#778DA9', marginTop: '4px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: entry.shift === 'NIGHT' ? 'rgba(241, 91, 181, 0.2)' : 'rgba(254, 228, 64, 0.2)', color: entry.shift === 'NIGHT' ? '#F15BB5' : '#FEE440', marginRight: '8px' }}>{entry.shift}</span>
                    {entry.hours}h
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#00F5D4', fontFamily: 'monospace' }}>{formatCurrency(entry.total)}</div>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end', marginTop: '4px', flexWrap: 'wrap' }}>
                    {entry.paid && <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(0, 245, 212, 0.2)', color: '#00F5D4', fontSize: '11px' }}>PAID</span>}
                    {entry.declare && <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(254, 228, 64, 0.2)', color: '#FEE440', fontSize: '11px' }}>TAX</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => { setSelectedEntry(entry); setShowInvoiceModal(true); }} style={iconBtn} title="Invoice"><FileText size={16} /></button>
                  <button onClick={() => { setSelectedEntry(entry); setShowReceiptModal(true); }} style={iconBtn} title="Receipt"><Receipt size={16} /></button>
                  <button onClick={() => setEditingId(entry.id)} style={iconBtn} title="Edit"><Edit2 size={16} /></button>
                  <button onClick={() => handleDeleteEntry(entry.id)} style={{ ...iconBtn, color: '#F15BB5' }} title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div style={{ padding: '24px', background: 'rgba(27, 38, 59, 0.6)', borderRadius: '16px', border: '1px solid rgba(0, 245, 212, 0.1)' }}>
          <h3 style={{ color: '#00F5D4', marginBottom: '16px' }}>Invoice Generator</h3>
          <p style={{ color: '#778DA9', marginBottom: '16px' }}>Select entries from the Entries tab and click the invoice icon to generate invoices.</p>
          <div style={{ display: 'grid', gap: '12px' }}>
            {data.slice(0, 10).map(entry => (
              <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(0, 245, 212, 0.05)', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: '500' }}>{entry.clinic}</div>
                  <div style={{ fontSize: '12px', color: '#778DA9' }}>{formatDate(entry.date)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: '600', color: '#00F5D4', fontFamily: 'monospace' }}>{formatCurrency(entry.payable)}</span>
                  <button onClick={() => { setSelectedEntry(entry); setShowInvoiceModal(true); }} style={iconBtn}><FileText size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Receipts Tab */}
      {activeTab === 'receipts' && (
        <div style={{ padding: '24px', background: 'rgba(27, 38, 59, 0.6)', borderRadius: '16px', border: '1px solid rgba(0, 245, 212, 0.1)' }}>
          <h3 style={{ color: '#00F5D4', marginBottom: '16px' }}>Payment Receipts</h3>
          <p style={{ color: '#778DA9', marginBottom: '16px' }}>View and generate receipts for paid entries.</p>
          <div style={{ display: 'grid', gap: '12px' }}>
            {data.filter(d => d.paid).slice(0, 10).map(entry => (
              <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(0, 245, 212, 0.05)', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: '500' }}>{entry.clinic}</div>
                  <div style={{ fontSize: '12px', color: '#778DA9' }}>{formatDate(entry.date)} • {entry.cash > 0 ? 'Cash' : 'Transfer'}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: '600', color: '#00F5D4', fontFamily: 'monospace' }}>{formatCurrency(entry.total)}</span>
                  <button onClick={() => { setSelectedEntry(entry); setShowReceiptModal(true); }} style={iconBtn}><Receipt size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Entry Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(13, 27, 42, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto', background: 'linear-gradient(135deg, #1B263B, #0D1B2A)', borderRadius: '20px', border: '1px solid rgba(0, 245, 212, 0.2)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: '#00F5D4', fontSize: '20px' }}>Add New Entry</h2>
              <button onClick={() => setShowAddModal(false)} style={{ ...iconBtn, background: 'transparent' }}><X size={20} /></button>
            </div>
            <AddEntryForm onSave={handleAddEntry} onClose={() => setShowAddModal(false)} clinics={uniqueClinics} baseInput={baseInput} baseBtn={baseBtn} />
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && selectedEntry && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(13, 27, 42, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '500px', background: '#fff', borderRadius: '16px', color: '#0D1B2A', overflow: 'hidden' }}>
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div><h2 style={{ marginBottom: '4px' }}>INVOICE</h2><div style={{ color: '#666' }}>#{`INV-${selectedEntry.date.replace(/-/g, '')}`}</div></div>
                <div style={{ textAlign: 'right' }}><div>Date: {formatDate(new Date().toISOString())}</div></div>
              </div>
              <div style={{ background: '#f9f9f9', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>{selectedEntry.clinic}</div>
                <div style={{ color: '#666', fontSize: '14px' }}>{selectedEntry.location}</div>
                <div style={{ color: '#666', fontSize: '14px' }}>{selectedEntry.shift} • {selectedEntry.start} - {selectedEntry.end}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}><span>Hours</span><span style={{ fontWeight: '500' }}>{selectedEntry.hours}h</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}><span>Rate</span><span style={{ fontWeight: '500' }}>{selectedEntry.rate ? `RM ${selectedEntry.rate}/hr` : 'Flat'}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: '20px', fontWeight: '700' }}><span>Total</span><span style={{ color: '#00A896' }}>{formatCurrency(selectedEntry.payable)}</span></div>
            </div>
            <div style={{ display: 'flex', gap: '12px', padding: '20px', background: '#f5f5f5' }}>
              <button onClick={() => { setShowInvoiceModal(false); setSelectedEntry(null); }} style={{ ...baseBtn, flex: 1, background: '#e0e0e0', color: '#333' }}>Close</button>
              <button onClick={() => { window.print(); }} style={{ ...baseBtn, flex: 1, background: '#0D1B2A', color: '#fff' }}>Print</button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && selectedEntry && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(13, 27, 42, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '16px', color: '#0D1B2A', overflow: 'hidden' }}>
            <div style={{ padding: '30px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px dashed #ccc' }}>
                <h2 style={{ marginBottom: '4px' }}>PAYMENT RECEIPT</h2>
                <div style={{ color: '#666' }}>{`RCP-${selectedEntry.date.replace(/-/g, '')}`}</div>
              </div>
              {[
                { label: 'Date:', value: formatDate(selectedEntry.date) },
                { label: 'Clinic:', value: selectedEntry.clinic },
                { label: 'Hours:', value: `${selectedEntry.hours}h` },
                { label: 'Payment:', value: selectedEntry.cash > 0 ? 'Cash' : 'Transfer' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ color: '#666' }}>{item.label}</span>
                  <span style={{ fontWeight: '500' }}>{item.value}</span>
                </div>
              ))}
              <div style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center', margin: '20px 0', color: '#00A896' }}>{formatCurrency(selectedEntry.total)}</div>
              <div style={{ textAlign: 'center', border: '2px solid #00A896', color: '#00A896', padding: '12px', fontWeight: '700', borderRadius: '8px' }}>✓ PAID</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', padding: '20px', background: '#f5f5f5' }}>
              <button onClick={() => { setShowReceiptModal(false); setSelectedEntry(null); }} style={{ ...baseBtn, flex: 1, background: '#e0e0e0', color: '#333' }}>Close</button>
              <button onClick={() => { window.print(); }} style={{ ...baseBtn, flex: 1, background: '#0D1B2A', color: '#fff' }}>Print</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddEntryForm({ onSave, onClose, clinics, baseInput, baseBtn }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    clinic: '', location: '', shift: 'DAY', start: '09:00', end: '17:00',
    hours: 8, rate: 40, payable: 320, cash: 0, transfer: 0, total: 320,
    paid: false, declare: false, reference: '', company: '', week: 1
  });

  const update = (field, value) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'hours' || field === 'rate') {
        updated.payable = (updated.hours || 0) * (updated.rate || 0);
        if (!updated.cash && !updated.transfer) updated.total = updated.payable;
      }
      if (field === 'cash' || field === 'transfer') {
        updated.total = (updated.cash || 0) + (updated.transfer || 0);
      }
      return updated;
    });
  };

  const labelStyle = { display: 'block', color: '#778DA9', fontSize: '13px', marginBottom: '6px' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Date</label><input type="date" value={form.date} onChange={e => update('date', e.target.value)} style={{ ...baseInput, width: '100%' }} /></div>
      <div><label style={labelStyle}>Clinic</label><input type="text" value={form.clinic} onChange={e => update('clinic', e.target.value)} style={{ ...baseInput, width: '100%' }} list="clinics" /><datalist id="clinics">{clinics.map(c => <option key={c} value={c} />)}</datalist></div>
      <div><label style={labelStyle}>Location</label><input type="text" value={form.location} onChange={e => update('location', e.target.value)} style={{ ...baseInput, width: '100%' }} /></div>
      <div><label style={labelStyle}>Shift</label><select value={form.shift} onChange={e => update('shift', e.target.value)} style={{ ...baseInput, width: '100%' }}><option value="DAY">Day</option><option value="NIGHT">Night</option></select></div>
      <div><label style={labelStyle}>Company</label><input type="text" value={form.company} onChange={e => update('company', e.target.value)} style={{ ...baseInput, width: '100%' }} /></div>
      <div><label style={labelStyle}>Start</label><input type="time" value={form.start} onChange={e => update('start', e.target.value)} style={{ ...baseInput, width: '100%' }} /></div>
      <div><label style={labelStyle}>End</label><input type="time" value={form.end} onChange={e => update('end', e.target.value)} style={{ ...baseInput, width: '100%' }} /></div>
      <div><label style={labelStyle}>Hours</label><input type="number" value={form.hours} onChange={e => update('hours', parseFloat(e.target.value) || 0)} style={{ ...baseInput, width: '100%' }} /></div>
      <div><label style={labelStyle}>Rate/hr</label><input type="number" value={form.rate || ''} onChange={e => update('rate', parseFloat(e.target.value) || null)} style={{ ...baseInput, width: '100%' }} /></div>
      <div><label style={labelStyle}>Cash (RM)</label><input type="number" value={form.cash} onChange={e => update('cash', parseFloat(e.target.value) || 0)} style={{ ...baseInput, width: '100%' }} /></div>
      <div><label style={labelStyle}>Transfer (RM)</label><input type="number" value={form.transfer} onChange={e => update('transfer', parseFloat(e.target.value) || 0)} style={{ ...baseInput, width: '100%' }} /></div>
      <div><label style={labelStyle}>Total (RM)</label><input type="number" value={form.total} onChange={e => update('total', parseFloat(e.target.value) || 0)} style={{ ...baseInput, width: '100%', background: 'rgba(0, 245, 212, 0.1)' }} /></div>
      <div><label style={labelStyle}>Reference</label><input type="text" value={form.reference} onChange={e => update('reference', e.target.value)} style={{ ...baseInput, width: '100%' }} /></div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', gridColumn: 'span 2' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E0E1DD', cursor: 'pointer' }}><input type="checkbox" checked={form.paid} onChange={e => update('paid', e.target.checked)} /> Paid</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E0E1DD', cursor: 'pointer' }}><input type="checkbox" checked={form.declare} onChange={e => update('declare', e.target.checked)} /> Declare</label>
      </div>
      <div style={{ display: 'flex', gap: '12px', gridColumn: 'span 2', justifyContent: 'flex-end' }}>
        <button onClick={onClose} style={{ ...baseBtn, background: 'rgba(119, 141, 169, 0.2)' }}>Cancel</button>
        <button onClick={() => onSave(form)} style={{ ...baseBtn, background: 'linear-gradient(135deg, #00F5D4, #00BBF9)', color: '#0D1B2A', fontWeight: '600' }}>Save</button>
      </div>
    </div>
  );
}
