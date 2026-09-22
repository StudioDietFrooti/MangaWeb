import React, { useState } from 'react';
import { OrderRequest } from '../types';
import { saveOrderRequest, getStoredOrders } from '../data/mangaData';
import { ShoppingBag, CheckCircle, AlertCircle, FileText, User, School, BookOpen, Layers } from 'lucide-react';

interface OrderFormProps {
  isDarkMode: boolean;
}

export const OrderForm: React.FC<OrderFormProps> = ({ isDarkMode }) => {
  const [fullName, setFullName] = useState('');
  const [classSection, setClassSection] = useState('');
  const [volumeChapter, setVolumeChapter] = useState('Chapter 01 Physical Booklet');
  const [copies, setCopies] = useState<number>(1);
  const [message, setMessage] = useState('');

  const [submittedOrder, setSubmittedOrder] = useState<OrderRequest | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderRequest[]>(() => getStoredOrders());
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !classSection.trim()) return;

    const newOrder = saveOrderRequest({
      fullName: fullName.trim(),
      classSection: classSection.trim(),
      volumeChapter,
      copies: Number(copies),
      message: message.trim() || undefined,
    });

    setSubmittedOrder(newOrder);
    setRecentOrders(getStoredOrders());
    // Reset form
    setFullName('');
    setClassSection('');
    setCopies(1);
    setMessage('');
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto" id="order-section">
      {/* Section Header */}
      <div className="border-b-2 border-current pb-4 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>PHYSICAL PRINT REQUEST</span>
        </div>
        <h2 className="font-manga-title text-4xl sm:text-5xl font-black uppercase tracking-tight">
          ORDER A COPY
        </h2>
        <p className="font-sans-body text-sm text-neutral-400 mt-1 max-w-2xl">
          Reserve physical printed copies of <em>Xploration of Powers</em> for school circulation.
        </p>
      </div>

      {/* Critical Non-commercial Disclaimer Banner */}
      <div
        className={`p-4 border-2 mb-8 flex items-start gap-3 text-xs font-mono ${
          isDarkMode
            ? 'border-neutral-700 bg-neutral-900/90 text-neutral-300'
            : 'border-neutral-300 bg-neutral-100 text-neutral-800'
        }`}
        id="order-disclaimer-banner"
      >
        <AlertCircle className="w-5 h-5 shrink-0 text-neutral-400 mt-0.5" />
        <div>
          <strong className="block text-sm uppercase tracking-wide mb-0.5">
            Student Order Request Notice
          </strong>
          <p className="font-sans-body leading-relaxed text-neutral-400">
            This is an <strong>order request form</strong> for physical school booklets and classroom copies, not an automated commercial billing portal. No payment or credit card details are collected. The student creator or school distribution coordinator will contact your class to fulfill your order.
          </p>
        </div>
      </div>

      {/* Confirmation State */}
      {submittedOrder ? (
        <div
          className={`p-6 sm:p-8 border-2 text-center mb-8 ${
            isDarkMode
              ? 'border-white bg-neutral-950 text-white shadow-[6px_6px_0px_0px_#fff]'
              : 'border-black bg-white text-black shadow-[6px_6px_0px_0px_#000]'
          }`}
          id="order-confirmation-card"
        >
          <div className="w-14 h-14 mx-auto border-2 border-current flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="font-japanese text-xl font-bold block mb-1">
            受付完了 (Order Request Received)
          </span>
          <h3 className="font-manga-title text-3xl font-black uppercase tracking-wider mb-2">
            ORDER REQUEST SUBMITTED
          </h3>

          <div className="max-w-md mx-auto my-4 p-4 border border-dashed border-current text-left font-mono text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">Order Ref:</span>
              <span className="font-bold">{submittedOrder.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Name:</span>
              <span className="font-bold">{submittedOrder.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Class / Section:</span>
              <span className="font-bold">{submittedOrder.classSection}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Item:</span>
              <span className="font-bold">{submittedOrder.volumeChapter}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Copies:</span>
              <span className="font-bold">{submittedOrder.copies} copy(ies)</span>
            </div>
            {submittedOrder.message && (
              <div className="pt-1 border-t border-neutral-700">
                <span className="text-neutral-500 block">Note:</span>
                <span>{submittedOrder.message}</span>
              </div>
            )}
          </div>

          <p className="font-sans-body text-xs text-neutral-400 mb-6">
            Your request has been logged. Physical copies will be prepared and distributed per school announcement.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSubmittedOrder(null)}
              className="px-5 py-2.5 bg-current text-neutral-950 dark:text-neutral-950 bg-white font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90"
            >
              Submit Another Request
            </button>
            <button
              type="button"
              onClick={() => setShowOrderHistory(true)}
              className="px-4 py-2.5 border border-current font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-500/20"
            >
              View Order Records
            </button>
          </div>
        </div>
      ) : (
        /* Order Form */
        <form
          onSubmit={handleSubmit}
          className={`border-2 p-6 sm:p-8 space-y-6 ${
            isDarkMode ? 'border-neutral-800 bg-neutral-950/80' : 'border-neutral-300 bg-white'
          }`}
          id="order-request-form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field: Name */}
            <div>
              <label
                htmlFor="order-name"
                className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-neutral-300"
              >
                <User className="w-3.5 h-3.5 text-neutral-500" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                id="order-name"
                required
                placeholder="e.g. Alex Tanaka"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full p-3 border font-mono text-sm transition-colors ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900 text-white placeholder-neutral-600 focus:border-white'
                    : 'border-neutral-300 bg-neutral-50 text-black placeholder-neutral-400 focus:border-black'
                } focus:outline-none`}
              />
            </div>

            {/* Field: Class / Section */}
            <div>
              <label
                htmlFor="order-class"
                className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-neutral-300"
              >
                <School className="w-3.5 h-3.5 text-neutral-500" />
                <span>Class / Section *</span>
              </label>
              <input
                type="text"
                id="order-class"
                required
                placeholder="e.g. Grade 10 - Room 204"
                value={classSection}
                onChange={(e) => setClassSection(e.target.value)}
                className={`w-full p-3 border font-mono text-sm transition-colors ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900 text-white placeholder-neutral-600 focus:border-white'
                    : 'border-neutral-300 bg-neutral-50 text-black placeholder-neutral-400 focus:border-black'
                } focus:outline-none`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field: Volume or Chapter */}
            <div>
              <label
                htmlFor="order-item"
                className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-neutral-300"
              >
                <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                <span>Volume or Chapter *</span>
              </label>
              <select
                id="order-item"
                value={volumeChapter}
                onChange={(e) => setVolumeChapter(e.target.value)}
                className={`w-full p-3 border font-mono text-sm transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900 text-white focus:border-white'
                    : 'border-neutral-300 bg-neutral-50 text-black focus:border-black'
                } focus:outline-none`}
              >
                <option value="Chapter 01 Physical Booklet">
                  Chapter 01 Physical Booklet (The Beginning)
                </option>
                <option value="Volume 01 Complete Collection (Pre-order Request)">
                  Volume 01 Complete Collection (School Pre-order)
                </option>
                <option value="Cover Art Print (B5 Monochrome)">
                  Cover Art Print (B5 Monochrome Card)
                </option>
              </select>
            </div>

            {/* Field: Number of Copies */}
            <div>
              <label
                htmlFor="order-copies"
                className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-neutral-300"
              >
                <Layers className="w-3.5 h-3.5 text-neutral-500" />
                <span>Number of Copies *</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="order-copies"
                  min="1"
                  max="10"
                  required
                  value={copies}
                  onChange={(e) => setCopies(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className={`w-28 p-3 border font-mono text-sm text-center ${
                    isDarkMode
                      ? 'border-neutral-700 bg-neutral-900 text-white focus:border-white'
                      : 'border-neutral-300 bg-neutral-50 text-black focus:border-black'
                  } focus:outline-none`}
                />
                <span className="text-xs font-mono text-neutral-500">
                  (Max 10 copies per school order)
                </span>
              </div>
            </div>
          </div>

          {/* Field: Optional Message */}
          <div>
            <label
              htmlFor="order-message"
              className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-neutral-300"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-500" />
              <span>Optional Message / Notes</span>
            </label>
            <textarea
              id="order-message"
              rows={3}
              placeholder="Any specific delivery instructions or notes for the creator..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full p-3 border font-mono text-sm ${
                isDarkMode
                  ? 'border-neutral-700 bg-neutral-900 text-white placeholder-neutral-600 focus:border-white'
                  : 'border-neutral-300 bg-neutral-50 text-black placeholder-neutral-400 focus:border-black'
              } focus:outline-none`}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-mono text-neutral-500">
              * Order requests are stored locally for school coordination.
            </span>

            <button
              type="submit"
              className={`w-full sm:w-auto px-8 py-4 text-sm font-mono uppercase font-black tracking-widest border-2 transition-all flex items-center justify-center gap-2 ${
                isDarkMode
                  ? 'border-white bg-white text-black hover:bg-neutral-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                  : 'border-black bg-black text-white hover:bg-neutral-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'
              }`}
              id="btn-submit-order"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SUBMIT ORDER</span>
            </button>
          </div>
        </form>
      )}

      {/* Submitted Orders Review Drawer / Toggle */}
      {recentOrders.length > 0 && (
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-manga-title text-2xl font-bold uppercase tracking-wider">
              YOUR LOCAL ORDER REQUESTS ({recentOrders.length})
            </h3>
            <button
              type="button"
              onClick={() => setShowOrderHistory(!showOrderHistory)}
              className="text-xs font-mono text-neutral-400 hover:text-white underline"
            >
              {showOrderHistory ? 'Hide Records' : 'Show Records'}
            </button>
          </div>

          {showOrderHistory && (
            <div className="space-y-3 font-mono text-xs">
              {recentOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-3 border border-neutral-800 bg-neutral-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-bold text-white mr-2">{ord.id}</span>
                    <span className="text-neutral-400">
                      {ord.fullName} • {ord.classSection}
                    </span>
                    <div className="text-neutral-500 text-[11px] mt-0.5">
                      {ord.volumeChapter} — {ord.copies} copy(ies) ({ord.createdAt})
                    </div>
                  </div>
                  <span className="px-2 py-0.5 border border-neutral-700 text-neutral-300 text-[10px] self-start sm:self-auto">
                    {ord.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
