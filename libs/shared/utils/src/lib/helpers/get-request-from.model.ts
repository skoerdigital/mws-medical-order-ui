import { DotPaths, ExtractFormControlValues, FormOf } from '@sls-ui/models';

export type MappingValue<Request, FormSchema, FormGroup = never> =
	| DotPaths<FormSchema>
	| [
			DotPaths<FormSchema>,
			(
				param: ExtractFormControlValues<
					FormGroup extends never ? FormOf<FormSchema> : FormGroup
				>,
			) => Request[keyof Request],
	  ];
export type RequestToFormPropsMapper<
	Request,
	FormSchema,
	Form = never,
> = Record<
	keyof Request,
	| DotPaths<FormSchema>
	| [
			DotPaths<FormSchema>,
			(
				param: ExtractFormControlValues<
					Form extends never ? FormOf<FormSchema> : Form
				>,
			) => Request[keyof Request],
	  ]
>;
