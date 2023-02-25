import type { Settings } from '#/global'

const globalSettings: Settings.all = {
  "app": {
    "enablePermission": true,
    "enableDynamicTitle": true,
    "colorScheme": "light",
    "elementSize": "default",
    "iconifyOfflineUse": false,
    "enableProgress": true,
    "routeBaseOn": "frontend"
  },
  "layout": {
    "enableMobileAdaptation": true
  },
  "menu": {
    "enableSubMenuCollapseButton": true,
    "enableHotkeys": true,
    "baseOn": "frontend",
    "menuMode": "single",
    "switchMainMenuAndPageJump": false,
    "subMenuUniqueOpened": true,
    "subMenuCollapse": false
  },
  "topbar": {
    "mode": "fixed"
  },
  "toolbar": {
    "enableFullscreen": true,
    "enablePageReload": true,
    "enableColorScheme": true,
    "enableAppSetting": true
  },
  "home": {
    "enable": true,
    "title": "主页"
  },
  "breadcrumb": {
    "enable": true
  },
  "navSearch": {
    "enable": true,
    "enableHotkeys": true
  },
  "copyright": {
    "enable": true,
    "dates": "2020-2023",
    "company": "Fantastic-admin",
    "website": "https://hooray.gitee.io/fantastic-admin/",
    "beian": ""
  }
}

export default globalSettings