import Joi from 'joi';

interface Property {
    state: string;
}

export const schema = Joi.object<Property, true>({
    state: Joi.string().required()
});
