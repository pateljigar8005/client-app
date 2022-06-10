const initialState = {
  siteId: null,
  sitesAllData: null,
  siteMenuItems: [],
  siteFooterMenuItems: [],
  pagesContent: [],
  languageList: [],
  selectedLanguage: null,
};

const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SITE_ID":
      return { ...state, siteId: action.data };
    case "LANGUAGES_DATA_LIST":
      return { ...state, languageList: action.data };
    case "SITE_MENU_ITEMS_SAVE":
      return { ...state, siteMenuItems: action.data };
    case "SITE_FOOTER_MENU_ITEMS_SAVE":
      return { ...state, siteFooterMenuItems: action.data };
    case "CHANGE_SITE_LANGUAGE":
      return { ...state, selectedLanguage: action.data };
    case "STORE_SITES_ALLDATA":
      return { ...state, sitesAllData: action.data };
    case "SAVE_ALL_PAGES_CONTENT_DATA":
      return { ...state, pagesContent: action.data };
    default:
      return { ...state };
  }
};

export default siteReducer;
