export const getTempinCel = (data, index) => {
    const temp = data.days[index].temp;
    return (temp - 32) * 5/9;
}
export const getTempinFar = (data, index) => {
    const temp = data.days[index].temp;
    return temp;
}