import { celebrate, Joi, Segments } from 'celebrate';

export const validateProductBody = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.base': 'Поле title должно быть заполнено',
        'string.min': 'Минимальная длина поля title - 2 символа',
        'string.max': 'Максимальная длина поля title - 30 символов',
        'any.required': 'Поле title обязательно',
      }),

    category: Joi.string()
      .required()
      .messages({
        'string.base': 'Поле category должно быть заполнено',
        'any.required': 'Поле category обязательно',
      }),

    description: Joi.string()
      .optional()
      .messages({
        'string.base': 'Поле description должно быть строкой',
      }),

    price: Joi.number()
      .allow(null)
      .messages({
        'number.base': 'Поле price должно быть числом или null',
      }),

    image: Joi.object({
      fileName: Joi.string().required().messages({
        'string.base': 'Поле image.fileName должно быть строкой',
        'any.required': 'Поле image.fileName обязательно',
      }),
      originalName: Joi.string().required().messages({
        'string.base': 'Поле image.originalName должно быть строкой',
        'any.required': 'Поле image.originalName обязательно',
      }),
    })
      .required()
      .messages({
        'any.required': 'Поле image обязательно',
        'object.base': 'Поле image должно быть объектом',
      }),
  }),
});
