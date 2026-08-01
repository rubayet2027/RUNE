import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Table, TableRow, TableCell } from '../components/ui/Table.jsx';
import { StateView } from '../components/ui/StateView.jsx';
import {
  Shield,
  RefreshCw,
  Send,
  DollarSign,
  Package,
  Lock,
  CheckCircle2,
  Users,
  MessageSquare,
  FileText,
  Settings as SettingsIcon,
  Layers,
  Star,
  Check,
  X,
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [dispatchStatus, setDispatchStatus] = useState(null);

  const { data: statsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => api.get('/admin/dashboard'),
  });

  const { data: ordersData } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: () => api.get('/admin/orders'),
    enabled: activeTab === 'orders' || activeTab === 'overview',
  });

  const { data: dropsData } = useQuery({
    queryKey: ['adminDrops'],
    queryFn: () => api.get('/admin/drops'),
    enabled: activeTab === 'drops',
  });

  const { data: productsData } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: () => api.get('/admin/products'),
    enabled: activeTab === 'products',
  });

  const { data: customersData } = useQuery({
    queryKey: ['adminCustomers'],
    queryFn: () => api.get('/admin/customers'),
    enabled: activeTab === 'customers',
  });

  const { data: ticketsData } = useQuery({
    queryKey: ['adminTickets'],
    queryFn: () => api.get('/admin/tickets'),
    enabled: activeTab === 'tickets',
  });

  const { data: reviewsData } = useQuery({
    queryKey: ['adminReviews'],
    queryFn: () => api.get('/admin/reviews'),
    enabled: activeTab === 'reviews',
  });

  const { data: logsData } = useQuery({
    queryKey: ['adminLogs'],
    queryFn: () => api.get('/admin/logs'),
    enabled: activeTab === 'logs',
  });

  const sendDropMutation = useMutation({
    mutationFn: (dropId) => api.post('/admin/drops/send-bulk', { dropId }),
    onSuccess: (res) => {
      setDispatchStatus(res.data);
      queryClient.invalidateQueries(['adminStats']);
    },
  });

  const moderateReviewMutation = useMutation({
    mutationFn: ({ reviewId, status }) => api.patch(`/admin/reviews/${reviewId}/moderate`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminReviews']);
    },
  });

  if (isLoading) {
    return <StateView type="loading" title="INITIALIZING ADMIN CONTROL CENTER..." />;
  }

  if (isError) {
    return (
      <StateView
        type="error"
        title="ADMIN METRICS FAILED TO LOAD"
        description="Could not establish secure session with the admin control backend."
        onAction={refetch}
        actionLabel="RECONNECT API SESSION"
      />
    );
  }

  const stats = statsData?.data?.stats;
  const ordersList = ordersData?.data?.orders || [];
  const dropsList = dropsData?.data?.items || [];
  const productsList = productsData?.data?.products || [];
  const customersList = customersData?.data?.customers || [];
  const ticketsList = ticketsData?.data?.tickets || [];
  const reviewsList = reviewsData?.data?.reviews || [];
  const logsList = logsData?.data?.logs || [];

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: Shield },
    { id: 'drops', label: 'DROPS', icon: Layers },
    { id: 'products', label: 'PRODUCTS', icon: Package },
    { id: 'orders', label: 'ORDERS', icon: Lock },
    { id: 'dispatch', label: 'BULK DISPATCH', icon: Send },
    { id: 'reviews', label: 'REVIEWS', icon: CheckCircle2 },
    { id: 'tickets', label: 'SUPPORT TICKETS', icon: MessageSquare },
    { id: 'customers', label: 'CUSTOMERS', icon: Users },
    { id: 'settings', label: 'SETTINGS', icon: SettingsIcon },
    { id: 'logs', label: 'ACTIVITY LOGS', icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Admin Header */}
      <div className="border-b border-rune-border pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-rune-secondary uppercase tracking-[0.2em] mb-1">
            <Shield className="w-4 h-4 text-rune-primary" /> RUNE ATELIER CONTROL CENTER
          </div>
          <h1 className="font-serif text-rune-primaryxl font-bold text-rune-primary uppercase tracking-wider">
            ADMINISTRATOR SUITE
          </h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="w-3.5 h-3.5 mr-2 inline" /> REFRESH DATA
        </Button>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-rune-border pb-4 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors rounded-none ${
                activeTab === tab.id
                  ? 'bg-white text-black font-bold'
                  : 'bg-rune-bg text-rune-secondary border border-rune-border hover:text-rune-primary'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rune-secondary font-semibold">TOTAL DROP REVENUE</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="font-mono text-rune-primaryxl text-rune-primary font-bold mt-4">${stats?.totalRevenue?.toLocaleString()} USD</p>
              <span className="text-[10px] font-mono text-emerald-400 mt-2 block">100% PREORDER AUTHORIZED</span>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rune-secondary font-semibold">ACTIVE DROP ORDERS</span>
                <Package className="w-4 h-4 text-rune-primary" />
              </div>
              <p className="font-mono text-rune-primaryxl text-rune-primary font-bold mt-4">{stats?.activeDropOrders}</p>
              <span className="text-[10px] font-mono text-rune-secondary mt-2 block">DROP 001 COLLECTION</span>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rune-secondary font-semibold">LOCKED ORDERS PENDING</span>
                <Lock className="w-4 h-4 text-amber-300" />
              </div>
              <p className="font-mono text-rune-primaryxl text-amber-300 font-bold mt-4">{stats?.pendingReviewOrders}</p>
              <span className="text-[10px] font-mono text-amber-300/80 mt-2 block">READY FOR PRINTFUL DISPATCH</span>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rune-secondary font-semibold">PRINTFUL FULFILLMENTS</span>
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
              </div>
              <p className="font-mono text-rune-primaryxl text-rune-primary font-bold mt-4">{stats?.printfulFulfillments}</p>
              <span className="text-[10px] font-mono text-rune-secondary mt-2 block">HISTORICAL TOTAL</span>
            </Card>
          </div>

          <Card className="border-amber-500/30 bg-amber-500/5">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
              <div className="space-y-2">
                <Badge variant="active">SECTION 16 PRINTFUL BULK DISPATCH</Badge>
                <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">
                  SEND ENTIRE DROP TO PRINTFUL
                </h2>
                <p className="text-xs font-sans text-rune-secondary leading-relaxed max-w-2xl">
                  Locks active drop, compiles all valid preorder reservations into a single bulk batch payload, and dispatches to Printful API for production.
                </p>
              </div>
              <Button size="lg" isLoading={sendDropMutation.isPending} onClick={() => sendDropMutation.mutate('drop_01')}>
                <Send className="w-4 h-4 mr-2 inline" /> SEND ENTIRE DROP NOW
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: DROPS */}
      {activeTab === 'drops' && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">DROP COLLECTIONS</h2>
          <Table headers={['TITLE', 'SLUG', 'STATUS', 'START DATE', 'END DATE']}>
            <TableRow>
              <TableCell className="font-bold text-rune-primary">DROP 001 // OBLIVION HEAVYWEIGHT COLLECTION</TableCell>
              <TableCell className="font-mono text-rune-secondary">drop-001-oblivion</TableCell>
              <TableCell><Badge variant="active">ACTIVE</Badge></TableCell>
              <TableCell className="font-mono text-rune-secondary">2026-07-27</TableCell>
              <TableCell className="font-mono text-rune-secondary">2026-07-31</TableCell>
            </TableRow>
          </Table>
        </div>
      )}

      {/* TAB 3: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">GARMENT INVENTORY</h2>
          <Table headers={['PRODUCT NAME', 'SLUG', 'PRICE', 'CURRENCY', 'FABRIC SPEC']}>
            {productsList.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell className="font-bold text-rune-primary">{prod.name}</TableCell>
                <TableCell className="font-mono text-rune-secondary">{prod.slug}</TableCell>
                <TableCell className="font-mono text-emerald-400 font-bold">${prod.price}</TableCell>
                <TableCell className="font-mono text-rune-secondary">{prod.currency}</TableCell>
                <TableCell className="text-xs text-rune-secondary">{prod.description}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      )}

      {/* TAB 4: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">PREORDER RESERVATION ORDERS</h2>
          <Table headers={['ORDER NUMBER', 'CUSTOMER EMAIL', 'DROP BATCH', 'TOTAL AUTHORIZED', 'PREORDER STATUS']}>
            {ordersList.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono font-bold text-rune-primary">{order.orderNumber}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell className="font-mono text-rune-secondary">{order.dropTitle}</TableCell>
                <TableCell className="font-mono font-bold text-rune-primary">${order.totalAmount} USD</TableCell>
                <TableCell><Badge variant="locked">{order.status}</Badge></TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      )}

      {/* TAB 5: DISPATCH */}
      {activeTab === 'dispatch' && (
        <Card className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">SECTION 16 BULK PRINTFUL ENGINE</h2>
          <p className="text-xs text-rune-secondary leading-relaxed">
            Batch submission engine formatted specifically for Printful sync variant payloads.
          </p>
          <Button size="lg" isLoading={sendDropMutation.isPending} onClick={() => sendDropMutation.mutate('drop_01')}>
            <Send className="w-4 h-4 mr-2 inline" /> EXECUTE BULK DISPATCH NOW
          </Button>
          {dispatchStatus && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
              ✓ {dispatchStatus.message}
            </div>
          )}
        </Card>
      )}

      {/* TAB 6: REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">REVIEWS MODERATION QUEUE</h2>
          {reviewsList.length === 0 ? (
            <StateView type="empty" title="NO PENDING GARMENT REVIEWS" description="Customer reviews submitted post-fulfillment will appear here for approval." />
          ) : (
            <Table headers={['AUTHOR', 'RATING', 'TITLE & COMMENT', 'STATUS', 'MODERATION ACTION']}>
              {reviewsList.map((rev) => (
                <TableRow key={rev.id}>
                  <TableCell className="font-bold text-rune-primary">{rev.userName}</TableCell>
                  <TableCell className="font-mono text-amber-300 font-bold">{rev.rating} ★</TableCell>
                  <TableCell className="text-xs">
                    <p className="text-rune-primary font-bold">{rev.title}</p>
                    <p className="text-rune-secondary">{rev.comment}</p>
                  </TableCell>
                  <TableCell><Badge variant={rev.status === 'APPROVED' ? 'active' : 'locked'}>{rev.status}</Badge></TableCell>
                  <TableCell className="space-x-2">
                    <button
                      onClick={() => moderateReviewMutation.mutate({ reviewId: rev.id, status: 'APPROVED' })}
                      className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-1 text-[10px] font-mono uppercase"
                    >
                      <Check className="w-3 h-3 inline mr-1" /> APPROVE
                    </button>
                    <button
                      onClick={() => moderateReviewMutation.mutate({ reviewId: rev.id, status: 'REJECTED' })}
                      className="bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-1 text-[10px] font-mono uppercase"
                    >
                      <X className="w-3 h-3 inline mr-1" /> REJECT
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          )}
        </div>
      )}

      {/* TAB 7: TICKETS */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">CONCIERGE SUPPORT QUEUE</h2>
          <Table headers={['TICKET REF', 'CUSTOMER EMAIL', 'SUBJECT', 'STATUS', 'PRIORITY']}>
            {ticketsList.map((tick) => (
              <TableRow key={tick.id}>
                <TableCell className="font-mono font-bold text-rune-primary">{tick.ticketNumber}</TableCell>
                <TableCell>{tick.userEmail}</TableCell>
                <TableCell>{tick.subject}</TableCell>
                <TableCell><Badge variant="active">{tick.status}</Badge></TableCell>
                <TableCell className="font-mono text-amber-300">{tick.priority}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      )}

      {/* TAB 8: CUSTOMERS */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">VIP CUSTOMER DIRECTORY</h2>
          <Table headers={['CUSTOMER NAME', 'EMAIL ADDRESS', 'ROLE', 'TOTAL RESERVATIONS']}>
            {customersList.map((cust) => (
              <TableRow key={cust.id}>
                <TableCell className="font-bold text-rune-primary">{cust.name}</TableCell>
                <TableCell className="font-mono text-rune-secondary">{cust.email}</TableCell>
                <TableCell><Badge variant="active">{cust.role}</Badge></TableCell>
                <TableCell className="font-mono text-rune-primary">{cust.ordersCount}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      )}

      {/* TAB 9: SETTINGS */}
      {activeTab === 'settings' && (
        <Card className="space-y-4 text-xs font-sans text-rune-secondary">
          <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">ATELIER PLATFORM CONFIGURATION</h2>
          <div className="space-y-2 font-mono">
            <p>BRAND NAME: <span className="text-rune-primary">RUNE</span></p>
            <p>BASE CURRENCY: <span className="text-rune-primary">USD ($)</span></p>
            <p>TARGET SHIPPING MARKETS: <span className="text-emerald-400">US, GB, CA, AU</span></p>
            <p>PRINTFUL INTEGRATION: <span className="text-emerald-400 font-bold">CONNECTED</span></p>
            <p>STRIPE PAYMENT DRIVER: <span className="text-emerald-400 font-bold">PRE-AUTHORIZATION ACTIVE</span></p>
          </div>
        </Card>
      )}

      {/* TAB 10: LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">ADMINISTRATIVE AUDIT LOG TRAIL</h2>
          <Table headers={['ACTION', 'EXECUTED BY', 'DETAILS', 'TIMESTAMP']}>
            {logsList.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono font-bold text-rune-primary">{log.action}</TableCell>
                <TableCell className="font-mono text-rune-secondary">{log.user}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell className="font-mono text-rune-secondary">{new Date(log.timestamp).toLocaleTimeString()}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};
