import { Button, Modal } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
// import { bookvisit } from '../../../../Server/controllers/userControllers'
import UserDetailsContext from '../../context/UserDetailsContext.js'
import { bookvisit } from '../../utils/api.js'

const BookingModal = ({ opened, setOpened, email, propertyId }) => {

  const [value, setValue] = useState(null)
  const { userDetails : {token} } = useContext(UserDetailsContext)
  console.log(token);

  const {mutate, isLoading} = useMutation({
    mutationFn: () => bookvisit(value, propertyId, email),
  
  })
  return (
    <Modal
      opened={opened}
      setOpened={setOpened}
      onClose={() => setOpened(false)}
      title="Select your date to visit"
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
