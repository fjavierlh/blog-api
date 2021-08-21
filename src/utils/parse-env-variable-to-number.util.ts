const parseEnvVariableToNumber = (variable: string): number => {
	const variableToNumber = parseInt(variable ?? '');
	if (!Number.isInteger(variableToNumber)) throw new Error('Error: enviroment variable is not a number. Please, check or create your .env file to solve it');
	return variableToNumber;
};

export { parseEnvVariableToNumber };