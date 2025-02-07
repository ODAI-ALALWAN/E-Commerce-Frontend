import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GET_COUPONS_By_Id } from "../../../../rtk/slices/Coupon-slice";
import { baseUrl } from "../../../../services/Api";
import { format } from "date-fns"; // Date formatting library
import Lodaing from "../../../../ui/Lodaing";

export default function CouponId() {
  const { id } = useParams();
  const { data: coupons ,  loading: couponsLoading} = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    expire: "",
    discount: "",
  });

  // Handle input changes
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Fetch coupon data by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(GET_COUPONS_By_Id(id)).unwrap();
        if (coupons && coupons.length > 0) {
          const coupon = coupons[0];
          setState({
            name: coupon.name || "",
            expire: coupon.expire
              ? format(new Date(coupon.expire), "yyyy-MM-dd")
              : "",
            discount: coupon.discount || "",
          });
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again!");
      }
    };

    fetchData();
  }, []);


  if (couponsLoading) return <div className='container mt-4 '><Lodaing/></div>  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate input fields
    if (!state.name || !state.expire || !state.discount) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    const payload = {
      name: state.name,
      expire: new Date(state.expire).toISOString(), // Convert to ISO format
      discount: state.discount,
    };

    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      await baseUrl.put(`api/v1/coupon/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Coupon updated successfully!");
      navigateTo("/Dashbord/Admin/Offers"); 
    } catch (error) {
      toast.error(error?.message || "Failed to update the coupon. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 mt-4 h-[400px] border-spacing-2 rounded-md border border-[#eee] shadow-xl">
      <h4 className="m-3 font-extralight">Update Coupon</h4>
      <form onSubmit={handleSubmit}>
        <div className="m-10 flex flex-col justify-center gap-10">
          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Coupon name..."
            id="name"
            className="rounded-md border p-2 outline-none"
            onChange={inputHandle}
            value={state.name}
          />

          {/* Discount Input */}
          <input
            type="number"
            name="discount"
            placeholder="Discount amount ($)"
            id="discount"
            className="rounded-md border p-2 outline-none"
            onChange={inputHandle}
            value={state.discount}
          />

          {/* Expiry Date Input */}
          <input
            type="date"
            name="expire"
            id="expire"
            className="rounded-md border p-2 outline-none"
            onChange={inputHandle}
            value={state.expire}
          />

     
          <button
            type="submit"
            className="text-l rounded-md bg-sky-500 p-2 text-white hover:bg-sky-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
