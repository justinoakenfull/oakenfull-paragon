import colors from '../styles/tailwind-colours';

const isValidColour = (colour) => {
    return colors.colors.hasOwnProperty(colour);
}

export default isValidColour;

