import sideMenu from './libs/side-menu/side-menu.umd.min';
import breadCrumb from './libs/bread-crumb/bread-crumb.umd.min';
import tableExtra from './libs/table-extra/table-extra.umd.min';
import formSearch from './libs/form-search/form-search.umd.min';

const useComponents = (vue) => {
  vue.use(sideMenu);
  vue.use(breadCrumb);
  vue.use(tableExtra);
  vue.use(formSearch);
};

export default useComponents;
