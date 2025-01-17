import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlanCard from "./PlanCard";

const PlanModal = ({ isOpen, onClose, data, refresh }) => {
  const [fileInputKey, setFileInputKey] = useState(0); // State for file input key

  //   const handleSubmit = async (values, { resetForm }) => {
  //     const resdata = await cancelSoldPolicy(values, data?.policy_id);
  //     console.log(resdata);
  //     if (resdata?.status) {
  //       toast.success("policy cancellation Initiated", {
  //         position: "bottom-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //       });
  //       refresh();
  //     } else {
  //       toast.error(resdata?.message, {
  //         position: "bottom-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //       });
  //     }

  //     resetForm();
  //     setFileInputKey((prevKey) => prevKey + 1); // Increment key to reset file input

  //     onClose();
  //   };

  const plansData = [
    {
      id: "135",
      plan_type_id: "8",
      pdf_url: "download_servicebeyondassistance_pdf",
      return_url: "",
      ic_id: "10",
      rsa_ic_id: null,
      plan_name: "Service Beyond Assistance Plus(Renewal)",
      plan_actual_name: "Service Beyond Assistance Plus(Renewal)",
      plan_sequence: null,
      pa_plan_amount: null,
      hc_plan_amount: null,
      plan_code: "345",
      km_covered: "25",
      plan_amount: "292.00",
      sum_insured: null,
      gst_amount: "53.00",
      dealer_commission: "90.00",
      rsa_commission_amount: "90.00",
      pa_ic_commission_amount: "0.00",
      hc_ic_commission_amount: null,
      accident_docotor_con: null,
      medical_assistance: null,
      oem_commission_amount: "102.00",
      brocker_commission_amount: "10.00",
      rsa_tenure: "1",
      pa_tenure: null,
      min_age: null,
      max_age: null,
      model_id: null,
      is_active: "1",
      created_at: "2024-04-03 17:26:11",
      updated_at: "2024-04-03 17:26:11",
    },
    {
      id: "136",
      plan_type_id: "8",
      pdf_url: "download_servicebeyondassistance_pdf",
      return_url: null,
      ic_id: "10",
      rsa_ic_id: null,
      plan_name: "Service Beyond Assistance Plus(5 Lac)",
      plan_actual_name: "Service Beyond assistance Plus(5 Lac PA)",
      plan_sequence: null,
      pa_plan_amount: "5 Lakh",
      hc_plan_amount: null,
      plan_code: "444",
      km_covered: "25",
      plan_amount: "376.00",
      sum_insured: "500000",
      gst_amount: "68.00",
      dealer_commission: "125.00",
      rsa_commission_amount: "90.00",
      pa_ic_commission_amount: "70.00",
      hc_ic_commission_amount: null,
      accident_docotor_con: null,
      medical_assistance: null,
      oem_commission_amount: "73.00",
      brocker_commission_amount: "18.00",
      rsa_tenure: "1",
      pa_tenure: "1",
      min_age: null,
      max_age: null,
      model_id: null,
      is_active: "1",
      created_at: "2024-04-04 13:37:12",
      updated_at: "2024-04-04 13:37:12",
    },
    {
      id: "137",
      plan_type_id: "8",
      pdf_url: "download_servicebeyondassistance_pdf",
      return_url: null,
      ic_id: "10",
      rsa_ic_id: null,
      plan_name: "Service Beyond Assistance Plus(15 Lac)",
      plan_actual_name: "Service Beyond assistance Plus( 15 Lac )",
      plan_sequence: null,
      pa_plan_amount: "15 Lakh",
      hc_plan_amount: null,
      plan_code: "555",
      km_covered: "25",
      plan_amount: "470.00",
      sum_insured: "1500000",
      gst_amount: "85.00",
      dealer_commission: "135.00",
      rsa_commission_amount: "90.00",
      pa_ic_commission_amount: "166.00",
      hc_ic_commission_amount: null,
      accident_docotor_con: null,
      medical_assistance: null,
      oem_commission_amount: "54.00",
      brocker_commission_amount: "25.00",
      rsa_tenure: "1",
      pa_tenure: "1",
      min_age: null,
      max_age: null,
      model_id: null,
      is_active: "1",
      created_at: "2024-04-04 13:42:40",
      updated_at: "2024-04-04 13:42:40",
    },
    {
      id: "138",
      plan_type_id: "8",
      pdf_url: "download_servicebeyondassistance_pdf",
      return_url: null,
      ic_id: "10",
      rsa_ic_id: null,
      plan_name: "Service Beyond Assistance Plus(AMC)",
      plan_actual_name: "Service Beyond assistance Plus( AMC )",
      plan_sequence: null,
      pa_plan_amount: null,
      hc_plan_amount: null,
      plan_code: "290",
      km_covered: "25",
      plan_amount: "245.00",
      sum_insured: null,
      gst_amount: "45.00",
      dealer_commission: "66.00",
      rsa_commission_amount: "90.00",
      pa_ic_commission_amount: "0.00",
      hc_ic_commission_amount: null,
      accident_docotor_con: null,
      medical_assistance: null,
      oem_commission_amount: "79.00",
      brocker_commission_amount: "20.00",
      rsa_tenure: "1",
      pa_tenure: null,
      min_age: null,
      max_age: null,
      model_id: null,
      is_active: "1",
      created_at: "2024-04-04 20:22:39",
      updated_at: "2024-04-04 20:22:39",
    },
  ];
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex md:flex-row items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-8 md:w-[85%] md:h-[95%]  relative z-50">
        <h2 className="text-2xl font-bold mb-4">Select a Plan</h2>
        <div className="max-h-[95%] overflow-y-scroll">
          {plansData.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.plan_name}
              data={{
                features: [
                  { label: "Plan Amount", value: `₹${plan.plan_code}` },
                  { label: "GST Amount", value: `₹${plan.gst_amount}` },
                  // Add more features as needed
                ],
              }}
              price={plan.plan_code}
              backgroundColor="#FFFFFF" // Replace with your background color
              onBuyClick={onClose} // Example onClick handler
              button={true} // or false depending on whether you want the button to appear
            />
          ))}
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
    // <div
    //   style={{ zIndex: 100, position: "absolute" }}
    //   className={`fixed inset-0 flex items-center justify-center ${
    //     isOpen ? "" : "hidden"
    //   }`}
    // >
    //   <div
    //     className={`fixed inset-0 transition-opacity ${
    //       isOpen ? "bg-black opacity-75" : "bg-transparent"
    //     }`}
    //     aria-hidden="true"
    //     onClick={onClose}
    //   ></div>

    //   <div className=" bg-primary w-[85%] h-[85%]">
    //     {/* <div className="inline-block align-bottom  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"> */}
    //     <div
    //       id="plansContainer"
    //       style={{
    //         minHeight: "fit-content",
    //         overflowX: "scroll",
    //         // background: hasOverflow ? "red" : "",
    //         // paddingLeft: hasOverflow ? "176px" : "0px",
    //       }}
    //       // className="flex md:h-[450px] justify-around mt-6 md:flex-row flex-col gap-4   "
    //       className="gap-4 p-5 flex   flex-col md:flex-row   md:h-[450px] hide-scrollbar"
    //     >
    //       {plansData?.length > 0 ? (
    //         plansData.map((plan, index) => (
    //           <PlanCard
    //             key={index}
    //             title={plan.plan_name}
    //             data={plan}
    //             features={plan.features}
    //             price={plan.total_premium}
    //             backgroundColor={plan.backgroundColor}
    //             onBuyClick={() => console.log("clicked")}
    //             button
    //           />
    //         ))
    //       ) : (
    //         <p>No plans available.</p>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default PlanModal;
