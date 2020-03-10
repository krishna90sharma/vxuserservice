export const PER_PAGE = 10
export const LIMIT_GET_USER_ASSIGN = 10
export const BILLING_ADDRESS = 0
export const SHIPPING_ADDRESS = 1
export const ROLE_PER_PAGE = 100
export const EMAIL_VERIFIED = 1
export const CREATE_NEW_ROLE = -1
export const SALTROUNDS = 10
export const ACTIVE = 1

export const PERMISSION_IDS = {
  // DISTRIBUTOR
  DISTRIBUTORS_ALL: 1,
  DISTRIBUTORS_CREATE: 2,
  DISTRIBUTORS_READ: 3,
  DISTRIBUTORS_UPDATE: 4,
  DISTRIBUTORS_DELETE: 5,
  // CUSTOMER
  CUSTOMERS_ALL: 6,
  CUSTOMERS_CREATE: 7,
  CUSTOMERS_READ: 8,
  CUSTOMERS_UPDATE: 9,
  CUSTOMERS_DELETE: 10,
  // MAP
  MAP_ALL: 11,
  MAP_CREATE: 12,
  MAP_READ: 13,
  MAP_UPDATE: 14,
  MAP_DELETE: 15,
  // USERS
  USERS_ALL: 16,
  USERS_CREATE: 17,
  USERS_READ: 18,
  USERS_UPDATE: 19,
  USERS_DELETE: 20,
  // DEVICES
  DEVICES_ALL: 21,
  DEVICES_CREATE: 22,
  DEVICES_READ: 23,
  DEVICES_UPDATE: 24,
  DEVICES_DELETE: 25,
  // ASSETS
  ASSETS_ALL: 26,
  ASSETS_CREATE: 27,
  ASSETS_READ: 28,
  ASSETS_UPDATE: 29,
  ASSETS_DELETE: 30,
  // PROFILES
  PROFILES_ALL: 31,
  PROFILES_CREATE: 32,
  PROFILES_READ: 33,
  PROFILES_UPDATE: 34,
  PROFILES_DELETE: 35,
  // DASHBOARDS
  DASHBOARDS_ALL: 36,
  DASHBOARDS_CREATE: 37,
  DASHBOARDS_READ: 38,
  DASHBOARDS_UPDATE: 39,
  DASHBOARDS_DELETE: 40,
  // SUBSCRIPTIONS
  SUBSCRIPTIONS_ALL: 41,
  SUBSCRIPTIONS_CREATE: 42,
  SUBSCRIPTIONS_READ: 43,
  SUBSCRIPTIONS_UPDATE: 44,
  SUBSCRIPTIONS_DELETE: 45,
  // COMPANY
  COMPANY_ALL: 46,
  COMPANY_CREATE: 47,
  COMPANY_READ: 48,
  COMPANY_UPDATE: 49,
  COMPANY_DELETE: 50,
  // USAGES
  USAGES_ALL: 51,
  USAGES_CREATE: 52,
  USAGES_READ: 53,
  USAGES_UPDATE: 54,
  USAGES_DELETE: 55,
  // COMMUNITY
  COMMUNITY_ALL: 56,
  COMMUNITY_CREATE: 57,
  COMMUNITY_READ: 58,
  COMMUNITY_UPDATE: 59,
  COMMUNITY_DELETE: 60,
  // SUPPORTS
  SUPPORTS_ALL: 61,
  SUPPORTS_CREATE: 62,
  SUPPORTS_READ: 63,
  SUPPORTS_UPDATE: 64,
  SUPPORTS_DELETE: 65,
  // NOTIFICATION
  NOTIFICATIONS_ALL: 66,
  NOTIFICATIONS_CREATE: 67,
  NOTIFICATIONS_READ: 68,
  NOTIFICATIONS_UPDATE: 69,
  NOTIFICATIONS_DELETE: 70,
  // REPORTS
  REPORTS_ALL: 71,
  REPORTS_CREATE: 72,
  REPORTS_READ: 73,
  REPORTS_UPDATE: 74,
  REPORTS_DELETE: 75,
  // SETTINGS
  SETTINGS_ALL: 76,
  SETTINGS_CREATE: 77,
  SETTINGS_READ: 78,
  SETTINGS_UPDATE: 79,
  SETTINGS_DELETE: 80,
  // CATEGORY
  CATEGORY_ALL: 76,
  CATEGORY_CREATE: 77,
  CATEGORY_READ: 78,
  CATEGORY_UPDATE: 79,
  CATEGORY_DELETE: 80,
}

