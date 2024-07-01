/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../../assets/img/coverImage.png";
import { useFormik } from "formik";
import "./Registration.css";
import Input from "../../components/ui/Input.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomSelect from "../../components/ui/CustomSelect.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-dropdown-select";

import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from "react-redux";
import { resetUserData, updateUserData } from "../../Redux/userSlice.js.js";
import moment from "moment";
// import { decryptData } from "../../Utils/cryptoUtils.js";

import Loader from "../../components/Loader.js";
import ErrorModal from "../../components/Modal/ErrorModal.js";
import PlanModal from "../PlanModal/PlanModal.js";
import { fetchDatabyChassisNumberApi } from "../../Api/fetchDatabyChassisNumber.js";
import Plans from "../PlanModal/Plans.jsx";
import PlanCard from "../PlanModal/PlanCard.jsx";
import { RadioButton } from "../../components/ui/RadioButton.js";

export default function RegistrationPage() {
  const { service, engine_no } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [EndorsedFieldUpdated, setEndorsedFieldUpdated] = useState(false); // State for file input key

  const [selectedPlan, setSelectedPlan] = useState();
  const [salutation, setSalutation] = useState([]);
  const [modalArr, setmodalArr] = useState([]);

  const [showPlans, setShowPlan] = useState(false);

  const [ErrorModalOpen, setErrorModalOpen] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const [EnableEndorsementFields, setEnableEndorsementFields] = useState([]);
  const [EndorsmentFileUploadedError, setEndorsmentFileUploadedError] =
    useState();

  const [isEndorsment, setIsEndorsment] = useState(
    location?.state?.Action === "Endorsment" ? true : false
  );

  const [nom_relation, setNom_relation] = useState([]);
  const [soldPolicyData, setSoldPolicyData] = useState("");
  const [FilterOptions, setfilterOptions] = useState([]);
  const [FileUploaded, setFileUploaded] = useState("");

  const [loading, setLoading] = useState(false);

  const [genderOption, setgenderOption] = useState([]);
  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);
  const userData = useSelector((state) => state.user);
  const [formdata, setFormdata] = useState("");
  const [cityName, setcityName] = useState("");
  const [StateName, setStateName] = useState("");
  const [LoginData, setLoginData] = useState();
  const navigation = useNavigate();

  const [selectedVehicleOption, setSelectedVehicleOption] =
    useState("Option 1");

  const handleOptionChange = (e) => {
    setSelectedVehicleOption(e.target.value);
  };

  const options = ["BH Series", "Vehicle No"];

  function checkEndorsmentFieldsEmpty(...fields) {
    for (let field of fields) {
      if (typeof field !== "string" || field.trim() === "") {
        return true; // Field is empty
      }
    }
    return false; // All fields are non-empty
  }
  const submitData = async () => {
    console.log("HITTED");
    setShowPlan(true);
    setLoading(true);
    dispatch(updateUserData({ dealer_id: LoginData?.user_details?.id }));

    if (!isEndorsment) {
      const data = "asa";
      if (data?.status) {
        navigation("/confirmed", { state: { policy_id: data?.policy_id } });

        toast.success(data?.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        dispatch(resetUserData());
      } else {
        toast.error(data?.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } else {
      console.log("sdadasd");

      if (EnableEndorsementFields.length === 0) {
        setErrorModalOpen(true);
        setErrorMessage("Please select Fields for Endorsement");
      }

      //  else {
      //   setErrorModalOpen(false);
      //   setErrorMessage("");
      //   // Proceed with further logic
      // }

      console.log(FileUploaded, "oljihkujyh");

      if (FileUploaded === "") {
        setErrorModalOpen(true);
        setErrorMessage("Please upload an Endorsement file");
      }
      if (EnableEndorsementFields.length > 0) {
        for (let field of EnableEndorsementFields) {
          if (soldPolicyData[field] === formik.values[field]) {
            setErrorModalOpen(true);
            setErrorMessage("Please Update the Enabled Fields Value");
            setEndorsedFieldUpdated(false);
          } else {
            setEndorsedFieldUpdated(true);
          }

          // if (soldPolicyData[field] !== EnableEndorsementFields[field]) {
          //   return true; // Field has changed
          // }
        }
      }

      if (
        FileUploaded !== "" &&
        EnableEndorsementFields.length > 0 &&
        EndorsedFieldUpdated
      ) {
        const data = "aa";
        if (data?.status) {
          // navigation("/confirmed", { state: { policy_id: data?.policy_id } });
          navigation("/soldPolicy", { state: { policy_id: data?.policy_id } });

          toast.success(data?.message, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          dispatch(resetUserData());
        } else {
          toast.error(data?.message, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      }
    }
    setLoading(false);
  };
  const getFilterList = useCallback(async () => {
    try {
      const filterRes = "asas";
      if (filterRes?.status) {
        setfilterOptions(filterRes.filter_data);
      }
    } catch (error) {
      console.error("Error fetching filter list:", error);
    }
  }, []);

  //check endorsedField is checked
  const checkEndorsedSelected = (parameter) => {
    if (location?.state?.Action === "Endorsment") {
      return EnableEndorsementFields.includes(parameter);
    } else {
      return true;
    }
  };

  const formik = useFormik({
    initialValues: userData,

    onSubmit: (values) => {
      if (
        location?.state?.Action === "Endorsment" ||
        location?.state?.Action === "NewPolicy"
      ) {
        submitData();
      } else {
        // dispatch(updateUserData({ StateName: StateName }));
        // dispatch(updateUserData({ cityName: cityName }));

        dispatch(
          updateUserData({
            stateName: StateName,
            cityName: cityName,
          })
        );

        dispatch(updateUserData(formik.values));
        setShowPlan(true);
      }
    },

    validate: (values) => {
      const errors = {};
      const validateRequired = (field, message) => {
        if (!values[field]) {
          errors[field] = message;
        } else {
          delete errors[field];
        }
      };
      const validateEmailFormat = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,3}$/;
        return emailRegex.test(email);
      };
      const validateIndanMobileNo = (mobileno) => {
        const mobileRegex = /^[6789]\d{9}$/;
        return mobileRegex.test(mobileno);
      };
      const validatePanNo = (panNo) => {
        const panRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;
        return panRegex.test(panNo);
      };
      validateRequired("engine_no", "Required");
      validateRequired("chassis_number", "Required");
      validateRequired("vehicle_type", "Required");
      validateRequired("manufacturer", "Required");
      validateRequired("model", "Required");
      validateRequired("registration_no", "Required");

      validateRequired("fname", "Required");
      // validateRequired("salutation", "Required");
      validateRequired("dob", "Required");
      // validateRequired("gender", "Required");
      validateRequired("lname", "Required");
      validateRequired("email", "Required");
      validateRequired("mobile_no", "Required");
      validateRequired("addr1", "Required");
      validateRequired("addr2", "Required");
      validateRequired("pincode", "Required");
      // validateRequired("city_id", "Required");
      // validateRequired("state_id", "Required");
      validateRequired("nominee_full_name", "Required");
      validateRequired("nominee_age", "Required");
      // validateRequired("nominee_relation", "Required");
      if (values.email && !validateEmailFormat(values.email)) {
        errors.email = "Invalid email format";
      }

      if (values.mobile_no && !validateIndanMobileNo(values.mobile_no)) {
        errors.mobile_no = "Invalid Mobile Number";
      }

      if (
        values.pincode?.length === 6 &&
        (values.pincode !== formik.values.pincode ||
          StateName === "" ||
          cityName === "")
      ) {
        // Call your function here
        getPincode(values.pincode);
      }

      if (values.nominee_age < 18 && values.nominee_age !== "") {
        validateRequired("appointee_name", "Required");
        validateRequired("appointee_age", "Required");
        // validateRequired("appointee_relation", "Required");
        if (values.appointee_age && values?.appointee_age < 18) {
          errors.appointee_age = "age should be above 18";
        }
      }
      console.log(errors);

      return errors;
    },
  });

  const getPincode = async (pincode) => {
    const data = "sasa";
    if (data?.status) {
      setcityName(data?.data?.city_or_village_name);
      setStateName(data?.data?.state_name);
      formik.setFieldValue("city_id", data?.data?.city_id);
      formik.setFieldValue("state_id", data?.data?.state_id);
    } else {
      formik.setFieldValue("pincode", " ");
      toast.error("Failed to fetch Pincode ", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  // const getlocalData = useCallback(async () => {
  //   const data = localStorage.getItem("TVS_RSA_Cache");
  //   if (data) {
  //     const decryptdata = decryptData(data);
  //     setLoginData(decryptdata);
  //     getFormData(decryptdata);

  //     //api function if needed or  store in a state
  //   } else {
  //     navigate("/");

  //     toast.error("Session Expired, Login Again", {
  //       position: "bottom-right",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //     });
  //   }
  // }, [navigate]);

  const getFormData = async (localdata) => {
    const data = "sa";
    if (data?.status) {
      setFormdata(data);
      const activeSalutations = data?.salutation_data?.filter(
        (salutation) => salutation.is_active === 1
      );

      setSalutation(activeSalutations);
      const activeGender = data?.genders_data?.filter(
        (gender) => gender.is_active === 1
      );
      setgenderOption(activeGender);
    }
    setNom_relation(data?.nominee_relation_data);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);
  const getEndorsmentDetails = async () => {
    getFilterList();
    const data = await fetchDatabyChassisNumberApi(service, engine_no);

    // console.log(data?.model_array, ">>>>>>");
    setmodalArr(data?.model_array);

    // setSoldPolicyData(data?.data[0]); //storing in a state to compare value
    formik.setFieldValue("engine_no", data?.policy_data?.engine_no);
    formik.setFieldValue("chassis_number", data?.policy_data?.chassis_no);
    formik.setFieldValue("manufacturer", data?.policy_data?.manufacturer);
    formik.setFieldValue("model", data?.policy_data?.plan_model_id);
    formik.setFieldValue("registration_no", data?.policy_data?.registration_no);
    formik.setFieldValue("fname", data?.policy_data?.first_name);
    formik.setFieldValue("email", data?.policy_data?.email);
    formik.setFieldValue("addr1", data?.policy_data?.cust_addr1);

    formik.setFieldValue("addr2", data?.policy_data?.cust_addr2);
    // formik.setFieldValue("appointee_age", data?.data[0].appointee_age);
    // formik.setFieldValue("appointee_name", data?.data[0].appointee_full_name);
    // formik.setFieldValue(
    //   "appointee_relation",
    //   Number(data?.data[0].appointee_relation)
    // );
    // formik.setFieldValue("city_id", data?.data[0].city);
    // formik.setFieldValue("state_id", data?.data[0].state);
    // formik.setFieldValue("pincode", data?.data[0].pincode);

    setStateName(data?.policy_data?.state);
    setcityName(data?.policy_data?.city);

    // formik.setFieldValue("dob", data?.data[0].dob);
    // formik.setFieldValue("gender", Number(data?.data[0].gender));
    formik.setFieldValue("mobile_no", data?.policy_data?.mobile_no);
    formik.setFieldValue("nominee_age", data?.policy_data?.nominee_age);
    formik.setFieldValue(
      "nominee_full_name",
      data?.policy_data?.nominee_full_name
    );
    formik.setFieldValue(
      "nominee_relation",
      Number(data?.policy_data?.nominee_relation)
    );
    // formik.setFieldValue("salutation", Number(data?.data[0].salutation));

    formik.setFieldValue("mname", data?.policy_data?.middel_name);
    formik.setFieldValue("lname", data?.policy_data?.last_name);

    console.log(
      data?.policy_data?.engine_no,
      "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    );
  };

  const SelectPlan = (planDetail) => {
    console.log(planDetail);

    setSelectedPlan(planDetail);
    if (planDetail) {
      setShowPlan(false);
    }
  };

  useEffect(() => {
    if (service && engine_no) {
      getEndorsmentDetails();
    }
    // getlocalData();
  }, []);

  useEffect(() => {
    if (
      formik.values.pincode?.length === 6 &&
      (StateName === "" || cityName === "")
    ) {
      // Call your function here
      getPincode(formik.values.pincode);
    }
  }, [StateName, cityName]);
  useEffect(() => {}, [formik.values]);

  return (
    <>
      {!showPlans ? (
        <>
          <PlanModal
            isOpen={showPlans}
            // onClose={() => setisCancelModalOpen(false)}
            // data={seletedCancelPolicyData}
            // refresh={refresh}
            // SelectPlan={selectedPlan}
          />
          {loading && <Loader />}
          <ErrorModal
            isOpen={ErrorModalOpen}
            onClose={() => setErrorModalOpen(false)}
            message={ErrorMessage}
          />
          <div className="flex flex-col w-full items-center overflow-auto">
            <div className=" -z-10 top-12 w-full">
              <img
                src={coverImage}
                className="w-full h-36 object-cover"
                alt="cover_image"
              />
            </div>
            <div
              // style={{
              //   flexDirection: windowWidth <= "931px" ? "column" : "row",
              // }}
              className="flex flex-col md:flex-row "
            >
              {console.log(
                selectedPlan,
                ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
              )}{" "}
              {selectedPlan && !showPlans && (
                <div
                  style={{ justifyContent: "center" }}
                  className="sticky top-20  mx-6 md:min-w-fit md:w-1/2 h-fit   mt-5md:-mt-40 flex p-2"
                >
                  <PlanCard
                    key={selectedPlan?.id}
                    title={selectedPlan.plan_name}
                    data={selectedPlan}
                    features={selectedPlan.features}
                    price={selectedPlan.plan_code}
                    backgroundColor={selectedPlan.backgroundColor}
                    isSelected={selectedPlan ? true : false}
                  />
                </div>
              )}
              <div
                className="mx-6 md:min-w-fit  md:w-1/2 bg-white 
              min-h-fit mt-5 border border-neutral-light rounded mb-20"
              >
                <div className="bg-base-white h-24 border-b border-neutral-light rounded-t p-4">
                  <p className="text-2xl">Road Side Assistance (RSA)</p>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  <h1 className="ml-12 font-bold text-primary-darkest mt-6">
                    Vehicle Details
                  </h1>
                  <div className="formContainer gap-y-6 gap-x-6 place-items-center py-8 px-8">
                    <Input
                      {...formik.getFieldProps("engine_no")}
                      required={true}
                      formik={formik}
                      id="engine_no"
                      name="engine_no"
                      type="text"
                      placeholder="Enter your Engine Number"
                      label="Engine Number"
                      value={formik.values.engine_no}
                      capitalize
                      alphabets
                    />
                    <Input
                      {...formik.getFieldProps("chassis_number")}
                      required={true}
                      formik={formik}
                      id="chassis_number"
                      name="chassis_number"
                      type="text"
                      placeholder="Enter your Chassis Number"
                      label="Chassis Number"
                      disabled={!checkEndorsedSelected("chassis_number")}
                      value={formik.values.chassis_number}
                      capitalize
                      alphabets
                    />
                    <Input
                      {...formik.getFieldProps("vehicle_type")}
                      required={true}
                      formik={formik}
                      id="vehicle_type"
                      name="vehicle_type"
                      type="text"
                      placeholder="Enter your Vehicle Type"
                      label="Vehicle Type"
                      disabled={!checkEndorsedSelected("vehicle_type")}
                      value={formik.values.vehicle_type}
                      capitalize
                      alphabets
                    />
                    <Input
                      {...formik.getFieldProps("manufacturer")}
                      required={true}
                      formik={formik}
                      id="manufacturer"
                      name="manufacturer"
                      type="text"
                      placeholder="Enter your Manufacturer"
                      label="Manufacturer"
                      disabled={!checkEndorsedSelected("manufacturer")}
                      value={formik.values.manufacturer}
                      alphabets
                    />

                    {modalArr && (
                      <CustomSelect
                        id="model"
                        name="model"
                        label={"Model"}
                        options={[
                          ...modalArr?.map((Model) => ({
                            value: Model.model_name_id,
                            label: Model.model_name,
                          })),
                        ]}
                        required
                        placeholder="Select model"
                        value={formik.values.model}
                        formik={formik}
                        onChange={(selectedOption) => {
                          formik.setFieldValue("model", selectedOption.value);
                        }}
                        showError={false} // Set this prop to control error visibility
                      />
                    )}
                    <div>
                      <label
                        style={{
                          alignSelf: "flex-start",
                          color: "#686464",
                          marginBottom: "25px",
                        }}
                        htmlFor="date"
                      >
                        Select Vehicle no type
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <RadioButton
                        options={options}
                        selectedOption={selectedVehicleOption}
                        onOptionChange={handleOptionChange}
                      />
                    </div>
                    <Input
                      {...formik.getFieldProps("registration_no")}
                      required={true}
                      regnType={selectedVehicleOption}
                      formik={formik}
                      id="registration_no"
                      name="registration_no"
                      type="text"
                      label={selectedVehicleOption}
                      placeholder={
                        selectedVehicleOption === "BH Series"
                          ? "23-BH-1111-AA"
                          : "MH-02-AB-1234"
                      }
                      isVehicleNo={true}
                      disabled={!checkEndorsedSelected("registration_no")}
                      value={formik.values.registration_no}
                      alphanumeric
                    />
                  </div>
                  <h1 className="ml-12 font-bold text-primary-darkest mt-6">
                    Customer Details
                  </h1>

                  <div className="formContainer gap-y-6 gap-x-6 place-items-center py-8 px-8">
                    {salutation && (
                      <CustomSelect
                        id="salutation"
                        name="salutation"
                        label={"Salutation"}
                        options={[
                          ...salutation.map((salutation) => ({
                            value: salutation.id,
                            label: salutation.name,
                          })),
                        ]}
                        disabled={!checkEndorsedSelected("salutation")}
                        required
                        placeholder="Select Salutation"
                        value={formik.values.salutation}
                        formik={formik}
                        onChange={(selectedOption) => {
                          formik.setFieldValue(
                            "salutation",
                            selectedOption.value
                          );
                        }}
                        showError={false} // Set this prop to control error visibility
                      />
                    )}
                    <Input
                      {...formik.getFieldProps("fname")}
                      required={true}
                      formik={formik}
                      id="fname"
                      name="fname"
                      type="text"
                      placeholder="Enter your First Name"
                      label="First Name"
                      disabled={!checkEndorsedSelected("fname")}
                      value={formik.values.fname}
                      capitalize
                      alphabets
                    />
                    <Input
                      {...formik.getFieldProps("mname")}
                      formik={formik}
                      id="mname"
                      name="mname"
                      type="text"
                      disabled={!checkEndorsedSelected("mname")}
                      placeholder="Enter your Middle Name"
                      label="Middle Name"
                      value={formik.values.mname}
                      capitalize
                      alphabets
                    />
                    <Input
                      {...formik.getFieldProps("lname")}
                      formik={formik}
                      id="lname"
                      required={true}
                      name="lname"
                      disabled={!checkEndorsedSelected("lname")}
                      type="text"
                      placeholder="Enter your Last Name"
                      label="Last Name"
                      value={formik.values.lname}
                      alphabets
                      capitalize
                    />
                    <Input
                      {...formik.getFieldProps("email")}
                      formik={formik}
                      id="email"
                      disabled={!checkEndorsedSelected("email")}
                      name="email"
                      required
                      type="text"
                      placeholder="Enter your email"
                      label="Email"
                      value={formik.values.email}
                    />
                    <Input
                      {...formik.getFieldProps("mobile_no")}
                      formik={formik}
                      id="mobile_no"
                      name="mobile_no"
                      type="text"
                      disabled={!checkEndorsedSelected("mobile_no")}
                      placeholder="Enter your Mobile No"
                      label="Mobile No"
                      required={true}
                      value={formik.values.mobile_no}
                      numericOnly
                      maxLength={10}
                    />

                    {true && (
                      <CustomSelect
                        required
                        id="gender"
                        name="gender"
                        options={
                          genderOption?.map((data) => ({
                            value: data.id,
                            label: data.name,
                          })) || []
                        }
                        label={"Select Gender"}
                        placeholder="Select Gender"
                        value={formik.values.gender}
                        formik={formik}
                        onChange={(selectedOption) => {
                          formik.setFieldValue("gender", selectedOption.value);
                        }}
                        disabled={!checkEndorsedSelected("gender")}
                        showError={false} // Set this prop to control error visibility
                      />
                    )}

                    <div className="flex flex-col w-[240px]">
                      <label
                        style={{ alignSelf: "flex-start", color: "#686464" }}
                        htmlFor="date"
                      >
                        Date Of Birth
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <Input
                        {...formik.getFieldProps("dob")}
                        formik={formik}
                        id="dob"
                        name="dob"
                        type="date"
                        max={moment()
                          .subtract(18, "years")
                          .format("YYYY-MM-DD")}
                        required={true}
                        placeholder="dob"
                        value={formik.values.dob}
                        disabled={!checkEndorsedSelected("dob")}
                        className="w-full"
                      />
                    </div>
                    <Input
                      {...formik.getFieldProps("addr1")}
                      formik={formik}
                      id="addr1"
                      name="addr1"
                      type="text"
                      required={true}
                      disabled={!checkEndorsedSelected("addr1")}
                      placeholder="Address1 "
                      label="Address 1"
                      value={formik.values.addr1}
                      capitalize
                    />
                    <Input
                      {...formik.getFieldProps("addr2")}
                      formik={formik}
                      id="addr2"
                      name="addr2"
                      disabled={!checkEndorsedSelected("addr2")}
                      type="text"
                      required={true}
                      placeholder="Address 2 "
                      label="Address 2"
                      value={formik.values.addr2}
                      capitalize
                    />
                    <Input
                      {...formik.getFieldProps("pincode")}
                      formik={formik}
                      id="pincode"
                      name="pincode"
                      type="text"
                      placeholder="Pincode"
                      label="Pincode"
                      disabled={!checkEndorsedSelected("pincode")}
                      required={true}
                      value={formik.values.pincode}
                      maxLength={6}
                      numericOnly
                    />
                    <Input
                      {...formik.getFieldProps("city_id")}
                      formik={formik}
                      id="city_id"
                      name="city_id"
                      type="text"
                      placeholder="City"
                      label="City"
                      disabled={true}
                      required={true}
                      value={cityName}
                    />
                    <Input
                      {...formik.getFieldProps("state_id")}
                      formik={formik}
                      id="state_id"
                      name="state_id"
                      type="text"
                      disabled={true}
                      placeholder="State"
                      label="State"
                      required={true}
                      value={StateName}
                    />
                    <Input
                      {...formik.getFieldProps("nominee_full_name")}
                      formik={formik}
                      id="nominee_full_name"
                      name="nominee_full_name"
                      type="text"
                      disabled={!checkEndorsedSelected("nominee_full_name")}
                      required={true}
                      placeholder="Enter Nominee Name"
                      label="Nominee Full Name"
                      sentences
                      capitalize
                      value={formik.values.nominee_full_name}
                    />
                    <Input
                      {...formik.getFieldProps("nominee_age")}
                      formik={formik}
                      id="nominee_age"
                      name="nominee_age"
                      type="text"
                      placeholder="Nominee Age"
                      disabled={!checkEndorsedSelected("nominee_age")}
                      label="Nominee Age"
                      required={true}
                      value={formik.values.nominee_age}
                      maxLength={2}
                      numericOnly
                    />
                    {true && (
                      <CustomSelect
                        id="nominee_relation"
                        required
                        name="nominee_relation"
                        label={"Nominee Relation"}
                        options={
                          nom_relation?.map((data) => ({
                            value: data.nominee_relation_id,
                            label: data.name,
                          })) || []
                        }
                        placeholder="Select Relation"
                        value={formik.values.nominee_relation}
                        formik={formik}
                        disabled={!checkEndorsedSelected("nominee_relation")}
                        onChange={(selectedOption) => {
                          formik.setFieldValue(
                            "nominee_relation",
                            selectedOption.value
                          );
                        }}
                        showError={false} // Set this prop to control error visibility
                      />
                    )}
                    {formik.values.nominee_age < 18 &&
                      formik.values.nominee_age !== "" && (
                        <>
                          <Input
                            {...formik.getFieldProps("appointee_name")}
                            formik={formik}
                            id="appointee_name"
                            name="appointee_name"
                            type="text"
                            disabled={!checkEndorsedSelected("appointee_name")}
                            required={true}
                            placeholder="Enter Appointee Name"
                            label="Appointee Full Name"
                            sentences
                            value={formik.values.appointee_name}
                          />
                          <Input
                            {...formik.getFieldProps("appointee_age")}
                            formik={formik}
                            id="appointee_age"
                            name="appointee_age"
                            type="text"
                            disabled={!checkEndorsedSelected("appointee_age")}
                            placeholder="Appointee Age"
                            label="Appointee Age"
                            required={true}
                            value={formik.values.appointee_age}
                            numericOnly
                            maxLength={2}
                          />
                          {true && (
                            <CustomSelect
                              id="appointee_relation"
                              required
                              name="appointee_relation"
                              label={"Appointee Relation"}
                              options={
                                nom_relation?.map((data) => ({
                                  value: data.nominee_relation_id,
                                  label: data.name,
                                })) || []
                              }
                              disabled={
                                !checkEndorsedSelected("appointee_relation")
                              }
                              placeholder="Select Relation"
                              value={formik.values.appointee_relation}
                              formik={formik}
                              onChange={(selectedOption) => {
                                formik.setFieldValue(
                                  "appointee_relation",
                                  selectedOption.value
                                );
                              }}
                              showError={false} // Set this prop to control error visibility
                            />
                          )}
                        </>
                      )}
                    {isEndorsment && (
                      <div className="w-[73%]  overflow-hidden">
                        <label
                          htmlFor="file"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Upload File (Image/PDF)
                        </label>
                        <input
                          // key={} // Key to reset file input
                          type="file"
                          id="file"
                          name="file"
                          accept=".pdf, .png, .jpg, .jpeg"
                          onChange={(e) => setFileUploaded(e.target.files[0])}
                        />
                        {formik.errors.file && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.file}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="bg-primary text-white py-2 px-4 rounded mb-10"
                    >
                      {selectedPlan ? "Generate Policy" : "Select Plan"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Plans selectPlan={SelectPlan} />
      )}
    </>
  );
}
