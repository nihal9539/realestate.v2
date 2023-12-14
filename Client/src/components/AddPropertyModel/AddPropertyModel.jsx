import { Container, Group, Modal, Stepper } from '@mantine/core'
import React, { useState } from 'react'
import AddLocation from '../AddLocation/AddLocation'
import { useAuth0 } from "@auth0/auth0-react"
import UploadImage from '../UploadImage/UploadImage'
import BasicDetails from '../BasicDetails/BasicDetails'
import Facilities from '../Facilities/Facilities'
import Check from '../Check/Check'

const AddPropertyModel = ({ open, setOpen }) => {
    const [active, setActive] = useState(0)

    const { user } = useAuth0();

    const [propertyDetails, setPropertyDetails] = useState({
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
    });
    const nextStep = () => {
        setActive((current) => (current < 4 ? current + 1 : current));
    };

    const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
    };
    return (
        <div>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                closeOnClickOutside
                size={"90rem"}
            >
                <Container h={"40rem"} w={"100%"} pt={"1rem"}>
                    <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                        <Stepper.Step label="Location" description="Address">
                            <AddLocation
                                nextStep={nextStep}
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                            />
                        </Stepper.Step>
                        <Stepper.Step label="Image" description="Upload">
                            <UploadImage
                                nextStep={nextStep}
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                                prevStep={prevStep}
                            />
                        </Stepper.Step>
                        <Stepper.Step label="Besics" description=" Details">
                            <BasicDetails
                                nextStep={nextStep}
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                                prevStep={prevStep}
                            />
                        </Stepper.Step>
                        <Stepper.Step label="Final step" description="Basic Details">
                            {/* <Facilities
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                                prevStep={prevStep}
                                setOpened={setOpen}
                                setActiveStep={setActive}
                            />
                           */}
                            {/* <Check/> */}
                            <Facilities
                                prevStep={prevStep}
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                                setOpened={setOpen}
                                setActiveStep={setActive}
                            />
                        </Stepper.Step>
                        <Stepper.Completed>
                            Completed, click back button to get to previous step
                        </Stepper.Completed>
                    </Stepper>

                </Container>
            </Modal>
        </div>
    )
}

export default AddPropertyModel
