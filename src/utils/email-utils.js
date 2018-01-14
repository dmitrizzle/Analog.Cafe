// validate emails
export const validateEmail = email => {
  const rule = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
  return rule.test(email)
}

// anonymize emails
export const anonymizeEmail = email => {
  const parts = email.split("@")
  return `${parts[0][0]}***${parts[0][parts[0].length - 1]}@${parts[1]}`
}
