const validation_messages: Record<string, string> = {
  is_null: 'This field is required.',
  wrong_credentials: 'The provided credentials are incorrect.',
  len: 'This field must be exactly {len} characters long.',
  not_unique: 'This value is already taken.',
}

export function ruleToText(rule: string, args: Array<string | number> = []) {
  if (rule in validation_messages) {
    const template = validation_messages[rule]

    if (template) {
      const message = template.replace(/{(\w+)}/g, (_, index) => {
        return String(args[index] ?? '')
      })
      return message
    }
    return 'Unknown validation error.'
  } else {
    return rule
  }
}
