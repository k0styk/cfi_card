// @ts-check
import { SUMMARY } from '../types';

export function addSummary() {
  return {
    type: SUMMARY.ADD_SUMMARY
  };
}

/**
 * @param {{ id: number}} payload
 */
export function removeSummary(payload) {
  return {
    type: SUMMARY.REMOVE_SUMMARY,
    payload
  };
}

/**
 * @param {{ id: number}} payload
 */
export function addSummaryZ2(payload) {
  return {
    type: SUMMARY.ADD_Z2,
    payload
  };
}

/**
 * @param {{ id: number, z2id: number}} payload
 */
export function removeSummaryZ2(payload) {
  return {
    type: SUMMARY.REMOVE_Z2,
    payload
  };
}