import Schema from 'validate'

export const updateRequest = new Schema({
  thumbnail_id: {
    type: Number,
    required: false,
  },
  first_name: {
    type: String,
    required: false,
    length: { min: 3, max: 32 }
  },
  last_name: {
    type: String,
    required: false,
    length: { min: 3, max: 32 }
  },
  password: {
    type: String,
    required: false,
    length: { min: 8, max: 20 }
  },
  role_id: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: false,
    match: /^([A-Za-z0-9_\-\+\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    message: {
      match: 'Email invalid. Please try again !',
    }
  },
  language: {
    type: String,
    required: false,
    enum: ['en', 'ja']
  },
  phone: {
    type: String,
    required: false,
  },
  job_title: {
    type: String,
    required: false
  },
  is_email_verified: {
    type: Number,
    required: false,
    enum: [0, 1]
  },
  status: {
    type: Number,
    required: false,
    enum: [0, 1]
  },
  permissions: {
    type: Array,
    required: false,
    elements: [
      { type: String }
    ],
  }
})
