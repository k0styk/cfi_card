// @ts-check
import { SUMMARY, Z1, Z2, Z3 } from '../types';

export default {
  addSummary: () => ({type: SUMMARY.ADD}),
  /**
   * @param {{ id: number}} payload
   */
  removeSummary: payload => ({type: SUMMARY.REMOVE, payload}),
  /**
   * @param {{ id: number}} payload
   */
  addSummaryZ2: payload => ({type: SUMMARY.ADD_Z2,payload}),
  /**
   * @param {{ id: number, z2id: number}} payload
   */
  removeSummaryZ2: payload => ({type: SUMMARY.REMOVE_Z2,payload}),
  z1: {
    /**
     * @param {{ id: number, flyDate: string}} payload
     */
    FLYDATE_SET: payload => ({type: Z1.FLYDATE_SET, payload}),
    /**
   * @param {{ id: number }} payload
   */
    FLYDATE_REMOVE: () => ({type: Z1.FLYDATE_REMOVE}),
    /**
   * @param {{ id: number, acftIdent: string}} payload
   */
    ACFTIDENT_SET: payload => ({type: Z1.ACFTIDENT_SET, payload}),
    /**
   * @param {{ id: number}} payload
   */
    ACFTIDENT_REMOVE: () => ({type: Z1.ACFTIDENT_REMOVE}),
    /**
   * @param {{ id: number, aircraftType: string}} payload
   */
    AIRCRAFTTYPE_SET: payload => ({type: Z1.AIRCRAFTTYPE_SET, payload}),
    /**
   * @param {{ id: number}} payload
   */
    AIRCRAFTTYPE_REMOVE: () => ({type: Z1.AIRCRAFTTYPE_REMOVE}),
    /**
   * @param {{ id: number, depAirport: string}} payload
   */
    DEPAIRPORT_SET: payload => ({type: Z1.DEPAIRPORT_SET, payload}),
    /**
   * @param {{ id: number}} payload
   */
    DEPAIRPORT_REMOVE: () => ({type: Z1.DEPAIRPORT_REMOVE}),
    /**
   * @param {{ id: number, destAirport: string}} payload
   */
    DESTAIRPORT_SET: payload => ({type: Z1.DESTAIRPORT_SET, payload}),
    /**
   * @param {{ id: number}} payload
   */
    DESTAIRPORT_REMOVE: () => ({type: Z1.DESTAIRPORT_REMOVE}),
    /**
   * @param {{ id: number, entryPoint: string}} payload
   */
    ENTRYPOINT_SET: payload => ({type: Z1.ENTRYPOINT_SET, payload}),
    /**
   * @param {{ id: number}} payload
   */
    ENTRYPOINT_REMOVE: () => ({type: Z1.ENTRYPOINT_REMOVE}),
    /**
   * @param {{ id: number, entryTime: string}} payload
   */
    ENTRYTIME_SET: payload => ({type: Z1.ENTRYTIME_SET, payload}),
    /**
   * @param {{ id: number }} payload
   */
    ENTRYTIME_REMOVE: () => ({type: Z1.ENTRYTIME_REMOVE}),
    /**
   * @param {{ id: number, exitPoint: string}} payload
   */
    EXITPOINT_SET: payload => ({type: Z1.EXITPOINT_SET, payload}),
    /**
   * @param {{ id: number }} payload
   */
    EXITPOINT_REMOVE: () => ({type: Z1.EXITPOINT_REMOVE}),
    /**
   * @param {{ id: number, regno: string}} payload
   */
    REGNO_SET: payload => ({type: Z1.REGNO_SET, payload}),
    /**
   * @param {{ id: number }} payload
   */
    REGNO_REMOVE: () => ({type: Z1.REGNO_SET}),
  },
  z2: {
    /**
     * @param {{ id: number, z2id: number, code: string}} payload
     */
    CODE_SET: payload => ({ type: Z2.CODE_SET, payload }),
    /**
   * @param {{ id: number, z2id: number }} payload
   */
    CODE_REMOVE: payload => ({ type: Z2.CODE_REMOVE, payload }),
    /**
   * @param {{ id: number, z2id: number, entryPoint: string}} payload
   */
    ENTRYPOINT_SET: payload => ({ type: Z2.ENTRYPOINT_SET, payload }),
    /**
   * @param {{ id: number, z2id: number}} payload
   */
    ENTRYPOINT_REMOVE: payload => ({ type: Z2.ENTRYPOINT_REMOVE }),
    /**
   * @param {{ id: number, z2id:number, entryTime: string}} payload
   */
    ENTRYTIME_SET: payload => ({ type: Z2.ENTRYTIME_SET, payload }),
    /**
   * @param {{ id: number, z2id: number}} payload
   */
    ENTRYTIME_REMOVE: payload => ({ type: Z2.ENTRYTIME_REMOVE, payload }),
    /**
   * @param {{ id: number, z2id: number, exitPoint: string}} payload
   */
    EXITPOINT_SET: payload => ({ type: Z2.EXITPOINT_SET, payload }),
    /**
   * @param {{ id: number, z2id: number}} payload
   */
    EXITPOINT_REMOVE: payload => ({ type: Z2.EXITPOINT_REMOVE, payload }),
    /**
   * @param {{ id: number, z2id: number, exitTime: string}} payload
   */
    EXITTIME_SET: payload => ({ type: Z2.EXITTIME_SET, payload }),
    /**
   * @param {{ id: number, z2id: number}} payload
   */
    EXITTIME_REMOVE: payload => ({ type: Z2.EXITTIME_REMOVE, payload }),
    /**
   * @param {{ id: number, z2id: number, flyCtg: string}} payload
   */
    FLYCTG_SET: payload => ({ type: Z2.FLYCTG_SET, payload }),
    /**
   * @param {{ id: number, z2id: number}} payload
   */
    FLYCTG_REMOVE: payload => ({ type: Z2.FLYCTG_REMOVE, payload }),
    /**
   * @param {{ id: number, z2id: number, countOfDep: string}} payload
   */
    COUNTOFDEP_SET: payload => ({ type: Z2.COUNTOFDEP_SET, payload }),
    /**
   * @param {{ id: number, z2id: number }} payload
   */
    COUNTOFDEP_REMOVE: payload => ({ type: Z2.COUNTOFDEP_REMOVE, payload }),
    /**
   * @param {{ id: number, z2id: number, countOfApp: string}} payload
   */
    COUNTOFAPP_SET: payload => ({ type: Z2.COUNTOFAPP_SET, payload }),
    /**
   * @param {{ id: number, z2id: number }} payload
   */
    COUNTOFAPP_REMOVE: payload => ({ type: Z2.COUNTOFAPP_REMOVE, payload }),
  },
  z3: {
    /**
     * @param {{ id: number, airspaceType: string}} payload
     */
    AIRSPACETYPE_SET: payload => ({type: Z3.AIRSPACETYPE_SET, payload}),
    /**
   * @param {{ id: number }} payload
   */
    AIRSPACETYPE_REMOVE: () => ({type: Z3.AIRSPACETYPE_REMOVE}),
    /**
   * @param {{ id: number, aircraftTypeName: string}} payload
   */
    AIRCRAFTTYPENAME_SET: payload => ({type: Z3.AIRCRAFTTYPENAME_SET, payload}),
    /**
   * @param {{ id: number}} payload
   */
    AIRCRAFTTYPENAME_REMOVE: () => ({type: Z3.AIRCRAFTTYPENAME_REMOVE}),
    /**
   * @param {{ id: number, depAirportCoord: string}} payload
   */
    DEPAIRPORTCOORD_SET: payload => ({type: Z3.DEPAIRPORTCOORD_SET, payload}),
    /**
   * @param {{ id: number}} payload
   */
    DEPAIRPORTCOORD_REMOVE: () => ({type: Z3.DEPAIRPORTCOORD_REMOVE}),
    /**
   * @param {{ id: number, destAirportCoord: string}} payload
   */
    DESTAIRPORTCOORD_SET: payload => ({type: Z3.DESTAIRPORTCOORD_SET, payload}),
    /**
   * @param {{ id: number}} payload
   */
    DESTAIRPORTCOORD_REMOVE: () => ({type: Z3.DESTAIRPORTCOORD_REMOVE}),
    /**
   * @param {{ id: number, airspaceTypeGTime: string}} payload
   */
    AIRSPACETYPEGTIME_SET: payload => ({type: Z3.AIRSPACETYPEGTIME_SET, payload}),
    /**
   * @param {{ id: number}} payload
   */
    AIRSPACETYPEGTIME_REMOVE: () => ({type: Z3.AIRSPACETYPEGTIME_REMOVE}),
  }
};