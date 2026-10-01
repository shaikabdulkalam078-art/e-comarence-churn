import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { customers, segmentOverview } from '../data/mockData.js';

const segmentColors = {
  Loyal: '#167d75',
  'High Value': '#4f7ff7',
  'At Risk': '#dba74f',
  Lost: '#d96d57',
  'New Customers': '#3fb3b3',
  'Occasional Buyers': '#7c7cf5',
};

export default function SegmentationPage() {
  const [searchParams] = useSearchParams();
  const initialSegment = searchParams.get('segment') || 'Loyal';
  const [selectedSegment, setSelectedSegment] = useState(initialSegment);

  const filteredCustomers = useMemo(() => {
    if (!selectedSegment || selectedSegment === 'All') return customers;
    return customers.filter((customer) => customer.segment === selectedSegment);
  }, [selectedSegment]);

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <div className="eyebrow"><span className="live-pulse" /> CUSTOMER SEGMENTS</div>
          <h2>Customer Segmentation</h2>
          <p>Understand customer value, loyalty, and risk by audience segment.</p>
        </div>
      </div>

      <div className="segment-analytics-grid">
        {segmentOverview.map((segment) => (
          <button type="button" key={segment.segment} className={selectedSegment === segment.segment ? 'segment-insight active' : 'segment-insight'} onClick={() => setSelectedSegment(segment.segment)}>
            <div className="segment-head">
              <span className="mini-dot" style={{ background: segmentColors[segment.segment] || '#167d75' }} />
              <strong>{segment.segment}</strong>
            </div>
            <div className="segment-body">
              <span>{segment.customers.toLocaleString()} customers</span>
              <strong>₹{(segment.revenue / 100000).toFixed(1)}L</strong>
            </div>
            <div className="segment-meta">
              <small>{segment.orders} avg orders</small>
              <small>{segment.churnRate}% churn</small>
            </div>
          </button>
        ))}
      </div>

      <div className="detail-card segment-table-wrap">
        <div className="segment-table-header">
          <div>
            <h3>{selectedSegment} Customers</h3>
            <p>{filteredCustomers.length} customers in this segment</p>
          </div>
          <button type="button" className="secondary-button" onClick={() => setSelectedSegment('All')}>View all</button>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.slice(0, 8).map((customer) => (
                <tr key={customer.customerId}>
                  <td>
                    <div className="customer-identity">
                      <span className="customer-avatar">{customer.initials}</span>
                      <div>
                        <strong>{customer.name}</strong>
                        <small>{customer.customerId}</small>
                      </div>
                    </div>
                  </td>
                  <td>{customer.location}</td>
                  <td>{customer.totalOrders}</td>
                  <td>{customer.totalRevenueLabel}</td>
                  <td><span className={`risk-badge risk-${customer.risk.toLowerCase()}`}>{customer.risk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