export const PERMISSIONS = [
  {
    id: PERMISSION_IDS.DISTRIBUTORS_ALL,
    name: 'distributors:*',
    display_name: 'distributors:*',
  },
  {
    id: PERMISSION_IDS.DISTRIBUTORS_CREATE,
    name: 'distributors:create',
    display_name: 'distributors:create'
  },
  {
    id: PERMISSION_IDS.DISTRIBUTORS_READ,
    name: 'distributors:read',
    display_name: 'distributors:read',
  },
  {
    id: PERMISSION_IDS.DISTRIBUTORS_UPDATE,
    name: 'distributors:update',
    display_name: 'distributors:update',
  },
  {
    id: PERMISSION_IDS.DISTRIBUTORS_DELETE,
    name: 'distributors:delete',
    display_name: 'distributors:delete',
  },
  {
    id: PERMISSION_IDS.CUSTOMERS_ALL,
    name: 'customers:*',
    display_name: 'customers:*',
  },
  {
    id: PERMISSION_IDS.CUSTOMERS_CREATE,
    name: 'customers:create',
    display_name: 'customers:create',
  },
  {
    id: PERMISSION_IDS.CUSTOMERS_READ,
    name: 'customers:read',
    display_name: 'customers:read',
  },
  {
    id: PERMISSION_IDS.CUSTOMERS_UPDATE,
    name: 'customers:update',
    display_name: 'customers:update',
  },
  {
    id: PERMISSION_IDS.CUSTOMERS_DELETE,
    name: 'customers:delete',
    display_name: 'customers:delete',
  },
  {
    id: PERMISSION_IDS.MAP_ALL,
    name: 'map:*',
    display_name: 'map:*',
  },
  {
    id: PERMISSION_IDS.MAP_CREATE,
    name: 'map:create',
    display_name: 'map:create',
  },
  {
    id: PERMISSION_IDS.MAP_READ,
    name: 'map:read',
    display_name: 'map:read',
  },
  {
    id: PERMISSION_IDS.MAP_UPDATE,
    name: 'map:update',
    display_name: 'map:update',
  },
  {
    id: PERMISSION_IDS.MAP_DELETE,
    name: 'map:delete',
    display_name: 'map:delete',
  },
  {
    id: PERMISSION_IDS.USERS_ALL,
    name: 'users:*',
    display_name: 'users:*',
  },
  {
    id: PERMISSION_IDS.USERS_CREATE,
    name: 'users:create',
    display_name: 'users:create',
  },
  {
    id: PERMISSION_IDS.USERS_READ,
    name: 'users:read',
    display_name: 'users:read',
  },
  {
    id: PERMISSION_IDS.USERS_UPDATE,
    name: 'users:update',
    display_name: 'users:update',
  },
  {
    id: PERMISSION_IDS.USERS_DELETE,
    name: 'users:delete',
    display_name: 'users:delete',
  },
  {
    id: PERMISSION_IDS.DEVICES_ALL,
    name: 'devices:*',
    display_name: 'devices:*',
  },
  {
    id: PERMISSION_IDS.DEVICES_CREATE,
    name: 'devices:create',
    display_name: 'devices:create',
  },
  {
    id: PERMISSION_IDS.DEVICES_READ,
    name: 'devices:read',
    display_name: 'devices:read',
  },
  {
    id: PERMISSION_IDS.DEVICES_UPDATE,
    name: 'devices:update',
    display_name: 'devices:update',
  },
  {
    id: PERMISSION_IDS.DEVICES_DELETE,
    name: 'devices:delete',
    display_name: 'devices:delete',
  },
  {
    id: PERMISSION_IDS.ASSETS_ALL,
    name: 'assets:*',
    display_name: 'assets:*',
  },
  {
    id: PERMISSION_IDS.ASSETS_CREATE,
    name: 'assets:create',
    display_name: 'assets:create',
  },
  {
    id: PERMISSION_IDS.ASSETS_READ,
    name: 'assets:read',
    display_name: 'assets:read',
  },
  {
    id: PERMISSION_IDS.ASSETS_UPDATE,
    name: 'assets:update',
    display_name: 'assets:update',
  },
  {
    id: PERMISSION_IDS.ASSETS_DELETE,
    name: 'assets:delete',
    display_name: 'assets:delete',
  },
  {
    id: PERMISSION_IDS.PROFILES_ALL,
    name: 'profiles:*',
    display_name: 'profiles:*',
  },
  {
    id: PERMISSION_IDS.PROFILES_CREATE,
    name: 'profiles:create',
    display_name: 'profiles:create',
  },
  {
    id: PERMISSION_IDS.PROFILES_READ,
    name: 'profiles:read',
    display_name: 'profiles:read',
  },
  {
    id: PERMISSION_IDS.PROFILES_UPDATE,
    name: 'profiles:update',
    display_name: 'profiles:update',
  },
  {
    id: PERMISSION_IDS.PROFILES_DELETE,
    name: 'profiles:delete',
    display_name: 'profiles:delete',
  },
  {
    id: PERMISSION_IDS.DASHBOARDS_ALL,
    name: 'dashboard:*',
    display_name: 'dashboard:*',
  },
  {
    id: PERMISSION_IDS.DASHBOARDS_CREATE,
    name: 'dashboard:create',
    display_name: 'dashboard:create',
  },
  {
    id: PERMISSION_IDS.DASHBOARDS_READ,
    name: 'dashboard:read',
    display_name: 'dashboard:read',
  },
  {
    id: PERMISSION_IDS.DASHBOARDS_UPDATE,
    name: 'dashboard:update',
    display_name: 'dashboard:update',
  },
  {
    id: PERMISSION_IDS.DASHBOARDS_DELETE,
    name: 'dashboard:delete',
    display_name: 'dashboard:delete',
  },
  {
    id: PERMISSION_IDS.SUBSCRIPTIONS_ALL,
    name: 'subscriptions:*',
    display_name: 'subscriptions:*',
  },
  {
    id: PERMISSION_IDS.SUBSCRIPTIONS_CREATE,
    name: 'subscriptions:create',
    display_name: 'subscriptions:create',
  },
  {
    id: PERMISSION_IDS.SUBSCRIPTIONS_READ,
    name: 'subscriptions:read',
    display_name: 'subscriptions:read',
  },
  {
    id: PERMISSION_IDS.SUBSCRIPTIONS_UPDATE,
    name: 'subscriptions:update',
    display_name: 'subscriptions:update',
  },
  {
    id: PERMISSION_IDS.SUBSCRIPTIONS_DELETE,
    name: 'subscriptions:delete',
    display_name: 'subscriptions:delete',
  },
  {
    id: PERMISSION_IDS.COMPANY_ALL,
    name: 'company:*',
    display_name: 'company:*',
  },
  {
    id: PERMISSION_IDS.COMPANY_CREATE,
    name: 'company:create',
    display_name: 'company:create',
  },
  {
    id: PERMISSION_IDS.COMPANY_READ,
    name: 'company:read',
    display_name: 'company:read',
  },
  {
    id: PERMISSION_IDS.COMPANY_UPDATE,
    name: 'company:update',
    display_name: 'company:update',
  },
  {
    id: PERMISSION_IDS.COMPANY_DELETE,
    name: 'company:delete',
    display_name: 'company:delete',
  },
  {
    id: PERMISSION_IDS.USAGES_ALL,
    name: 'usages:*',
    display_name: 'usages:*',
  },
  {
    id: PERMISSION_IDS.USAGES_CREATE,
    name: 'usages:create',
    display_name: 'usages:create',
  },
  {
    id: PERMISSION_IDS.USAGES_READ,
    name: 'usages:read',
    display_name: 'usages:read',
  },
  {
    id: PERMISSION_IDS.USAGES_UPDATE,
    name: 'usages:update',
    display_name: 'usages:update',
  },
  {
    id: PERMISSION_IDS.USAGES_DELETE,
    name: 'usages:delete',
    display_name: 'usages:delete',
  },
  {
    id: PERMISSION_IDS.COMMUNITY_ALL,
    name: 'community:*',
    display_name: 'community:*',
  },
  {
    id: PERMISSION_IDS.COMMUNITY_CREATE,
    name: 'community:create',
    display_name: 'community:create',
  },
  {
    id: PERMISSION_IDS.COMMUNITY_READ,
    name: 'community:read',
    display_name: 'community:read',
  },
  {
    id: PERMISSION_IDS.COMMUNITY_UPDATE,
    name: 'community:update',
    display_name: 'community:update',
  },
  {
    id: PERMISSION_IDS.COMMUNITY_DELETE,
    name: 'community:delete',
    display_name: 'community:delete',
  },
  {
    id: PERMISSION_IDS.SUPPORTS_ALL,
    name: 'supports:*',
    display_name: 'supports:*',
  },
  {
    id: PERMISSION_IDS.SUPPORTS_CREATE,
    name: 'supports:create',
    display_name: 'supports:create',
  },
  {
    id: PERMISSION_IDS.SUPPORTS_READ,
    name: 'supports:read',
    display_name: 'supports:read',
  },
  {
    id: PERMISSION_IDS.SUPPORTS_UPDATE,
    name: 'supports:update',
    display_name: 'supports:update',
  },
  {
    id: PERMISSION_IDS.SUPPORTS_DELETE,
    name: 'supports:delete',
    display_name: 'supports:delete',
  },
  {
    id: PERMISSION_IDS.NOTIFICATIONS_ALL,
    name: 'notifications:*',
    display_name: 'notifications:*',
  },
  {
    id: PERMISSION_IDS.NOTIFICATIONS_CREATE,
    name: 'notifications:create',
    display_name: 'notifications:create',
  },
  {
    id: PERMISSION_IDS.NOTIFICATIONS_READ,
    name: 'notifications:read',
    display_name: 'notifications:read',
  },
  {
    id: PERMISSION_IDS.NOTIFICATIONS_UPDATE,
    name: 'notifications:update',
    display_name: 'notifications:update',
  },
  {
    id: PERMISSION_IDS.NOTIFICATIONS_DELETE,
    name: 'notifications:delete',
    display_name: 'notifications:delete',
  },
  {
    id: PERMISSION_IDS.REPORTS_ALL,
    name: 'reports:*',
    display_name: 'reports:*',
  },
  {
    id: PERMISSION_IDS.REPORTS_CREATE,
    name: 'reports:create',
    display_name: 'reports:create',
  },
  {
    id: PERMISSION_IDS.REPORTS_READ,
    name: 'reports:read',
    display_name: 'reports:read',
  },
  {
    id: PERMISSION_IDS.REPORTS_UPDATE,
    name: 'reports:update',
    display_name: 'reports:update',
  },
  {
    id: PERMISSION_IDS.REPORTS_DELETE,
    name: 'reports:delete',
    display_name: 'reports:delete',
  },
  {
    id: PERMISSION_IDS.SETTINGS_ALL,
    name: 'settings:*',
    display_name: 'settings:*',
  },
  {
    id: PERMISSION_IDS.SETTINGS_CREATE,
    name: 'settings:create',
    display_name: 'settings:create',
  },
  {
    id: PERMISSION_IDS.SETTINGS_READ,
    name: 'settings:read',
    display_name: 'settings:read',
  },
  {
    id: PERMISSION_IDS.SETTINGS_UPDATE,
    name: 'settings:update',
    display_name: 'settings:update',
  },
  {
    id: PERMISSION_IDS.SETTINGS_DELETE,
    name: 'settings:delete',
    display_name: 'settings:delete',
  },
]

