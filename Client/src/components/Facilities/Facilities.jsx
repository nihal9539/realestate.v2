import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Group, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useContext } from 'react'
import UserDetailsContext from "../../context/UserDetailsContext"
import useProperties from "../../hooks/useProperties"
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const Facilities = ({ propertyDetails, setPropertyDetails, prevStep, setOpened, setActiveStep }) => {

    const form = useForm({
        initialValues: {
            bedrooms: propertyDetails.bedrooms,
            parkings: propertyDetails?.parkings,
            bathrooms: propertyDetails?.bathrooms
        },

        validate: {
            bedrooms: (value) => (value < 1 ? 'Must have atleast one room' : null),
            bathrooms: (value) => value < 1 ? 'Must have atleast one bathroom' : null,
        }
    })
    const { bedrooms, parkings, bathrooms } = form.values;

    const handleSubmit = () => {
        const { hasErrors } = form.validate();
        if (!hasErrors) {
            setPropertyDetails((prev) => ({ ...prev, facilities: { parkings, bathrooms, bedrooms } }))

            mutate()
        }


    }
    // ======== use Logic

    const { user } = useAuth0()
    const {
        userDetails: { token }

    } = useContext(UserDetailsContext)

    const { refresh: refetchProperties } = useProperties()

    const { mutate, isLoading } = useMutation({
        mutationFn: () => createResidancy({
            ...propertyDetails, facilities: { bedrooms, parkings, bathrooms }
        }, token),
        onError: ((response) => toast.error(response.data.message, { position: "bottom-right" })),
        onSettled: (() =>
            toast.error("Added Successfully", { position: "bottom-right" }),
            setPropertyDetails({
                title: "",
                description: "",
                price: 0,
                country: "",
                city: "",
                address: "",
                image: null,
                facilities: {
                    bedrooms: 0,
                    parkings: 0,
                    bathrooms: 0,
                },
                userEmail: user?.email,
            })
            // setOpened(false),
            // setActiveStep(0)
            //  refetchProperties()

        )


    })
    return (
        <Box maw="30%" mx="auto" my="md">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <div style={{ flex: 1, gap: "1rem" }}>


                    <NumberInput
                        w={"100%"}
                        // min={0}
                        withAsterisk
                        label={"No of Bedroom"}
                        {
                        ...form.getInputProps("bedrooms")
                        }
                    />
                    <NumberInput
                        w={"100%"}
                        withAsterisk
                        // min={0}
                        label="No of Parkings"
                        {
                        ...form.getInputProps("parkings")
                        }
                    />
                    <NumberInput
                        w={"100%"}
                        withAsterisk
                        label="No ofbathroom"
                        // min={0}
                        placeholder='1000'
                        {
                        ...form.getInputProps("bathrooms")
                        }
                    />
                </div>



                <Group position='center' mt={"xl"}>
                    <Button variant='default' onClick={prevStep}>Back</Button>
                    <Button type='submit' color='green' disabled={isLoading}>
                        {isLoading ? "Submitting" : "Add property"}
                    </Button>

                </Group>

            </form>
        </Box>
    )
}

export default Facilities
