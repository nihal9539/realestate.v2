import React from 'react'
import { useForm } from "@mantine/form"
import { Button, Group, Select, TextInput } from '@mantine/core'
import useCountries from '../../hooks/useCountries'
import Map from "../Map/Map"
import {validateString} from "../../utils/common.js"
import { useAuth0 } from '@auth0/auth0-react'

const AddLocation = ({ nextStep, propertyDetails, setPropertyDetails }) => {

    const { getAll } = useCountries()
    const { user } = useAuth0();
    console.log(user.email);

    const form = useForm({
        initialValues: {
            country: propertyDetails.country,
            city: propertyDetails.city,
            address: propertyDetails.address
        },

        validate: {
            country: (value) => validateString(value),
            city: (value) => validateString(value),
            address: (value) => validateString(value)
        }
    })


    const { country, city, address } = form.values;

    const handleSubmit = () => {
        const { hasErrors } = form.validate();
        if (!hasErrors) {
            setPropertyDetails((prev) => ({ ...prev, city, address, country }))
            nextStep()
        }
    }
    return (
        <div>
            <form action="
            "
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                {/* lest side */}
                <div className="flexCenter" style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "3rem",
                    marginTop: "3rem"
                }}>


                    {/* inputs */}

                    <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
                        <Select
                            w={"100%"}
                            withAsterisk
                            label="Country"
                            // required
                            clearable
                            searchable
                            data={getAll()}
                            {
                            ...form.getInputProps("country", { type: "input" })
                            }
                        />

                        <TextInput
                            w={"100%"}
                            withAsterisk
                            // required
                            // minLength={3}
                            label={"City"}
                            {
                            ...form.getInputProps("city", { type: "input" })
                            }
                        />
                        <TextInput
                            w={"100%"}
                            withAsterisk
                            // required
                            // minLength={3}
                            label="Address"
                            {
                            ...form.getInputProps("address", { type: "input" })
                            }
                        />
                    </div>
                    {/* right side */}
                    <div style={{ flex: 1 }}>
                        <Map
                            address={address}
                            city={city}
                            country={country}
                        />
                    </div>
                </div>

                <Group position='center' mt={"xl"}>
                    <Button type='submit'>Next Step</Button>
                </Group>

            </form>
        </div>
    )
}

export default AddLocation
