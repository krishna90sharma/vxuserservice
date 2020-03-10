import Schema from 'validate'

export const createRequest = new Schema({
  first_name: {
    type: String,
    required: true,
    length: { min: 3, max: 32 }
  },
  last_name: {
    type: String,
    required: true,
    length: { min: 3, max: 32 }
  },
  password: {
    type: String,
    required: true,
    length: { min: 8, max: 20 }
  },
  email: {
    type: String,
    required: true,
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
    required: false
  },
  job_title: {
    type: String,
    required: false
  },
  status: {
    type: Number,
    required: false,
    enum: [0, 1]
  }
})
