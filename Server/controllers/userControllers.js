import asyneHandler from 'express-async-handler'

import { prisma } from '../config/primsaConfig.js'

export const createUser = asyneHandler(async (req, res) => {
    console.log("creating a user");
    let { email } = req.body;
    console.log(email);

    const userExistes = await prisma.user.findUnique({ where: { email: email } })

    if (!userExistes) {
        const user = await prisma.user.create({ data: req.body })
        res.send({
            message: "User sucessfully",
            user: user,
        });
    }
    else
        res.status(201).send({ massage: "user already register" })

});

export const bookvisit = asyneHandler(async (req, res) => {
    const { email, date } = req.body
    const { id } = req.params

    try {

        const alreadyBook = await prisma.user.findUnique({
            where: { email: email },
            select: { bookVisits: true }
        })
        if (alreadyBook.bookVisits.some((visit) => visit.id === id)) {
            res.status(400).json({ message: "This reasidency already booked buy you" })
        } else {
            await prisma.user.update({
                where: { email: email },
                data: {
                    bookVisits: { push: { id, date } }
                }
            })
            res.send("Your visit booked successfully")
        }

    } catch (error) {
        throw new Error(err.message);

    }
})
export const getAllBook = asyneHandler(async (req, res) => {
    const { email, bookvisits } = req.body;


    try {
        const bookings = await prisma.user.findMany(
            {
                where: { email: email },
                select: { bookVisits: true }
            }
        )
        res.status(200).send(bookings)

    } catch (error) {
        throw new Error(error.message);

    }

})

// funtion to cancel booking 

export const cancelBooking = asyneHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params

    try {

        const user = await prisma.user.findUnique({
            where: { email },
            select: { bookVisits: true }
        })

        const index = user.bookVisits.findIndex((visit) => visit.id === id)

        if (index === -1) {
            res.send(404).json({ message: "booking not found" })
        } else {
            user.bookVisits.splice(index, 1)
            await prisma.user.update({
                where: { email: email },
                data: { bookVisits: user.bookVisits }
            })
            res.send("Booking cancel successfully")
        }

    } catch (error) {
        throw new Error(error.message)
    }
})

//function to add residsncy in favourite

export const toFav = asyneHandler(async (req, res) => {
    const { email } = req.body;
    const { rid } = req.params;


    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (user.favResidanciesID.includes(rid)) {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidanciesID: {
                        set: user.favResidanciesID.filter((id) => id != rid)
                    }
                }
            });
            res.send({ message: "Removed from favourite", user: updateUser })

        } else {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidanciesID: {
                        push: rid
                    }
                }
            })
            res.send({ message: "updated favourite", user: updateUser })
        }

    } catch (error) {
        throw new Error(err.massage)

    }
})
export const getAllFv = asyneHandler(async (req, res) => {
    const { email } = req.body;

    try {

        const allFav = await prisma.user.findUnique({
            where: { email },
            select: { favResidanciesID: true }
        })
        res.status(200).send(allFav)

    } catch (error) {
        throw new Error(error.massage)
    }
})