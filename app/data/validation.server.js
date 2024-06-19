function isValidTitle(value) {
  return value && value.trim().length > 0 && value.trim().length <= 30
}

function isValidDream(value) {
  // const amount = parseFloat(value)
  // return !isNaN(amount) && amount > 0
  return value && value.trim().length > 15
}

function isValidDate(value) {
  return value && new Date(value).getTime() < new Date().getTime()
}

function isValidName(value) {
  return value && value.trim().length > 0 && value.trim().length <= 25
}

function isValidNickname(value) {
  return value && value.trim().length >= 2
}

export function validateDreamInput(input) {
  let validationErrors = {}

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      'Invalid expense title. Must be at most 30 characters long.'
  }

  if (!isValidDream(input.description)) {
    validationErrors.description = 'Write more, try to be more descriptive.'
  }

  if (input?.date && !isValidDate(input.date)) {
    validationErrors.date = 'Invalid date. Must be a date before today.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}

export function validateArtInput(input) {
  let validationErrors = {}

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      'Invalid expense title. Must be at most 30 characters long.'
  }

  if (!isValidDream(input.description)) {
    validationErrors.description = 'Write more, try to be more descriptive.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}

//Auth

function isValidEmail(value) {
  return value && value.includes('@')
}

function isValidPassword(value) {
  return value && value.trim().length >= 7
}

function automaticPassword(value) {
  return value && value.trim().length >= 7
}

export function validateProfileInput(input) {
  let validationErrors = {}

  if (!isValidNickname(input.nickname)) {
    validationErrors.nickname = 'Write more, try to be more descriptive.'
  }

  if (!isValidName(input.name)) {
    validationErrors.name = 'Invalid name. Must be at most 30 characters long.'
  }

  if (!isValidEmail(input.email)) {
    validationErrors.email = 'Invalid mail. But what WTF.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}

export function validateCredentials(input) {
  let validationErrors = {}

  if (!isValidEmail(input.email)) {
    validationErrors.email = 'Invalid email address.'
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password =
      'Invalid password. Must be at least 7 characters long.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}
