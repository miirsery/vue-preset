import type { FormItemRule } from 'element-plus'

const RULES_ERRORS = {
  required: 'Это поле обязательно для заполнения',
  password: 'Пароль должен быть не менее 6 символов длиной',
}

export const commonRules: Record<string, FormItemRule> = {
  required: { required: true, message: RULES_ERRORS.required, trigger: 'blur' },
}
