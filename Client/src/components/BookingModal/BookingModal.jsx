import { Button, Modal } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

const BookingModal = ({opened,setOpened,email,propertyId}) => {

    const [value,setValue] = useState(null)
  return (
    <Modal
    opened={opened}
    setOpened={setOpened}
    onClose={()=>setOpened(false)}
    title="Select your date to visit"
    centered
    >
        <div className="flexColCenter">
            <DatePicker value={value} onChange={setValue} minDate={new Date()}/>
            <Button disabled={!value} onClick={()=>mutate()}>
                Book visit
            </Button>
        </div>
    </Modal>
  )
}

export default BookingModal