export const PERMISSION_SYSADMIN_DEFAULT = [
  // DISTRIBUTOR
  PERMISSION_IDS.DISTRIBUTORS_ALL,
  PERMISSION_IDS.DISTRIBUTORS_CREATE,
  PERMISSION_IDS.DISTRIBUTORS_READ,
  PERMISSION_IDS.DISTRIBUTORS_UPDATE,
  PERMISSION_IDS.DISTRIBUTORS_DELETE,
  // CUSTOMER
  PERMISSION_IDS.CUSTOMERS_ALL,
  PERMISSION_IDS.CUSTOMERS_CREATE,
  PERMISSION_IDS.CUSTOMERS_READ,
  PERMISSION_IDS.CUSTOMERS_UPDATE,
  PERMISSION_IDS.CUSTOMERS_DELETE,
  // MAP
  PERMISSION_IDS.MAP_ALL,
  PERMISSION_IDS.MAP_CREATE,
  PERMISSION_IDS.MAP_READ,
  PERMISSION_IDS.MAP_UPDATE,
  PERMISSION_IDS.MAP_DELETE,
  // USERS
  PERMISSION_IDS.USERS_ALL,
  PERMISSION_IDS.USERS_CREATE,
  PERMISSION_IDS.USERS_READ,
  PERMISSION_IDS.USERS_UPDATE,
  PERMISSION_IDS.USERS_DELETE,
  // DEVICES
  PERMISSION_IDS.DEVICES_ALL,
  PERMISSION_IDS.DEVICES_CREATE,
  PERMISSION_IDS.DEVICES_READ,
  PERMISSION_IDS.DEVICES_UPDATE,
  PERMISSION_IDS.DEVICES_DELETE,
  // PROFILES
  PERMISSION_IDS.PROFILES_ALL,
  PERMISSION_IDS.PROFILES_CREATE,
  PERMISSION_IDS.PROFILES_READ,
  PERMISSION_IDS.PROFILES_UPDATE,
  PERMISSION_IDS.PROFILES_DELETE,
  // DASHBOARDS
  PERMISSION_IDS.DASHBOARDS_ALL,
  PERMISSION_IDS.DASHBOARDS_CREATE,
  PERMISSION_IDS.DASHBOARDS_READ,
  PERMISSION_IDS.DASHBOARDS_UPDATE,
  PERMISSION_IDS.DASHBOARDS_DELETE,
  // SUBSCRIPTIONS
  PERMISSION_IDS.SUBSCRIPTIONS_ALL,
  PERMISSION_IDS.SUBSCRIPTIONS_CREATE,
  PERMISSION_IDS.SUBSCRIPTIONS_READ,
  PERMISSION_IDS.SUBSCRIPTIONS_UPDATE,
  PERMISSION_IDS.SUBSCRIPTIONS_DELETE,
  // NOTIFICATION
  PERMISSION_IDS.NOTIFICATIONS_ALL,
  PERMISSION_IDS.NOTIFICATIONS_CREATE,
  PERMISSION_IDS.NOTIFICATIONS_READ,
  PERMISSION_IDS.NOTIFICATIONS_UPDATE,
  PERMISSION_IDS.NOTIFICATIONS_DELETE,
  // SETTINGS
  PERMISSION_IDS.SETTINGS_ALL,
  PERMISSION_IDS.SETTINGS_CREATE,
  PERMISSION_IDS.SETTINGS_READ,
  PERMISSION_IDS.SETTINGS_UPDATE,
  PERMISSION_IDS.SETTINGS_DELETE,
]

