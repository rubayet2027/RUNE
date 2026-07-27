import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Table, TableRow, TableCell } from '../components/ui/Table.jsx';
import { StateView } from '../components/ui/StateView.jsx';
import { User, Package, Shield, LogOut } from 'lucide-react';

export const AccountPage = () => {
  const { user, logout } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['myOrders'],
    queryFn: () => api.get('/orders/my-orders'),
  });

  if (isLoading) {
    return <StateView type="loading" title="RETRIEVING ACCOUNT PROFILE..." />;
  }

  if (isError) {
    return (
      <StateView
        type="error"
        title="FAILED TO LOAD ACCOUNT DATA"
        description="Could not synchronize user profile with RUNE servers."
        onAction={refetch}
        actionLabel="RETRY RECONNECT"
      />
    );
  }

  const orders = data?.data?.orders || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* User Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8E9192] uppercase tracking-[0.2em] mb-1">
            <User className="w-4 h-4 text-white" /> RUNE VIP ACCOUNT
          </div>
          <h1 className="font-serif text-3xl font-bold text-white uppercase tracking-wider">
            {user?.name || 'CUSTOMER ATELIER'}
          </h1>
          <p className="text-xs font-mono text-[#8E9192] mt-1">{user?.email}</p>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center text-xs font-mono text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider border border-red-500/30 px-3 py-1.5"
        >
          <LogOut className="w-3.5 h-3.5 mr-2" /> DISCONNECT SESSION
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">VIP TIER</span>
          <p className="font-serif text-xl text-white font-bold mt-2">OBLIVION FOUNDER</p>
          <span className="text-[10px] font-mono text-emerald-400 mt-2 block">EARLY PREORDER ACCESS ACTIVE</span>
        </Card>

        <Card>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">TOTAL RESERVATIONS</span>
          <p className="font-mono text-2xl text-white font-bold mt-2">{orders.length}</p>
          <span className="text-[10px] font-mono text-[#8E9192] mt-2 block">LOCKED & FULFILLED PREORDERS</span>
        </Card>

        <Card>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">DELIVERY REGION</span>
          <p className="font-mono text-xl text-white font-bold mt-2">GLOBAL EXPRESS</p>
          <span className="text-[10px] font-mono text-[#8E9192] mt-2 block">US / UK / CA / AU ELIGIBLE</span>
        </Card>
      </div>

      {/* Order History */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Package className="w-5 h-5 text-white" /> PREORDER RESERVATION HISTORY
        </h2>

        {orders.length === 0 ? (
          <StateView
            type="empty"
            title="NO PREORDER RESERVATIONS FOUND"
            description="You have not reserved any garments in active drops yet."
          />
        ) : (
          <Table headers={['ORDER NUMBER', 'DROP BATCH', 'TOTAL AUTHORIZED', 'STATUS', 'RESERVED DATE']}>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono font-bold text-white">{order.orderNumber}</TableCell>
                <TableCell className="font-mono text-[#8E9192]">DROP 001</TableCell>
                <TableCell className="font-mono font-bold text-white">${order.totalAmount} USD</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'LOCKED' ? 'locked' : 'active'}>{order.status}</Badge>
                </TableCell>
                <TableCell className="font-mono text-[#8E9192]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
};
