import { getIndustryMeta, getSelectedIndustry } from './industryUtils.js';

const resolveIndustry = (industry) => getIndustryMeta(industry || getSelectedIndustry());

export function normalizeIndustryCustomerId(industry, customerId) {
  const meta = resolveIndustry(industry);
  const normalized = String(customerId || '').trim().toUpperCase();
  if (!normalized) return '';
  return normalized.startsWith(`${meta.customerPrefix}-`) ? normalized : normalized;
}

export function isValidIndustryCustomerId(industry, customerId) {
  const meta = resolveIndustry(industry);
  const normalized = normalizeIndustryCustomerId(industry, customerId);
  return Boolean(normalized && meta.lookup(normalized));
}

export function getRegisteredIndustryCustomerIds(industry) {
  const meta = resolveIndustry(industry);
  try {
    const storedValue = JSON.parse(localStorage.getItem(meta.registeredStorageKey) || '[]');
    if (!Array.isArray(storedValue)) return [];
    const valid = [...new Set(storedValue.map((value) => String(value || '').trim().toUpperCase()).filter((value) => Boolean(value && meta.lookup(value))))];
    if (valid.length !== storedValue.length) {
      localStorage.setItem(meta.registeredStorageKey, JSON.stringify(valid));
    }
    return valid;
  } catch {
    return [];
  }
}

export function registerIndustryCustomer(industry, customerId) {
  const meta = resolveIndustry(industry);
  const normalized = normalizeIndustryCustomerId(industry, customerId);
  if (!normalized || !meta.lookup(normalized)) return false;
  const ids = getRegisteredIndustryCustomerIds(industry);
  if (ids.includes(normalized)) return true;
  const next = [...ids, normalized];
  localStorage.setItem(meta.registeredStorageKey, JSON.stringify(next));
  return true;
}

export function getIndustryRegistrationCount(industry) {
  return getRegisteredIndustryCustomerIds(industry).length;
}

export function generateNextIndustryCustomerId(industry) {
  const meta = resolveIndustry(industry);
  const prefix = meta.customerPrefix;
  const rangeStart = prefix === 'CQ' ? 100001 : prefix === 'SQ' ? 100001 : prefix === 'BQ' ? 100001 : 100001;
  const rangeEnd = prefix === 'CQ' ? 101000 : prefix === 'SQ' ? 100500 : prefix === 'BQ' ? 100500 : 100500;

  for (let number = rangeStart; number <= rangeEnd; number += 1) {
    const candidate = `${prefix}-${number}`;
    if (!meta.lookup(candidate)) continue;
    const registeredIds = getRegisteredIndustryCustomerIds(industry);
    if (registeredIds.includes(candidate)) continue;
    localStorage.setItem(meta.generatedStorageKey, candidate);
    registerIndustryCustomer(industry, candidate);
    return candidate;
  }

  return null;
}

export function setCurrentIndustryCustomer(industry, customerId) {
  const meta = resolveIndustry(industry);
  const normalized = normalizeIndustryCustomerId(industry, customerId);
  if (!normalized || !meta.lookup(normalized)) return false;
  localStorage.setItem(meta.customerStorageKey, normalized);
  return true;
}

export function getCurrentIndustryCustomer(industry) {
  const meta = resolveIndustry(industry);
  const storedId = localStorage.getItem(meta.customerStorageKey);
  if (!storedId) return null;
  return meta.lookup(storedId);
}
