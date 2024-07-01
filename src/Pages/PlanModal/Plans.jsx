// Plans.js
import React, { useEffect, useState } from "react";
import coverImage from "../../assets/img/coverImage.png";
import PlanCard from "./PlanCard";
import { useLocation, useNavigate } from "react-router-dom";
// import "./transaction/Transaction.css";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../Redux/userSlice.js";

const Plans = ({ selectPlan }) => {
  //   const initialPlansData = location?.state?.formdata?.plan_data;
  const initialPlansData = [
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
      is_pa_rsa: "1",
      is_age_skip: "0",
      is_active: "1",
      created_at: "2024-04-21 20:43:13",
      updated_at: "2024-04-21 20:43:13",
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
      is_pa_rsa: "2",
      is_age_skip: "1",
      is_active: "1",
      created_at: "2024-04-21 20:39:23",
      updated_at: "2024-04-21 20:39:23",
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
      is_pa_rsa: "2",
      is_age_skip: "1",
      is_active: "1",
      created_at: "2024-04-21 20:39:23",
      updated_at: "2024-04-21 20:39:23",
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
      is_pa_rsa: "1",
      is_age_skip: "0",
      is_active: "1",
      created_at: "2024-04-21 20:43:13",
      updated_at: "2024-04-21 20:43:13",
    },
  ];

  const [plansData] = useState(initialPlansData);
  const [hasOverflow, setHasOverflow] = useState(false);
  const dispatch = useDispatch();
  const Navigation = useNavigate();

  const handleBuyClick = (selectedPlan) => {
    // Dispatching the action
    dispatch(updateUserData({ plan_id: selectedPlan?.id }));

    // Navigation("/Form", { state: { selectedPlan, Action: "NewPolicy" } });
  };

  useEffect(() => {
    const container = document.getElementById("plansContainer");

    const handleOverflowChange = () => {
      setHasOverflow(container.scrollWidth > container.clientWidth);
    };

    container.addEventListener("scroll", handleOverflowChange);
    handleOverflowChange(); // Initial check

    return () => {
      container.removeEventListener("scroll", handleOverflowChange);
    };
  }, [hasOverflow]);
  return (
    <>
      <div className="flex flex-col  items-center overflow-x-scroll w-[100%]">
        <div className=" -z-10 top-12 w-full">
          <img
            src={coverImage}
            className="w-full h-36 object-cover"
            alt="cover_image"
          />
        </div>

        <div className="  h-full mb-20 -mt-20 flex p-2  w-[94%] justify-center">
          <div
            id="plansContainer"
            style={{
              minHeight: "fit-content",
              //   overflowX: "scroll",
              // background: hasOverflow ? "red" : "",
              // paddingLeft: hasOverflow ? "176px" : "0px",
            }}
            // className="flex md:h-[450px] justify-around mt-6 md:flex-row flex-col gap-4   "
            className="gap-4 p-5 flex w-full  flex-col  hide-scrollbar"
          >
            {plansData?.length > 0 ? (
              plansData.map((plan, index) => (
                <PlanCard
                  key={index}
                  title={plan.plan_name}
                  data={plan}
                  features={plan.features}
                  price={plan.plan_code}
                  backgroundColor={plan.backgroundColor}
                  onBuyClick={() => selectPlan(plan)}
                  button
                />
              ))
            ) : (
              <p>No plans available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
