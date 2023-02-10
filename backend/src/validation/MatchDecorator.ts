import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from "class-validator";

@ValidatorConstraint({ name: "Match" })
export class MatchValues implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

    defaultMessage(args: ValidationArguments) {
        // Default error message if validation failed
        return `Os valores de ${args.property} e ${args.constraints} devem ser iguais`;
    }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
    return(object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchValues,
        });
    }
}