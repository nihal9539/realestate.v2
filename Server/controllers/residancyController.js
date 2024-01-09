import asyneHandler from 'express-async-handler'

import { prisma } from '../config/primsaConfig.js'


export const createResidancy = asyneHandler(async (req, res) => {
    const { title, description, price, address, country, city, image, facilities,
        userEmail } = req.body.data;

    console.log(req.body.data);
    try {

        const residancy = await prisma.residancy.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                city,
                image,
                facilities,
                owner: { connect: { email: userEmail } }

            },
        });
        res.send({ message: "residancy create successfully", residancy })

    } catch (err) {
        if (err.code === "P2000") {
            throw new Error("A residancy with address already  there")
        }
        throw new Error(err.message)
    }
})

// Function to get all the residancy
export const getAllResidancies = asyneHandler(async (req, res) => {
    console.log("fetching residancy");
    const residancies = await prisma.residancy.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    res.send(residancies);
})


//function for get a specific residancy
export const getResidancy = asyneHandler(async (req,res) => {
    const {id} = req.params;
    // console.log(id);

    try {
        const residancy = await prisma.residancy.findUnique({
            where: { id}
        })
        res.send(residancy)

    } catch (error) {
        console.log(error.message);
    }
})