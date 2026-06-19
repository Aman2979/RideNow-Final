// import captainModel from "../models/caption.models.js";

// const createCaptain = async ({
//     firstname, lastname, email, password, color, plate, capacity, vehicleType
// }) => {
//     if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
//         throw new Error('All fields are required');
//     }
//     const captain = captainModel.create({
//         fullname: {
//             firstname,
//             lastname
//         },
//         email,
//         password,
//         vehicle: {
//             color,
//             plate,
//             capacity,
//             vehicleType
//         }
//     })

//     return captain;
// }

// export default createCaptain;

import captainModel from "../models/caption.models.js";

const createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    mobNumber,
    color,
    plate,
    capacity,
    vehicleType
}) => {

    if (
        !firstname ||
        !email ||
        !password ||
        !mobNumber ||
        !color ||
        !plate ||
        !capacity ||
        !vehicleType
    ) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({

        fullname: {
            firstname,
            lastname
        },

        email,
        password,
        mobNumber,

        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }

    });

    return captain;
};

export default createCaptain;