import { customers } from '../data/customers.js';

export const CUSTOMER_ID_STORAGE_KEY = 'churniqCustomerId';
export const NEXT_CUSTOMER_NUMBER_STORAGE_KEY = 'churniqNextCustomerNumber';
export const GENERATED_CUSTOMER_ID_STORAGE_KEY = 'churniqGeneratedCustomerId';

const legacyCustomerIdKey = 'churniq-customer-id';
const legacyNextCustomerNumberKey = 'churniq-next-customer-number';
const firstCustomerNumber = 100001;
const lastCustomerNumber = 101000;

export function normalizeCustomerId(customerId) {
  return typeof customerId === 'string' ? customerId.trim().toUpperCase() : '';
}

export function getCustomerById(customerId) {
  const normalizedId = normalizeCustomerId(customerId);
  const match = /^CQ-(\d{6})$/.exec(normalizedId);
  if (!match) return null;

  const customerNumber = Number(match[1]);
  if (customerNumber < firstCustomerNumber || customerNumber > lastCustomerNumber) return null;

  const customer = customers[customerNumber - firstCustomerNumber];
  return customer?.customerId === normalizedId ? customer : null;
}

export function isValidCustomerId(customerId) {
  return getCustomerById(customerId) !== null;
}

export function getCustomerProfile(customerId) {
  const customer = getCustomerById(customerId);
  if (!customer) return null;

  try {
    const overrides = JSON.parse(localStorage.getItem(`churniqCustomerProfile:${customer.customerId}`) || '{}');
    return { ...customer, ...overrides };
  } catch {
    return customer;
  }
}

export function getCurrentCustomer() {
  const savedId = localStorage.getItem(CUSTOMER_ID_STORAGE_KEY) || localStorage.getItem(legacyCustomerIdKey);
  if (!savedId) return null;

  const customer = getCustomerById(savedId);
  if (!customer) {
    localStorage.removeItem(CUSTOMER_ID_STORAGE_KEY);
    localStorage.removeItem(legacyCustomerIdKey);
    return null;
  }

  localStorage.setItem(CUSTOMER_ID_STORAGE_KEY, customer.customerId);
  localStorage.removeItem(legacyCustomerIdKey);
  return getCustomerProfile(customer.customerId);
}

export function setCurrentCustomerId(customerId) {
  const customer = getCustomerById(customerId);
  if (!customer) return null;

  localStorage.setItem(CUSTOMER_ID_STORAGE_KEY, customer.customerId);
  localStorage.removeItem(legacyCustomerIdKey);
  return customer;
}

export function getGeneratedCustomerId() {
  const generatedId = localStorage.getItem(GENERATED_CUSTOMER_ID_STORAGE_KEY);
  return isValidCustomerId(generatedId) ? normalizeCustomerId(generatedId) : '';
}

export function generateNextCustomerId() {
  const storedNext = localStorage.getItem(NEXT_CUSTOMER_NUMBER_STORAGE_KEY)
    || localStorage.getItem(legacyNextCustomerNumberKey);
  let nextNumber = Number(storedNext);
  if (!Number.isInteger(nextNumber) || nextNumber < firstCustomerNumber) nextNumber = firstCustomerNumber;

  while (nextNumber <= lastCustomerNumber) {
    const customerId = `CQ-${nextNumber}`;
    nextNumber += 1;

    if (!isValidCustomerId(customerId)) continue;

    localStorage.setItem(NEXT_CUSTOMER_NUMBER_STORAGE_KEY, String(nextNumber));
    localStorage.setItem(GENERATED_CUSTOMER_ID_STORAGE_KEY, customerId);
    setCurrentCustomerId(customerId);
    return customerId;
  }

  localStorage.setItem(NEXT_CUSTOMER_NUMBER_STORAGE_KEY, String(lastCustomerNumber + 1));
  return null;
}

export function saveCustomerProfile(customerId, changes) {
  const customer = getCustomerById(customerId);
  if (!customer) return null;

  const allowedFields = ['name', 'email', 'phone', 'location'];
  const updates = Object.fromEntries(allowedFields
    .filter((field) => typeof changes[field] === 'string' && changes[field].trim())
    .map((field) => [field, changes[field].trim()]));
  const profileKey = `churniqCustomerProfile:${customer.customerId}`;
  let existingUpdates = {};

  try {
    existingUpdates = JSON.parse(localStorage.getItem(profileKey) || '{}');
  } catch {
    existingUpdates = {};
  }

  const mergedUpdates = { ...existingUpdates, ...updates };
  localStorage.setItem(profileKey, JSON.stringify(mergedUpdates));
  return getCustomerProfile(customer.customerId);
}

export function clearCurrentCustomer() {
  localStorage.removeItem(CUSTOMER_ID_STORAGE_KEY);
  localStorage.removeItem(legacyCustomerIdKey);
  localStorage.removeItem(GENERATED_CUSTOMER_ID_STORAGE_KEY);
}

export function formatCurrency(value) {
  const amount = Number(value);
  return `₹${(Number.isFinite(amount) ? amount : 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

export function formatCompactCurrency(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return '₹0';
  if (amount < 1000) return `₹${Math.round(amount).toLocaleString('en-IN')}`;

  const thousands = amount / 1000;
  return `₹${Number(thousands.toFixed(thousands >= 10 ? 0 : 1))}k`;
}

export function formatCustomerDate(value) {
  if (!value) return 'Not available';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}