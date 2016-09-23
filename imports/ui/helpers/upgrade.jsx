
export const MaterialJSClass = {
  'mdl-js-layout': 'MaterialLayout',
  'mdl-js-data-table': 'MaterialDataTable',
  'mdl-js-button': 'MaterialButton',
  'mdl-js-checkbox': 'MaterialCheckbox',
  'mdl-js-icon-toggle': 'MaterialIconToggle',
  'mdl-js-menu': 'MaterialManu',
  'mdl-js-progress': 'MaterialProgress',
  'mdl-js-radio': 'MaterialRadio',
  'mdl-js-slider': 'MaterialSlider',
  'mdl-js-snackbar': 'MaterialSnackbar',
  'mdl-js-spinner': 'MaterialSpinner',
  'mdl-js-switch': 'MaterialSwitch',
  'mdl-js-tabs': 'MaterialTabs',
  'mdl-js-textfield': 'MaterialTextfield',
  'mdl-tooltip': 'MaterialTooltip',
  'mdl-js-ripple-effect': 'MaterialRipple',

};

export const upgrade = (...elements) => {
  for (let i = 0; i < elements.length; i++) {
    for (const key of Object.keys(MaterialJSClass)) {
      if (elements[i].className.indexOf(key) >= 0) {
        componentHandler.upgradeElement(elements[i], MaterialJSClass[key]);
      }
    }
  }
};

export const downgrade = (...elements) => {
  componentHandler.downgradeElements(elements);
};
