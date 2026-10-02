import { ecommerceCustomers, getEcommerceCustomerById } from '../data/ecommerceCustomers.js';
import { saasCustomers, getSaaSCustomerById } from '../data/saasCustomers.js';
import { bankingCustomers, getBankingCustomerById } from '../data/bankingCustomers.js';
import { telecomCustomers, getTelecomCustomerById } from '../data/telecomCustomers.js';

export const INDUSTRY_STORAGE_KEY = 'churniqIndustry';

export const INDUSTRY_META = {
  ecommerce: {
    key: 'ecommerce',
    label: 'E-Commerce',
    route: '/ecommerce',
    title: 'ChurnIQ for E-Commerce',
    description: 'Understand shopping behavior, identify customers at risk of leaving, and improve customer retention.',
    customerPrefix: 'CQ',
    customerStorageKey: 'churniqEcommerceCustomer',
    registeredStorageKey: 'churniqEcommerceCustomers',
    generatedStorageKey: 'churniqGeneratedEcommerceId',
    dataset: ecommerceCustomers,
    lookup: getEcommerceCustomerById,
  },
  saas: {
    key: 'saas',
    label: 'Company / SaaS',
    route: '/saas',
    title: 'ChurnIQ for SaaS Companies',
    description: 'Monitor customer usage, subscription behavior, engagement, and churn risk.',
    customerPrefix: 'SQ',
    customerStorageKey: 'churniqSaaSCustomer',
    registeredStorageKey: 'churniqSaaSCustomers',
    generatedStorageKey: 'churniqGeneratedSaaSId',
    dataset: saasCustomers,
    lookup: getSaaSCustomerById,
  },
  banking: {
    key: 'banking',
    label: 'Banking',
    route: '/banking',
    title: 'ChurnIQ for Banking',
    description: 'Understand customer engagement, transaction behavior, and identify customers who may stop using banking services.',
    customerPrefix: 'BQ',
    customerStorageKey: 'churniqBankingCustomer',
    registeredStorageKey: 'churniqBankingCustomers',
    generatedStorageKey: 'churniqGeneratedBankingId',
    dataset: bankingCustomers,
    lookup: getBankingCustomerById,
  },
  telecom: {
    key: 'telecom',
    label: 'Telecom',
    route: '/telecom',
    title: 'ChurnIQ for Telecom',
    description: 'Analyze customer usage, recharge patterns, service experience, and identify customers at risk of leaving.',
    customerPrefix: 'TQ',
    customerStorageKey: 'churniqTelecomCustomer',
    registeredStorageKey: 'churniqTelecomCustomers',
    generatedStorageKey: 'churniqGeneratedTelecomId',
    dataset: telecomCustomers,
    lookup: getTelecomCustomerById,
  },
};

export const INDUSTRY_ORDER = ['ecommerce', 'saas', 'banking', 'telecom'];

export function getSelectedIndustry() {
  const value = typeof window === 'undefined' ? 'ecommerce' : localStorage.getItem(INDUSTRY_STORAGE_KEY);
  return INDUSTRY_META[value] ? value : 'ecommerce';
}

export function setSelectedIndustry(industry) {
  if (!INDUSTRY_META[industry]) return;
  localStorage.setItem(INDUSTRY_STORAGE_KEY, industry);
}

export function getIndustryMeta(industry = getSelectedIndustry()) {
  return INDUSTRY_META[industry] || INDUSTRY_META.ecommerce;
}

export function getIndustryCustomerId(industry = getSelectedIndustry()) {
  const meta = getIndustryMeta(industry);
  return localStorage.getItem(meta.customerStorageKey) || '';
}

export function setIndustryCustomerId(industry, customerId) {
  const meta = getIndustryMeta(industry);
  if (!customerId) {
    localStorage.removeItem(meta.customerStorageKey);
    return;
  }
  localStorage.setItem(meta.customerStorageKey, String(customerId).trim().toUpperCase());
}

export function getIndustryCustomer(industry = getSelectedIndustry()) {
  const meta = getIndustryMeta(industry);
  const customerId = getIndustryCustomerId(industry);
  if (!customerId) return null;
  const customer = meta.lookup(customerId);
  return customer || null;
}

export function clearIndustryCustomer(industry = getSelectedIndustry()) {
  const meta = getIndustryMeta(industry);
  localStorage.removeItem(meta.customerStorageKey);
}

export function getIndustryDashboardMetrics(industry = getSelectedIndustry()) {
  const meta = getIndustryMeta(industry);
  const records = meta.dataset;
  const totalCustomers = records.length;

  if (industry === 'ecommerce') {
    return {
      totalCustomers,
      activeCustomers: records.filter((customer) => customer.customerActivity === 'Active').length,
      atRiskCustomers: records.filter((customer) => customer.churnRisk === 'High' || customer.churnRisk === 'Medium').length,
      totalOrders: records.reduce((sum, customer) => sum + customer.totalOrders, 0),
      totalRevenue: records.reduce((sum, customer) => sum + customer.totalSpending, 0),
    };
  }

  if (industry === 'saas') {
    return {
      totalCustomers,
      activeCustomers: records.filter((customer) => customer.subscriptionStatus === 'Active').length,
      atRiskCustomers: records.filter((customer) => customer.churnRisk === 'High' || customer.churnRisk === 'Medium').length,
      monthlyRecurringRevenue: records.reduce((sum, customer) => sum + customer.monthlyRevenue, 0),
      newCustomers: Math.round(totalCustomers * 0.18),
    };
  }

  if (industry === 'banking') {
    return {
      totalCustomers,
      activeCustomers: records.filter((customer) => customer.customerActivity === 'High' || customer.customerActivity === 'Medium').length,
      atRiskCustomers: records.filter((customer) => customer.churnRisk === 'High' || customer.churnRisk === 'Medium').length,
      digitalActiveCustomers: records.filter((customer) => customer.digitalUsage >= 50).length,
      newCustomers: Math.round(totalCustomers * 0.16),
    };
  }

  return {
    totalCustomers,
    activeCustomers: records.filter((customer) => customer.customerActivity === 'High' || customer.customerActivity === 'Medium').length,
    atRiskCustomers: records.filter((customer) => customer.churnRisk === 'High' || customer.churnRisk === 'Medium').length,
    averageMonthlyBill: Math.round(records.reduce((sum, customer) => sum + customer.monthlyBill, 0) / totalCustomers),
    newCustomers: Math.round(totalCustomers * 0.18),
  };
}
