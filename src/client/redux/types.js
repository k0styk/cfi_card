module.exports.SOCKET = {
  ADD_SOCKET:                                           'ADD_SOCKET',
  REMOVE_SOCKET:                                        'REMOVE_SOCKET'
};

module.exports.USER = {
  SET:                                                  'USER_SET',
  RESET:                                                'USER_RESET'
};

module.exports.SUMMARY = {
  ADD:                                                  'SUMMARY_ADD',
  REMOVE:                                               'SUMMARY_REMOVE',
  ADD_Z2:                                               'SUMMARY_ADD_Z2',
  REMOVE_Z2:                                            'SUMMARY_REMOVE_Z2',
  ARCHIEVE:                                             'SUMMARY_ARCHIEVE_SET',
  VALIDATION_SET:                                       'SUMMARY_VALIDATION_SET',
};

module.exports.Z1 = {
  FLYDATE_SET:                                          'Z1_FLYDATE_SET',
  FLYDATE_REMOVE:                                       'Z1_FLYDATE_REMOVE',
  ACFTIDENT_SET:                                        'Z1_ACFTIDENT_SET',
  ACFTIDENT_REMOVE:                                     'Z1_ACFTIDENT_REMOVE',
  AIRCRAFTTYPE_SET:                                     'Z1_AIRCRAFTTYPE_SET',
  AIRCRAFTTYPE_REMOVE:                                  'Z1_AIRCRAFTTYPE_REMOVE',
  DEPAIRPORT_SET:                                       'Z1_DEPAIRPORT_SET',
  DEPAIRPORT_REMOVE:                                    'Z1_DEPAIRPORT_REMOVE',
  DESTAIRPORT_SET:                                      'Z1_DESTAIRPORT_SET',
  DESTAIRPORT_REMOVE:                                   'Z1_DESTAIRPORT_REMOVE',
  ENTRYPOINT_SET:                                       'Z1_ENTRYPOINT_SET',
  ENTRYPOINT_REMOVE:                                    'Z1_ENTRYPOINT_REMOVE',
  ENTRYTIME_SET:                                        'Z1_ENTRYTIME_SET',
  ENTRYTIME_REMOVE:                                     'Z1_ENTRYTIME_REMOVE',
  EXITPOINT_SET:                                        'Z1_EXITPOINT_SET',
  EXITPOINT_REMOVE:                                     'Z1_EXITPOINT_REMOVE',
  REGNO_SET:                                            'Z1_REGNO_SET',
  REGNO_REMOVE:                                         'Z1_REGNO_REMOVE',
  VALIDATION_SET:                                       'Z1_VALIDATION_SET',
};

module.exports.Z2 = {
  CODE_SET:                                             'Z2_CODE_SET',
  CODE_REMOVE:                                          'Z2_CODE_REMOVE',
  ENTRYPOINT_SET:                                       'Z2_ENTRYPOINT_SET',
  ENTRYPOINT_REMOVE:                                    'Z2_ENTRYPOINT_REMOVE',
  ENTRYTIME_SET:                                        'Z2_ENTRYTIME_SET',
  ENTRYTIME_REMOVE:                                     'Z2_ENTRYTIME_REMOVE',
  EXITPOINT_SET:                                        'Z2_EXITPOINT_SET',
  EXITPOINT_REMOVE:                                     'Z2_EXITPOINT_REMOVE',
  EXITTIME_SET:                                         'Z2_EXITTIME_SET',
  EXITTIME_REMOVE:                                      'Z2_EXITTIME_REMOVE',
  FLYCTG_SET:                                           'Z2_FLYCTG_SET',
  FLYCTG_REMOVE:                                        'Z2_FLYCTG_REMOVE',
  COUNTOFDEP_SET:                                       'Z2_COUNTOFDEP_SET',
  COUNTOFDEP_REMOVE:                                    'Z2_COUNTOFDEP_REMOVE',
  COUNTOFAPP_SET:                                       'Z2_COUNTOFAPP_SET',
  COUNTOFAPP_REMOVE:                                    'Z2_COUNTOFAPP_REMOVE',
  VALIDATION_SET:                                       'Z2_VALIDATION_SET',
};

module.exports.Z3 = {
  AIRSPACETYPE_SET:                                     'Z3_AIRSPACETYPE_SET',
  AIRSPACETYPE_REMOVE:                                  'Z3_AIRSPACETYPE_REMOVE',
  AIRCRAFTTYPENAME_SET:                                 'Z3_AIRCRAFTTYPENAME_SET',
  AIRCRAFTTYPENAME_REMOVE:                              'Z3_AIRCRAFTTYPENAME_REMOVE',
  DEPAIRPORTCOORD_SET:                                  'Z3_DEPAIRPORTCOORD_SET',
  DEPAIRPORTCOORD_REMOVE:                               'Z3_DEPAIRPORTCOORD_REMOVE',
  DESTAIRPORTCOORD_SET:                                 'Z3_DESTAIRPORTCOORD_SET',
  DESTAIRPORTCOORD_REMOVE:                              'Z3_DESTAIRPORTCOORD_REMOVE',
  AIRSPACETYPEGTIME_SET:                                'Z3_AIRSPACETYPEGTIME_SET',
  AIRSPACETYPEGTIME_REMOVE:                             'Z3_AIRSPACETYPEGTIME_REMOVE',
  VALIDATION_SET:                                       'Z3_VALIDATION_SET',
};

module.exports.UI = {
  NOTIFY: {
    ENQUEUE_SNACKBAR:                                   'UI_NOTIFY_ENQUEUE',
    CLOSE_SNACKBAR:                                     'UI_NOTIFY_CLOSE',
    REMOVE_SNACKBAR:                                    'UI_NOTIFY_REMOVE'
  },
  APP: {
    CONNECTION:                                         'UI_APP_CONNECTION_SET',
    ARCHIEVE:                                           'UI_APP_ARCHIEVE_SET'
  }
};

module.exports.ENTITIES = {};

module.exports.DATE = {
  SET_CLIENT:                                           'DATE_CLIENT_SET',
  SET_SERVER:                                           'DATE_SERVER_SET',
  REMOVE:                                               'DATE_REMOVE'
};

module.exports.INIT = {
  INITIAL_ALL:                                          'INIT_INITIAL_ALL'
};