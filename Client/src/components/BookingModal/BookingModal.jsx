import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import { bookvisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import Calender from "react-calendar"
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import UserDetailsContext from "../../context/UserDetailsContext.js";
const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const navigate = useNavigate()
  const {
    userDetails: { token },
    userDetails,
    setUserDetails,
  } = useContext(UserDetailsContext);
  
  const handleBookingSuccess = () => {
    const details = JSON.parse(JSON.stringify(userDetails))
    details.bookivisit =  {  id: propertyId,
      date: dayjs(value).format("DD/MM/YYYY"), }
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
     
      ...prev,
      bookings: [
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };
  
  const [value, setValue] = useState(null);
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookvisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  const handledate =(e)=>{
    navigate('/')
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{gap: "1rem"}}>
        <DatePicker value={value} onChange={setValue} />
        {console.log(value)}
        <Button  onClick={()=>mutate()}>
          
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;