export const constants = {
  ENDPOINTS: {
    COMMON : {
      GET_LIST_PAGED: 'common/list/:menuname',//dynamic list page with menu name as parameter
      GET_DROPDOWN_ITEMS: 'common/get-dropdown-items',
      GET_DROPDOWNS : 'common/get-dropdowns',
      GET_DEPARTMENT_LIST: 'common/get-departments',
      GET_DOCTORS_LIST: 'common/get-doctors',
    },
    LAB_TEST: {
      SUBMIT_TEST: 'labtest/submit',
      GET_ALL_TESTS: 'labtest/test-list',
      GET_TEST_BY_ID: 'labtest/test-by-id',
    },
    PATIENT: {
      SUBMIT_PATIENT: 'patient/submit',
      GET_PATIENT_BY_ID: 'patient/get-by-id',
      GET_PATIENT_LIST: 'patient/get-list',
      GET_DYNAMIC_LIST: 'patient/get-list-dynamic',
    },
  },
};
