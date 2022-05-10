export default {
  title: 'Users',

  titles: {
    usersAll:             'All Users',
    usersBanned:          'Banned Users',
    usersRemoved:         'Deleted Users',
    profile:              'Profile',
    create:               'Add User',
    update:               'Edit User',
    updateProfile:        'Edit Profile',
    updateContacts:       'Edit Contacts',
    updateInfo:           'Edit Info',
    updateRoles:          'Permissions',
    updateNotifications:  'Notifications',
    updateBan:            'Banning',
    updatePassword:       'Change Password'
  },

  entity:     'User',
  entities:   'Users',

  messages: {
    empty:        'There are no users!',
    emptyBanned:  'There are no banned users!',
    emptyRemoved: 'There are no deleted users!'
  },

  properties: {
    username:                   'Name',
    alias:                      'Alias',
    password:                   'Password',
    email:                      'Email',
    isEmailHidden:              'Email visibility',
    phone:                      'Phone',
    website:                    'Website',
    contacts:                   'Contacts',
    birthdate:                  'Date of Birth',
    avatar:                     'Avatar',
    title:                      'Title',
    city:                       'City',
    biography:                  'Biography',
    firstUseragent:             'Primary User-Agent',
    firstIp:                    'Primary IP',
    isBanned:                   'Status',
    isCommunicationBanned:      'Communication status',
    notifications:              'Subscriptions',
    isAllowedAdvNotifications:  'Adv',
    roles:                      'Permissions',
    createdAt:                  'Created at',
    updatedAt:                  'Updated at',
    removedAt:                  'Deleted at',
    blogPosts:                  'Posts'
  },

  values: {
    role: `{role, select,
      ROLE_TECH           {Tech permissions}
      ROLE_ADMIN          {Full permissions}
      ROLE_USERS_MANAGER  {Manage users}
      ROLE_BLOG_MANAGER   {Manage blog}
      ROLE_BLOG_AUTHOR    {Add users to blog}
      other               {{role}}}`,

    rolesEmpty:           'No permissions',
    emailHidden:          'Hidden',
    banned:               'Banned',
    communicationBanned:  'Blocked',
    notificationsEmpty:   'No subscriptions'
  },

  entityForm: {
    labels: {
      isEmailHidden:              'Hide email from other users',
      isAllowedAdvNotifications:  'Subscribe to Adv',
      isBanned:                   'Ban user',
      isCommunicationBanned:      'Ban communication',
      newPassword:                'New password'
    },
    placeholders: {
      roles: 'Permissions not selected'
    },
    helps: {
      email:  'The email address is used for authorization.'
    },
    submits: {
      create:               'Add user',
      update:               'Save user',
      updateRoles:          'Save permissions',
      updateNotifications:  'Save',
      updateBan:            'Save',
      updatePassword:       'Save password'
    }
  },

  removeForm: {
    labels: {
      erase: 'Delete permanently'
    }
  },

  buttons: {
    profile:              'Profile',
    create:               'Add new user',
    update:               'Edit profile',
    updateRoles:          'Permissions',
    updatePassword:       'Change password',
    updateNotifications:  'Subscriptions',
    updateBan:            'Banning',
    remove:               'Delete',
    restore:              'Restore',
    erase:                'Delete permanently',
    ban:                  'Ban',
    unban:                'Unban'
  },

  confirmations: {
    remove:           'Are you sure you want to delete the user «{username}»?',
    removeRestorable: 'Are you sure you want to delete the user «{username}»? You will be able to restore it in {days, plural, =1 {# day} other {# days}}.',
    erase:            'Are you sure you want to permanently delete the user «{username}»? You won\'t be able to restore it.',
    restore:          'Are you sure you want to restore the user «{username}»?',
    ban:              'Are you sure you want to ban the user «{username}»?',
    unban:            'Are you sure you want to unban the user «{username}»?',
  },

  info: {
    removed:            'The user is deleted.',
    removedRestorable:  'The user has been deleted, but you can restore it until {restorableTo}.'
  }
};
