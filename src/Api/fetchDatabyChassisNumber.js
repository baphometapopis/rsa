import { API_BASE_URL } from "./api_Endpoint";

export const fetchDatabyChassisNumberApi = async (service, model_id) => {
  var myHeaders = new Headers();

  var formdata = new FormData();

  formdata.append("engine_no", model_id);

  formdata.append("policy_type", service);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/GetDataByChassisNumber`,
      requestOptions
    );

    if (!response.ok) {
      // Throw an error for non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result, "dsdsdsdsdsd?????????????????????????????????");
    return result;
  } catch (error) {
    console.log("error", error);
    // Returning an error object or message if needed
    return { error: "An error occurred while fetching data." };
  }
};