export const PERMISSION_DISTRIBUTOR_DEFAULT = [
  // DISTRIBUTOR
  PERMISSION_IDS.DISTRIBUTORS_ALL,
  PERMISSION_IDS.DISTRIBUTORS_CREATE,
  PERMISSION_IDS.DISTRIBUTORS_READ,
  PERMISSION_IDS.DISTRIBUTORS_UPDATE,
  PERMISSION_IDS.DISTRIBUTORS_DELETE,
  // CUSTOMER
  PERMISSION_IDS.CUSTOMERS_ALL,
  PERMISSION_IDS.CUSTOMERS_CREATE,
  PERMISSION_IDS.CUSTOMERS_READ,
  PERMISSION_IDS.CUSTOMERS_UPDATE,
  PERMISSION_IDS.CUSTOMERS_DELETE,
  // MAP
  PERMISSION_IDS.MAP_ALL,
  PERMISSION_IDS.MAP_CREATE,
  PERMISSION_IDS.MAP_READ,
  PERMISSION_IDS.MAP_UPDATE,
  PERMISSION_IDS.MAP_DELETE,
  // USERS
  PERMISSION_IDS.USERS_ALL,
  PERMISSION_IDS.USERS_CREATE,
  PERMISSION_IDS.USERS_READ,
  PERMISSION_IDS.USERS_UPDATE,
  PERMISSION_IDS.USERS_DELETE,
  // DEVICES
  PERMISSION_IDS.DEVICES_READ,
  PERMISSION_IDS.DEVICES_UPDATE,
  // PROFILES
  PERMISSION_IDS.PROFILES_ALL,
  PERMISSION_IDS.PROFILES_CREATE,
  PERMISSION_IDS.PROFILES_READ,
  PERMISSION_IDS.PROFILES_UPDATE,
  PERMISSION_IDS.PROFILES_DELETE,
  // DASHBOARDS
  PERMISSION_IDS.DASHBOARDS_ALL,
  PERMISSION_IDS.DASHBOARDS_CREATE,
  PERMISSION_IDS.DASHBOARDS_READ,
  PERMISSION_IDS.DASHBOARDS_UPDATE,
  PERMISSION_IDS.DASHBOARDS_DELETE,
  // SUBSCRIPTIONS
  PERMISSION_IDS.SUBSCRIPTIONS_ALL,
  PERMISSION_IDS.SUBSCRIPTIONS_CREATE,
  PERMISSION_IDS.SUBSCRIPTIONS_READ,
  PERMISSION_IDS.SUBSCRIPTIONS_UPDATE,
  PERMISSION_IDS.SUBSCRIPTIONS_DELETE,
  // COMPANY
  PERMISSION_IDS.COMPANY_ALL,
  PERMISSION_IDS.COMPANY_CREATE,
  PERMISSION_IDS.COMPANY_READ,
  PERMISSION_IDS.COMPANY_UPDATE,
  PERMISSION_IDS.COMPANY_DELETE,
  // NOTIFICATION
  PERMISSION_IDS.NOTIFICATIONS_ALL,
  PERMISSION_IDS.NOTIFICATIONS_CREATE,
  PERMISSION_IDS.NOTIFICATIONS_READ,
  PERMISSION_IDS.NOTIFICATIONS_UPDATE,
  PERMISSION_IDS.NOTIFICATIONS_DELETE,
]

