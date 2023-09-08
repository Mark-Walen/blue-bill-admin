export const isNullOrUndefined = (value) => {
    return value === null || value === undefined
}

export const getImageUrl = (name) => {
    return `${import.meta.env.BASE_URL}/img/${name}.png`
};
