export const ROLE_DEFAULT = [
  {
    name: 'superadmin',
    created_by_user: 0,
    organization_id: 1,
    display_name: 'Super Admin'
  },
  {
    name: 'distributor',
    created_by_user: 1,
    organization_id: 1,
    display_name: 'Distributor'
  },
  {
    name: 'customer',
    created_by_user: 1,
    organization_id: 1,
    display_name: 'Customer'
  }
]

export const USER_ROLE_DEFAULT = [
  {
    user_id: 1, // System admin
    role_id: 1 // role super-admin
  },
  {
    user_id: 2, // System distributor
    role_id: 2 // role distributor
  },
  {
    user_id: 3, // System customer
    role_id: 3 // role customer
  }
]

export const SYS_USER = [
  {
    first_name: 'Super',
    last_name: 'Admin',
    password: '$2b$10$4Jf9WEkJgtVMyQxbSDd6uufXZDLqCVhBETN59yOwX7p3MI2umFobC',
    email: 'superadmin@gmail.com',
    phone: 123123123,
    job_title: 'CEO',
    status: 1
  },
  {
    first_name: 'Distributor',
    last_name: 'Admin',
    password: '$2b$10$4Jf9WEkJgtVMyQxbSDd6uufXZDLqCVhBETN59yOwX7p3MI2umFobC',
    email: 'distributor@gmail.com',
    phone: 123123123,
    job_title: 'CEO',
    status: 1
  },
  {
    first_name: 'Customer',
    last_name: 'Admin',
    password: '$2b$10$4Jf9WEkJgtVMyQxbSDd6uufXZDLqCVhBETN59yOwX7p3MI2umFobC',
    email: 'customer@gmail.com',
    phone: 123123123,
    job_title: 'CEO',
    status: 1
  }
]

export const THUMBNAILS = [
  {
    name: 'VX Hercules',
    type: 1,
    format: 'image/png',
    size: '170x170',
    path: 'devices/type/VX_Hercules.png',
    original_path: 'devices/type/VX_Hercules.png'
  },
  {
    name: 'VX BLS',
    type: 1,
    format: 'image/png',
    size: '170x170',
    path: 'devices/type/VX_BLS.png',
    original_path: 'devices/type/VX_BLS.png'
  },
  {
    name: 'VX Apollo',
    type: 1,
    format: 'image/png',
    size: '170x170',
    path: 'devices/type/VX_Apollo.png',
    original_path: 'devices/type/VX_Apollo.png'
  },
  {
    name: 'VE BLE',
    type: 1,
    format: 'image/png',
    size: '170x170',
    path: 'devices/type/VE_BLE.png',
    original_path: 'devices/type/VE_BLE.png'
  },
  {
    name: 'VE LoRa',
    type: 1,
    format: 'image/png',
    size: '170x170',
    path: 'devices/type/VE_LoRa.png',
    original_path: 'devices/type/VE_LoRa.png'
  },
  {
    name: 'VX Zeus',
    type: 1,
    format: 'image/png',
    size: '170x170',
    path: 'devices/type/VX_Zeus.png',
    original_path: 'devices/type/VX_Zeus.png'
  },
]

export const ORGANIZATION_DEFAULT = {
  name: 'Organization 1',
  type: 0,
  description: 'Organization for super admin',
  setting_id: 1
}
export const ORGANIZATION_SETTING_SEEDER = {
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

export const ORGANIZATION_USER_DEFAULT = [
  {
    user_id: 1,
    organization_id: 1
  },
  {
    user_id: 2,
    organization_id: 1
  },
  {
    user_id: 3,
    organization_id: 1
  }
]

