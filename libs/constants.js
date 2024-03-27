module.exports = {
  HEADER: {
    CONTENT_TYPE: 'application/json'
  },
  ERROR: {
    CODE: 500,
    MSG: 'error'
  },
  SUCCESS: {
    CODE: 200,
    MSG: 'ok'
  },
  MSG: {
    HAS_RECORD: 'record(s) found'
  },
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized',
  NO_RECORD: 'No records found',
  TRY_AGAIN: 'Try again',
  STATUS: {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    DELETE: 'DELETED',
    VERIFIED: 'VERIFIED',
    UN_VERIFIED: 'UN_VERIFIED',
    EXPIRED: 'EXPIRED',
    SUSPENDED: 'SUSPENDED'
  },
  ROLES: {
    ADMIN: 'ADMIN',
    OWNER: 'OWNER',
    MANAGER: 'MANAGER',
    CO_ORDINATOR: 'CO_ORDINATOR',
    STAFF: 'STAFF',
    EXECUTIVE: 'EXECUTIVE',
    ADMIN_MANAGER: 'ADMIN_MANAGER'
  },
  IS_STATIC_OTP: process.env.IS_STATIC_OTP,
  STATIC_OTP: process.env.STATIC_OTP,
  STATIC_PASSWORD: process.env.STATIC_PASSWORD,
  OTP_TYPE: {
    LOGIN: 'LOGIN'
  },
  COMPLIANCE_STATUS: {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    NEW: 'NEW',
    EXPIRED: 'EXPIRED'
  },
  ALLOWED_MIME_TYPE: ['image/jpeg', 'image/png', 'image/jpg', 'image/JPEG', 'image/PNG', 'image/JPG', 'application/pdf', 'image/bmp', 'image/gif', 'application/PDF', 'image/BMP', 'image/GIF', 'video/mp4', 'video/ogg'],
  ERR_FILE_TYPE: 'File type not allowed',
  PAYMENT_STATUS: {
    PAID: 'PAID',
    UNPAID: 'UNPAID'
  },
  CUSTOMER_SUPPORT: {
    email: 'acmeconsultingchennai@gmail.com',
    mobileNumber: '9876543210'
  },
  CYCLE1: [
    {
      id: '1',
      label: '1 Years',
      value: '1_years'
    },
    {
      id: '2',
      label: '10 months',
      value: '10_months'
    },
    {
      id: '3',
      label: '8 months',
      value: '8_months'
    }
  ],
  CYCLE2: [
    {
      id: '1',
      label: '6 months',
      value: '6_months'
    },
    {
      id: '2',
      label: '5 months',
      value: '5_months'
    },
    {
      id: '3',
      label: '4 months',
      value: '4_months'
    }
  ],
  CYCLE3: [
    {
      id: '1',
      label: '10 Days',
      value: '10_days'
    },
    {
      id: '2',
      label: '5 Days',
      value: '5_days'
    },
    {
      id: '3',
      label: '2 Days',
      value: '2_days'
    }
  ],
  MENU: {
    MANAGER: [
      {
        id: '1',
        route: 'Home',
        iconType: 'image',
        iconName: 'dashboard',
        title: 'Dashboard'
      },
      {
        id: '2',
        route: 'ComplianceStatus',
        iconType: 'image',
        iconName: 'complianceStatus',
        title: 'Compliance Status'
      },
      {
        id: '3',
        route: 'Notifications',
        iconType: 'image',
        iconName: 'notificationBell',
        title: 'Notification'
      },
      {
        id: '4',
        route: 'Feeds',
        iconType: 'image',
        iconName: 'news',
        title: 'News You Can Use'
      },
      {
        id: '5',
        route: 'CoOrdinators',
        iconType: 'image',
        iconName: 'coOrdinator',
        title: 'Coordinators'
      },
      {
        id: '6',
        route: 'Staffs',
        iconType: 'image',
        iconName: 'staff',
        title: 'Staffs'
      },
      {
        id: '7',
        route: 'Profile',
        iconType: 'image',
        iconName: 'profile',
        title: 'Profile'
      },
      {
        id: '8',
        route: 'Support',
        iconType: 'image',
        iconName: 'customerService',
        title: 'Support'
      },
      {
        id: '9',
        route: 'LOGOUT',
        iconType: 'image',
        iconName: 'logout',
        title: 'Logout'
      }
    ],
    CO_ORDINATOR: [
      {
        id: '1',
        route: 'Home',
        iconType: 'image',
        iconName: 'dashboard',
        title: 'Dashboard'
      },
      {
        id: '2',
        route: 'ComplianceStatus',
        iconType: 'image',
        iconName: 'complianceStatus',
        title: 'Compliance Status'
      },
      {
        id: '3',
        route: 'Notifications',
        iconType: 'image',
        iconName: 'notificationBell',
        title: 'Notification'
      },
      {
        id: '4',
        route: 'Feeds',
        iconType: 'image',
        iconName: 'news',
        title: 'News You Can Use'
      },
      {
        id: '5',
        route: 'Staffs',
        iconType: 'image',
        iconName: 'staff',
        title: 'Staffs'
      },
      {
        id: '6',
        route: 'Profile',
        iconType: 'image',
        iconName: 'profile',
        title: 'Profile'
      },
      {
        id: '7',
        route: 'Support',
        iconType: 'image',
        iconName: 'customerService',
        title: 'Support'
      },
      {
        id: '8',
        route: 'LOGOUT',
        iconType: 'image',
        iconName: 'logout',
        title: 'Logout'
      }
    ],
    STAFF: [
      {
        id: '1',
        route: 'Home',
        iconType: 'image',
        iconName: 'dashboard',
        title: 'Dashboard'
      },
      {
        id: '2',
        route: 'ComplianceStatus',
        iconType: 'image',
        iconName: 'complianceStatus',
        title: 'Compliance Status'
      },
      {
        id: '3',
        route: 'Notifications',
        iconType: 'image',
        iconName: 'notificationBell',
        title: 'Notification'
      },
      {
        id: '4',
        route: 'Feeds',
        iconType: 'image',
        iconName: 'news',
        title: 'News You Can Use'
      },
      {
        id: '5',
        route: 'Profile',
        iconType: 'image',
        iconName: 'profile',
        title: 'Profile'
      },
      {
        id: '6',
        route: 'Support',
        iconType: 'image',
        iconName: 'customerService',
        title: 'Support'
      },
      {
        id: '7',
        route: 'LOGOUT',
        iconType: 'image',
        iconName: 'logout',
        title: 'Logout'
      }
    ],
    GUEST: [
      {
        id: '1',
        route: 'Home',
        iconType: 'image',
        iconName: 'dashboard',
        title: 'Dashboard'
      },
      {
        id: '2',
        route: 'ComplianceStatus',
        iconType: 'image',
        iconName: 'complianceStatus',
        title: 'Compliance Status'
      },
      {
        id: '3',
        route: 'Notifications',
        iconType: 'image',
        iconName: 'notificationBell',
        title: 'Notification'
      },
      {
        id: '4',
        route: 'Feeds',
        iconType: 'image',
        iconName: 'news',
        title: 'News You Can Use'
      },
      {
        id: '5',
        route: 'Profile',
        iconType: 'image',
        iconName: 'profile',
        title: 'Profile'
      },
      {
        id: '6',
        route: 'Support',
        iconType: 'image',
        iconName: 'customerService',
        title: 'Support'
      },
      {
        id: '7',
        route: 'Interest',
        iconType: 'image',
        iconName: 'interest',
        title: 'Interest'
      },
      {
        id: '8',
        route: 'LOGOUT',
        iconType: 'image',
        iconName: 'logout',
        title: 'Logout'
      }
    ]
  }
}
