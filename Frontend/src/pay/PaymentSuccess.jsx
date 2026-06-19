import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const rideId = searchParams.get("rideId");

  useEffect(() => {
    setTimeout(() => {
      navigate("/feedback"); // ya "/riding"
    }, 3000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold text-green-600">
        ✅ Payment Successful
      </h1>
    </div>
  );
};

export default PaymentSuccess;