export const PERMISSION_CUSTOMER_DEFAULT = [
  // MAP
  PERMISSION_IDS.MAP_ALL,
  PERMISSION_IDS.MAP_CREATE,
  PERMISSION_IDS.MAP_READ,
  PERMISSION_IDS.MAP_UPDATE,
  PERMISSION_IDS.MAP_DELETE,
  // USERS
  PERMISSION_IDS.USERS_ALL,
  PERMISSION_IDS.USERS_CREATE,
  PERMISSION_IDS.USERS_READ,
  PERMISSION_IDS.USERS_UPDATE,
  PERMISSION_IDS.USERS_DELETE,
  // DEVICES
  PERMISSION_IDS.DEVICES_READ,
  PERMISSION_IDS.DEVICES_UPDATE,
  // ASSETS
  PERMISSION_IDS.ASSETS_ALL,
  PERMISSION_IDS.ASSETS_CREATE,
  PERMISSION_IDS.ASSETS_READ,
  PERMISSION_IDS.ASSETS_UPDATE,
  PERMISSION_IDS.ASSETS_DELETE,
  // PROFILES
  PERMISSION_IDS.PROFILES_ALL,
  PERMISSION_IDS.PROFILES_CREATE,
  PERMISSION_IDS.PROFILES_READ,
  PERMISSION_IDS.PROFILES_UPDATE,
  PERMISSION_IDS.PROFILES_DELETE,
  // DASHBOARDS
  PERMISSION_IDS.DASHBOARDS_ALL,
  PERMISSION_IDS.DASHBOARDS_CREATE,
  PERMISSION_IDS.DASHBOARDS_READ,
  PERMISSION_IDS.DASHBOARDS_UPDATE,
  PERMISSION_IDS.DASHBOARDS_DELETE,
  // COMPANY
  PERMISSION_IDS.COMPANY_ALL,
  PERMISSION_IDS.COMPANY_CREATE,
  PERMISSION_IDS.COMPANY_READ,
  PERMISSION_IDS.COMPANY_UPDATE,
  PERMISSION_IDS.COMPANY_DELETE,
  // COMMUNITY
  PERMISSION_IDS.COMMUNITY_ALL,
  PERMISSION_IDS.COMMUNITY_CREATE,
  PERMISSION_IDS.COMMUNITY_READ,
  PERMISSION_IDS.COMMUNITY_UPDATE,
  PERMISSION_IDS.COMMUNITY_DELETE,
  // SUPPORTS
  PERMISSION_IDS.SUPPORTS_ALL,
  PERMISSION_IDS.SUPPORTS_CREATE,
  PERMISSION_IDS.SUPPORTS_READ,
  PERMISSION_IDS.SUPPORTS_UPDATE,
  PERMISSION_IDS.SUPPORTS_DELETE,
  // NOTIFICATION
  PERMISSION_IDS.NOTIFICATIONS_ALL,
  PERMISSION_IDS.NOTIFICATIONS_CREATE,
  PERMISSION_IDS.NOTIFICATIONS_READ,
  PERMISSION_IDS.NOTIFICATIONS_UPDATE,
  PERMISSION_IDS.NOTIFICATIONS_DELETE,
  // REPORTS
  PERMISSION_IDS.REPORTS_ALL,
  PERMISSION_IDS.REPORTS_CREATE,
  PERMISSION_IDS.REPORTS_READ,
  PERMISSION_IDS.REPORTS_UPDATE,
  PERMISSION_IDS.REPORTS_DELETE,
  // SETTINGS
  PERMISSION_IDS.SETTINGS_ALL,
  PERMISSION_IDS.SETTINGS_CREATE,
  PERMISSION_IDS.SETTINGS_READ,
  PERMISSION_IDS.SETTINGS_UPDATE,
  PERMISSION_IDS.SETTINGS_DELETE,
]

export const TYPE = {
  SYS_ADMIN: 0,
  DISTRIBUTOR: 1,
  CUSTOMER: 2
}

export const ORGANIZATION_SETTING_DEFAULT = {
  drp_area_location: 0,
  drp_logofftime: 60,
  temperature_scale: 1,
  enable_test_mode: 1,
  enable_show_unassigned_device: 1,
  display_tracker_yes: 1,
  display_logo: 3,
  font_color: '#ffffff',
  bg_color: '#00000000'
}

export const THUMBNAIL_DEFAULT = {
  name: null,
  type: null,
  format: null,
  size: null,
  path: null,
  original_path: null
}
