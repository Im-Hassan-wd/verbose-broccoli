import { useState } from "react";

const postContent =
  "A massive 17.3-incher at the top of the price list. Alienware laptops are taking the brand even further up the ranks of the best gaming laptops on the market, and these machines do come with a premium. Still, they remain popular among PC players for good reason, with a solid quality build and excellent engineering.";

export const useCategorize = () => {
  const [category, setCategory] = useState(null);

  const categorizePost = async () => {
    const formdata = new FormData();
    formdata.append("key", "603d4cd6e7612cba7091153d8a863691");
    formdata.append("txt", postContent);
    formdata.append("model", "IPTC_en");

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.meaningcloud.com/class-2.0",
        requestOptions
      );

      const data = await response.json();

      console.log(data.category_list[0].label);
    } catch (error) {
      console.log(error);
    }
  };

  return { categorizePost };
};
