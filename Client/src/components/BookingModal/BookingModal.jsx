import { Button, Modal } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import UserDetailsContext from '../../context/UserDetailsContext.js'
import { bookvisit } from '../../utils/api.js'

const BookingModal = ({ opened, setopened, email, propertyId }) => {

  const [value, setValue] = useState(null)
  console.log(email);
  const { userDetails: { token } } = useContext(UserDetailsContext)
  console.log("token",token);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookvisit(value, propertyId, email)

  })
  return (
    <Modal
      opened={opened}
      onClose={() => setopened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  )
}

export default BookingModal
