export const setSiteID = (val) => {
  return {
    type: "SET_SITE_ID",
    data: val,
  };
};

export const setSiteAllData = (val) => {
  return {
    type: "STORE_SITES_ALLDATA",
    data: val,
  };
};

export const setSiteMenuItems = (val) => {
  return {
    type: "SITE_MENU_ITEMS_SAVE",
    data: val,
  };
};

export const setFootermenuItems = (val) => {
  return {
    type: "SITE_FOOTER_MENU_ITEMS_SAVE",
    data: val,
  };
};

export const setLanguageList = (val) => {
  return {
    type: "LANGUAGES_DATA_LIST",
    data: val,
  };
};

export const setSelectedLang = (val) => {
  return {
    type: "CHANGE_SITE_LANGUAGE",
    data: val,
  };
};

export const saveAllPagesContent = (val) => {
  return {
    type: "SAVE_ALL_PAGES_CONTENT_DATA",
    data: val,
  };
};
