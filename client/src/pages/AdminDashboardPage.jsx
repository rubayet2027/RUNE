import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Table, TableRow, TableCell } from '../components/ui/Table.jsx';
import { StateView } from '../components/ui/StateView.jsx';
import { Shield, RefreshCw, Send, DollarSign, Package, Lock, CheckCircle2 } from 'lucide-react';

export const AdminDashboardPage = () => {
  const queryClient = useQueryClient();
  const [dispatchStatus, setDispatchStatus] = useState(null);

  const { data: statsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => api.get('/admin/dashboard'),
  });

  const sendDropMutation = useMutation({
    mutationFn: (dropId) => api.post('/admin/drops/send-bulk', { dropId }),
    onSuccess: (res) => {
      setDispatchStatus(res.data);
      queryClient.invalidateQueries(['adminStats']);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8E9192] uppercase tracking-[0.2em] mb-1">
            <Shield className="w-4 h-4 text-white" /> RUNE ATELIER CONTROL CENTER
          </div>
          <h1 className="font-serif text-3xl font-bold text-white uppercase tracking-wider">
            ADMINISTRATOR DASHBOARD
          </h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="w-3.5 h-3.5 mr-2 inline" /> REFRESH METRICS
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">TOTAL DROP REVENUE</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-mono text-2xl text-white font-bold mt-4">${stats?.totalRevenue?.toLocaleString()} USD</p>
          <span className="text-[10px] font-mono text-emerald-400 mt-2 block">100% PREORDER AUTHORIZED</span>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">ACTIVE DROP ORDERS</span>
            <Package className="w-4 h-4 text-white" />
          </div>
          <p className="font-mono text-2xl text-white font-bold mt-4">{stats?.activeDropOrders}</p>
          <span className="text-[10px] font-mono text-[#8E9192] mt-2 block">DROP 001 COLLECTION</span>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">LOCKED ORDERS PENDING</span>
            <Lock className="w-4 h-4 text-amber-300" />
          </div>
          <p className="font-mono text-2xl text-amber-300 font-bold mt-4">{stats?.pendingReviewOrders}</p>
          <span className="text-[10px] font-mono text-amber-300/80 mt-2 block">READY FOR PRINTFUL DISPATCH</span>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">PRINTFUL FULFILLMENTS</span>
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
          </div>
          <p className="font-mono text-2xl text-white font-bold mt-4">{stats?.printfulFulfillments}</p>
          <span className="text-[10px] font-mono text-[#8E9192] mt-2 block">HISTORICAL TOTAL</span>
        </Card>
      </div>

      {/* Section 16 Core Engine Dispatch Trigger Card */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="active">SECTION 16 PRINTFUL BULK DISPATCH</Badge>
            </div>
            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wider">
              SEND ENTIRE DROP TO PRINTFUL
            </h2>
            <p className="text-xs font-sans text-[#8E9192] leading-relaxed max-w-2xl">
              Executing this action locks the active drop, compiles all valid preorder reservations into a single bulk batch payload, and dispatches it to Printful API for production and express customer fulfillment.
            </p>
          </div>

          <Button
            size="lg"
            isLoading={sendDropMutation.isPending}
            onClick={() => sendDropMutation.mutate('drop_01')}
          >
            <Send className="w-4 h-4 mr-2 inline" /> SEND ENTIRE DROP NOW
          </Button>
        </div>

        {dispatchStatus && (
          <div className="mt-6 pt-6 border-t border-amber-500/20 text-xs font-mono space-y-2 text-white">
            <p className="text-emerald-400 font-bold">✓ {dispatchStatus.message}</p>
            <p className="text-[#8E9192]">SUCCESS TALLY: {dispatchStatus.data?.successCount} // FAILED: {dispatchStatus.data?.failedCount}</p>
          </div>
        )}
      </Card>

      {/* Orders Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
            RECENT PREORDER RESERVATIONS
          </h2>
          <span className="text-xs font-mono text-[#8E9192]">SHOWING LATEST 10 ORDERS</span>
        </div>

        <Table headers={['ORDER NUMBER', 'CUSTOMER', 'DROP BATCH', 'TOTAL AUTHORIZED', 'PREORDER STATUS', 'DATE']}>
          <TableRow>
            <TableCell className="font-mono font-bold text-white">RN-882910</TableCell>
            <TableCell>Alexander Wright</TableCell>
            <TableCell className="font-mono text-[#8E9192]">DROP 001</TableCell>
            <TableCell className="font-mono font-bold text-white">$275 USD</TableCell>
            <TableCell>
              <Badge variant="locked">LOCKED PREORDER</Badge>
            </TableCell>
            <TableCell className="font-mono text-[#8E9192]">2026-07-28</TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  );
};
