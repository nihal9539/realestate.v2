import { Button, Modal } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import UserDetailsContext from '../../context/UserDetailsContext.js'
import { bookvisit } from '../../utils/api.js'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const BookingModal = ({ opened, setopened, email, propertyId }) => {

  const [value, setValue] = useState(null)
  const { userDetails: { token }, setUserDetails } = useContext(UserDetailsContext)

  const handleBookingSucess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right"
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev?.bookings,
        {
          id: propertyId,
          date: dayjs(value).format('DD/MM/YYYY')
        }
      ]
    }))
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookvisit(value, propertyId, email),
    onSuccess: () => handleBookingSucess(),
    onError: ({ response }) => toast.error(response.data.messge),
    onSettled: () => setopened(false)

  })
  return (
    <Modal
      opened={opened}
      onClose={() => setopened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  )
}

export default BookingModal
