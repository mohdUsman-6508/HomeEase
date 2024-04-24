import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listingData }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getLandlord = async () => {
      const res = await fetch(`/api/user/${listingData?.userRef}`);
      const data = await res.json();
      if (data.success === false) {
        console.log("Error:getting landlord details");
        return;
      }
      setLandlord(data);
      console.log(data);
    };
    getLandlord();
  }, [listingData.userRef]);

  return (
    <div className="flex flex-col gap-3 mt-3">
      {landlord && (
        <p className="text-2xl text-center capitalize font-semibold">
          Contact to {landlord?.username} for {listingData?.name}
        </p>
      )}
      <div className="flex flex-col gap-3">
        <textarea
          className="mt-2 rounded-md p-5 w-full focus:outline-none "
          name="message"
          id="message"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <Link
          to={`mailto:${landlord?.email}?subject=Regarding ${listingData?.name}&body=${message}`}
          className="bg-slate-700 p-3 text-white rounded-lg"
        >
          Send Message
        </Link>
      </div>
    </div>
  );
}

export default Contact;
