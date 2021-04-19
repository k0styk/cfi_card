module.exports.ui = {
  GET_DATE_FROM_SERVER: 'GET_DATE_FROM_SERVER'
};

module.exports.user = {
  login:                'user_login',
  login_success:        'user_login_successfull',
  login_err:            'user_login_err',
  logout:               'user_logout',
  logout_success:       'user_logout_successfull',
  logout_err:           'user_logout_err',
  register:             'user_register',
  register_success:     'user_register_success',
  register_err:         'user_register_err',
  edit:                 'user_edit',
  edit_success:         'user_edit_success',
  edit_err:             'user_edit_err',
  delete:               'user_delete',
  delete_success:       'user_delete_success',
  delete_err:           'user_delete_err',
  checkAuth:            'user_checkAuth',
  getListUsers:         'user_getListUsers',
  error:                'user_error'
};

module.exports.summary = {
  save:         'summary_save',
  save_success: 'summary_save_success',
  save_partial: 'summary_save_partial',
  save_err:     'summary_save_err',
};

module.exports.summaries = {
  generate:                 'summaries_generate',
  generate_success:         'summaries_generate_success',
  generate_err:             'summaries_generate_err',
  getDates:                 'summaries_getDates',
  getListDepartments:       'summaries_getListDepartments',
  getDepartmentInfoById:    'summaries_getDepartmentInfoById',
  createTxt:                'summaries_createTxt',
  createExcel:              'summaries_createExcel',
  createArchive:            'summaries_createArchive',
  createSelected:           'summaries_createSelected',
  create_success:           'summaries_create_success',
  create_error:             'summaries_create_error',
  createTxtForAll:          'summaries_createTxtForAll',
  createExcelForAll:        'summaries_createExcelForAll',
  createArchiveForAll:      'summaries_createArchiveForAll',
};

module.exports.store = {
  INITIAL: 'INITIAL',
  UPDATE: 'UPDATE_STORE'
};

module.exports.app = {
  SAVE: 'APP_SAVE'
};