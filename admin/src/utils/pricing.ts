import type { BillingCycle, PricingPlan } from "../types";

/**
 * Returns the display price for a given billing cycle.
 * Returns '$0' for free plans regardless of cycle.
 */
export function getDisplayPrice(plan: PricingPlan, billing: BillingCycle): string {
  const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  if (price === 0) return '$0';
  return `$${price}`;
}

/**
 * Returns savings amount per month when billed yearly.
 */
export function getMonthlySavings(plan: PricingPlan): number {
  return plan.monthlyPrice - plan.yearlyPrice;
}

/**
 * Formats large user-limit numbers with commas.
 */
export function formatUserLimit(limit: string): string {
  return limit;
}
